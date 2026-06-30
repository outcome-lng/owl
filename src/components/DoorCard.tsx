import { ArrowRight } from "lucide-react";
import { withBase } from "../utils/url";

interface DoorCardProps {
  variant: "consult" | "product";
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
}

/**
 * The signature "two doors" fork card. Door A = consultancy (teal),
 * Door B = products (terracotta). Used in the home hero and as a chooser
 * elsewhere. Renders statically — no client JS.
 */
export function DoorCard({ variant, eyebrow, title, body, ctaLabel, href }: DoorCardProps) {
  const isConsult = variant === "consult";
  const skin = isConsult
    ? "bg-consult-wash border-consult/50 hover:border-consult"
    : "bg-product-wash border-product/50 hover:border-product";
  const accent = isConsult ? "text-consult" : "text-product";
  const internal = href.startsWith("/") && !href.startsWith("//");

  return (
    <a
      href={internal ? withBase(href) : href}
      className={`group block rounded-lg border p-6 transition-all duration-200 hover:-translate-y-0.5 ${skin}`}
    >
      <div className={`font-mono text-[10.5px] uppercase tracking-[0.12em] ${accent}`}>{eyebrow}</div>
      <h3 className="mt-2 mb-1.5 text-[17px] font-semibold text-ink">{title}</h3>
      <p className="text-[13.5px] text-muted leading-relaxed mb-4">{body}</p>
      <span className={`inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold ${accent}`}>
        {ctaLabel}
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
