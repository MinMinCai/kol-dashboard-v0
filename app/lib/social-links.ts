type SupportedPlatform = "instagram" | "youtube" | "tiktok" | "facebook" | "threads";

function withHttps(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  return `https://${value}`;
}

function trimHandle(value: string): string {
  return value.trim().replace(/^@+/, "").replace(/^\/+/, "").replace(/\/+$/, "");
}

function normalizeInstagram(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/instagram\.com|instagr\.am/i.test(trimmed)) return withHttps(trimmed);
  if (/\s/.test(trimmed) && !/[/.@]/.test(trimmed)) return null;
  return `https://www.instagram.com/${trimHandle(trimmed)}`;
}

function normalizeYoutube(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/youtube\.com|youtu\.be/i.test(trimmed)) return withHttps(trimmed);

  const normalized = trimHandle(trimmed);
  if (/\s/.test(normalized) && !/[/.@]/.test(normalized)) return null;
  if (/^(channel\/|c\/|user\/|@)/i.test(normalized)) {
    return `https://www.youtube.com/${normalized}`;
  }
  return `https://www.youtube.com/@${normalized}`;
}

function normalizeTiktok(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/tiktok\.com/i.test(trimmed)) return withHttps(trimmed);
  if (/\s/.test(trimmed) && !/[/.@]/.test(trimmed)) return null;
  return `https://www.tiktok.com/@${trimHandle(trimmed)}`;
}

function normalizeFacebook(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/facebook\.com|fb\.com/i.test(trimmed)) return withHttps(trimmed);
  if (/\s/.test(trimmed) && !/[/.@]/.test(trimmed)) return null;
  return `https://www.facebook.com/${trimHandle(trimmed)}`;
}

function normalizeThreads(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/threads\.net/i.test(trimmed)) return withHttps(trimmed);
  if (/\s/.test(trimmed) && !/[/.@]/.test(trimmed)) return null;
  return `https://www.threads.net/@${trimHandle(trimmed)}`;
}

export function buildSocialProfileUrl(platform: SupportedPlatform, value?: string | null): string | null {
  if (!value?.trim()) return null;

  if (platform === "instagram") return normalizeInstagram(value);
  if (platform === "youtube") return normalizeYoutube(value);
  if (platform === "tiktok") return normalizeTiktok(value);
  if (platform === "threads") return normalizeThreads(value);
  return normalizeFacebook(value);
}
