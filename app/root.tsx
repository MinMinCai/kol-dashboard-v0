import { cssBundleHref } from "@remix-run/css-bundle";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { ColorSchemeScript, MantineProvider, Container, Title, Text, Button, Center, Stack } from "@mantine/core";
import { useEffect } from "react";
import mantineStylesHref from "@mantine/core/styles.css";
import mantineChartsStylesHref from "@mantine/charts/styles.css";
import stylesHref from "./styles.css";

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: mantineStylesHref },
  { rel: "stylesheet", href: mantineChartsStylesHref },
  { rel: "stylesheet", href: stylesHref },
];

export default function App() {
  return (
    <html lang="zh-Hant">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          // Some client-side dependencies still assume Node's `process.env` exists.
          // If it doesn't, the bundle can crash before hydration, breaking clicks.
          dangerouslySetInnerHTML={{
            __html: `window.process = window.process || { env: { NODE_ENV: ${JSON.stringify(
              process.env.NODE_ENV ?? "development",
            )} } };`,
          }}
        />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Outlet />
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let status = 500;
  let title = "系統發生錯誤";
  let message = "抱歉，系統遇到了一些問題，請稍後再試。";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (status === 404) {
      title = "找不到頁面";
      message = "您正在尋找的頁面不存在。它可能已被移除、重新命名或暫時無法使用。";
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="zh-Hant">
      <head>
        <title>{`${status} ${title}`}</title>
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <Center h="100vh">
            <Stack align="center" gap="md">
              <Title style={{ fontSize: 120, lineHeight: 1, color: "var(--mantine-color-blue-filled)" }}>{status}</Title>
              <Title order={2}>{title}</Title>
              <Text c="dimmed" size="lg" ta="center" maw={500}>
                {message}
              </Text>
              <Text c="blue" size="sm" ta="center" mt="xs">
                系統將於 3 秒後自動為您導向至首頁...
              </Text>
              <Button component="a" href="/dashboard" mt="xl" size="lg" variant="light">
                立即返回首頁
              </Button>
            </Stack>
          </Center>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

