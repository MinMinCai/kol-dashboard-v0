import { AppShell, Avatar, Badge, Button, Center, Group, Menu, Stack, Text, Title } from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { isRouteErrorResponse, Outlet, useLoaderData, useLocation, useRouteError } from "@remix-run/react";
import { useEffect, useState } from "react";
import { GlobalNotification } from "~/components/GlobalNotification";
import { DEMO_USER, demoAuthCookie } from "~/lib/demo-auth.server";
import { listMembersWithCurrent } from "~/lib/demo-identity.server";
import styles from "./_app.module.css";

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="6" height="6" rx="1"/>
    <rect x="9" y="1" width="6" height="6" rx="1"/>
    <rect x="1" y="9" width="6" height="6" rx="1"/>
    <rect x="9" y="9" width="6" height="6" rx="1"/>
  </svg>
);
const IconProposals = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="1" width="12" height="14" rx="1.5"/>
    <line x1="5" y1="5" x2="11" y2="5"/>
    <line x1="5" y1="8" x2="11" y2="8"/>
    <line x1="5" y1="11" x2="8" y2="11"/>
  </svg>
);
const IconKols = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="5" r="2.5"/>
    <path d="M1 14c0-3 2.2-5 5-5s5 2 5 5"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 10c1.8.2 3 1.5 3 4"/>
  </svg>
);
const IconOrders = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h12l-1.5 7H3.5L2 3z"/>
    <circle cx="5.5" cy="13" r="1"/>
    <circle cx="11.5" cy="13" r="1"/>
    <line x1="1" y1="1" x2="3" y2="1"/>
  </svg>
);
const IconFavorites = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5a3 3 0 0 1 6-0.5 3 3 0 0 1 6 0.5c0 4-6.5 8-6.5 8z"/>
  </svg>
);
const IconReports = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,12 5,7 8,10 11,5 15,8"/>
    <line x1="1" y1="14" x2="15" y2="14"/>
  </svg>
);
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="2.5"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>
  </svg>
);
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>
    <polyline points="11,11 14,8 11,5"/>
    <line x1="14" y1="8" x2="6" y2="8"/>
  </svg>
);
const IconSun = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="3"/>
    <line x1="8" y1="1" x2="8" y2="3"/>
    <line x1="8" y1="13" x2="8" y2="15"/>
    <line x1="1" y1="8" x2="3" y2="8"/>
    <line x1="13" y1="8" x2="15" y2="8"/>
    <line x1="3.05" y1="3.05" x2="4.46" y2="4.46"/>
    <line x1="11.54" y1="11.54" x2="12.95" y2="12.95"/>
    <line x1="3.05" y1="12.95" x2="4.46" y2="11.54"/>
    <line x1="11.54" y1="4.46" x2="12.95" y2="3.05"/>
  </svg>
);
const IconMoon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z"/>
  </svg>
);
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#3b82f6"/>
    <path d="M16 6L6 11l10 5.5L26 11 16 6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21l10 5.5L26 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 16l10 5.5L26 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const navItems = [
  { to: "/dashboard", label: "Dashboard", Icon: IconDashboard },
  { to: "/proposals", label: "提案管理", Icon: IconProposals },
  { to: "/kols", label: "KOL 管理", Icon: IconKols },
  { to: "/insertion-orders", label: "委刊單管理", Icon: IconOrders },
  { to: "/favorites", label: "我的收藏", Icon: IconFavorites },
  { to: "/reports/generate", label: "結案報告產生", Icon: IconReports },
];

function navLinkClassName(active: boolean): string {
  return active ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
}

