import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useState, useCallback } from "react";
import { createKol, type PlatformMetrics } from "~/lib/mock-api.server";

function parseHandle(url: string): string {
  const raw = url.trim();
  if (!raw) return "";
  const parts = raw.split("/").filter(Boolean);
  const handle = parts[parts.length - 1] ?? "";
  return handle.replace("@", "");
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "create");
  const displayName = String(formData.get("displayName") ?? "").trim();
  const gender = String(formData.get("gender") ?? "其他");
  const age = Number(formData.get("age") ?? 0);
  const phone = String(formData.get("contactPhone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const tagsRaw = String(formData.get("tagsInput") ?? "");
  const socialsRaw = String(formData.get("socialsJson") ?? "[]");
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const internalComments = String(formData.get("internalComments") ?? "").trim();
  const paymentMethod = formData.get("paymentMethod") as "勞報" | "發票" | null;
  const engagementRate = Number(formData.get("engagementRate") ?? 0);
  const exposureRate = Number(formData.get("exposureRate") ?? 0);
  const audienceMale = Number(formData.get("audienceMale") ?? 0);
  const audienceFemale = Number(formData.get("audienceFemale") ?? 100 - audienceMale);
  const audienceAge = String(formData.get("audienceAge") ?? "").trim();
  const introduction = String(formData.get("introduction") ?? "").trim();
  const platformMetricsRaw = String(formData.get("platformMetricsJson") ?? "{}");

  if (!displayName) {
    return json({ error: "KOL 名稱為必填" }, { status: 400 });
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  let socials: Array<{ platform: string; url: string; followers: number | null }> = [];
  try { socials = JSON.parse(socialsRaw); } catch { socials = []; }

  const primarySocial = socials[0] ?? { platform: "Instagram", followers: 0, url: "" };
  const socialMap = socials.reduce((acc, item) => {
    const key = String(item.platform || "").toLowerCase();
    if (key) acc[key] = Number(item.followers ?? 0);
    return acc;
  }, {} as Record<string, number>);

  const socialLinkMap = socials.reduce((acc, item) => {
    const key = String(item.platform || "").toLowerCase();
    if (key && item.url) acc[key] = item.url.trim();
    return acc;
  }, {} as Record<string, string>);

  let parsedPlatformMetrics: PlatformMetrics = {};
  try { parsedPlatformMetrics = JSON.parse(platformMetricsRaw); } catch { parsedPlatformMetrics = {}; }

  // Derive top-level engagement/exposure from Instagram platform metrics if available
  const igMetrics = parsedPlatformMetrics.audienceMetrics?.["Instagram"];
  const effectiveEngagementRate = igMetrics?.engagementRate ?? engagementRate;
  const effectiveExposureRate = igMetrics?.exposureRate ?? exposureRate;
  const effectiveAudienceGender = igMetrics?.audienceGender ?? { male: audienceMale, female: audienceFemale };
  const effectiveAudienceAge = igMetrics?.audienceAge ?? audienceAge;

  const payload = {
    displayName,
    instagramHandle: parseHandle(
      socials.find((s) => s.platform.toLowerCase() === "instagram")?.url ?? primarySocial.url ?? ""
    ),
    industry: "待分類",
    tags,
    categories: tags.length > 0 ? tags : ["待分類"],
    platform: primarySocial.platform || "Instagram",
    followers: Number(primarySocial.followers ?? 0),
    engagementRate: effectiveEngagementRate,
    exposureRate: effectiveExposureRate,
    audienceGender: effectiveAudienceGender,
    audienceAge: effectiveAudienceAge,
    introduction,
    platformMetrics: {
      ...parsedPlatformMetrics,
      // Store the platforms list derived from the socials array
      platforms: socials.filter(s => s.platform).map(s => s.platform),
    },
    socialLinks: {
      instagram: socialLinkMap.instagram,
      youtube: socialLinkMap.youtube,
      tiktok: socialLinkMap.tiktok,
      facebook: socialLinkMap.facebook,
    },
    rating: 0,
    collaborations: 0,
    averagePrice: 0,
    isFavorite: false,
    avatarUrl: avatarUrl || undefined,
    social: {
      instagram: socialMap.instagram ?? 0,
      youtube: socialMap.youtube ?? 0,
      tiktok: socialMap.tiktok ?? 0,
      facebook: socialMap.facebook ?? 0,
    },
    contact: { phone, email, manager: "" },
    profile: { gender, age },
    city: "Taipei",
    notes: [description, internalComments && `internal:${internalComments}`].filter(Boolean).join("\n"),
    status: intent === "draft" ? "draft" : "active",
    paymentMethod: paymentMethod || undefined,
  };

  const created = await createKol(payload);
  return redirect(`/kols/${created.id}`);
}

const AUDIENCE_PLATFORMS = ["Instagram", "YouTube", "TikTok", "Facebook"] as const;
type AudiencePlatform = typeof AUDIENCE_PLATFORMS[number];

type PlatformAudienceState = {
  engagementRate: string;
  exposureRate: string;
  realFollowerRatio: string;
  audienceMale: string;
  audienceFemale: string;
  audienceAge: string;
  avgRating: string;
};

function emptyPlatformAudience(): PlatformAudienceState {
  return { engagementRate: "", exposureRate: "", realFollowerRatio: "", audienceMale: "", audienceFemale: "", audienceAge: "", avgRating: "" };
}

function PlatformAudienceMetricsSection() {
  const [activePlatform, setActivePlatform] = useState<AudiencePlatform>("Instagram");
  const [metrics, setMetrics] = useState<Record<AudiencePlatform, PlatformAudienceState>>({
    Instagram: emptyPlatformAudience(),
    YouTube: emptyPlatformAudience(),
    TikTok: emptyPlatformAudience(),
    Facebook: emptyPlatformAudience(),
  });

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
    avgRating: Object.fromEntries(
      AUDIENCE_PLATFORMS.filter(p => metrics[p].avgRating)
        .map(p => [p, Number(metrics[p].avgRating)])
    ),
  };

  const current = metrics[activePlatform];

  const tabStyle = (platform: AudiencePlatform): React.CSSProperties => ({
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid var(--mantine-color-default-border)",
    background: activePlatform === platform ? "var(--mantine-color-blue-filled)" : "transparent",
    color: activePlatform === platform ? "#fff" : "var(--mantine-color-text)",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: activePlatform === platform ? 600 : 400,
    marginRight: 6,
  });

  return (
    <Box>
      <Title order={3} mb="sm">受眾數據與指標</Title>
      <Text size="sm" c="dimmed" mb="md">各社群平台的受眾指標可分開設定</Text>
      <Group mb="md" gap={0}>
        {AUDIENCE_PLATFORMS.map((p) => (
          <button key={p} type="button" style={tabStyle(p)} onClick={() => setActivePlatform(p)}>
            {p}
          </button>
        ))}
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
        <TextInput
          label="主要受眾年齡層"
          placeholder="例如：18-24, 25-34"
          value={current.audienceAge}
          onChange={(e) => updateField("audienceAge", e.currentTarget.value)}
        />
        <TextInput
          label="平均評分 (0-5)"
          type="number"
          step="0.1"
          min={0}
          max={5}
          placeholder="例如：4.5"
          value={current.avgRating}
          onChange={(e) => updateField("avgRating", e.currentTarget.value)}
        />
      </SimpleGrid>
    </Box>
  );
}

export default function KolCreatePage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  // --- Social Platforms State ---
  const [socials, setSocials] = useState<Array<{ id: string; platform: string; url: string; followers: number | null }>>([
    { id: "s0", platform: "Instagram", url: "", followers: null },
  ]);

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

  // --- Avatar Preview ---
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack gap="md">
      <Group gap={8}>
        <Link to="/kols">KOL 管理</Link>
        <Text c="dimmed">&gt;</Text>
        <Text fw={600}>新增 KOL</Text>
      </Group>

      <Card withBorder p="lg" maw={800} mx="auto" w="100%">
        <Form method="post">
          <Stack gap="xl">
            {/* ── Basic info ── */}
            <Box>
              <Title order={3} mb="md">KOL 基本資料</Title>

              {/* Avatar upload */}
              <Stack align="center" mb="lg">
                <input
                  id="avatar-file-input"
                  type="file"
                  accept="image/*"
                  aria-label="上傳頭像圖片"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <input type="hidden" name="avatarUrl" value={avatarPreview || ""} />
                <div
                  style={{ width: 220, border: "1px dashed #94a3b8", borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "center" }}
                  onClick={() => document.getElementById("avatar-file-input")?.click()}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Stack align="center" gap="xs">
                    <Avatar src={avatarPreview} radius={999} size={96} />
                    <Text fw={700}>↑</Text>
                    <Text size="sm">點擊上傳 KOL 照片</Text>
                    <Text size="xs" c="dimmed">支援拖拉上傳</Text>
                  </Stack>
                </div>
              </Stack>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput label="KOL 名稱" name="displayName" placeholder="例如：Gina" required />

                <Box>
                  <Text size="sm" fw={500} mb={6}>性別</Text>
                  <Radio.Group name="gender" defaultValue="女">
                    <Group mt="xs">
                      <Radio value="男" label="男" />
                      <Radio value="女" label="女" />
                      <Radio value="其他" label="其他" />
                    </Group>
                  </Radio.Group>
                </Box>

                <TextInput label="年齡" name="age" type="number" min={0} max={100} />
                <TextInput label="聯絡方式" name="contactPhone" placeholder="09xx-xxx-xxx" />
                <TextInput label="Email" name="email" type="email" placeholder="manager@example.com" />

                <Box>
                  <Text size="sm" fw={500} mb={6}>請款方式</Text>
                  <Radio.Group name="paymentMethod">
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
                  defaultValue="母嬰,親子,旅遊"
                  placeholder="例如：美妝, 旅遊, 科技"
                />
                <Text size="xs" c="dimmed" mt={4}>用逗號分隔多個標籤，例如：美妝, 旅遊, 科技</Text>
              </Box>
            </Box>

            <Divider />

            {/* ── Social platforms ── */}
            <Box>
              <Title order={3} mb="md">經營的社群平台</Title>
              <div id="social-rows">
                {socials.map((item, idx) => (
                  <div key={item.id} style={{ border: "1px solid var(--mantine-color-default-border)", borderRadius: "8px", padding: "12px", marginTop: "10px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr 80px 36px", gap: "8px", alignItems: "flex-end" }}>
                      <Select
                        label="平台"
                        data={["Instagram", "YouTube", "TikTok", "Facebook", "Twitter", "LINE"]}
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
                      <Box style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => fetchFollowers(item.id, item.platform, item.url)}
                          disabled={!item.url}
                        >
                          取得追蹤數
                        </Button>
                      </Box>
                      <TextInput
                        label="追蹤數"
                        readOnly
                        value={item.followers ? item.followers.toLocaleString() : "-"}
                        size="sm"
                        c="dimmed"
                      />
                      <Box style={{ display: "flex", alignItems: "flex-end", paddingBottom: "2px" }}>
                        {idx !== 0 && (
                          <Button
                            color="red"
                            variant="light"
                            onClick={() => removeSocial(item.id)}
                            style={{ width: 36, height: 36, padding: 0 }}
                          >
                            ×
                          </Button>
                        )}
                      </Box>
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

            <Divider />

            {/* ── Audience Metrics (per platform) ── */}
            <PlatformAudienceMetricsSection />

            <Divider />

            {/* ── Notes & Introduction ── */}
            <Box>
              <Title order={3} mb="md">提案與評估資料</Title>
              <Stack>
                <Textarea
                  label="人選介紹"
                  name="introduction"
                  placeholder="描述此 KOL 的風格特色、受眾黏著度、適合推廣的產品等，這將幫助業務快速撰寫提案內容"
                  minRows={5}
                />
                <Textarea label="描述" name="description" placeholder="KOL 內容風格、擅長主題、合作亮點" minRows={4} />
                <Textarea label="內部備註" name="internalComments" placeholder="僅內部可見，例如報價偏好、溝通注意事項" minRows={3} />
              </Stack>
            </Box>

            {actionData?.error && (
              <Alert color="red" title="建立失敗">{actionData.error}</Alert>
            )}

            <Group justify="space-between" mt="sm">
              <Button component={Link} to="/kols" variant="default">取消</Button>
              <Group>
                <Button type="submit" name="intent" value="draft" variant="default" loading={submitting}>儲存草稿</Button>
                <Button type="submit" name="intent" value="create" loading={submitting}>建立 KOL</Button>
              </Group>
            </Group>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
