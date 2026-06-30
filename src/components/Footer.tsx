import { Logo } from "./Logo";
import { withBase } from "../utils/url";

const consultLinks = [
  { name: "AI Advisory", path: "/consultancy" },
  { name: "Bid & Proposal Support", path: "/consultancy" },
  { name: "Enterprise Tooling", path: "/consultancy" },
];

const productLinks = [
  { name: "OWL Ops", path: "/products/owl-ops" },
  { name: "OWL Bid Team", path: "/products/owl-bid-team" },
  { name: "OWL Brain", path: "/products/owl-brain" },
  { name: "Tender Intel", path: "/products/tender-intel" },
  { name: "CVInsight", path: "/products/cvinsight" },
  { name: "Cadre", path: "/products/cadre" },
];

const companyLinks = [
  { name: "Case Studies", path: "/case-studies" },
  { name: "Insights", path: "/insights" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href={withBase("/")} className="inline-block mb-4" aria-label="Outcome Works home">
              <Logo tone="dark" size="md" />
            </a>
            <p className="text-[14px] leading-relaxed mb-5 max-w-xs">
              Built to win the work that's hard to win. AI advisory, bid support and the OWL toolset.
            </p>
            {/* PLACEHOLDER_CONTACT_EMAIL — confirm address before launch */}
            <a href="mailto:hello@outcomeworks.co.uk" className="text-[14px] hover:text-white transition-colors">
              hello@outcomeworks.co.uk
            </a>
          </div>

          <div>
            <h4 className="kicker !text-white/45 mb-5">Consultancy</h4>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {consultLinks.map((l) => (
                <li key={l.name}>
                  <a href={withBase(l.path)} className="hover:text-white transition-colors">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="kicker !text-white/45 mb-5">Products</h4>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {productLinks.map((l) => (
                <li key={l.name}>
                  <a href={withBase(l.path)} className="hover:text-white transition-colors">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="kicker !text-white/45 mb-5">Company</h4>
            <ul className="flex flex-col gap-2.5 text-[14px]">
              {companyLinks.map((l) => (
                <li key={l.name}>
                  <a href={withBase(l.path)} className="hover:text-white transition-colors">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[13px] text-white/50">
            &copy; {new Date().getFullYear()} Outcome Works Limited. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-white/40 tracking-wide">
            Public-sector &amp; enterprise procurement · UK &amp; EU
          </p>
        </div>
      </div>
    </footer>
  );
}
