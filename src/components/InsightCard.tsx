import { withBase } from "../utils/url";

interface InsightCardProps {
  title: string;
  meta: string; // e.g. "ARTICLE · 6 MIN"
  href?: string;
  featured?: boolean;
}

/**
 * Insights article teaser. Thumb is a tinted placeholder block (no broken
 * image asset) until real artwork exists.
 */
export function InsightCard({ title, meta, href = "/insights", featured = false }: InsightCardProps) {
  const internal = href.startsWith("/") && !href.startsWith("//");
  return (
    <a
      href={internal ? withBase(href) : href}
      className="group flex flex-col rounded-lg border border-line bg-surface overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
    >
      <div
        className={`bg-spine-wash ${featured ? "h-44" : "h-28"} flex items-end p-3`}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-faint">{/* PLACEHOLDER_INSIGHT_IMAGE */}image</span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className={`${featured ? "text-[19px]" : "text-[15px]"} font-semibold text-ink leading-snug group-hover:text-consult transition-colors`}>
          {title}
        </h3>
        <div className="font-mono text-[10px] text-faint mt-auto pt-4 tracking-wide">{meta}</div>
      </div>
    </a>
  );
}
