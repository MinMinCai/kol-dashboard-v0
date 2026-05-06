import { AppShell, Avatar, Badge, Button, Center, Group, Menu, Stack, Text, Title } from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, Outlet, useLoaderData, useLocation, useRouteError } from "@remix-run/react";
import { useEffect, useState } from "react";
import { GlobalNotification } from "~/components/GlobalNotification";
import { DEMO_USER, demoAuthCookie } from "~/lib/demo-auth.server";
import { listMembersWithCurrent } from "~/lib/demo-identity.server";
import styles from "./_app.module.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/proposals", label: "提案管理", icon: "📋" },
  { to: "/kols", label: "KOL 管理", icon: "👥" },
  { to: "/insertion-orders", label: "委刊單管理", icon: "📝" },
  { to: "/favorites", label: "我的收藏", icon: "❤️" },
  { to: "/reports/generate", label: "結案報告產生", icon: "📈" },
];

function navLinkClassName(active: boolean): string {
  return active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
}

export default function AppLayoutRoute() {
  const location = useLocation();
  const { currentUserName, currentUserRole, viewAs, teamMembers } = useLoaderData<typeof loader>();
  const roleLabel =
    currentUserRole === "admin"
      ? "Admin"
      : currentUserRole === "manager"
        ? "Manager"
        : "Member";
  const nameInitial = currentUserName?.slice(0, 1) ?? "?";
  const viewAsName = viewAs?.name ?? "未指定";
  const viewAsInitial = viewAsName.slice(0, 1);
  const currentPath = location.pathname + location.search;

  return (
    <>
      <GlobalNotification />
      <AppShell
        header={{ height: 64 }}
        navbar={{ width: 260, breakpoint: "sm" }}
        padding="md"
      >
      <AppShell.Header>
        <style dangerouslySetInnerHTML={{
          __html: `
          body.sidebar-collapsed {
            --app-shell-navbar-offset: 0px !important;
            --app-shell-navbar-width: 0px !important;
          }
          /* Mantine AppShell attribute/class names can vary by version/build.
             Target the common ones to ensure true collapse (no overlay text/icons). */
          body.sidebar-collapsed [data-app-shell-navbar],
          body.sidebar-collapsed [data-mantine-appshell-navbar],
          body.sidebar-collapsed .mantine-AppShell-navbar {
            display: none !important;
          }
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar {
            white-space: nowrap;
            overflow-x: hidden;
            overflow-y: auto;
          }
          body.sidebar-collapsed [data-app-shell-main],
          body.sidebar-collapsed [data-mantine-appshell-main],
          body.sidebar-collapsed .mantine-AppShell-main {
            margin-left: 0 !important;
          }
          body.sidebar-collapsed [data-app-shell-main] *,
          body.sidebar-collapsed [data-mantine-appshell-main] *,
          body.sidebar-collapsed .mantine-AppShell-main * {
            pointer-events: auto;
          }
          /* Ensure smooth transition */
          [data-app-shell-navbar],
          [data-mantine-appshell-navbar],
          .mantine-AppShell-navbar,
          [data-app-shell-main],
          [data-mantine-appshell-main],
          .mantine-AppShell-main {
            transition: transform 200ms ease, padding 200ms ease, margin 200ms ease, width 200ms ease, opacity 200ms ease !important;
          }
          body.sidebar-collapsed .nav-label {
            display: none !important;
          }
        `}} />
        <Group justify="space-between" align="center" h="100%" px="md">
          <Group gap="sm">
            <button
              id="kol-sidebar-toggle-btn"
              type="button"
              onClick={() => document.body.classList.toggle('sidebar-collapsed')}
              className={styles.sidebarToggle}
            >
              ☰
            </button>
            <Stack gap={0}>
              <Title order={4}>KOL DB</Title>
              <Text size="xs" c="dimmed">統一管理 KOL / 提案 / 委刊單</Text>
            </Stack>
          </Group>

          {/* View-as switcher — lets the demo user simulate different team
              members for ownership/sharing of favorite folders. */}
          <Group gap={6} align="center">
            <Menu shadow="md" width={240} position="bottom-end">
              <Menu.Target>
                <button
                  type="button"
                  title="切換目前檢視身分"
                  className={styles.viewAsButton}
                  disabled={teamMembers.length === 0}
                >
                  <Avatar size={20} radius="xl" color="grape">{viewAsInitial}</Avatar>
                  <span className={styles.viewAsLabel}>
                    以
                    <strong className={styles.viewAsName}>{viewAsName}</strong>
                    身分檢視
                  </span>
                  <span aria-hidden className={styles.dropdownArrow}>▾</span>
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>切換目前檢視身分</Menu.Label>
                {teamMembers.length === 0 ? (
                  <Menu.Item disabled>請先在 系統設定 &gt; 團隊成員 新增成員</Menu.Item>
                ) : (
                  teamMembers.map((m) => (
                    <form key={m.id} method="post" action="/api/view-as" className={styles.menuForm}>
                      <input type="hidden" name="memberId" value={m.id} />
                      <input type="hidden" name="redirectTo" value={currentPath} />
                      <Menu.Item
                        component="button"
                        type="submit"
                        rightSection={viewAs?.id === m.id ? <Text size="xs" c="blue">目前</Text> : null}
                      >
                        <Group gap={6} wrap="nowrap">
                          <Avatar size={20} radius="xl" color={m.role === "admin" ? "blue" : "gray"}>
                            {m.name.slice(0, 1)}
                          </Avatar>
                          <Stack gap={0}>
                            <Text size="sm" fw={500}>{m.name}</Text>
                            <Text size="xs" c="dimmed">{m.group}</Text>
                          </Stack>
                        </Group>
                      </Menu.Item>
                    </form>
                  ))
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>

          {/*
            Theme toggle implemented WITHOUT React event handlers.
            A plain <button> + an inline <script> directly attaches a native DOM event listener.
            This bypasses React's event delegation entirely, so it works even when
            child-route hydration fails (which is the root cause on non-dashboard pages).
          */}
          <button
            id="kol-theme-toggle-btn"
            type="button"
            suppressHydrationWarning
            onClick={() => {
              const STORAGE_KEY = 'mantine-color-scheme-value';
              const getTheme = () => {
                try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; }
              };
              const theme = getTheme() === 'dark' ? 'light' : 'dark';
              document.documentElement.setAttribute('data-mantine-color-scheme', theme);
              try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
              const icon = document.getElementById('kol-theme-icon');
              const label = document.getElementById('kol-theme-label');
              if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
              if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
            }}
            className={styles.themeToggle}
          >
            <span id="kol-theme-icon">🌙</span>
            <span id="kol-theme-label">Dark</span>
          </button>

          {/* Inline script: runs immediately, binds native click listener directly on the element.
              Reads/writes the same localStorage key and html attribute that Mantine uses. */}
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
(function() {
  var STORAGE_KEY = 'mantine-color-scheme-value';
  var btn = document.getElementById('kol-theme-toggle-btn');
  var icon = document.getElementById('kol-theme-icon');
  var label = document.getElementById('kol-theme-label');

  function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-mantine-color-scheme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }

  // Apply saved theme on load
  applyTheme(getTheme());
})();
              `,
            }}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm" className={styles.navbar}>
        <Stack gap="xs" flex={1}>
          {navItems.map((item) => {
            const active =
              location.pathname === item.to ||
              location.pathname.startsWith(`${item.to}/`);
            return (
              <a key={item.to} href={item.to} className={navLinkClassName(active)}>
                <span className={`nav-icon ${styles.navIcon}`}>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </Stack>

        <div className={styles.bottomSection}>
          <div className={styles.userInfoBlock}>
            <Group gap="sm" wrap="nowrap">
              <Avatar size={24} radius="xl" color="blue" className={styles.userAvatar}>
                {nameInitial}
              </Avatar>
              <Group gap={6} wrap="nowrap" miw={0} align="center">
                <Text size="sm" fw={600} className="nav-label" lh={1.2}>
                  {currentUserName}
                </Text>
                <Badge size="xs" variant="light" color="gray" className="nav-label">
                  {roleLabel}
                </Badge>
              </Group>
            </Group>
          </div>
          <a href="/settings" className={styles.bottomNavLink}>
            <span className={`nav-icon ${styles.bottomNavIcon}`}>⚙️</span>
            <span className="nav-label">系統設定</span>
          </a>
          <a href="/login" className={styles.logoutLink}>
            <span className={`nav-icon ${styles.bottomNavIcon}`}>🚪</span>
            <span className="nav-label">登出（回登入頁）</span>
          </a>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const demoSession = await demoAuthCookie.parse(request.headers.get("Cookie"));
  const { current, members } = await listMembersWithCurrent(request).catch(() => ({
    current: null,
    members: [] as Awaited<ReturnType<typeof listMembersWithCurrent>>["members"],
  }));
  return json({
    currentUserName: demoSession?.name ?? DEMO_USER.name,
    currentUserRole: demoSession?.role ?? DEMO_USER.role,
    viewAs: current ? { id: current.id, name: current.name, role: current.role, group: current.group } : null,
    teamMembers: members.map((m) => ({ id: m.id, name: m.name, role: m.role, group: m.group })),
  });
}

export function ErrorBoundary() {
  const error = useRouteError();
  const [countdown, setCountdown] = useState(15);

  let status = 500;
  let title = "系統發生錯誤";
  let message = "抱歉，系統遇到了一些問題，請稍後再試。";
  let errorDetail: string | undefined;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 404) {
      title = "找不到頁面";
      message = "您正在尋找的頁面不存在。它可能已被移除、重新命名或暫時無法使用。";
    }
    errorDetail = `${error.status} ${error.statusText}${typeof error.data === "string" ? `: ${error.data}` : ""}`;
  } else if (error instanceof Error) {
    errorDetail = `${error.name}: ${error.message}\n${error.stack ?? ""}`;
  }

  useEffect(() => {
    if (errorDetail) {
      console.error(`[ErrorBoundary] ${errorDetail}`);
    }
  }, [errorDetail]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(tick);
          window.location.replace("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  return (
    <Center h="100vh">
      <Stack align="center" gap="md">
        <Title className={styles.errorStatus}>{status}</Title>
        <Title order={2}>{title}</Title>
        <Text c="dimmed" size="lg" ta="center" maw={500}>
          {message}
        </Text>
        <Text c="blue" size="sm" ta="center" mt="xs">
          系統將於 {countdown} 秒後自動為您導向至首頁...
        </Text>
        <Button component="a" href="/dashboard" mt="xl" size="lg" variant="light">
          立即返回首頁
        </Button>
      </Stack>
    </Center>
  );
}





