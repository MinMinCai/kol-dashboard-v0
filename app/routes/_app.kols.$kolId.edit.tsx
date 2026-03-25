import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { getKol, updateKol, type Kol } from "~/lib/mock-api";

export async function loader({ params }: LoaderFunctionArgs) {
  const kolId = params.kolId;
  if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
  const kol = await getKol(kolId);
  if (!kol) throw new Response("KOL not found", { status: 404 });
  return json({ kol });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const kolId = params.kolId;
  if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });

  const formData = await request.formData();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const instagramHandle = String(formData.get("instagramHandle") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const tagsRaw = String(formData.get("tagsInput") ?? "");
  
  const kol = await getKol(kolId);
  const history = kol?.collaborationHistory ?? [];
  const rating = history.length > 0 ? history.reduce((s, r) => s + r.rating, 0) / history.length : 0;
  const collaborations = history.length;

  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const phone = String(formData.get("contactPhone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const paymentMethod = formData.get("paymentMethod") as "勞報" | "發票" | null;
  const engagementRate = Number(formData.get("engagementRate") ?? 0);
  const exposureRate = Number(formData.get("exposureRate") ?? 0);
  const audienceMale = Number(formData.get("audienceMale") ?? 0);
  const audienceFemale = Number(formData.get("audienceFemale") ?? 100 - audienceMale);
  const audienceAge = String(formData.get("audienceAge") ?? "").trim();
  const introduction = String(formData.get("introduction") ?? "").trim();
  const socialsRaw = String(formData.get("socialsJson") ?? "[]");

  if (!displayName) {
    return json({ error: "KOL 名稱為必填" }, { status: 400 });
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  let socials: Array<{ platform: string; url: string; followers: number | null }> = [];
  try { socials = JSON.parse(socialsRaw); } catch { socials = []; }

  const socialMap = socials.reduce((acc, item) => {
    const key = String(item.platform || "").toLowerCase();
    if (key) acc[key] = Number(item.followers ?? 0);
    return acc;
  }, {} as Record<string, number>);

  await updateKol(kolId, {
    displayName,
    instagramHandle: instagramHandle || undefined,
    industry: industry || undefined,
    tags,
    categories: tags.length > 0 ? tags : undefined,
    followers: socials[0]?.followers ?? 0,
    rating: Number.isFinite(rating) ? rating : 0,
    collaborations: Number.isFinite(collaborations) ? collaborations : 0,
    avatarUrl: avatarUrl || undefined,
    contact: { phone, email },
    notes: notes || undefined,
    paymentMethod: paymentMethod || undefined,
    engagementRate: Number.isFinite(engagementRate) ? engagementRate : undefined,
    exposureRate: Number.isFinite(exposureRate) ? exposureRate : undefined,
    audienceGender: { male: audienceMale, female: audienceFemale },
    audienceAge: audienceAge || undefined,
    introduction: introduction || undefined,
    social: {
      instagram: socialMap.instagram ?? 0,
      youtube: socialMap.youtube ?? 0,
      tiktok: socialMap.tiktok ?? 0,
      facebook: socialMap.facebook ?? 0,
    },
  });

  return redirect(`/kols/${kolId}`);
}

export default function KolEditPage() {
  const data = useLoaderData<typeof loader>() as { kol: Kol };
  const kol = data.kol;
  const actionData = useActionData<typeof action>() as { error?: string } | undefined;
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  const initialSocials = [
    { id: "s-ig", platform: "Instagram", url: `https://instagram.com/${kol.instagramHandle || ""}`, followers: kol.social?.instagram ?? kol.followers ?? 0 },
    { id: "s-yt", platform: "YouTube", url: "", followers: kol.social?.youtube ?? 0 },
    { id: "s-tt", platform: "TikTok", url: "", followers: kol.social?.tiktok ?? 0 },
  ].filter(s => s.followers > 0 || (s.platform === "Instagram" && kol.instagramHandle));

  if (initialSocials.length === 0) {
     initialSocials.push({ id: "s0", platform: "Instagram", url: "", followers: 0 });
  }

  const [socials, setSocials] = useState(initialSocials);

  const addSocial = () => {
    setSocials([...socials, { id: "s" + Date.now(), platform: "Instagram", url: "", followers: 0 }]);
  };

  const removeSocial = (id: string) => {
    if (socials.length <= 1) return;
    setSocials(socials.filter((s) => s.id !== id));
  };

  const updateSocial = (id: string, key: string, value: any) => {
    setSocials(socials.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
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
                <Stack gap="md" style={{ flex: 1, minWidth: 260 }}>
                  <TextInput
                    label="KOL 名稱 *"
                    name="displayName"
                    defaultValue={kol.displayName}
                    required
                  />
                  <TextInput
                    label="Instagram 帳號"
                    name="instagramHandle"
                    defaultValue={kol.instagramHandle ?? ""}
                    placeholder="@username"
                  />
                  <TextInput
                    label="產業"
                    name="industry"
                    defaultValue={kol.industry ?? ""}
                    placeholder="例如：母嬰 / 美妝"
                  />
                  <TextInput
                    label="標籤（逗號分隔）"
                    name="tagsInput"
                    defaultValue={(kol.tags ?? kol.categories ?? []).join(", ")}
                    placeholder="母嬰, 親子"
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
                </Stack>
              </Group>
            </Box>

            <Divider />

            <Box>
              <Title order={3} mb="md">社群平台</Title>
              <Stack gap="sm">
                {socials.map((item, idx) => (
                  <Group key={item.id} align="flex-end">
                    <TextInput
                      label="平台"
                      value={item.platform}
                      onChange={(e) => updateSocial(item.id, "platform", e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <TextInput
                      label="URL / 帳號"
                      value={item.url}
                      onChange={(e) => updateSocial(item.id, "url", e.target.value)}
                      style={{ flex: 2 }}
                    />
                    <TextInput
                      label="粉絲數"
                      type="number"
                      value={item.followers || 0}
                      onChange={(e) => updateSocial(item.id, "followers", Number(e.target.value))}
                      style={{ flex: 1 }}
                    />
                    {idx !== 0 && (
                      <Button color="red" variant="light" onClick={() => removeSocial(item.id)}>×</Button>
                    )}
                  </Group>
                ))}
                <Button variant="default" onClick={addSocial} size="xs" style={{ width: "fit-content" }}>
                  + 新增社群平台
                </Button>
                <input type="hidden" name="socialsJson" value={JSON.stringify(socials)} />
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Title order={3} mb="md">成效指標</Title>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                <TextInput
                  label="互動率 (%)"
                  name="engagementRate"
                  type="number"
                  step="0.01"
                  defaultValue={kol.engagementRate ?? 0}
                />
                <TextInput
                  label="曝光率 (%)"
                  name="exposureRate"
                  type="number"
                  step="0.01"
                  defaultValue={kol.exposureRate ?? 0}
                />
                <TextInput
                  label="受眾性別比 (男 %)"
                  name="audienceMale"
                  type="number"
                  defaultValue={kol.audienceGender?.male ?? 0}
                />
                <TextInput
                  label="受眾性別比 (女 %)"
                  name="audienceFemale"
                  type="number"
                  defaultValue={kol.audienceGender?.female ?? 0}
                />
                <TextInput
                  label="受眾內容年齡層"
                  name="audienceAge"
                  defaultValue={kol.audienceAge ?? ""}
                  placeholder="例如：18-24"
                />
                <Box>
                  <Text size="sm" fw={500}>評分 (自動計算)</Text>
                  <Text mt={4}>{kol.rating?.toFixed(1) ?? "0.0"}</Text>
                </Box>
                <Box>
                  <Text size="sm" fw={500}>合作次數 (自動計算)</Text>
                  <Text mt={4}>{kol.collaborations ?? 0}</Text>
                </Box>
              </SimpleGrid>
            </Box>

            <Divider />

            <Box>
              <Title order={3} mb="md">聯絡與備註</Title>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="聯絡電話"
                  name="contactPhone"
                  defaultValue={kol.contact?.phone ?? ""}
                />
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={kol.contact?.email ?? ""}
                />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="頭像網址"
                name="avatarUrl"
                defaultValue={kol.avatarUrl ?? ""}
                placeholder="https://..."
              />
              <Textarea
                mt="md"
                label="人選介紹 (用於提案撰寫) *"
                name="introduction"
                minRows={5}
                defaultValue={kol.introduction ?? ""}
                required
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
