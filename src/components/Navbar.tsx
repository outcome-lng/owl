import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { withBase } from "../utils/url";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const navLinks = [
  { name: "Consultancy", path: "/consultancy" },
  { name: "Products", path: "/products" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Insights", path: "/insights" },
  { name: "About", path: "/about" },
];

export function Navbar() {
  const [location, setLocation] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    setLocation(BASE && path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path);

    // Scroll state via a 1px sentinel + IntersectionObserver - no scroll listener.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;height:24px;width:1px;pointer-events:none;";
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  const isActive = (p: string) => location === p || location.startsWith(p + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-line"
          : "bg-paper/70 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6 h-[68px] flex items-center justify-between">
        <a href={withBase("/")} className="group" aria-label="Outcome Works home">
          <Logo tone="light" size="sm" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={withBase(link.path)}
                  className={`relative text-[14.5px] font-medium transition-colors hover:text-ink ${
                    isActive(link.path) ? "text-ink" : "text-muted"
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-consult" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <Button href="/contact">Talk to us</Button>
        </nav>

        <button
          className="lg:hidden p-2 text-ink"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden absolute top-[68px] left-0 right-0 bg-paper/98 backdrop-blur-xl border-b border-line transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={withBase(link.path)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive(link.path) ? "text-ink" : "text-muted"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4 border-t border-line">
            <Button href="/contact" className="w-full">Talk to us</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
