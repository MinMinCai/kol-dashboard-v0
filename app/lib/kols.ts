import type { Kol } from "./mock-api.server";

export const FOLLOWER_RANGES = [
  { key: "1000", label: "1,000+", min: 1000 },
  { key: "5000", label: "5,000+", min: 5000 },
  { key: "10000", label: "10K+", min: 10000 },
  { key: "50000", label: "50K+", min: 50000 },
  { key: "100000", label: "100K+", min: 100000 },
];

export type SortKey = "name" | "followers" | "engagement" | "rating" | "collaborations";
export type SortOrder = "asc" | "desc";

export function getPrimaryTags(kol: Kol): string[] {
  if (kol.tags && kol.tags.length > 0) return kol.tags;
  return kol.categories ?? [];
}

export function getFollowerBase(kol: Kol): number {
  const counts = [
    kol.social?.instagram ?? 0,
    kol.social?.youtube ?? 0,
    kol.social?.tiktok ?? 0,
    kol.social?.facebook ?? 0,
    kol.followers ?? 0,
  ];
  return Math.max(...counts, 0);
}
