import { withBase } from "../utils/url";

interface Member {
  name: string;
  role: string;
  /** A single paragraph, or an array of paragraphs. */
  bio?: string | string[];
  /** e.g. "/images/lee-nicholson.webp". Falls back to a tinted circle if absent. */
  photo?: string;
}

/**
 * People / trust grid. `variant="compact"` is the home people-band;
 * `"full"` is the About page leadership rows with bios. Avatars use the
 * member photo when present, otherwise a tinted placeholder circle.
 */
export function TeamGrid({
  members,
  variant = "full",
}: {
  members: Member[];
  variant?: "compact" | "full";
}) {
  const Avatar = ({ m, size }: { m: Member; size: string }) =>
    m.photo ? (
      <img
        src={withBase(m.photo)}
        alt={m.name}
        className={`${size} rounded-full object-cover bg-spine-wash`}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className={`${size} rounded-full bg-spine-wash`} aria-hidden="true" />
    );

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex -space-x-3">
          {members.map((m) =>
            m.photo ? (
              <img
                key={m.name}
                src={withBase(m.photo)}
                alt={m.name}
                title={m.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-paper bg-spine-wash"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                key={m.name}
                className="w-12 h-12 rounded-full bg-spine-wash border-2 border-paper"
                title={m.name}
                aria-hidden="true"
              />
            )
          )}
        </div>
        <div>
          <div className="kicker mb-1">The people behind the work</div>
          <p className="text-[14.5px] text-muted max-w-md">
            A small, senior team with deep procurement and AI delivery pedigree, and a record of trust on sensitive work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-line border-t border-line">
      {members.map((m) => (
        <div key={m.name} className="grid md:grid-cols-[220px_1fr] gap-5 md:gap-10 py-8">
          <div>
            <div className="mb-4"><Avatar m={m} size="w-20 h-20" /></div>
            <h3 className="text-[18px] font-semibold text-ink">{m.name}</h3>
            <div className="font-mono text-[11px] text-consult mt-1 tracking-wide uppercase">{m.role}</div>
          </div>
          {m.bio && (
            <div className="flex flex-col gap-3 max-w-[68ch]">
              {(Array.isArray(m.bio) ? m.bio : [m.bio]).map((para, i) => (
                <p key={i} className="text-[14px] text-muted leading-relaxed">{para}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
