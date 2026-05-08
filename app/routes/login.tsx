import { Form } from "@remix-run/react";
import { useState } from "react";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { DEMO_USER, demoAuthCookie } from "~/lib/demo-auth.server";
import styles from "./login.module.css";

export async function action(_: ActionFunctionArgs) {
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await demoAuthCookie.serialize({
        name: DEMO_USER.name,
        role: DEMO_USER.role,
      }),
    },
  });
}

export default function LoginPage() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? `${styles.page} ${styles.dark}` : styles.page}>
      {/* ── LEFT PANEL ── */}
      <div className={styles.leftPanel}>
        {/* Abstract shape layer */}
        <svg
          className={styles.bgShapes}
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="500" cy="80" r="280" fill="#3b82f6" />
          <circle cx="50" cy="700" r="200" fill="#6366f1" />
          <circle cx="380" cy="480" r="150" fill="#0ea5e9" opacity="0.5" />
          <ellipse cx="200" cy="300" rx="180" ry="80" fill="#7c3aed" opacity="0.4" transform="rotate(-30 200 300)" />
        </svg>

        {/* Influencer network graphic */}
        <svg
          className={styles.networkGraphic}
          width="360"
          height="360"
          viewBox="0 0 360 360"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Network nodes */}
          <circle cx="180" cy="180" r="32" fill="none" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="80" cy="100" r="20" fill="none" stroke="#818cf8" strokeWidth="2" />
          <circle cx="290" cy="90" r="24" fill="none" stroke="#34d399" strokeWidth="2" />
          <circle cx="60" cy="270" r="18" fill="none" stroke="#f472b6" strokeWidth="2" />
          <circle cx="300" cy="270" r="22" fill="none" stroke="#fb923c" strokeWidth="2" />
          {/* Lines */}
          <line x1="180" y1="180" x2="80" y2="100" stroke="#60a5fa" strokeWidth="1.5" opacity="0.6" />
          <line x1="180" y1="180" x2="290" y2="90" stroke="#818cf8" strokeWidth="1.5" opacity="0.6" />
          <line x1="180" y1="180" x2="60" y2="270" stroke="#f472b6" strokeWidth="1.5" opacity="0.6" />
          <line x1="180" y1="180" x2="300" y2="270" stroke="#fb923c" strokeWidth="1.5" opacity="0.6" />
          <line x1="80" y1="100" x2="290" y2="90" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />
          <line x1="60" y1="270" x2="300" y2="270" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />
          {/* Avatars */}
          <circle cx="180" cy="180" r="24" fill="#1e40af" />
          <circle cx="80" cy="100" r="14" fill="#4c1d95" />
          <circle cx="290" cy="90" r="16" fill="#065f46" />
          <circle cx="60" cy="270" r="12" fill="#831843" />
          <circle cx="300" cy="270" r="15" fill="#7c2d12" />
          {/* Social icons abstracted */}
          <text x="166" y="185" fill="white" fontSize="14" fontFamily="sans-serif">KOL</text>
        </svg>

        {/* Brand */}
        <div className={styles.brandWrap}>
          <div className={styles.brandRow}>
            <div className={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6L6 11l10 5.5L26 11 16 6z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 21l10 5.5L26 21" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 16l10 5.5L26 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={styles.brandText}>KOL DB</span>
          </div>
        </div>

        {/* Hero copy */}
        <div className={styles.heroWrap}>
          <div className={styles.heroBadgeWrap}>
            <span className={styles.heroBadge}>
              Influencer Management Platform
            </span>
            <h1 className={styles.heroTitle}>
              統一管理<br />
              <span className={styles.heroTitleAccent}>
                KOL 合作全週期
              </span>
            </h1>
            <p className={styles.heroDesc}>
              從提案到委刊單，從 KOL 搜尋到結案報告，一個平台掌握所有行銷合作流程。
            </p>
          </div>

          {/* Feature chips */}
          <div className={styles.featureList}>
            {[
              { icon: "👥", text: "KOL 資料庫與管理" },
              { icon: "📋", text: "提案與委刊單流程" },
              { icon: "📊", text: "結案報告自動生成" },
            ].map((f) => (
              <div key={f.text} className={styles.featureItem}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span className={styles.featureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.rightPanel}>
        {/* Theme toggle */}
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          className={styles.themeToggle}
        >
          {dark ? "☀️" : "🌙"} {dark ? "Light" : "Dark"}
        </button>

        <div className={styles.formWrap}>
          {/* Header */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              歡迎回來 👋
            </h2>
            <p className={styles.formDesc}>
              使用 Google 帳號登入以繼續使用 KOL DB
            </p>
          </div>

          {/* Google Login Button */}
          <Form method="post" reloadDocument>
            <button type="submit" className={styles.googleBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              使用 Google 帳號登入
            </button>
          </Form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerLine} />
          </div>

          {/* Info card */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardRow}>
              <span className={styles.infoIcon}>🔒</span>
              <div>
                <p className={styles.infoTitle}>
                  安全登入
                </p>
                <p className={styles.infoDesc}>
                  透過 BetterAuth + Google OAuth 2.0 進行身分驗證，我們不儲存您的密碼。
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className={styles.footer}>
            登入即代表您同意我們的
            {" "}
            <a href="#" className={styles.footerLink}>服務條款</a>
            {" "}及{" "}
            <a href="#" className={styles.footerLink}>隱私政策</a>
          </p>
        </div>
      </div>
    </div>
  );
}
