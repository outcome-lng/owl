import { useState } from "react";

/**
 * Dual-path contact form. Until a real endpoint (Formspree / Resend) is wired,
 * it falls back to opening the visitor's mail client with a pre-filled message.
 * PLACEHOLDER_FORM_ENDPOINT — replace the handleSubmit target before launch.
 */
const CONTACT_EMAIL = "hello@outcomeworks.co.uk"; // PLACEHOLDER_CONTACT_EMAIL — confirm

export function ContactForm() {
  const [interest, setInterest] = useState("Consultancy enquiry");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `${interest}: ${f.get("name") || "Website enquiry"}`;
    const body = [
      `Name: ${f.get("name") || ""}`,
      `Organisation: ${f.get("org") || ""}`,
      `Email: ${f.get("email") || ""}`,
      `Interest: ${interest}`,
      "",
      `${f.get("message") || ""}`,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full bg-surface border border-line rounded-md px-3.5 py-2.5 text-[14.5px] text-ink placeholder:text-muted focus:border-consult focus:ring-2 focus:ring-consult/30 focus:outline-none transition-colors";
  const label = "block font-mono text-[11px] uppercase tracking-[0.1em] text-muted mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={label} htmlFor="name">Name</label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="org">Organisation</label>
          <input id="org" name="org" className={field} placeholder="Company / agency" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required className={field} placeholder="you@organisation.gov.uk" />
      </div>

      <div>
        <span className={label}>What do you need?</span>
        <div className="grid grid-cols-2 gap-3">
          {["Consultancy enquiry", "Product demo"].map((opt) => {
            const active = interest === opt;
            const isConsult = opt === "Consultancy enquiry";
            return (
              <button
                type="button"
                key={opt}
                onClick={() => setInterest(opt)}
                className={`rounded-md border px-3 py-2.5 text-[13.5px] font-medium transition-all ${
                  active
                    ? isConsult
                      ? "border-consult bg-consult-wash text-consult"
                      : "border-product bg-product-wash text-product"
                    : "border-line text-muted hover:border-ink"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required className={field} placeholder="Tell us about the bid, the problem, or the tool you're interested in." />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-[14.5px] font-medium bg-ink text-white hover:bg-spine transition-all duration-200 self-start"
      >
        Send message
      </button>
      <p className="font-mono text-[11px] text-faint">We reply to every enquiry within one working day.</p>
    </form>
  );
}
