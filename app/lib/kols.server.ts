import { json, redirect } from "@remix-run/node";
import {
  addKolToFavoriteFolder,
  clearKolFavorites,
  deleteKol,
  getKol,
  getKolFavoritesForMember,
  listFavoriteFolders,
  listKols,
  listTagCatalog,
  replaceKolFavoriteFolders,
  type Kol,
} from "./mock-api.server";
import { getCurrentMember } from "./demo-identity.server";
import { FOLLOWER_RANGES, getFollowerBase, getPrimaryTags, type SortKey, type SortOrder } from "./kols";

// ============ Internal helper ============

function withTimeout<T>(p: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([p, new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

// ============ Loader ============

export async function loadKolList(request: Request) {
  const url = new URL(request.url);
  const sp = url.searchParams;

  const q = sp.get("q")?.trim().toLowerCase() ?? "";
  const view = sp.get("view") === "table" ? "table" : "card";
  const sortKey = (sp.get("sort") ?? "followers") as SortKey;
  const sortOrder = (sp.get("order") ?? "desc") as SortOrder;
  const page = Math.max(1, Number(sp.get("page") ?? "1"));
  const showFilters = sp.get("panel") === "filters";
  const deleted = sp.get("deleted") === "1";

  const followerRanges = sp.getAll("fr");
  const industries = sp.getAll("ind");
  const tags = sp.getAll("tag");
  const minRating = Number(sp.get("minRating") ?? "0");
  const maxRating = Number(sp.get("maxRating") ?? "5");

  const currentMember = await getCurrentMember(request).catch(() => null);

  const [allKols, folders, tagCatalog, kolFavsByMember] = await Promise.all([
    withTimeout(listKols(), [] as Kol[]).catch(() => [] as Kol[]),
    withTimeout(listFavoriteFolders(currentMember?.id), [] as string[]).catch(() => [] as string[]),
    withTimeout(listTagCatalog(), [] as { name: string }[]).catch(() => [] as { name: string }[]),
    withTimeout(getKolFavoritesForMember(currentMember?.id), new Map<string, string[]>()).catch(() => new Map<string, string[]>()),
  ]);

  let kols = allKols;

  if (q) {
    kols = kols.filter((kol) => {
      const t = getPrimaryTags(kol);
      return (
        kol.displayName.toLowerCase().includes(q) ||
        (kol.instagramHandle ?? "").toLowerCase().includes(q) ||
        (kol.industry ?? "").toLowerCase().includes(q) ||
        t.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }

  if (followerRanges.length > 0) {
    kols = kols.filter((kol) => {
      const base = getFollowerBase(kol);
      return followerRanges.some((rk) => {
        const range = FOLLOWER_RANGES.find((r) => r.key === rk);
        return range ? base >= range.min : false;
      });
    });
  }

  if (industries.length > 0) {
    kols = kols.filter((kol) => industries.includes(kol.industry ?? ""));
  }

  if (tags.length > 0) {
    kols = kols.filter((kol) => {
      const t = getPrimaryTags(kol);
      return tags.every((tag) => t.includes(tag));
    });
  }

  kols = kols.filter((kol) => {
    const r = kol.rating ?? 0;
    return r >= minRating && r <= maxRating;
  });

  const m = sortOrder === "asc" ? 1 : -1;
  kols.sort((a, b) => {
    if (sortKey === "name") return a.displayName.localeCompare(b.displayName) * m;
    if (sortKey === "followers") return (getFollowerBase(a) - getFollowerBase(b)) * m;
    if (sortKey === "engagement") return ((a.engagementRate ?? 0) - (b.engagementRate ?? 0)) * m;
    if (sortKey === "rating") return ((a.rating ?? 0) - (b.rating ?? 0)) * m;
    return ((a.collaborations ?? 0) - (b.collaborations ?? 0)) * m;
  });

  const pageSize = view === "card" ? 8 : 10;
  const totalPages = Math.max(1, Math.ceil(kols.length / pageSize));
  const safePageNo = Math.min(page, totalPages);
  const pageRows = kols.slice((safePageNo - 1) * pageSize, safePageNo * pageSize).map((kol) => {
    const memberFolders = kolFavsByMember.get(kol.id) ?? [];
    return {
      ...kol,
      isFavorite: memberFolders.length > 0,
      favoriteFolders: memberFolders,
      favoriteFolder: memberFolders[0] ?? null,
    };
  });

  const allIndustries = [...new Set(allKols.map((k) => k.industry).filter(Boolean))] as string[];
  const catalogTags = tagCatalog.map((t) => t.name);
  const allTags = [...new Set([...allKols.flatMap((k) => getPrimaryTags(k)), ...catalogTags])];

  return {
    deleted,
    pageRows,
    total: kols.length,
    totalPages,
    page: safePageNo,
    pageSize,
    view,
    sortKey,
    sortOrder,
    showFilters,
    followerRanges,
    industries,
    tags,
    minRating,
    maxRating,
    q,
    allIndustries,
    allTags,
    folders,
    activeFilterCount:
      followerRanges.length + industries.length + tags.length +
      (minRating > 0 || maxRating < 5 ? 1 : 0),
  };
}

// ============ Action ============

export async function handleKolListAction(request: Request, formData: FormData) {
  const intent = formData.get("intent");
  const kolId = String(formData.get("kolId") ?? "");
  const currentMember = await getCurrentMember(request).catch(() => null);
  const memberId = currentMember?.id;

  if (intent === "addFavorite") {
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    const folder = String(formData.get("folder") ?? "").trim() || undefined;
    try {
      await addKolToFavoriteFolder(kolId, folder ?? "", memberId);
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
    }
    return json({ success: true });
  }

  if (intent === "updateFavoriteFolders") {
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    const selectedFolders = String(formData.get("selectedFolders") ?? "")
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean);

    try {
      if (selectedFolders.length > 0) {
        await replaceKolFavoriteFolders(kolId, selectedFolders, memberId);
      } else {
        await addKolToFavoriteFolder(kolId, "", memberId);
      }
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
    }

    return json({ success: true });
  }

  if (intent === "removeFavorite") {
    if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
    await clearKolFavorites(kolId);
    return json({ success: true });
  }

  if (intent === "delete") {
    if (!kolId) {
      return json({ error: "Missing KOL id" }, { status: 400 });
    }

    await deleteKol(kolId);

    const url = new URL(request.url);
    url.searchParams.set("deleted", "1");
    return redirect(url.pathname + "?" + url.searchParams.toString());
  }

  return null;
}

// ============ Detail Loader ============

export async function loadKolDetail(kolId: string, request: Request) {
  const kol = await withTimeout(getKol(kolId), null).catch(() => null);
  if (!kol) throw new Response("Not Found", { status: 404 });

  const url = new URL(request.url);
  const tab = url.searchParams.get("tab") ?? "projects";
  const limit = Math.max(5, Number(url.searchParams.get("limit") ?? "5"));
  const currentMember = await getCurrentMember(request).catch(() => null);

  const [folders, kolFavsByMember] = await Promise.all([
    withTimeout(listFavoriteFolders(currentMember?.id), [] as string[]).catch(() => [] as string[]),
    withTimeout(getKolFavoritesForMember(currentMember?.id), new Map<string, string[]>()).catch(() => new Map<string, string[]>()),
  ]);

  const memberFolders = kolFavsByMember.get(kol.id) ?? [];
  const kolForMember = {
    ...kol,
    isFavorite: memberFolders.length > 0,
    favoriteFolders: memberFolders,
    favoriteFolder: memberFolders[0] ?? null,
  };

  return { kol: kolForMember, tab, limit, folders };
}

// ============ Detail Action ============

export async function handleKolDetailAction(
  kolId: string,
  request: Request,
  formData: FormData,
) {
  if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
  const intent = formData.get("intent");
  const currentMember = await getCurrentMember(request).catch(() => null);
  const memberId = currentMember?.id;

  try {
    if (intent === "add_favorite") {
      const folder = String(formData.get("folder") ?? "").trim() || undefined;
      await addKolToFavoriteFolder(kolId, folder ?? "", memberId);
    } else if (intent === "update_favorite_folders") {
      const selectedFolders = String(formData.get("selectedFolders") ?? "")
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);
      if (selectedFolders.length > 0) {
        await replaceKolFavoriteFolders(kolId, selectedFolders, memberId);
      } else {
        await addKolToFavoriteFolder(kolId, "", memberId);
      }
    } else if (intent === "remove_favorite") {
      await clearKolFavorites(kolId, memberId);
    }
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "操作失敗" }, { status: 403 });
  }
  return json({ success: true });
}
