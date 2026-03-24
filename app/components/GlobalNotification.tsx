import { Affix, Transition, Card, Group, ActionIcon, Title, Text, Button, Progress, ThemeIcon, Box } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNotificationStore } from '~/store/notification';
import { useNavigate, useLocation } from '@remix-run/react';

export function GlobalNotification() {
  const { toast, hideToast, banner, hideBanner } = useNotificationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(100);

  // Auto-dismiss toast logic
  useEffect(() => {
    if (toast?.isOpen) {
      setProgress(100);
      const startTime = Date.now();
      const duration = 10000; // 10 seconds

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining === 0) {
          hideToast();
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [toast?.isOpen, hideToast]);

  return (
    <>
      {/* ── In-App Banner ── */}
      {banner?.isOpen && location.pathname !== '/reports/generate' && (
        <Box 
          bg="green.6" 
          c="white" 
          p="sm" 
          style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}
        >
          <Group justify="center" align="center" style={{ position: 'relative' }}>
            <Group gap="xs">
              <ThemeIcon color="white" variant="transparent" size="sm">
                <IconCheck size={18} />
              </ThemeIcon>
              <Text fw={600} size="sm">{banner.message}</Text>
            </Group>
            
            <Button 
              component="a" 
              href={banner.actionLink || "/reports/generate"} 
              variant="transparent" 
              color="white" 
              size="sm" 
              pl="xs"
              style={{ textDecoration: 'underline' }}
            >
              查看並下載 →
            </Button>
            
            <ActionIcon 
              onClick={hideBanner} 
              variant="transparent" 
              color="white" 
              style={{ position: 'absolute', right: 16 }}
            >
              <IconX size={16} />
            </ActionIcon>
          </Group>
        </Box>
      )}

      {/* ── Toast Notification ── */}
      <Affix position={{ top: 20, right: 20 }} zIndex={2000}>
        <Transition transition="slide-left" duration={300} mounted={!!toast?.isOpen}>
          {(transitionStyles) => (
            <Card 
              withBorder 
              shadow="xl" 
              radius="md" 
              p={0}
              style={{ ...transitionStyles, width: 400, overflow: 'hidden' }}
            >
              <Box p="md">
                <Group wrap="nowrap" align="flex-start" justify="space-between">
                  <Group wrap="nowrap" align="flex-start" gap="sm">
                    <Box style={{ fontSize: 32, lineHeight: 1 }}>🎉</Box>
                    <Box>
                      <Title order={5} mb={4}>{toast?.title}</Title>
                      <Text size="sm" c="dimmed" mb={2}>案件: {toast?.message.split('|')[0]}</Text>
                      <Text size="sm" c="dimmed">檔案: {toast?.message.split('|')[1] || "結案報告_v1.pptx"}</Text>
                      
                      <Group mt="md" gap="sm">
                        <Button 
                          size="xs" 
                          color="blue" 
                          onClick={() => {
                            alert("報告下載中...");
                            hideToast();
                          }}
                        >
                          立即下載
                        </Button>
                        <Button 
                          size="xs" 
                          variant="light" 
                          color="gray"
                          onClick={() => {
                            if (toast?.actionLink) navigate(toast.actionLink);
                            hideToast();
                          }}
                        >
                          稍後查看
                        </Button>
                      </Group>
                    </Box>
                  </Group>
                  <ActionIcon variant="subtle" color="gray" onClick={hideToast}>
                    <IconX size={16} />
                  </ActionIcon>
                </Group>
              </Box>
              <Progress value={progress} size="xs" color="blue" radius={0} />
            </Card>
          )}
        </Transition>
      </Affix>
    </>
  );
}
