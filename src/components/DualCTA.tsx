import { ArrowRight } from "lucide-react";
import { withBase } from "../utils/url";

interface DualCTAProps {
  consultHeading?: string;
  consultBody?: string;
  productHeading?: string;
  productBody?: string;
}

/**
 * The "two doors" CTA band — closes most pages. Consultancy (teal) on the
 * left, Products (terracotta) on the right, on the ink ground.
 */
export function DualCTA({
  consultHeading = "Talk to our team",
  consultBody = "Book a conversation about your bid or AI problem.",
  productHeading = "See the OWL suite",
  productBody = "Demos, pricing, and a look at the tools running.",
}: DualCTAProps) {
  return (
    <section className="mesh-spine relative overflow-hidden">
      {/* Faint owl watermark — brand texture on the dark close */}
      <img
        src={withBase("/owl.png")}
        alt=""
        aria-hidden="true"
        className="owl-mono pointer-events-none select-none absolute -bottom-10 -right-6 w-56 md:w-72 opacity-[0.05]"
      />
      <div className="relative max-w-[1080px] mx-auto px-5 sm:px-6 py-16 md:py-20">
        {/* Two eyes = two doors: a quiet brand glyph (teal + terracotta rings) */}
        <div className="flex items-center gap-2 mb-8" aria-hidden="true">
          <span className="w-4 h-4 rounded-full border-2 border-consult-bright" />
          <span className="w-4 h-4 rounded-full border-2 border-product-bright" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href={withBase("/contact")}
            className="group rounded-lg border border-white/12 hover:border-consult-bright/70 bg-white/[0.02] hover:bg-white/[0.05] p-7 md:p-8 transition-all"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-consult-bright">Consultancy</div>
            <h3 className="text-white text-[20px] font-semibold mt-2 mb-1.5">{consultHeading}</h3>
            <p className="text-white/55 text-[13.5px] mb-4">{consultBody}</p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-consult-bright">
              Talk to us <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <a
            href={withBase("/products")}
            className="group rounded-lg border border-white/12 hover:border-product-bright/70 bg-white/[0.02] hover:bg-white/[0.05] p-7 md:p-8 transition-all"
          >
            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-product-bright">Products</div>
            <h3 className="text-white text-[20px] font-semibold mt-2 mb-1.5">{productHeading}</h3>
            <p className="text-white/55 text-[13.5px] mb-4">{productBody}</p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold text-product-bright">
              See the products <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
