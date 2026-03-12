import { Card, SimpleGrid, Group, Text, Title, ThemeIcon } from "@mantine/core";
import { Link } from "@remix-run/react";
import {
  IconUsers,
  IconFileText,
  IconFileInvoice,
  IconStar,
  IconReportAnalytics
} from "@tabler/icons-react";

const cards = [
  { label: "KOL 總數", value: "128" },
  { label: "進行中提案", value: "32" },
  { label: "執行中委刊單", value: "19" },
  { label: "本月平均 ROAS", value: "2.86" },
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
    icon: IconStar,
    color: "yellow",
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

export default function DashboardPage() {
  return (
    <>
      <Group justify="space-between" mb="xs">
        <Title order={2}>Dashboard</Title>
        <Text c="dimmed" size="sm">首頁 / 總覽</Text>
      </Group>

      {/* Streamlined Metrics */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mb="xl">
        {cards.map((card) => (
          <div key={card.label}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700} mb={4}>
              {card.label}
            </Text>
            <Title order={2}>{card.value}</Title>
          </div>
        ))}
      </SimpleGrid>

      {/* Functional Entry Points */}
      <Title order={4} mb="md" mt="xl">功能模組</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {modules.map((mod) => (
          <Card
            key={mod.title}
            withBorder
            padding="lg"
            radius="md"
            component="a"
            href={mod.to}
            style={{
              textDecoration: 'none',
              transition: 'transform 200ms ease, box-shadow 200ms ease',
              height: '100%',
              display: 'block'
            }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
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
        ))}
      </SimpleGrid>
    </>
  );
}
