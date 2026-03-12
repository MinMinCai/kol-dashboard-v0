import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { getKol, updateKol } from "~/lib/mock-api";

export async function loader({ params }: LoaderFunctionArgs) {
  const kolId = params.kolId;
  if (!kolId) return json({ error: "Missing KOL id" }, { status: 400 });
  const kol = await getKol(kolId);
  if (!kol) return json({ error: "KOL not found" }, { status: 404 });
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
  const followers = Number(formData.get("followers") ?? 0);
  const rating = Number(formData.get("rating") ?? 0);
  const collaborations = Number(formData.get("collaborations") ?? 0);
  const avatarUrl = String(formData.get("avatarUrl") ?? "").trim();
  const phone = String(formData.get("contactPhone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!displayName) {
    return json({ error: "KOL 名稱為必填" }, { status: 400 });
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  await updateKol(kolId, {
    displayName,
    instagramHandle: instagramHandle || undefined,
    industry: industry || undefined,
    tags,
    categories: tags.length > 0 ? tags : undefined,
    followers: Number.isFinite(followers) ? followers : 0,
    rating: Number.isFinite(rating) ? rating : 0,
    collaborations: Number.isFinite(collaborations) ? collaborations : 0,
    avatarUrl: avatarUrl || undefined,
    contact: { phone, email },
    notes: notes || undefined,
  });

  return redirect(`/kols/${kolId}`);
}

export default function KolEditPage() {
  const { kol } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

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
                </Stack>
              </Group>
            </Box>

            <Divider />

            <Box>
              <Title order={3} mb="md">社群與成效</Title>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                <TextInput
                  label="粉絲數（IG）"
                  name="followers"
                  type="number"
                  min={0}
                  defaultValue={kol.social?.instagram ?? kol.followers ?? 0}
                />
                <TextInput
                  label="評分"
                  name="rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  defaultValue={kol.rating ?? 0}
                />
                <TextInput
                  label="合作次數"
                  name="collaborations"
                  type="number"
                  min={0}
                  defaultValue={kol.collaborations ?? 0}
                />
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
