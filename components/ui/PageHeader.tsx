import Link from "next/link";
import { A } from "@/lib/ui";

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
    <header className="relative w-full overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ backgroundColor: A.bg, color: A.text }}>
      <div aria-hidden className="absolute inset-0 -z-0 tech-grid opacity-50" />
      <div aria-hidden className="absolute inset-0 -z-0 diag-lines opacity-60" />
      <div aria-hidden className="absolute -top-40 -right-24 w-[620px] h-[620px] rounded-full glow-gold pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full glow-violet pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em]">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:opacity-100" style={{ color: A.textDim }}>{c.label}</Link>
                  ) : (
                    <span style={{ color: A.gold }}>{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span style={{ color: A.border }}>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10" style={{ backgroundColor: A.gold }} />
          <span className="font-mono text-xs uppercase tracking-[0.28em]" style={{ color: A.gold }}>{eyebrow}</span>
        </div>

        <h1 className="font-display font-semibold text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-[-0.02em] max-w-[20ch]" style={{ color: A.text }}>
          {title}
        </h1>

        {description && (
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: A.text2 }}>{description}</p>
        )}
      </div>
    </header>
  );
}
