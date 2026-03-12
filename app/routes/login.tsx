import { Link } from "@remix-run/react";
import { useState } from "react";

export default function LoginPage() {
  const [dark, setDark] = useState(false);

  const bg = dark ? "#0f172a" : "#ffffff";
  const fg = dark ? "#f8fafc" : "#0f172a";
  const subtle = dark ? "#94a3b8" : "#64748b";
  const border = dark ? "#1e293b" : "#e2e8f0";
  const googleBg = dark ? "#1e293b" : "#f8fafc";
  const googleBorder = dark ? "#334155" : "#cbd5e1";
  const googleHoverBg = dark ? "#273549" : "#f1f5f9";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        style={{
          flex: "0 0 50%",
          position: "relative",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f3460 65%, #1a1a2e 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          overflow: "hidden",
        }}
      >
        {/* Abstract shape layer */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
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
          style={{ position: "absolute", right: 0, bottom: "20%", opacity: 0.1 }}
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
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>KOL DB</span>
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "rgba(59,130,246,0.25)",
                border: "1px solid rgba(59,130,246,0.4)",
                borderRadius: 20,
                color: "#93c5fd",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Influencer Management Platform
            </span>
            <h1
              style={{
                color: "#ffffff",
                fontSize: 42,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              統一管理<br />
              <span
                style={{
                  background: "linear-gradient(90deg, #60a5fa, #818cf8, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KOL 合作全週期
              </span>
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6, marginTop: 16, maxWidth: 340 }}>
              從提案到委刊單，從 KOL 搜尋到結案報告，一個平台掌握所有行銷合作流程。
            </p>
          </div>

          {/* Feature chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "👥", text: "KOL 資料庫與管理" },
              { icon: "📋", text: "提案與委刊單流程" },
              { icon: "📊", text: "結案報告自動生成" },
            ].map((f) => (
              <div
                key={f.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          flex: "0 0 50%",
          background: bg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px",
          position: "relative",
          transition: "background 300ms",
        }}
      >
        {/* Theme toggle */}
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "none",
            border: `1px solid ${border}`,
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            color: subtle,
            fontSize: 13,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 200ms",
          }}
        >
          {dark ? "☀️" : "🌙"} {dark ? "Light" : "Dark"}
        </button>

        <div style={{ width: "100%", maxWidth: 360 }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h2
              style={{
                color: fg,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                margin: 0,
                marginBottom: 8,
              }}
            >
              歡迎回來 👋
            </h2>
            <p style={{ color: subtle, fontSize: 15, margin: 0, lineHeight: 1.6 }}>
              使用 Google 帳號登入以繼續使用 KOL DB
            </p>
          </div>

          {/* Google Login Button */}
          <a
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              width: "100%",
              padding: "13px 20px",
              background: googleBg,
              border: `1.5px solid ${googleBorder}`,
              borderRadius: 12,
              cursor: "pointer",
              textDecoration: "none",
              color: fg,
              fontSize: 15,
              fontWeight: 600,
              transition: "background 150ms, box-shadow 150ms",
              boxSizing: "border-box",
              marginBottom: 24,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = googleHoverBg;
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = googleBg;
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            使用 Google 帳號登入
          </a>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{ flex: 1, height: 1, background: border }} />
            <span style={{ color: subtle, fontSize: 12, whiteSpace: "nowrap" }}>目前僅支援 Google 登入</span>
            <div style={{ flex: 1, height: 1, background: border }} />
          </div>

          {/* Info card */}
          <div
            style={{
              background: dark ? "#1e293b" : "#f8fafc",
              border: `1px solid ${border}`,
              borderRadius: 12,
              padding: "16px 18px",
              marginBottom: 32,
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, marginTop: 1 }}>🔒</span>
              <div>
                <p style={{ color: fg, fontSize: 13, fontWeight: 600, margin: 0, marginBottom: 4 }}>
                  安全登入
                </p>
                <p style={{ color: subtle, fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                  透過 BetterAuth + Google OAuth 2.0 進行身分驗證，我們不儲存您的密碼。
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p style={{ color: subtle, fontSize: 12, textAlign: "center", lineHeight: 1.6 }}>
            登入即代表您同意我們的
            {" "}
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>服務條款</a>
            {" "}及{" "}
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>隱私政策</a>
          </p>
        </div>
      </div>
    </div>
  );
}