export default function AppLayoutRoute() {
  const location = useLocation();
  const { currentUserName, currentUserRole, viewAs, teamMembers } = useLoaderData<typeof loader>();
  const displayName = viewAs?.name ?? currentUserName;
  const displayRole = viewAs?.role ?? currentUserRole;
  const roleLabel =
    displayRole === "admin"
      ? "Admin"
      : displayRole === "manager"
        ? "Manager"
        : "Member";
  const nameInitial = displayName?.slice(0, 1) ?? "?";
  const viewAsName = viewAs?.name ?? "未指定";
  const viewAsInitial = viewAsName.slice(0, 1);
  const currentPath = location.pathname + location.search;

  return (
    <>
      <GlobalNotification />
      <AppShell
        layout="alt"
        header={{ height: 54 }}
        navbar={{ width: 260, breakpoint: "sm" }}
        padding="xl"
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
          body.sidebar-collapsed [data-app-shell-main],
          body.sidebar-collapsed [data-mantine-appshell-main],
          body.sidebar-collapsed .mantine-AppShell-main {
            padding-left: 48px !important;
            padding-right: 48px !important;
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
        <Group justify="space-between" align="center" h="100%" px="xl">
          <button
            id="kol-sidebar-toggle-btn"
            type="button"
            onClick={() => document.body.classList.toggle('sidebar-collapsed')}
            className={styles.sidebarToggle}
          >
            ☰
          </button>

          <Group gap="md" align="center" ml="auto">
            {/* Greeting with fade-in animation */}
            <span className={styles.greeting} key={displayName}>
              Hi, {displayName}
            </span>

            {/* Theme toggle switch */}
            <button
              id="kol-theme-toggle-btn"
              type="button"
              suppressHydrationWarning
              onClick={() => {
                const STORAGE_KEY = 'mantine-color-scheme-value';
                const getTheme = () => { try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; } };
                const theme = getTheme() === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-mantine-color-scheme', theme);
                try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
                const btn = document.getElementById('kol-theme-toggle-btn');
                if (btn) btn.setAttribute('data-theme', theme);
              }}
              className={styles.themeToggleSwitch}
              data-theme="light"
              aria-label="切換亮暗模式"
            >
              <span className={styles.themeToggleTrack}>
                <span className={styles.themeToggleThumb}>
                  <span id="kol-theme-icon" className={styles.themeToggleIcon}><IconMoon /></span>
                </span>
              </span>
            </button>
          </Group>
        </Group>

        {/* Inline script: runs immediately, restores saved theme and syncs toggle state */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var STORAGE_KEY = 'mantine-color-scheme-value';
  function getTheme() { try { return localStorage.getItem(STORAGE_KEY) || 'light'; } catch(e) { return 'light'; } }
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-mantine-color-scheme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
    var btn = document.getElementById('kol-theme-toggle-btn');
    if (btn) btn.setAttribute('data-theme', theme);
    var iconEl = document.getElementById('kol-theme-icon');
    if (iconEl) {
      var sunPath = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/><line x1="3.05" y1="3.05" x2="4.46" y2="4.46"/><line x1="11.54" y1="11.54" x2="12.95" y2="12.95"/><line x1="3.05" y1="12.95" x2="4.46" y2="11.54"/><line x1="11.54" y1="4.46" x2="12.95" y2="3.05"/></svg>';
      var moonPath = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z"/></svg>';
      iconEl.innerHTML = theme === 'dark' ? sunPath : moonPath;
    }
  }
  applyTheme(getTheme());
})();
            `,
          }}
        />
      </AppShell.Header>

      <AppShell.Navbar p="sm" className={styles.navbar} style={{ backgroundColor: 'var(--kol-sidebar-bg)' }}>
        <div className={styles.brandBlock}>
          <div className={styles.brandLogo}>
            <LogoIcon />
          </div>
          <div className={`${styles.brandText} nav-label`}>
            <Text fw={700} size="md" lh={1.2} style={{ color: 'rgba(255,255,255,0.95)' }}>KOL DB</Text>
            <Text size="xs" lh={1.4} style={{ color: 'rgba(255,255,255,0.5)' }}>統一管理 KOL / 提案 / 委刊單</Text>
          </div>
        </div>
        <Stack gap="xs" flex={1}>
          {navItems.map(({ to, label, Icon }) => {
            const active =
              location.pathname === to ||
              location.pathname.startsWith(`${to}/`);
            return (
              <a key={to} href={to} className={navLinkClassName(active)}>
                <span className={`nav-icon ${styles.navIcon}`}><Icon /></span>
                <span className="nav-label">{label}</span>
              </a>
            );
          })}
        </Stack>

        <div className={styles.bottomSection}>
          <div className={`${styles.viewAsInSidebar} nav-label`}>
            <Menu shadow="md" width={220} position="top-start">
              <Menu.Target>
                <button
                  type="button"
                  title="切換目前檢視身分"
                  className={styles.viewAsSidebarBtn}
                  disabled={teamMembers.length === 0}
                >
                  <Avatar size={18} radius="xl" color="grape">{viewAsInitial}</Avatar>
                  <span className={styles.viewAsLabel}>
                    以 <strong className={styles.viewAsName}>{viewAsName}</strong> 身分檢視
                  </span>
                  <Badge size="xs" variant="light" color="gray" style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.7 }}>{roleLabel}</Badge>
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
          </div>
          <a href="/settings" className={styles.bottomNavLink}>
            <span className={`nav-icon ${styles.bottomNavIcon}`}><IconSettings /></span>
            <span className="nav-label">系統設定</span>
          </a>
          <a href="/login" className={styles.logoutLink}>
            <span className={`nav-icon ${styles.bottomNavIcon}`}><IconLogout /></span>
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





