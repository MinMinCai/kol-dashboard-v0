import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { listInsertionOrders } from "~/lib/mock-api";

function formatShortDate(date: string): string {
  return date.slice(0, 7);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const clientFilter = url.searchParams.get("client") ?? "";
  const timeFilter = url.searchParams.get("time") ?? "all";

  const orders = await listInsertionOrders();
  const allClients = Array.from(new Set(orders.map((o) => o.clientName)));

  const filtered = orders.filter((order) => {
    if (clientFilter && order.clientName !== clientFilter) return false;
    if (timeFilter === "this_year" && !order.startDate.startsWith("2026")) return false;
    if (timeFilter === "2024_10" && !order.startDate.startsWith("2024-10")) return false;
    return true;
  });

  return json({ orders: filtered, allClients, clientFilter, timeFilter });
}

export default function ReportManagementPage() {
  const { orders, allClients, clientFilter, timeFilter } = useLoaderData<typeof loader>();

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Title order={2}>結案報告管理</Title>
        {orders[0] && (
          <Button
            className="btn-trigger-gen"
            {...({ 'data-order-name': orders[0].title || orders[0].projectName } as any)}
          >
            + 生成新報告
          </Button>
        )}
      </Group>

      {/* ── Filter Form ── */}
      <Card withBorder p="sm">
        <form method="get">
          <Group align="end" wrap="wrap" gap="sm">
            <Stack gap={4}>
              <Text size="sm" fw={500}>客戶</Text>
              <select name="client" defaultValue={clientFilter} style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }}>
                <option value="">全部</option>
                {allClients.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Stack>
            <Stack gap={4}>
              <Text size="sm" fw={500}>時間範圍</Text>
              <select name="time" defaultValue={timeFilter} style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }}>
                <option value="all">全部</option>
                <option value="this_year">2026 年</option>
                <option value="2024_10">2024-10</option>
              </select>
            </Stack>
            <Button type="submit">套用篩選</Button>
            {(clientFilter || timeFilter !== "all") && (
              <Button variant="default" component="a" href="/reports/generate">清除</Button>
            )}
          </Group>
        </form>
      </Card>

      {/* ── Order Cards ── */}
      <Stack gap="md">
        {orders.map((order) => {
          const missingCount = (order.collaborations ?? []).filter(
            (k) => !(k.performanceItems ?? []).some((p) => (p.metrics?.impressions ?? 0) > 0)
          ).length;

          return (
            <Card key={order.id} withBorder shadow="sm">
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <Box>
                    <Text fw={700}>📋 #{order.orderNo} {order.title ?? order.projectName ?? "未命名案件"}</Text>
                    <Text c="dimmed" size="sm">
                      客戶: {order.clientName} | 日期: {formatShortDate(order.startDate)} | 合作 KOL: {order.kolCount ?? order.collaborations?.length ?? 0} 位
                    </Text>
                  </Box>
                  <Group>
                    <Link to={`/insertion-orders/${order.id}`} style={{ fontSize: 14 }}>查看案件詳情</Link>
                    <Button
                      size="xs"
                      className="btn-trigger-gen"
                      {...({ 'data-order-name': order.title || order.projectName } as any)}
                    >
                      + 生成新報告
                    </Button>
                  </Group>
                </Group>

                {missingCount > 0 && (
                  <Badge color="yellow" variant="light">⚠️ {missingCount} 位 KOL 尚未上傳成效</Badge>
                )}

                <Group justify="flex-end">
                  <Button
                    variant="default"
                    size="sm"
                    className="btn-trigger-upload"
                    {...({ 'data-order-name': order.title || order.projectName } as any)}
                  >
                    + 上傳正式版
                  </Button>
                </Group>
              </Stack>
            </Card>
          );
        })}
      </Stack>

      {/* ── Native Dialogs ── */}
      <dialog id="report-generate-dialog" style={{ padding: 24, borderRadius: 8, border: '1px solid var(--mantine-color-default-border)', background: 'var(--mantine-color-body)', color: 'var(--mantine-color-text)', width: '100%', maxWidth: 640, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <Stack gap="md">
          <Title order={4}>生成結案報告 - <span className="order-name-placeholder">案件</span></Title>

          <div id="gen-form-ui">
            <TextInput label="報告標題" placeholder="OOO 專案結案報告" id="gen-report-title" />
            <Text size="sm" mt="sm">點擊按鈕開始 AI 分析與生成過程。</Text>
            <Group justify="flex-end" mt="md">
              <Button variant="default" className="btn-close-report-gen">取消</Button>
              <Button id="start-gen-btn" color="blue">🤖 開始 AI 生成</Button>
            </Group>
          </div>

          <div id="gen-progress-ui" style={{ display: 'none', padding: '20px 0' }}>
            <Text id="gen-status-text" ta="center" fw={700} mb="xs">正在初始化...</Text>
            <div style={{ width: '100%', height: 10, background: '#eee', borderRadius: 5, overflow: 'hidden', marginBottom: 20 }}>
              <div id="gen-progress-bar" style={{ width: '0%', height: '100%', background: '#339af0', transition: 'width 0.3s' }}></div>
            </div>
            <Text size="xs" c="dimmed" ta="center">AI 正在進行內容深潛與數據交叉分析...</Text>
          </div>

          <div id="gen-success-ui" style={{ display: 'none', textAlign: 'center', padding: '20px 0' }}>
            <Box style={{ fontSize: 40 }}>🎉</Box>
            <Title order={3}>報告生成成功！</Title>
            <Text mb="lg">您的 AI 數據洞察結案報告已備妥。</Text>
            <Group grow w="100%">
              <Button variant="default" className="btn-close-report-gen">關閉</Button>
              <Button id="download-ppt-btn" color="green">📥 下載 PowerPoint</Button>
            </Group>
          </div>
        </Stack>
      </dialog>

      <dialog id="report-upload-dialog" style={{ padding: 24, borderRadius: 8, border: '1px solid var(--mantine-color-default-border)', background: 'var(--mantine-color-body)', color: 'var(--mantine-color-text)', width: '100%', maxWidth: 480, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <Stack gap="md">
          <Title order={4}>上傳正式結案報告</Title>
          <Text size="sm" c="dimmed">案件: <span className="order-name-placeholder">案件</span></Text>
          <TextInput type="file" label="選擇檔案 (.pptx, .pdf)" />
          <TextInput label="版本說明 (選填)" placeholder="例如: 已根據客戶回饋修正..." />
          <Group justify="flex-end">
            <Button variant="default" className="btn-close-report-upload">取消</Button>
            <Button id="confirm-upload-btn" color="blue">確認上傳</Button>
          </Group>
        </Stack>
      </dialog>

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  function bindDialogTriggers() {
    var genBtns = document.querySelectorAll('.btn-trigger-gen');
    var uploadBtns = document.querySelectorAll('.btn-trigger-upload');
    var genDialog = document.getElementById('report-generate-dialog');
    var uploadDialog = document.getElementById('report-upload-dialog');

    function bind(btns, dialog) {
      if (!dialog) return;
      btns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var name = btn.getAttribute('data-order-name');
          dialog.querySelectorAll('.order-name-placeholder').forEach(function(p) { p.textContent = name; });
          dialog.showModal();
          
          if (dialog.id === 'report-generate-dialog') {
            document.getElementById('gen-form-ui').style.display = 'block';
            document.getElementById('gen-progress-ui').style.display = 'none';
            document.getElementById('gen-success-ui').style.display = 'none';
          }
        });
      });
    }

    bind(genBtns, genDialog);
    bind(uploadBtns, uploadDialog);

    // Bind close actions
    document.querySelectorAll('.btn-close-report-gen').forEach(function(btn) {
      btn.addEventListener('click', function() { if (genDialog) genDialog.close(); });
    });
    document.querySelectorAll('.btn-close-report-upload').forEach(function(btn) {
      btn.addEventListener('click', function() { if (uploadDialog) uploadDialog.close(); });
    });

    var downloadBtn = document.getElementById('download-ppt-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        alert('報告下載中...');
        if (genDialog) genDialog.close();
      });
    }

    var confirmUploadBtn = document.getElementById('confirm-upload-btn');
    if (confirmUploadBtn) {
      confirmUploadBtn.addEventListener('click', function() {
        alert('已成功上傳正式版報告！');
        if (uploadDialog) uploadDialog.close();
      });
    }
  }

  bindDialogTriggers();

  // Filter Enter Trigger
  document.querySelectorAll('select[name="client"], select[name="time"]').forEach(function(el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.closest('form').submit();
      }
    });
  });

  var startGenBtn = document.getElementById('start-gen-btn');
  if (startGenBtn) {
    startGenBtn.addEventListener('click', function() {
      document.getElementById('gen-form-ui').style.display = 'none';
      document.getElementById('gen-progress-ui').style.display = 'block';
      
      var steps = [
        { p: 20, t: '🔍 正在彙整所有 KOL 的成效數據...' },
        { p: 45, t: '🧠 AI 正在分析各版位表現並產出洞察...' },
        { p: 75, t: '✍️ 正在自動撰寫執行摘要與建議評語...' },
        { p: 90, t: '🎨 正在套用標準模板並輸出 PowerPoint...' },
        { p: 100, t: '✅ 報告已生成完畢！' }
      ];
      
      var currentStep = 0;
      var progressBar = document.getElementById('gen-progress-bar');
      var statusText = document.getElementById('gen-status-text');
      
      var interval = setInterval(function() {
        if (currentStep < steps.length) {
          if (progressBar) progressBar.style.width = steps[currentStep].p + '%';
          if (statusText) statusText.textContent = steps[currentStep].t;
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(function() {
            document.getElementById('gen-progress-ui').style.display = 'none';
            document.getElementById('gen-success-ui').style.display = 'block';
          }, 500);
        }
      }, 1000);
    });
  }
})();
          `,
        }}
      />
    </Stack>
  );
}
