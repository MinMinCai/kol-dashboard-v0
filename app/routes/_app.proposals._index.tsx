import { Button, Card, Group, Stack, Table, Text, Title, ActionIcon, Modal, TextInput, NumberInput, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";
import { listProposals, deleteProposal, updateProposal } from "~/lib/mock-api.server";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete_proposal") {
    const id = String(formData.get("id"));
    await deleteProposal(id);
    return json({ success: true });
  }

  if (intent === "edit_proposal") {
    const id = String(formData.get("id"));
    const title = String(formData.get("title"));
    const clientName = String(formData.get("clientName"));
    const budget = Number(formData.get("budget"));
    const dueDate = String(formData.get("dueDate"));
    const stage = String(formData.get("stage"));

    await updateProposal(id, { title, clientName, budget, dueDate, stage });
    return json({ success: true });
  }

  return json({ success: false });
}

export async function loader(_: LoaderFunctionArgs) {
  const proposals = await listProposals();
  return json({ proposals });
}

export default function ProposalListPage() {
  const { proposals } = useLoaderData<typeof loader>();
  const [editingProposal, setEditingProposal] = useState<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleEdit = (p: any) => {
    setEditingProposal(p);
    open();
  };

  const handleAskDelete = (p: any) => {
    setDeleteTarget(p);
    openDelete();
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>提案一覽頁</Title>
        <Button component={Link} to="/proposals/new">
          新增提案
        </Button>
      </Group>

      <Card withBorder>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>標題</Table.Th>
              <Table.Th>客戶</Table.Th>
              <Table.Th>階段</Table.Th>
              <Table.Th>預算</Table.Th>
              <Table.Th>截止日</Table.Th>
              <Table.Th style={{ textAlign: "right" }}>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {proposals.map((p) => (
              <Table.Tr key={p.id}>
                <Table.Td>
                  <Link to={`/proposals/${p.id}`}>{p.title}</Link>
                </Table.Td>
                <Table.Td>{p.clientName}</Table.Td>
                <Table.Td>{p.stage}</Table.Td>
                <Table.Td>${p.budget.toLocaleString()}</Table.Td>
                <Table.Td>{p.dueDate}</Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="flex-end">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      component={Link}
                      to={`/proposals/${p.id}`}
                      title="查看詳細"
                    >
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="orange"
                      onClick={() => handleEdit(p)}
                      title="編輯"
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="light"
                      color="red"
                      type="button"
                      title="刪除"
                      onClick={() => handleAskDelete(p)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal opened={opened} onClose={close} title="編輯提案基本資料">
        {editingProposal && (
          <Form method="post" onSubmit={close}>
            <input type="hidden" name="intent" value="edit_proposal" />
            <input type="hidden" name="id" value={editingProposal.id} />
            <Stack>
              <TextInput
                name="title"
                label="提案標題"
                defaultValue={editingProposal.title}
                required
              />
              <TextInput
                name="clientName"
                label="客戶名稱"
                defaultValue={editingProposal.clientName}
                required
              />
              <NumberInput
                name="budget"
                label="預算"
                defaultValue={editingProposal.budget}
                thousandSeparator=","
              />
              <TextInput
                name="dueDate"
                label="截止日"
                defaultValue={editingProposal.dueDate}
                placeholder="2026-03-20"
              />
              <Select
                name="stage"
                label="提案階段"
                defaultValue={editingProposal.stage}
                data={[
                  { value: "draft", label: "草稿 (DRAFT)" },
                  { value: "internal_review", label: "內部審核 (INTERNAL REVIEW)" },
                  { value: "sent_to_client", label: "已送出給客戶 (SENT TO CLIENT)" },
                ]}
                required
              />
              <Group justify="flex-end" mt="md">
                <Button variant="default" onClick={close}>
                  取消
                </Button>
                <Button type="submit">儲存變更</Button>
              </Group>
            </Stack>
          </Form>
        )}
      </Modal>

      <Modal opened={deleteOpened} onClose={closeDelete} title="確認刪除提案" centered>
        <Form method="post" onSubmit={closeDelete}>
          <input type="hidden" name="intent" value="delete_proposal" />
          <input type="hidden" name="id" value={deleteTarget?.id ?? ""} />
          <Stack>
            <Text size="sm">
              確定要刪除此提案{deleteTarget ? `「${deleteTarget.title}」` : ""}嗎？此動作無法復原。
            </Text>
            <Group justify="flex-end">
              <Button variant="default" type="button" onClick={closeDelete}>
                取消
              </Button>
              <Button type="submit" color="red">
                確認刪除
              </Button>
            </Group>
          </Stack>
        </Form>
      </Modal>
    </Stack>
  );
}
