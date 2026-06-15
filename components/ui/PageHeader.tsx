import Link from "next/link";

const PALETTE = {
  bg: "#1A1815",
  text: "#FBF8F1",
  textMuted: "rgba(251, 248, 241, 0.70)",
  accent: "#E04E2C",
  gold: "#C9A961",
  hairline: "rgba(251, 248, 241, 0.14)",
};

interface Crumb {
  label: string;
  href?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header
      className="relative w-full overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20"
      style={{ backgroundColor: PALETTE.bg, color: PALETTE.text }}
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(224,78,44,0.16) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${PALETTE.gold} 1px, transparent 0)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em]">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="transition-colors hover:opacity-100"
                      style={{ color: PALETTE.textMuted }}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span style={{ color: PALETTE.gold }}>{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <span style={{ color: PALETTE.hairline }}>/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10" style={{ backgroundColor: PALETTE.accent }} />
          <span
            className="font-mono text-xs uppercase tracking-[0.28em]"
            style={{ color: PALETTE.accent }}
          >
            {eyebrow}
          </span>
        </div>

        <h1
          className="font-display font-semibold text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em] max-w-[20ch]"
          style={{ color: PALETTE.text }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="mt-6 text-base lg:text-lg leading-relaxed max-w-2xl"
            style={{ color: PALETTE.textMuted }}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
