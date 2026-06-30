import type React from "react";
import { withBase } from "../utils/url";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "consult" | "product" | "ghost" | "white" | "outline-white";
  href?: string;
  external?: boolean;
}

export function Button({
  variant = "primary",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-[14.5px] font-medium transition-all duration-200";

  const variants: Record<string, string> = {
    primary: "bg-ink text-white hover:bg-spine hover:-translate-y-px shadow-sm",
    consult: "bg-consult text-white hover:brightness-110 hover:-translate-y-px shadow-sm",
    product: "bg-product text-white hover:brightness-110 hover:-translate-y-px shadow-sm",
    ghost: "border border-line text-ink hover:border-ink hover:bg-surface",
    white: "bg-white text-ink hover:bg-white/90 hover:-translate-y-px shadow-sm",
    "outline-white": "border border-white/40 text-white hover:bg-white/10",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//") && !external;
    const resolvedHref = isInternal ? withBase(href) : href;
    if (external) {
      return (
        <a href={resolvedHref} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <a href={resolvedHref} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
