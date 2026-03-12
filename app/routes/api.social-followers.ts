import { json, type LoaderFunctionArgs } from "@remix-run/node";

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const platform = (url.searchParams.get("platform") ?? "").toLowerCase();
  const profileUrl = url.searchParams.get("url") ?? "";

  if (!platform || !profileUrl) {
    return json({ error: "platform and url are required" }, { status: 400 });
  }

  const seed = hashString(`${platform}:${profileUrl}`);
  const baseByPlatform: Record<string, number> = {
    instagram: 30000,
    youtube: 18000,
    tiktok: 45000,
    facebook: 12000,
    threads: 8000,
  };

  const base = baseByPlatform[platform] ?? 10000;
  const followers = base + (seed % 250000);

  return json({ platform, url: profileUrl, followers, source: "mock-api" });
}
