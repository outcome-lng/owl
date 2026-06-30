import { withBase } from "../utils/url";

/**
 * Brand lockup: owl mark + "Outcome Works" wordmark + "Limited".
 * The owl is a navy/cyan raster (public/owl.png, aspect ~0.82). Explicit
 * dimensions avoid layout shift. Shared by Navbar and Footer.
 *
 * tone: "light" (ink wordmark, on paper) | "dark" (white wordmark, on navy)
 * size: "sm" (navbar, 28px owl) | "md" (footer, 32px owl)
 */
interface LogoProps {
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}

export function Logo({ tone = "light", size = "sm", className = "" }: LogoProps) {
  const owlH = size === "md" ? 32 : 28;
  const owlW = Math.round(owlH * 0.82);
  const wordSize = size === "md" ? "text-[20px]" : "text-[19px]";
  const wordColor = tone === "dark" ? "text-white" : "text-ink";
  const suffixColor = tone === "dark" ? "text-white/40" : "text-faint";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={withBase("/owl.png")}
        alt="Outcome Works owl"
        width={owlW}
        height={owlH}
        style={{ height: owlH, width: owlW }}
        className="block shrink-0 object-contain"
        loading="eager"
        decoding="async"
      />
      <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
        <span className={`font-sans ${wordSize} font-bold ${wordColor} tracking-tight`}>Outcome Works</span>
        <span className={`font-mono text-[10px] ${suffixColor} tracking-[0.14em]`}>Limited</span>
      </span>
    </span>
  );
}
