import { Form } from "@remix-run/react";
import { useState } from "react";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { DEMO_USER, demoAuthCookie } from "~/lib/demo-auth.server";
import styles from "./login.module.css";

const FeatureIconKol = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="5" r="2.5"/>
    <path d="M1 14c0-3 2.2-5 5-5s5 2 5 5"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 10c1.8.2 3 1.5 3 4"/>
  </svg>
);
const FeatureIconProposal = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="1" width="12" height="14" rx="1.5"/>
    <line x1="5" y1="5" x2="11" y2="5"/>
    <line x1="5" y1="8" x2="11" y2="8"/>
    <line x1="5" y1="11" x2="8" y2="11"/>
  </svg>
);
const FeatureIconReport = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,12 5,7 8,10 11,5 15,8"/>
    <line x1="1" y1="14" x2="15" y2="14"/>
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="10" height="8" rx="1.5"/>
    <path d="M5 7V5a3 3 0 0 1 6 0v2"/>
  </svg>
);
const IconSunLogin = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="3"/>
    <line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/>
    <line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/>
    <line x1="3.05" y1="3.05" x2="4.46" y2="4.46"/><line x1="11.54" y1="11.54" x2="12.95" y2="12.95"/>
    <line x1="3.05" y1="12.95" x2="4.46" y2="11.54"/><line x1="11.54" y1="4.46" x2="12.95" y2="3.05"/>
  </svg>
);
const IconMoonLogin = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z"/>
  </svg>
);
const IconWave = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 11V5.75a1.25 1.25 0 1 1 2.5 0V10" />
    <path d="M11.5 10V4.75a1.25 1.25 0 1 1 2.5 0V10" />
    <path d="M14 10V5.75a1.25 1.25 0 1 1 2.5 0V11" />
    <path d="M16.5 11V8.25a1.25 1.25 0 1 1 2.5 0v4.5a6 6 0 0 1-6 6h-.38a5.5 5.5 0 0 1-5.34-4.18l-.87-3.31a1.25 1.25 0 0 1 2.36-.87L10 12" />
    <path d="M6 6.5c-.76.43-1.4 1.05-1.84 1.81" />
    <path d="M18.75 5.5c.73.45 1.32 1.08 1.71 1.83" />
  </svg>
);

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
            {([
              { Icon: FeatureIconKol, text: "KOL 資料庫與管理" },
              { Icon: FeatureIconProposal, text: "提案與委刊單流程" },
              { Icon: FeatureIconReport, text: "結案報告自動生成" },
            ] as const).map((f) => (
              <div key={f.text} className={styles.featureItem}>
                <span className={styles.featureIcon}><f.Icon /></span>
                <span className={styles.featureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.rightPanel}>
        {/* Theme toggle switch */}
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          className={styles.themeToggle}
          aria-label="切換亮暗模式"
        >
          <span className={styles.toggleTrack} data-dark={dark ? "true" : "false"}>
            <span className={styles.toggleThumb}>
              {dark ? <IconSunLogin /> : <IconMoonLogin />}
            </span>
          </span>
        </button>

        <div className={styles.formWrap}>
          {/* Header */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              歡迎回來 <span className={styles.waveIcon}><IconWave /></span>
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
              <span className={styles.infoIcon}><IconLock /></span>
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
