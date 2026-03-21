import styles from "./page.module.css";

const AUDIT_ITEMS = [
  {
    id: "coverage",
    label: "Geographic Coverage",
    status: "pass",
    score: 94,
    detail: "Business listings verified across 47 regions",
  },
  {
    id: "consistency",
    label: "NAP Consistency",
    status: "warn",
    score: 78,
    detail: "Name/Address/Phone mismatch detected in 6 directories",
  },
  {
    id: "citations",
    label: "Local Citations",
    status: "pass",
    score: 88,
    detail: "312 active citations across top directories",
  },
  {
    id: "google",
    label: "Google Business Profile",
    status: "pass",
    score: 96,
    detail: "Profile complete, photos updated, reviews active",
  },
  {
    id: "schema",
    label: "Structured Data / Schema",
    status: "fail",
    score: 42,
    detail: "LocalBusiness schema missing on 14 landing pages",
  },
  {
    id: "proximity",
    label: "Proximity Signals",
    status: "warn",
    score: 71,
    detail: "Service radius not clearly defined in 3 regions",
  },
];

const STATUS_CONFIG = {
  pass: { label: "Pass", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  warn: { label: "Warn", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  fail: { label: "Fail", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

function ScoreRing({ score, status }: { score: number; status: string }) {
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  return (
    <div className={styles.scoreRing}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="#1f2d44" strokeWidth="5" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={cfg.color}
          strokeWidth="5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className={styles.scoreValue} style={{ color: cfg.color }}>
        {score}
      </span>
    </div>
  );
}

function AuditCard({ item }: { item: (typeof AUDIT_ITEMS)[0] }) {
  const cfg = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <ScoreRing score={item.score} status={item.status} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <h3 className={styles.cardTitle}>{item.label}</h3>
          <span
            className={styles.badge}
            style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.color + "44" }}
          >
            {cfg.label}
          </span>
        </div>
        <p className={styles.cardDetail}>{item.detail}</p>
      </div>
    </div>
  );
}

function OverallScore() {
  const avg = Math.round(
    AUDIT_ITEMS.reduce((s, i) => s + i.score, 0) / AUDIT_ITEMS.length
  );
  const passes = AUDIT_ITEMS.filter((i) => i.status === "pass").length;
  const warns = AUDIT_ITEMS.filter((i) => i.status === "warn").length;
  const fails = AUDIT_ITEMS.filter((i) => i.status === "fail").length;

  return (
    <div className={styles.overview}>
      <div className={styles.overviewScore}>
        <span className={styles.bigScore}>{avg}</span>
        <span className={styles.bigScoreLabel}>/100</span>
      </div>
      <div className={styles.overviewStats}>
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: "#10b981" }}>{passes}</span>
          <span className={styles.statLabel}>Passing</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: "#f59e0b" }}>{warns}</span>
          <span className={styles.statLabel}>Warnings</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statNum} style={{ color: "#ef4444" }}>{fails}</span>
          <span className={styles.statLabel}>Failed</span>
        </div>
      </div>
      <div className={styles.overviewBar}>
        <div className={styles.barFill} style={{ width: `${avg}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <div className={styles.logo}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="10" stroke="#3b82f6" strokeWidth="2" />
                <path d="M11 6v5l3 3" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                <circle cx="11" cy="11" r="2" fill="#3b82f6" />
              </svg>
              GeoAudit
            </div>
            <span className={styles.badge} style={{ color: "#10b981", background: "rgba(16,185,129,0.1)", borderColor: "#10b98144" }}>
              ● Live
            </span>
          </div>
          <h1 className={styles.title}>Business Geo Audit</h1>
          <p className={styles.subtitle}>
            Location intelligence &amp; local SEO diagnostic report
          </p>
        </header>

        {/* Overview */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overall Score</h2>
          <OverallScore />
        </section>

        {/* Audit Cards */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Audit Checks</h2>
          <div className={styles.grid}>
            {AUDIT_ITEMS.map((item) => (
              <AuditCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <span>Business Geo Audit · Powered by YardLogix</span>
          <span>Last scan: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </footer>
      </div>
    </main>
  );
}
