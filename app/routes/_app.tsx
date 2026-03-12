import { AppShell, Group, Stack, Text, Title } from "@mantine/core";
import { Outlet, useLocation } from "@remix-run/react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/proposals", label: "提案管理", icon: "📋" },
  { to: "/kols", label: "KOL 管理", icon: "👥" },
  { to: "/insertion-orders", label: "委刊單管理", icon: "📝" },
  { to: "/favorites", label: "我的收藏", icon: "⭐" },
  { to: "/reports/generate", label: "結案報告產生", icon: "📈" },
];

function navLinkStyle(active: boolean) {
  return {
    display: "block",
    width: "100%",
    textAlign: "left" as const,
    padding: "9px 12px",
    borderRadius: 10,
    background: "transparent",
    color: active ? "var(--mantine-color-blue-filled)" : "var(--mantine-color-text)",
    fontWeight: active ? 600 : 500,
    border: "1px solid transparent",
    textDecoration: "none",
    boxSizing: "border-box" as const,
    fontSize: 14,
    transition: "color 150ms",
  };
}

export default function AppLayoutRoute() {
  const location = useLocation();

  return (
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
            overflow: hidden;
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
              style={{
                background: "transparent",
                border: "1px solid var(--mantine-color-default-border)",
                borderRadius: 6,
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--mantine-color-text)",
              }}
            >
              ☰
            </button>
            <Stack gap={0}>
              <Title order={4}>KOL DB</Title>
              <Text size="xs" c="dimmed">統一管理 KOL / 提案 / 委刊單</Text>
            </Stack>
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
            style={{
              background: "transparent",
              border: "1px solid var(--mantine-color-default-border)",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              color: "var(--mantine-color-dimmed)",
              fontSize: 13,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
              lineHeight: 1,
            }}
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

  if (btn) {
    btn.addEventListener('click', function() {
      var next = getTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // Sidebar toggle
  var sidebarBtn = document.getElementById('kol-sidebar-toggle-btn');
  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-collapsed');
    });
  }
})();
              `,
            }}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm" style={{ zIndex: 90, pointerEvents: "auto" }}>
        <Stack gap="xs" style={{ flex: 1 }}>
          {navItems.map((item) => {
            const active =
              location.pathname === item.to ||
              location.pathname.startsWith(`${item.to}/`);
            return (
              <a key={item.to} href={item.to} style={navLinkStyle(active)}>
                <span className="nav-icon" style={{ marginRight: 8 }}>{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </Stack>

                <div style={{ marginTop: "auto", paddingTop: 12 }}>
          <a
            href="/settings"
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "9px 12px",
              borderRadius: 10,
              color: "var(--mantine-color-text)",
              textDecoration: "none",
              boxSizing: "border-box",
              fontSize: 14,
              border: "1px solid transparent",
              marginBottom: 4,
            }}
          >
            <span className="nav-icon" style={{ marginRight: 8 }}>⚙️</span>
            <span className="nav-label">系統設定</span>
          </a>
          <a
            href="/login"
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "9px 12px",
              borderRadius: 10,
              color: "var(--mantine-color-dimmed)",
              textDecoration: "none",
              boxSizing: "border-box",
              fontSize: 14,
              border: "1px solid transparent",
            }}
          >
            <span className="nav-icon" style={{ marginRight: 8 }}>🚪</span>
            <span className="nav-label">登出（回登入頁）</span>
          </a>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}






