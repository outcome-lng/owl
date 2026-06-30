import { withBase } from "../utils/url";

interface CaseMetricProps {
  metric: string;
  metricLabel: string;
  sector: string;
  heading: string;
  body: string;
  href?: string;
  tone?: "consult" | "product";
}

/**
 * Number-first featured case study. The big metric carries the weight;
 * the sober layout signals "we don't oversell". Sector-led, unnamed client.
 */
export function CaseMetric({
  metric,
  metricLabel,
  sector,
  heading,
  body,
  href,
  tone = "product",
}: CaseMetricProps) {
  const accent = tone === "consult" ? "text-consult" : "text-product";
  const internal = href && href.startsWith("/") && !href.startsWith("//");

  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-10 items-center bg-surface border border-line rounded-lg p-7 md:p-9">
      <div>
        <div className={`text-[44px] md:text-[52px] font-bold leading-none tracking-tight ${accent}`}>{metric}</div>
        <div className="font-mono text-[11px] text-muted mt-2 tracking-wide uppercase">{metricLabel}</div>
      </div>
      <div>
        <div className="kicker mb-2">{sector}</div>
        <h3 className="text-[20px] font-semibold text-ink mb-2">{heading}</h3>
        <p className="text-[14.5px] text-muted leading-relaxed">{body}</p>
        {href && (
          <a
            href={internal ? withBase(href) : href}
            className={`inline-block mt-4 font-mono text-[12px] font-semibold ${accent} hover:underline underline-offset-4`}
          >
            Read the case →
          </a>
        )}
      </div>
    </div>
  );
}
