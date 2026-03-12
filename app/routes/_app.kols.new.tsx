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
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { MOCK_API_BASE } from "~/lib/mock-api";

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
    engagementRate: 0,
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
  };

  const res = await fetch(`${MOCK_API_BASE}/kols`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return json({ error: "建立失敗，請稍後再試" }, { status: 500 });
  const created = await res.json();
  return redirect(`/kols/${created.id}`);
}

/* ── Inline native JS for social platform rows ── */
const socialScript = `
  var __socials = [{ id:'s0', platform:'Instagram', url:'', followers:'' }];

  function renderSocials() {
    var container = document.getElementById('social-rows');
    if (!container) return;
    container.innerHTML = __socials.map(function(item, idx){
      return '<div style="border:1px solid var(--mantine-color-default-border);border-radius:8px;padding:12px;margin-top:10px;">' +
        '<div style="display:grid;grid-template-columns:1fr 2fr 1fr 80px 36px;gap:8px;align-items:flex-end;">' +
          '<div><label style="font-size:13px;font-weight:500;">平台</label>' +
            '<select oninput="updateSocial(\\''+item.id+'\\',\\'platform\\',this.value)" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;background:var(--mantine-color-body);color:var(--mantine-color-text);">' +
              ['Instagram','YouTube','TikTok','Facebook','Twitter','LINE'].map(function(p){ return '<option'+(item.platform===p?' selected':'')+'>'+p+'</option>'; }).join('') +
            '</select></div>' +
          '<div><label style="font-size:13px;font-weight:500;">帳號 URL</label>' +
            '<input type="text" value="'+item.url+'" oninput="updateSocial(\\''+item.id+'\\',\\'url\\',this.value)" placeholder="https://instagram.com/username" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;box-sizing:border-box;background:var(--mantine-color-body);color:var(--mantine-color-text);" /></div>' +
          '<div style="display:flex;flex-direction:column;justify-content:flex-end;">' +
            '<button type="button" onclick="fetchFollowers(\\''+item.id+'\\',\\''+item.platform+'\\')" style="padding:7px 10px;border-radius:4px;border:1px solid var(--mantine-color-default-border);background:var(--mantine-color-body);cursor:pointer;font-size:12px;margin-top:auto;color:var(--mantine-color-text);">取得追蹤數</button></div>' +
          '<div><label style="font-size:13px;font-weight:500;">追蹤數</label>' +
            '<input type="text" readOnly value="'+(item.followers||'-')+'" style="width:100%;padding:7px;border:1px solid var(--mantine-color-default-border);border-radius:4px;margin-top:4px;font-size:13px;background:var(--mantine-color-body);color:var(--mantine-color-dimmed);" /></div>' +
          '<div style="display:flex;align-items:flex-end;padding-bottom:2px;">' +
            (idx === 0 ? '<span style="width:36px;"></span>' : '<button type="button" onclick="removeSocial(\\''+item.id+'\\');return false;" style="width:36px;height:34px;border-radius:4px;border:1px solid #f87171;background:#fef2f2;color:#dc2626;cursor:pointer;font-size:14px;font-weight:700;">×</button>') +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
    syncSocialsJson();
  }
  function updateSocial(id, key, value) {
    __socials = __socials.map(function(s){ return s.id===id ? Object.assign({},s,{[key]:value}) : s; });
    renderSocials();
    syncSocialsJson();
  }
  function addSocial() {
    if (__socials.length >= 8) return;
    __socials.push({ id:'s'+Date.now(), platform:'Instagram', url:'', followers:'' });
    renderSocials();
  }
  function removeSocial(id) {
    if (__socials.length <= 1) return;
    __socials = __socials.filter(function(s){ return s.id!==id; });
    renderSocials();
  }
  function syncSocialsJson() {
    var el = document.getElementById('socials-json');
    if (el) el.value = JSON.stringify(__socials.map(function(s){ return { platform:s.platform, url:s.url, followers: s.followers ? Number(s.followers) : null }; }));
  }
  async function fetchFollowers(id, platform) {
    var s = __socials.find(function(x){ return x.id===id; });
    if (!s || !s.url) { alert('請先輸入社群帳號 URL'); return; }
    try {
      var r = await fetch('/api/social-followers?platform='+encodeURIComponent(platform)+'&url='+encodeURIComponent(s.url));
      var data = await r.json();
      if (r.ok && data.followers) {
        __socials = __socials.map(function(x){ return x.id===id ? Object.assign({},x,{followers:data.followers}) : x; });
        renderSocials();
      } else { alert(data.error || '取得追蹤數失敗'); }
    } catch(e) { alert('取得失敗，請稍後再試'); }
  }

  // Avatar upload
  function pickAvatar() {
    var fi = document.getElementById('avatar-file-input');
    if (fi) fi.click();
  }
  function previewAvatar(input) {
    var file = input.files && input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      var preview = document.getElementById('avatar-preview');
      var urlInput = document.getElementById('avatar-url-hidden');
      if (preview) preview.src = reader.result;
      if (urlInput) urlInput.value = reader.result;
    };
    reader.readAsDataURL(file);
  }

  document.addEventListener('DOMContentLoaded', function() { renderSocials(); });
  // Also render when script loads (in case DOMContentLoaded has already fired)
  if (document.readyState !== 'loading') { setTimeout(renderSocials, 0); }
`;

