import { Badge, Card, Grid, Group, Paper, Stack, Text, Title, ThemeIcon } from "@mantine/core";
import { type HeadersFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { desc, sql } from "drizzle-orm";
import {
  IconUsers,
  IconFileText,
  IconFileInvoice,
  IconHeart,
  IconReportAnalytics,
} from "@tabler/icons-react";
import { db } from "~/lib/db.server";
import { insertionOrders, kolActivityLog, kols, proposals } from "../../db/drizzle/schema";
import styles from "./_app.dashboard.module.css";

export const headers: HeadersFunction = () => ({
  "Cache-Control": "no-store",
});

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`timeout after ${timeoutMs}ms`)), timeoutMs)),
  ]);
}

export async function loader(_: LoaderFunctionArgs) {
  try {
    const [
      [{ count: kolCount }],
      [{ count: activeProposalCount }],
      [{ count: insertionOrderCount }],
      recentKols,
    ] = await withTimeout(Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(kols),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(proposals)
        .where(sql`${proposals.stage} not in ('approved', 'rejected')`),
      db.select({ count: sql<number>`count(*)::int` }).from(insertionOrders),
      db
        .select({
          id: kolActivityLog.id,
          kolId: kolActivityLog.kolId,
          kolName: kolActivityLog.kolName,
          action: kolActivityLog.action,
          createdAt: kolActivityLog.createdAt,
        })
        .from(kolActivityLog)
        .orderBy(desc(kolActivityLog.createdAt))
        .limit(5),
    ]), 8000);

    const actionLabel: Record<string, string> = { create: "新增", update: "修正", delete: "刪除" };

    return {
      stats: [
        { label: "KOL 總數", value: String(kolCount ?? 0) },
        { label: "進行中提案", value: String(activeProposalCount ?? 0) },
        { label: "執行中委刊單​", value: String(insertionOrderCount ?? 0) },
      ],
      recentKols: recentKols.map((k) => ({
        id: k.kolId,
        displayName: k.kolName,
        action: actionLabel[k.action] ?? k.action,
        updatedAt: k.createdAt,
      })),
      dbError: null as string | null,
    };
  } catch (err) {
    console.error("[dashboard loader]", err);
    return {
      stats: [
        { label: "KOL 總數", value: "-" },
        { label: "進行中提案", value: "-" },
        { label: "執行中委刊單​", value: "-" },
      ],
      recentKols: [],
      dbError: err instanceof Error ? err.message : String(err),
    };
  }
}

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
    title: "執行案件管理",
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
      padding="md"
      radius="md"
      component="a"
      href={mod.to}
      h="100%"
      mih={130}
      className={styles.moduleCard}
    >
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon size={52} radius="md" color={mod.color} variant="light">
          <mod.icon size={28} stroke={1.5} />
        </ThemeIcon>
        <div>
          <Text fw={600} size="lg" mb={5}>
            {mod.title}
          </Text>
          <Text size="sm" c="dimmed" lh={1.45}>
            {mod.description}
          </Text>
        </div>
      </Group>
    </Card>
  );
}

export default function DashboardPage() {
  const { stats, recentKols, dbError } = useLoaderData<typeof loader>();

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
        <Title order={2}>Dashboard</Title>
        <Text c="dimmed" size="sm">
          首頁 / 總覽
        </Text>
      </Group>

      {dbError && (
        <Text c="red" size="sm">⚠ 統計資料暫時無法顯示，請稍後再試或檢查資料庫連線狀態。</Text>
      )}

      <Grid gutter="md">
        {stats.map((s: { label: string; value: string }) => (
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
        <Title order={4}>近期活動</Title>
        <Paper withBorder radius="md" shadow="xs">
          {recentKols.length === 0 ? (
            <Text size="sm" c="dimmed" p="md">尚無操作紀錄</Text>
          ) : (
            <Stack gap={0}>
              {recentKols.map((item, i) => (
                <Group
                  key={item.id}
                  justify="space-between"
                  px="md"
                  py="sm"
                  className={i < recentKols.length - 1 ? styles.activityRow : undefined}
                >
                  <Group gap="sm">
                    <Badge
                      size="sm"
                      variant="light"
                      color={item.action === "新增" ? "teal" : item.action === "刪除" ? "red" : "blue"}
                    >
                      {item.action}
                    </Badge>
                    {item.id ? (
                      <Text size="sm" fw={500} component="a" href={`/kols/${item.id}`} className={styles.activityLink}>
                        {item.displayName}
                      </Text>
                    ) : (
                      <Text size="sm" fw={500} c="dimmed">{item.displayName}</Text>
                    )}
                  </Group>
                  <Text size="xs" c="dimmed">
                    {new Date(item.updatedAt).toLocaleString("zh-TW", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Group>
              ))}
            </Stack>
          )}
        </Paper>
      </Stack>

      <Stack gap="md">
        <Title order={4}>功能模組</Title>
        <Grid gutter="md">
          {modules.map((mod, i) => (
            <Grid.Col
              key={mod.title}
              span={{ base: 12, md: 6 }}
            >
              <ModuleCard mod={mod} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
