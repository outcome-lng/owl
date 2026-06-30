import { ArrowUpRight } from "lucide-react";
import { withBase } from "../utils/url";

interface ProductCardProps {
  name: string;
  job: string;
  href: string;
  /** compact = strip teaser (home); full = grid card with description (products hub) */
  description?: string;
}

/**
 * OWL suite card. Each card links to its job-to-be-done page.
 * Terracotta top border ties it to the products door.
 */
export function ProductCard({ name, job, href, description }: ProductCardProps) {
  const internal = href.startsWith("/") && !href.startsWith("//");
  return (
    <a
      href={internal ? withBase(href) : href}
      className="group flex flex-col h-full rounded-lg border border-line border-t-[3px] border-t-product bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[15px] font-semibold text-ink">{name}</span>
        <ArrowUpRight className="w-4 h-4 text-faint transition-colors group-hover:text-product shrink-0" />
      </div>
      <div className="font-mono text-[11px] text-product mt-1.5">{job}</div>
      {description && <p className="text-[13px] text-muted leading-relaxed mt-3">{description}</p>}
    </a>
  );
}