export default function KolCreatePage() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";

  return (
    <Stack gap="md">
      <script dangerouslySetInnerHTML={{ __html: socialScript }} />

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

              {/* Avatar upload — native click/file input */}
              <Stack align="center" mb="lg">
                <input
                  id="avatar-file-input"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  {...({ onchange: "previewAvatar(this)" } as any)}
                />
                <input type="hidden" id="avatar-url-hidden" name="avatarUrl" />
                <div
                  style={{ width: 220, border: "1px dashed #94a3b8", borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "center" }}
                  {...({ onclick: "pickAvatar()", ondragover: "event.preventDefault()" } as any)}
                >
                  <Stack align="center" gap="xs">
                    <Avatar id="avatar-preview" src={undefined} radius={999} size={96} />
                    <Text fw={700}>↑</Text>
                    <Text size="sm">點擊上傳 KOL 照片</Text>
                    <Text size="xs" c="dimmed">支援拖拉上傳</Text>
                  </Stack>
                </div>
              </Stack>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput label="KOL 名稱 *" name="displayName" placeholder="例如：Gina" required />

                <Box>
                  <Text size="sm" fw={500} mb={6}>性別</Text>
                  <Group>
                    <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                      <input type="radio" name="gender" value="男" /> 男
                    </label>
                    <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                      <input type="radio" name="gender" value="女" defaultChecked /> 女
                    </label>
                    <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                      <input type="radio" name="gender" value="其他" /> 其他
                    </label>
                  </Group>
                </Box>

                <TextInput label="年齡" name="age" type="number" min={0} max={100} />
                <TextInput label="聯絡方式" name="contactPhone" placeholder="09xx-xxx-xxx" />
                <TextInput label="Email" name="email" type="email" placeholder="manager@example.com" />
              </SimpleGrid>

              <Box mt="md">
                <Text size="sm" fw={500} mb={4}>KOL 標籤（逗號分隔）</Text>
                <input
                  name="tagsInput"
                  type="text"
                  defaultValue="母嬰,親子,旅遊"
                  placeholder="例如：美妝, 旅遊, 科技"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid var(--mantine-color-default-border)",
                    borderRadius: 4,
                    fontSize: 14,
                    background: "var(--mantine-color-body)",
                    color: "var(--mantine-color-text)",
                    boxSizing: "border-box",
                  }}
                />
                <Text size="xs" c="dimmed" mt={4}>用逗號分隔多個標籤，例如：美妝, 旅遊, 科技</Text>
              </Box>
            </Box>

            <Divider />

            {/* ── Social platforms — rendered by native JS ── */}
            <Box>
              <Title order={3} mb="md">經營的社群平台</Title>
              <div id="social-rows" />
              <textarea id="socials-json" name="socialsJson" defaultValue="[]" style={{ display: "none" }} readOnly />
              <Group mt="md">
                <button
                  type="button"
                  style={{ padding: "7px 14px", borderRadius: 4, border: "1px solid var(--mantine-color-default-border)", background: "var(--mantine-color-body)", cursor: "pointer", fontSize: 14, color: "var(--mantine-color-blue-filled)" }}
                  {...({ onclick: "addSocial()" } as any)}
                >
                  + 新增社群平台
                </button>
              </Group>
            </Box>

            <Divider />

            {/* ── Notes ── */}
            <Box>
              <Title order={3} mb="md">其他資訊</Title>
              <Stack>
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
