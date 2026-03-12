import { Button, Card, Group, Stack, Table, Text, Title } from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { listProposals } from "~/lib/mock-api";

export async function loader(_: LoaderFunctionArgs) {
  const proposals = await listProposals();
  return json({ proposals });
}

export default function ProposalListPage() {
  const { proposals } = useLoaderData<typeof loader>();

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
                <Table.Td>{p.budget.toLocaleString()}</Table.Td>
                <Table.Td>{p.dueDate}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
      <Text c="dimmed" size="sm">
        假資料來源：json-server
      </Text>
    </Stack>
  );
}
