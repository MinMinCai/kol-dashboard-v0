import { Card, Grid, Group, Paper, Stack, Text, Title, ThemeIcon } from "@mantine/core";
import type { MouseEvent } from "react";
import {
  IconUsers,
  IconFileText,
  IconFileInvoice,
  IconHeart,
  IconReportAnalytics
} from "@tabler/icons-react";

const stats = [
  { label: "KOL 總數", value: "128" },
  { label: "進行中提案", value: "32" },
  { label: "執行中委刊單", value: "19" },
];

const modules = [
  {
    title: "KOL 管理",
    description: "搜尋、新增及管理 KOL 檔案與合作紀錄",
    icon: IconUsers,
    color: "blue",
    to: "/kols",
  },
  {
    title: "提案管理",
    description: "建立提案、追蹤審核狀態與溝通歷程",
    icon: IconFileText,
    color: "teal",
    to: "/proposals",
  },
  {
    title: "委刊單管理",
    description: "管理執行中的委刊單與合約細節",
    icon: IconFileInvoice,
    color: "violet",
    to: "/insertion-orders",
  },
  {
    title: "我的收藏",
    description: "查看已加入收藏的 KOL 方便快速提案",
    icon: IconHeart,
    color: "pink",
    to: "/favorites",
  },
  {
    title: "結案報告產生",
    description: "匯入數據快速產生精美的結案報告",
    icon: IconReportAnalytics,
    color: "grape",
    to: "/reports/generate",
  },
];

function ModuleCard({
  mod,
}: {
  mod: (typeof modules)[number];
}) {
  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      component="a"
      href={mod.to}
      style={{
        textDecoration: "none",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        height: "100%",
        display: "block",
      }}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon size={48} radius="md" color={mod.color} variant="light">
          <mod.icon size={26} stroke={1.5} />
        </ThemeIcon>
        <div>
          <Text fw={600} size="lg" mb={4} c="dark">
            {mod.title}
          </Text>
          <Text size="sm" c="dimmed" style={{ lineHeight: 1.4 }}>
            {mod.description}
          </Text>
        </div>
      </Group>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
        <Title order={2}>Dashboard</Title>
        <Text c="dimmed" size="sm">
          首頁 / 總覽
        </Text>
      </Group>

      <Grid gutter="md">
        {stats.map((s) => (
          <Grid.Col key={s.label} span={{ base: 12, sm: 4 }}>
            <Paper withBorder p="md" radius="md" shadow="xs" h="100%">
              <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={6}>
                {s.label}
              </Text>
              <Title order={2} lh={1.2}>
                {s.value}
              </Title>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>

      <Stack gap="md">
        <Title order={4}>功能模組</Title>
        <Grid gutter="md">
          {modules.map((mod, i) => (
            <Grid.Col
              key={mod.title}
              span={{ base: 12, md: 4 }}
              offset={i === 3 ? { base: 0, md: 2 } : undefined}
            >
              <ModuleCard mod={mod} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
