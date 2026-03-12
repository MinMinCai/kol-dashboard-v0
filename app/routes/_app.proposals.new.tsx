import { Button, Card, Group, Stack, TextInput, Title } from "@mantine/core";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { MOCK_API_BASE } from "~/lib/mock-api";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const budget = Number(formData.get("budget") ?? 0);
  const dueDate = String(formData.get("dueDate") ?? "").trim();

  if (!title || !clientName) {
    return json({ error: "標題與客戶為必填" }, { status: 400 });
  }

  const payload = {
    title,
    clientName,
    budget,
    dueDate: dueDate || "TBD",
    stage: "draft",
  };

  const res = await fetch(`${MOCK_API_BASE}/proposals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return json({ error: "建立失敗" }, { status: 500 });
  return redirect("/proposals");
}

export default function ProposalCreatePage() {
  const actionData = useActionData<typeof action>();

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>提案建檔頁</Title>
        <Link to="/proposals">回提案一覽</Link>
      </Group>
      <Card withBorder>
        <Form method="post">
          <Stack>
            <TextInput name="title" label="提案標題" required />
            <TextInput name="clientName" label="客戶名稱" required />
            <TextInput name="budget" label="預算" defaultValue="0" />
            <TextInput name="dueDate" label="截止日" placeholder="2026-03-20" />
            {actionData?.error ? <div style={{ color: "red" }}>{actionData.error}</div> : null}
            <Button type="submit">建立提案</Button>
          </Stack>
        </Form>
      </Card>
    </Stack>
  );
}
