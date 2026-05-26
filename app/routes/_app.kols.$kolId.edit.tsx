import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  MultiSelect,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getKol, updateKol, type Kol, type PlatformMetrics } from "~/lib/mock-api.server";
import styles from "./_app.kols.$kolId.edit.module.css";

function withTimeout<T,>(promise: Promise<T>, fallback: T, ms = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

function parseHandle(url: string): string {
  const raw = url.trim();
  if (!raw) return "";
  const parts = raw.split("/").filter(Boolean);
  const handle = parts[parts.length - 1] ?? "";
  return handle.replace("@", "");
}

export async function loader({ params }: LoaderFunctionArgs) {
  const kolId = params.kolId;
  if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
  const kol = await withTimeout(getKol(kolId), null).catch(() => null);
  if (!kol) throw new Response("KOL not found", { status: 404 });
  return json({ kol });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const kolId = params.kolId;
  if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });

  const formData = await request.formData();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const tagsRaw = String(formData.get("tagsInput") ?? "");

  const kol = await getKol(kolId);
  const history = kol?.collaborationHistory ?? [];
  const ratedHistory = history.filter((r) => r.rating >= 0.5);
  const rating = ratedHistory.length > 0 ? ratedHistory.reduce((s, r) => s + r.rating, 0) / ratedHistory.length : 0;
  const collaborations = history.length;

  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const phone = String(formData.get("contactPhone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const lineId = String(formData.get("contactLineId") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const paymentMethod = formData.get("paymentMethod") as "勞報" | "發票" | null;
  const genderRaw = String(formData.get("gender") ?? "").trim();
  const gender = genderRaw === "男" || genderRaw === "女" || genderRaw === "其他" ? genderRaw : undefined;
  const ageRaw = formData.get("age");
  const ageNum = ageRaw != null && String(ageRaw).trim() !== "" ? Number(ageRaw) : NaN;
  const age = Number.isFinite(ageNum) && ageNum > 0 ? ageNum : undefined;
  const engagementRate = Number(formData.get("engagementRate") ?? 0);
  const exposureRate = Number(formData.get("exposureRate") ?? 0);
  const audienceMale = Number(formData.get("audienceMale") ?? 0);
  const audienceFemale = Number(formData.get("audienceFemale") ?? 100 - audienceMale);
  const audienceAge = String(formData.get("audienceAge") ?? "").trim();
  const introduction = String(formData.get("introduction") ?? "").trim();
  const socialsRaw = String(formData.get("socialsJson") ?? "[]");
  const platformMetricsRaw = String(formData.get("platformMetricsJson") ?? "{}");
  let parsedPlatformMetrics: PlatformMetrics = {};
  try { parsedPlatformMetrics = JSON.parse(platformMetricsRaw); } catch { parsedPlatformMetrics = {}; }
  const igMetrics = parsedPlatformMetrics.audienceMetrics?.["Instagram"];
  const effectiveEngagementRate = igMetrics?.engagementRate ?? (Number.isFinite(engagementRate) ? engagementRate : undefined);
  const effectiveExposureRate = igMetrics?.exposureRate ?? (Number.isFinite(exposureRate) ? exposureRate : undefined);
  const effectiveAudienceGender = igMetrics?.audienceGender ?? { male: audienceMale, female: audienceFemale };
  const effectiveAudienceAge = igMetrics?.audienceAge ?? (audienceAge || undefined);

  if (!displayName) {
    return json({ error: "KOL 名稱為必填" }, { status: 400 });
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  let socials: Array<{ platform: string; url: string; followers: number | null }> = [];
  try { socials = JSON.parse(socialsRaw); } catch { socials = []; }

  const socialLinkMap = socials.reduce((acc, item) => {
    const key = String(item.platform || "").toLowerCase();
    if (key && item.url) acc[key] = item.url.trim();
    return acc;
  }, {} as Record<string, string>);

  const socialMap = socials.reduce((acc, item) => {
    const key = String(item.platform || "").toLowerCase();
    if (key) acc[key] = Number(item.followers ?? 0);
    return acc;
  }, {} as Record<string, number>);

  const igEntry = socials.find((s) => s.platform.toLowerCase() === "instagram");
  const igHandle = igEntry?.url ? parseHandle(igEntry.url) : "";

  await updateKol(kolId, {
    displayName,
    instagramHandle: igHandle,
    tags,
    categories: tags.length > 0 ? tags : undefined,
    followers: socials[0]?.followers ?? 0,
    rating: Number.isFinite(rating) ? rating : 0,
    collaborations: Number.isFinite(collaborations) ? collaborations : 0,
    avatarUrl: avatarUrl || undefined,
    contact: { phone, email, lineId },
    notes: notes || undefined,
    paymentMethod: paymentMethod || undefined,
    gender,
    age,
    engagementRate: effectiveEngagementRate,
    exposureRate: effectiveExposureRate,
    audienceGender: effectiveAudienceGender,
    audienceAge: effectiveAudienceAge,
    introduction: introduction || undefined,
    platformMetrics: {
      ...parsedPlatformMetrics,
      // Update platforms list derived from socials
      platforms: socials.filter(s => s.platform).map(s => s.platform),
    },
    socialLinks: {
      instagram: socialLinkMap.instagram,
      facebook: socialLinkMap.facebook,
      youtube: socialLinkMap.youtube,
      tiktok: socialLinkMap.tiktok,
      threads: socialLinkMap.threads,
    },
    social: {
      instagram: socialMap.instagram ?? 0,
      facebook: socialMap.facebook ?? 0,
      youtube: socialMap.youtube ?? 0,
      tiktok: socialMap.tiktok ?? 0,
      threads: socialMap.threads ?? 0,
    },
  });

  return redirect(`/kols/${kolId}`);
}

const AUDIENCE_PLATFORMS = ["Instagram", "Facebook", "YouTube", "TikTok", "Threads"] as const;
type AudiencePlatform = typeof AUDIENCE_PLATFORMS[number];

const AUDIENCE_AGE_OPTIONS = ["0-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"] as const;

type PlatformAudienceState = {
  engagementRate: string;
  exposureRate: string;
  realFollowerRatio: string;
  audienceMale: string;
  audienceFemale: string;
  audienceAge: string;
};

function initPlatformMetrics(kol: Kol): Record<AudiencePlatform, PlatformAudienceState> {
  const stored = kol.platformMetrics?.audienceMetrics ?? {};
  return Object.fromEntries(
    AUDIENCE_PLATFORMS.map((p) => {
      const m = stored[p] ?? (p === "Instagram" ? {
        engagementRate: kol.engagementRate,
        exposureRate: kol.exposureRate,
        audienceGender: kol.audienceGender,
        audienceAge: kol.audienceAge,
      } : {});
      return [p, {
        engagementRate: m.engagementRate != null ? String(m.engagementRate) : "",
        exposureRate: m.exposureRate != null ? String(m.exposureRate) : "",
        realFollowerRatio: m.realFollowerRatio != null ? String(m.realFollowerRatio) : (p === "Instagram" && kol.realFollowerRatio != null ? String(kol.realFollowerRatio) : ""),
        audienceMale: m.audienceGender?.male != null ? String(m.audienceGender.male) : "",
        audienceFemale: m.audienceGender?.female != null ? String(m.audienceGender.female) : "",
        audienceAge: m.audienceAge ?? "",
      }];
    })
  ) as Record<AudiencePlatform, PlatformAudienceState>;
}

function PlatformAudienceMetricsEdit({ kol, enabledPlatforms }: { kol: Kol; enabledPlatforms: string[] }) {
  const enabledSet = new Set(enabledPlatforms.filter((p): p is AudiencePlatform =>
    (AUDIENCE_PLATFORMS as readonly string[]).includes(p)
  ) as AudiencePlatform[]);
  const [activePlatform, setActivePlatform] = useState<AudiencePlatform>("Instagram");
  const [metrics, setMetrics] = useState<Record<AudiencePlatform, PlatformAudienceState>>(
    () => initPlatformMetrics(kol)
  );

  useEffect(() => {
    if (enabledSet.size === 0) return;
    if (!enabledSet.has(activePlatform)) {
      const firstEnabled = AUDIENCE_PLATFORMS.find((p) => enabledSet.has(p));
      if (firstEnabled) setActivePlatform(firstEnabled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabledPlatforms.join(",")]);

  const updateField = (field: keyof PlatformAudienceState, value: string) => {
    setMetrics((prev) => {
      const updated = { ...prev[activePlatform], [field]: value };
      if (field === "audienceMale") {
        const num = Number(value);
        updated.audienceFemale = String(Math.max(0, 100 - (isNaN(num) ? 0 : num)));
      } else if (field === "audienceFemale") {
        const num = Number(value);
        updated.audienceMale = String(Math.max(0, 100 - (isNaN(num) ? 0 : num)));
      }
      return { ...prev, [activePlatform]: updated };
    });
  };

  const serialized: PlatformMetrics = {
    audienceMetrics: Object.fromEntries(
      AUDIENCE_PLATFORMS.map((p) => {
        const m = metrics[p];
        return [p, {
          engagementRate: m.engagementRate ? Number(m.engagementRate) : undefined,
          exposureRate: m.exposureRate ? Number(m.exposureRate) : undefined,
          realFollowerRatio: m.realFollowerRatio ? Number(m.realFollowerRatio) : undefined,
          audienceGender: m.audienceMale
            ? { male: Number(m.audienceMale), female: Number(m.audienceFemale || 0) }
            : undefined,
          audienceAge: m.audienceAge || undefined,
        }];
      })
    ),
    avgEngagementRate: Object.fromEntries(
      AUDIENCE_PLATFORMS.filter(p => metrics[p].engagementRate)
        .map(p => [p, Number(metrics[p].engagementRate)])
    ),
  };

  const current = metrics[activePlatform];

  const isPlatformEnabled = (platform: AudiencePlatform) =>
    enabledSet.size === 0 || enabledSet.has(platform);

  const tabStyle = (platform: AudiencePlatform): React.CSSProperties => {
    const enabled = isPlatformEnabled(platform);
    const active = activePlatform === platform && enabled;
    return {
      padding: "6px 14px",
      borderRadius: 6,
      border: "1px solid var(--mantine-color-default-border)",
      background: active ? "var(--mantine-color-blue-filled)" : "transparent",
      color: active ? "#fff" : enabled ? "var(--mantine-color-text)" : "var(--mantine-color-gray-5)",
      cursor: enabled ? "pointer" : "not-allowed",
      opacity: enabled ? 1 : 0.55,
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      marginRight: 6,
    };
  };

  return (
    <Box>
      <Title order={3} mb="sm">受眾數據與指標</Title>
      <Text size="sm" c="dimmed" mb="md">各社群平台的受眾指標可分開設定（僅可編輯已新增於上方「社群平台」的平台）</Text>
      <Group mb="md" gap={0}>
        {AUDIENCE_PLATFORMS.map((p) => {
          const enabled = isPlatformEnabled(p);
          return (
            <button
              key={p}
              type="button"
              style={tabStyle(p)}
              disabled={!enabled}
              onClick={() => enabled && setActivePlatform(p)}
            >
              {p}
            </button>
          );
        })}
      </Group>
      <input type="hidden" name="platformMetricsJson" value={JSON.stringify(serialized)} />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <TextInput
          label="互動率 (%)"
          type="number"
          step="0.01"
          placeholder="例如：4.5"
          value={current.engagementRate}
          onChange={(e) => updateField("engagementRate", e.currentTarget.value)}
        />
        <TextInput
          label="曝光率 (%)"
          type="number"
          step="0.01"
          placeholder="例如：12.5"
          value={current.exposureRate}
          onChange={(e) => updateField("exposureRate", e.currentTarget.value)}
        />
        <TextInput
          label="真粉比例 (%)"
          type="number"
          step="0.01"
          placeholder="例如：82.5"
          value={current.realFollowerRatio}
          onChange={(e) => updateField("realFollowerRatio", e.currentTarget.value)}
        />
        <Box>
          <Text size="sm" fw={500} mb={4}>受眾性別比 (男 %)</Text>
          <TextInput
            type="number"
            placeholder="例如：30"
            value={current.audienceMale}
            onChange={(e) => updateField("audienceMale", e.currentTarget.value)}
          />
        </Box>
        <Box>
          <Text size="sm" fw={500} mb={4}>受眾性別比 (女 %)</Text>
          <TextInput
            type="number"
            placeholder="例如：70"
            value={current.audienceFemale}
            onChange={(e) => updateField("audienceFemale", e.currentTarget.value)}
          />
        </Box>
        <MultiSelect
          label="主要受眾年齡層"
          placeholder="可複選年齡層"
          data={[...AUDIENCE_AGE_OPTIONS]}
          value={current.audienceAge ? current.audienceAge.split(",").map((s) => s.trim()).filter(Boolean) : []}
          onChange={(values) => updateField("audienceAge", values.join(","))}
          clearable
        />
      </SimpleGrid>
    </Box>
  );
}

export default function KolEditPage() {
  const data = useLoaderData<typeof loader>() as { kol: Kol };
  const kol = data.kol;
  const actionData = useActionData<typeof action>() as { error?: string } | undefined;
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  type SocialRow = { id: string; platform: string; url: string; followers: number | null };
  const platformSeeds: Array<{ platform: string; urlKey: keyof NonNullable<Kol["socialLinks"]>; followersKey: keyof NonNullable<Kol["social"]> }> = [
    { platform: "Instagram", urlKey: "instagram", followersKey: "instagram" },
    { platform: "Facebook", urlKey: "facebook", followersKey: "facebook" },
    { platform: "YouTube", urlKey: "youtube", followersKey: "youtube" },
    { platform: "TikTok", urlKey: "tiktok", followersKey: "tiktok" },
    { platform: "Threads", urlKey: "threads", followersKey: "threads" },
  ];
  const initialSocials: SocialRow[] = platformSeeds
    .map((seed, idx): SocialRow | null => {
      const url = kol.socialLinks?.[seed.urlKey]
        ?? (seed.platform === "Instagram" && kol.instagramHandle ? `https://instagram.com/${kol.instagramHandle}` : "");
      const followers = kol.social?.[seed.followersKey] ?? 0;
      if (!url && !followers) return null;
      return { id: `s-${idx}-${seed.platform}`, platform: seed.platform, url, followers };
    })
    .filter((s): s is SocialRow => s !== null);

  if (initialSocials.length === 0) {
    initialSocials.push({ id: "s0", platform: "Instagram", url: "", followers: null });
  }

  const [socials, setSocials] = useState<SocialRow[]>(initialSocials);

  const addSocial = () => {
    if (socials.length >= 8) return;
    setSocials([...socials, { id: "s" + Date.now(), platform: "Instagram", url: "", followers: null }]);
  };

  const removeSocial = (id: string) => {
    if (socials.length <= 1) return;
    setSocials(socials.filter((s) => s.id !== id));
  };

  const updateSocial = (id: string, key: string, value: any) => {
    setSocials(socials.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  const fetchFollowers = async (id: string, platform: string, url: string) => {
    if (!url) {
      alert("請先輸入社群帳號 URL");
      return;
    }
    try {
      const r = await fetch(`/api/social-followers?platform=${encodeURIComponent(platform)}&url=${encodeURIComponent(url)}`);
      const data = await r.json();
      if (r.ok && data.followers) {
        updateSocial(id, "followers", data.followers);
      } else {
        alert(data.error || "取得追蹤數失敗");
      }
    } catch (e) {
      alert("取得失敗，請稍後再試");
    }
  };

  return (
    <Stack gap="md">
      <Group gap={8}>
        <Link to="/kols">KOL 管理</Link>
        <Text c="dimmed">&gt;</Text>
        <Link to={`/kols/${kol.id}`}>{kol.displayName}</Link>
        <Text c="dimmed">&gt;</Text>
        <Text fw={600}>編輯 KOL</Text>
      </Group>

      <Card withBorder p="lg" maw={840} mx="auto" w="100%">
        <Form method="post">
          <Stack gap="xl">
            <Box>
              <Title order={3} mb="md">基本資料</Title>
              <Group align="flex-start" gap="xl" wrap="wrap">
                <Stack align="center" gap="xs">
                  <Avatar src={kol.avatarUrl} radius={999} size={96} />
                  <Text size="xs" c="dimmed">頭像預覽</Text>
                </Stack>
                <Box flex={1} miw={260}>
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput
                      label="KOL 名稱 *"
                      name="displayName"
                      defaultValue={kol.displayName}
                      required
                    />

                    <Box>
                      <Text size="sm" fw={500} mb={6}>性別</Text>
                      <Radio.Group name="gender" defaultValue={kol.gender ?? ""}>
                        <Group mt="xs">
                          <Radio value="男" label="男" />
                          <Radio value="女" label="女" />
                          <Radio value="其他" label="其他" />
                        </Group>
                      </Radio.Group>
                    </Box>

                    <TextInput
                      label="年齡"
                      name="age"
                      type="number"
                      min={0}
                      max={100}
                      defaultValue={kol.age ?? ""}
                    />
                    <TextInput
                      label="聯絡方式"
                      name="contactPhone"
                      defaultValue={kol.contact?.phone ?? ""}
                      placeholder="09xx-xxx-xxx"
                    />
                    <TextInput
                      label="Email"
                      name="email"
                      type="email"
                      defaultValue={kol.contact?.email ?? ""}
                      placeholder="manager@example.com"
                    />
                    <TextInput
                      label="LINE ID"
                      name="contactLineId"
                      defaultValue={kol.contact?.lineId ?? ""}
                      placeholder="@lineId 或帳號"
                    />

                    <Box>
                      <Text size="sm" fw={500} mb={6}>請款方式</Text>
                      <Radio.Group name="paymentMethod" defaultValue={kol.paymentMethod}>
                        <Group mt="xs">
                          <Radio value="勞報" label="勞報" />
                          <Radio value="發票" label="發票" />
                        </Group>
                      </Radio.Group>
                    </Box>
                  </SimpleGrid>

                  <Box mt="md">
                    <Text size="sm" fw={500} mb={4}>KOL 標籤（逗號分隔）</Text>
                    <TextInput
                      name="tagsInput"
                      defaultValue={(kol.tags ?? kol.categories ?? []).join(", ")}
                      placeholder="例如：母嬰, 親子, 旅遊"
                    />
                    <Text size="xs" c="dimmed" mt={4}>用逗號分隔多個標籤，例如：美妝, 旅遊, 科技</Text>
                  </Box>
                </Box>
              </Group>
            </Box>

            <Divider />

            <Box>
              <Title order={3} mb="md">社群平台</Title>
              <div id="social-rows">
                {socials.map((item, idx) => (
                  <div key={item.id} className={styles.socialRow}>
                    <div className={styles.socialGrid}>
                      <Select
                        label="平台"
                        data={["Instagram", "Facebook", "YouTube", "TikTok", "Threads"]}
                        value={item.platform}
                        onChange={(val) => updateSocial(item.id, "platform", val)}
                        size="sm"
                      />
                      <TextInput
                        label="帳號 URL"
                        value={item.url}
                        onChange={(e) => updateSocial(item.id, "url", e.target.value)}
                        placeholder="https://instagram.com/username"
                        size="sm"
                      />
                      <Flex direction="column" justify="flex-end">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => fetchFollowers(item.id, item.platform, item.url)}
                          disabled={!item.url}
                        >
                          取得追蹤數
                        </Button>
                      </Flex>
                      <TextInput
                        label="追蹤數"
                        readOnly
                        value={item.followers ? item.followers.toLocaleString() : "-"}
                        size="sm"
                        c="dimmed"
                      />
                      <Flex align="flex-end" pb={2}>
                        {idx !== 0 && (
                          <Button
                            color="red"
                            variant="light"
                            onClick={() => removeSocial(item.id)}
                            className={styles.iconButton}
                          >
                            ×
                          </Button>
                        )}
                      </Flex>
                    </div>
                  </div>
                ))}
              </div>
              <input type="hidden" name="socialsJson" value={JSON.stringify(socials.map(s => ({ platform: s.platform, url: s.url, followers: s.followers })))} />
              <Group mt="md">
                <Button variant="default" onClick={addSocial} disabled={socials.length >= 8}>
                  + 新增社群平台
                </Button>
              </Group>
            </Box>

            <Divider />

            <PlatformAudienceMetricsEdit
              kol={kol}
              enabledPlatforms={socials.map((s) => s.platform).filter(Boolean)}
            />

            <Box>
              <Title order={3} mb="md">成效指標 (自動計算)</Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Box>
                  <Text size="sm" fw={500}>評分</Text>
                  <Text mt={4}>{kol.rating?.toFixed(1) ?? "0.0"}</Text>
                </Box>
                <Box>
                  <Text size="sm" fw={500}>合作次數</Text>
                  <Text mt={4}>{kol.collaborations ?? 0}</Text>
                </Box>
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <Title order={3} mb="md">介紹與備註</Title>
              <TextInput
                label="頭像網址"
                name="avatarUrl"
                defaultValue={kol.avatarUrl ?? ""}
                placeholder="https://..."
              />
              <Textarea
                mt="md"
                label="人選介紹"
                name="introduction"
                minRows={5}
                defaultValue={kol.introduction ?? ""}
              />
              <Textarea
                mt="md"
                label="備註"
                name="notes"
                minRows={4}
                defaultValue={kol.notes ?? ""}
              />
            </Box>

            {actionData?.error && (
              <Alert color="red" title="儲存失敗">
                {actionData.error}
              </Alert>
            )}

            <Group justify="space-between" mt="sm">
              <Button component={Link} to="/kols" variant="default">
                取消
              </Button>
              <Group>
                <Button component={Link} to={`/kols/${kol.id}`} variant="light">
                  回詳細頁
                </Button>
                <Button type="submit" loading={submitting}>
                  儲存變更
                </Button>
              </Group>
            </Group>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
