import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Group,
  Modal,
  Progress,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  IconBulb,
  IconCheck,
  IconClockHour4,
  IconFile,
  IconFileDescription,
  IconRobot,
  IconTemplate,
  IconX,
} from "@tabler/icons-react";
import { useNotificationStore } from "~/store/notification";
import type { InsertionOrder } from "~/lib/mock-api.server";
import styles from "./DemoGenerateReportModal.module.css";

type Props = {
  /** Controls the gen-config modal visibility (parent-managed). */
  opened: boolean;
  /** Called to close the gen-config modal. */
  onClose: () => void;
  /** The order whose report is being generated; null hides modal content. */
  order: InsertionOrder | null;
  /**
   * Fired when the simulated progress reaches 100%. Parent should submit the
   * generateReport intent to its own action with whatever args its route expects
   * (IO listing passes orderId; IO detail relies on URL params).
   */
  onComplete?: () => void;
};

export function DemoGenerateReportModal({ opened, onClose, order, onComplete }: Props) {
  const { showToast, showBanner } = useNotificationStore();

  const [progressModalOpen, { open: openProgressModal, close: closeProgressModal }] = useDisclosure(false);
  const [selectedKolIds, setSelectedKolIds] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<"standard" | "simple" | "none">("standard");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Pre-select KOLs that already have performance data each time the modal
  // opens. Falls back to the demo "Gina" placeholder when the order has none.
  useEffect(() => {
    if (!opened || !order) return;
    const readyIds = (order.collaborations || [])
      .filter((k) => (k.performanceItems || []).length > 0)
      .map((k) => k.id);
    setSelectedKolIds(readyIds.length > 0 ? readyIds : ["demo-gina"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, order?.id]);

  const toggleKolSelection = (kolId: string) => {
    setSelectedKolIds((prev) =>
      prev.includes(kolId) ? prev.filter((id) => id !== kolId) : [...prev, kolId]
    );
  };

  const startGeneration = () => {
    onClose();
    openProgressModal();
    setProgressPercentage(0);
    setCurrentStepIndex(0);

    const interval = setInterval(() => {
      setProgressPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 10) + 2;
        return next > 100 ? 100 : next;
      });
    }, 400);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (progressPercentage < 20) setCurrentStepIndex(0);
    else if (progressPercentage < 45) setCurrentStepIndex(1);
    else if (progressPercentage < 70) setCurrentStepIndex(2);
    else if (progressPercentage < 90) setCurrentStepIndex(3);
    else if (progressPercentage < 100) setCurrentStepIndex(4);
    else if (progressPercentage === 100) {
      setTimeout(() => {
        if (order) {
          onComplete?.();
          const title = "結案報告已生成完成！";
          const message = `${order.orderNo} ${order.title || order.projectName}|結案報告_v1.pptx`;
          showToast(title, message, "/reports/generate");
          showBanner(title, message, "/reports/generate");
        }
        closeProgressModal();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressPercentage]);

  return (
    <>
      {/* ── Generate Report Modal ── */}
      <Modal
        opened={opened}
        onClose={onClose}
        title={<Text fw={700} size="lg">生成結案報告</Text>}
        size="xl"
      >
        {order && (
          <Stack gap="xl" mt="sm">
            {/* Section 1 - Campaign Info */}
            <Card withBorder bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))" p="sm" radius="md">
              <Group gap="xl">
                <Box>
                  <Text size="xs" c="dimmed">案件編號</Text>
                  <Text fw={600}>#{order.orderNo}</Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">案件名稱</Text>
                  <Text fw={600}>{order.title}</Text>
                </Box>
                <Box>
                  <Text size="xs" c="dimmed">客戶</Text>
                  <Text fw={600}>{order.clientName}</Text>
                </Box>
              </Group>
            </Card>

            {/* Section 2 - KOL Selection */}
            <Box>
              <Text fw={600} size="lg" mb={4}>步驟 1：確認 KOL 成效資料</Text>
              <Text size="sm" c="dimmed" mb="md">系統將自動選擇已上傳成效的 KOL</Text>

              <Stack gap="md">
                {/* 2A. Ready KOLs */}
                <Box>
                  <Text fw={500} size="sm" c="green.7" mb="xs">✅ 已上傳成效的 KOL (預設選擇)</Text>
                  <Stack gap="xs">
                    {(order.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).map((kol, idx) => (
                      <Card
                        key={kol.id || idx}
                        withBorder
                        p="sm"
                        radius="md"
                        className={`hover:shadow-sm ${styles.kolCardClickable}`}
                        onClick={() => toggleKolSelection(kol.id)}
                      >
                        <Group wrap="nowrap">
                          <Checkbox
                            checked={selectedKolIds.includes(kol.id)}
                            onChange={() => toggleKolSelection(kol.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar src={kol.avatarUrl} radius="xl" size="md" />
                          <Box className={styles.flexGrow}>
                            <Text fw={600}>{kol.name || "KOL Name"}</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="dimmed">IG貼文 <IconCheck size={12} color="green" className={styles.iconInline} /> | IG限動 <IconCheck size={12} color="green" className={styles.iconInline} /></Text>
                            </Group>
                          </Box>
                          <Box ta="right">
                            <Badge variant="dot" color="blue">總觸及 80K</Badge>
                            <Text size="xs" c="dimmed" mt={4}>互動率 7.8%</Text>
                          </Box>
                        </Group>
                      </Card>
                    ))}
                    {/* Mock empty check context */}
                    {(order.collaborations || []).filter((k) => (k.performanceItems || []).length > 0).length === 0 && (
                      <Card withBorder p="sm" radius="md" className={styles.kolCardClickable} onClick={() => toggleKolSelection("demo-gina")}>
                        <Group wrap="nowrap">
                          <Checkbox
                            checked={selectedKolIds.includes("demo-gina")}
                            onChange={() => toggleKolSelection("demo-gina")}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar color="blue" radius="xl" size="md">G</Avatar>
                          <Box className={styles.flexGrow}>
                            <Text fw={600}>Gina (Demo)</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="dimmed">IG貼文 <IconCheck size={12} color="green" className={styles.iconInline} /> | IG限動 <IconCheck size={12} color="green" className={styles.iconInline} /></Text>
                            </Group>
                          </Box>
                        </Group>
                      </Card>
                    )}
                  </Stack>
                </Box>

                {/* 2B. Not Ready KOLs */}
                <Box>
                  <Text fw={500} size="sm" c="orange.7" mb="xs">⚠️ 尚未上傳成效的 KOL</Text>
                  <Stack gap="xs">
                    {(order.collaborations || []).filter((k) => !(k.performanceItems || []).length).map((kol, idx) => (
                      <Card
                        key={kol.id || idx}
                        withBorder
                        p="sm"
                        radius="md"
                        bg="light-dark(var(--mantine-color-orange-0), rgba(253, 126, 20, 0.15))"
                        className={styles.kolCardDisabled}
                        onClick={() => toggleKolSelection(kol.id)}
                      >
                        <Group wrap="nowrap">
                          <Checkbox
                            checked={selectedKolIds.includes(kol.id)}
                            onChange={() => toggleKolSelection(kol.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Avatar src={kol.avatarUrl} radius="xl" size="md" className={styles.kolAvatarGrayscale} />
                          <Box className={styles.flexGrow}>
                            <Text fw={600} c="dimmed">{kol.name || "KOL Name"}</Text>
                            <Group gap="xs" mt={4}>
                              <Text size="xs" c="red.7"><IconX size={12} className={styles.iconInline} /> 無成效資料</Text>
                            </Group>
                          </Box>
                          <Button variant="subtle" size="xs" color="blue" rightSection="→">前往上傳成效</Button>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </Box>

                {/* Info box */}
                <Card bg="light-dark(var(--mantine-color-blue-0), rgba(51, 154, 240, 0.15))" p="sm" radius="md" mt="xs">
                  <Group wrap="nowrap" align="flex-start">
                    <ThemeIcon color="blue" variant="light" size="sm" mt={2}><IconBulb size={14} /></ThemeIcon>
                    <Text size="sm" c="blue.9" lh={1.4}>
                      未勾選的 KOL 將不會出現在報告中。建議先上傳所有 KOL 的成效資料後再生成報告。
                    </Text>
                  </Group>
                </Card>
              </Stack>
            </Box>

            <Divider />

            {/* Section 3 - Report Settings */}
            <Box>
              <Text fw={600} size="lg" mb="md">步驟 2：報告設定</Text>

              <Stack gap="lg">
                <TextInput
                  label="報告標題"
                  defaultValue={`${order.title} 結案報告`}
                  description="0/100"
                />

                <Box>
                  <Text size="sm" fw={500} mb="xs">PowerPoint 模板</Text>
                  <Group grow>
                    <Card withBorder p="sm" onClick={() => setSelectedTemplate("standard")} className={selectedTemplate === "standard" ? `${styles.templateCard} ${styles.templateCardActive}` : styles.templateCard}>
                      <Stack align="center" gap="xs">
                        <ThemeIcon size="xl" variant="light" color={selectedTemplate === "standard" ? "blue" : "gray"}><IconTemplate /></ThemeIcon>
                        <Text fw={500} size="sm" c={selectedTemplate === "standard" ? "" : "dimmed"}>公司標準模板</Text>
                      </Stack>
                    </Card>
                    <Card withBorder p="sm" onClick={() => setSelectedTemplate("simple")} className={selectedTemplate === "simple" ? `${styles.templateCard} ${styles.templateCardActive}` : styles.templateCard}>
                      <Stack align="center" gap="xs">
                        <ThemeIcon size="xl" variant="light" color={selectedTemplate === "simple" ? "blue" : "gray"}><IconTemplate /></ThemeIcon>
                        <Text fw={500} size="sm" c={selectedTemplate === "simple" ? "" : "dimmed"}>簡約模板</Text>
                      </Stack>
                    </Card>
                    <Card withBorder p="sm" onClick={() => setSelectedTemplate("none")} className={selectedTemplate === "none" ? `${styles.templateCard} ${styles.templateCardActive}` : styles.templateCard}>
                      <Stack align="center" gap="xs">
                        <ThemeIcon size="xl" variant="light" color={selectedTemplate === "none" ? "blue" : "gray"}><IconFile /></ThemeIcon>
                        <Text fw={500} size="sm" c={selectedTemplate === "none" ? "" : "dimmed"}>不套用模板</Text>
                      </Stack>
                    </Card>
                  </Group>
                </Box>

                <Card bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))" p="sm" radius="md">
                  <Group wrap="nowrap">
                    <ThemeIcon color="gray" variant="light"><IconFileDescription size={16} /></ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600}>預估頁數: 約 18 頁</Text>
                      <Text size="xs" c="dimmed">(封面 + 3個KOL × 平均5頁 + 總結)</Text>
                    </Box>
                  </Group>
                </Card>
              </Stack>
            </Box>

            <Group justify="flex-end" mt="md">
              <Button variant="ghost" color="gray" onClick={onClose}>取消</Button>
              <Tooltip label="報告將在背景生成，完成後會通知您" position="top" withArrow>
                <Button color="blue" onClick={startGeneration} leftSection={<IconRobot size={20} />}>
                  開始生成
                </Button>
              </Tooltip>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* ── Progress Modal ── */}
      <Modal
        opened={progressModalOpen}
        onClose={closeProgressModal}
        withCloseButton={false}
        size="md"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Stack align="center" ta="center" gap="md" py="md">
          <ThemeIcon size={64} radius="100%" variant="light" color="blue" className={styles.pulseIcon}>
            <IconRobot size={40} />
          </ThemeIcon>
          <Box>
            <Title order={3}>AI 正在為您生成報告</Title>
            <Text c="dimmed" mt={4}>
              案件 #{order?.orderNo} {order?.title}
            </Text>
          </Box>

          <Box w="100%" my="sm">
            <Group justify="space-between" mb={8}>
              <Text size="sm" fw={600}>進度</Text>
              <Text size="sm" fw={600} c="blue">{progressPercentage}%</Text>
            </Group>
            <Progress
              value={progressPercentage}
              size="lg"
              radius="xl"
              striped
              animated
              color="blue"
            />
          </Box>

          {/* Checklist */}
          <Stack gap="xs" w="100%" align="flex-start" pl="md">
            {[
              "收集案件資料",
              "整理 KOL 成效數據",
              "AI 生成報告內容中...",
              "套用 PowerPoint 模板",
              "上傳至雲端儲存"
            ].map((stepDesc, idx) => {
              const isCompleted = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;
              return (
                <Group key={idx} wrap="nowrap" gap="sm">
                  {isCompleted ? (
                    <ThemeIcon color="green" size={20} radius="xl" variant="filled"><IconCheck size={14} /></ThemeIcon>
                  ) : isCurrent ? (
                    <ThemeIcon color="blue" size={20} radius="xl" variant="light"><IconRobot size={14} /></ThemeIcon>
                  ) : (
                    <ThemeIcon color="gray" size={20} radius="xl" variant="light"><IconClockHour4 size={14} /></ThemeIcon>
                  )}
                  <Text size="sm" fw={isCurrent ? 600 : 400} c={isCompleted ? "dimmed" : isCurrent ? "blue.7" : "gray.5"}>
                    {stepDesc}
                  </Text>
                </Group>
              );
            })}
          </Stack>

          <Text size="xs" c="dimmed" mt="xs">預計還需 2 分鐘</Text>

          <Card bg="light-dark(var(--mantine-color-blue-0), rgba(51, 154, 240, 0.15))" w="100%" p="sm" radius="md">
            <Group wrap="nowrap" align="center" justify="center">
              <IconBulb size={18} color="var(--mantine-color-blue-7)" />
              <Text size="sm" c="blue.9">您可以關閉此視窗繼續其他工作，完成後會通知您</Text>
            </Group>
          </Card>

          <Group w="100%" grow mt="sm">
            <Button variant="outline" color="red" onClick={closeProgressModal}>取消生成</Button>
            <Button onClick={closeProgressModal}>在背景繼續</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
