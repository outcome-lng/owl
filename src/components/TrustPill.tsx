/**
 * Sector / category chip — the blueprint's mono pill.
 * `tone` tints it for the shared spine (default), consultancy, or products.
 */
export function TrustPill({
  text,
  tone = "spine",
}: {
  text: string;
  tone?: "spine" | "consult" | "product";
}) {
  const tones: Record<string, string> = {
    spine: "bg-spine-wash text-spine",
    consult: "bg-consult-wash text-consult",
    product: "bg-product-wash text-product",
  };
  return (
    <span
      className={`inline-flex items-center font-mono text-[11.5px] px-3 py-1.5 rounded-full whitespace-nowrap ${tones[tone]}`}
    >
      {text}
    </span>
  );
}
