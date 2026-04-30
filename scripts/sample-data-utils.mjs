function hashString(seed) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (Math.imul(31, hash) + seed.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

export function seededNumber(seed, min, max, decimals = 1) {
  const ratio = hashString(seed) / 2147483647;
  return Number((min + ratio * (max - min)).toFixed(decimals));
}

function stageFromOrderStatus(status) {
  if (status === "completed") return "approved";
  if (status === "in_progress") return "sent_to_client";
  if (status === "planned") return "internal_review";
  return "draft";
}

function derivePlatforms(kol) {
  const fromMetrics = kol.platformMetrics?.platforms ?? [];
  if (fromMetrics.length > 0) return fromMetrics;

  const social = kol.social ?? {};
  const fromSocial = Object.entries(social)
    .filter(([, value]) => Number(value) > 0)
    .map(([platform]) => platform.charAt(0).toUpperCase() + platform.slice(1));

  if (fromSocial.length > 0) return fromSocial;
  return kol.platform ? [kol.platform] : ["Instagram"];
}

function socialLinksFromAccounts(accounts) {
  return accounts.reduce((accumulator, account) => {
    const key = String(account.platform ?? "").toLowerCase();
    if (["instagram", "youtube", "tiktok", "facebook"].includes(key) && account.profileUrl) {
      accumulator[key] = account.profileUrl;
    }
    return accumulator;
  }, {});
}

export function enrichKolSeedData(kol, accounts = []) {
  const platforms = derivePlatforms(kol);
  const audienceMetrics = { ...(kol.platformMetrics?.audienceMetrics ?? {}) };

  for (const platform of platforms) {
    const current = audienceMetrics[platform] ?? {};
    audienceMetrics[platform] = {
      ...current,
      realFollowerRatio:
        current.realFollowerRatio
        ?? seededNumber(`${kol.id}:${platform}:real-follower-ratio`, 68, 96, 1),
    };
  }

  const socialLinks = {
    ...socialLinksFromAccounts(accounts),
    ...(kol.socialLinks ?? {}),
  };
  if (!socialLinks.instagram && kol.instagramHandle) {
    socialLinks.instagram = `https://www.instagram.com/${kol.instagramHandle}`;
  }

  return {
    ...kol,
    platformMetrics: {
      ...(kol.platformMetrics ?? {}),
      platforms,
      audienceMetrics,
    },
    socialLinks,
  };
}

export function buildSupplementalProposals(dbJson) {
  const insertionOrders = dbJson.insertionOrders ?? [];
  return insertionOrders.map((order, index) => ({
    id: `prop_from_${order.id}`,
    title: `${order.title ?? order.projectName ?? order.orderNo ?? `提案 ${index + 1}`} 前期提案`,
    clientName: order.clientName ?? "",
    stage: stageFromOrderStatus(order.status),
    budget: Number(order.totalBudget ?? 0),
    dueDate: order.startDate ?? order.endDate ?? "2026-06-30",
  }));
}

function buildCandidatePool(order, kols, fallbackOffset) {
  const orderCollaborations = order.collaborations ?? [];
  const selected = [];

  for (const collab of orderCollaborations) {
    const matched = kols.find((kol) => kol.id === collab.kolId) ?? kols.find((kol) => kol.displayName === collab.name);
    if (matched && !selected.some((item) => item.id === matched.id)) {
      selected.push(matched);
    }
  }

  if (selected.length === 0) {
    const sameIndustry = kols.filter((kol) => kol.industry && order.industry && kol.industry === order.industry);
    selected.push(...sameIndustry.slice(0, 2));
  }

  while (selected.length < 2 && kols.length > 0) {
    const fallback = kols[(fallbackOffset + selected.length) % kols.length];
    if (!selected.some((item) => item.id === fallback.id)) selected.push(fallback);
    else break;
  }

  return selected.slice(0, 3);
}

export function buildSupplementalProposalKols(dbJson, enrichedKols) {
  const proposals = buildSupplementalProposals(dbJson);
  const insertionOrders = dbJson.insertionOrders ?? [];

  return proposals.flatMap((proposal, proposalIndex) => {
    const order = insertionOrders[proposalIndex];
    if (!order) return [];

    const candidates = buildCandidatePool(order, enrichedKols, proposalIndex);
    return candidates.map((kol, candidateIndex) => {
      const collaboration = (order.collaborations ?? []).find((item) => item.kolId === kol.id || item.name === kol.displayName);
      const instagramMetrics = kol.platformMetrics?.audienceMetrics?.Instagram ?? {};
      const role = collaboration?.services ?? (candidateIndex === 0 ? "IG Reels + 限動" : candidateIndex === 1 ? "YouTube 整合影片" : "短影音導購");
      const price = Number(collaboration?.price ?? kol.averagePrice ?? Math.round(Number(order.totalBudget ?? 0) / Math.max(order.kolCount ?? 2, 1)));

      return {
        id: `pk_${proposal.id}_${kol.id}`,
        proposalId: proposal.id,
        kolId: kol.id,
        kolName: kol.displayName,
        kolAvatarUrl: kol.avatarUrl ?? null,
        price,
        role,
        reason: `由委刊單「${order.title ?? order.orderNo}」回推前期提案名單，方便前端展示完整提案流程。`,
        status: proposal.stage === "approved" ? "accepted" : "pending",
        feedbackText: "",
        realFollowerRatio:
          instagramMetrics.realFollowerRatio
          ?? seededNumber(`${proposal.id}:${kol.id}:rfr`, 68, 96, 1),
        reputationScore: kol.rating ?? seededNumber(`${proposal.id}:${kol.id}:rep`, 6, 9.6, 1),
        avgEngagementRate: kol.engagementRate ?? instagramMetrics.engagementRate ?? seededNumber(`${proposal.id}:${kol.id}:eng`, 2, 7.5, 1),
        engagementIndex: seededNumber(`${proposal.id}:${kol.id}:eng-idx`, 0.8, 2.3, 2),
        engagementScore: seededNumber(`${proposal.id}:${kol.id}:eng-score`, 6, 9.5, 1),
        brandFitScore: seededNumber(`${proposal.id}:${kol.id}:brand-fit`, 6, 9.4, 1),
        qualityScore: seededNumber(`${proposal.id}:${kol.id}:quality`, 72, 95, 1),
        cpfr: price > 0 ? Number((price / Math.max(kol.followers ?? 1, 1)).toFixed(4)) : null,
        recommendation: `${kol.displayName} 與 ${order.clientName ?? "此品牌"} 的合作方向相近，提案前置名單已補齊。`,
      };
    });
  });
}
