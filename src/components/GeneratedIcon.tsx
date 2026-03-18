function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function getInitials(label: string): string {
  const parts = label
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3);

  if (!parts.length) return "AI";
  const initials = parts
    .map((p) => p[0]?.toUpperCase())
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return initials || "AI";
}

export function GeneratedIcon({
  seed,
  label,
  className,
}: {
  seed: string;
  label: string;
  className?: string;
}) {
  const hash = hashString(seed);
  const initials = getInitials(label);

  const palettes = [
    { a: "#e0e7ff", b: "#f5f3ff" },
    { a: "#dcfce7", b: "#f0fdf4" },
    { a: "#fee2e2", b: "#fff1f2" },
    { a: "#dbeafe", b: "#eff6ff" },
    { a: "#fef3c7", b: "#fffbeb" },
  ];

  const palette = palettes[hash % palettes.length]!;
  const accent = "#6366f1";

  return (
    <div
      className={[
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]",
        className ?? "",
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, ${palette.b}, ${palette.a})`,
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 64 64"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`g-${hash}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={palette.b} stopOpacity="0.9" />
            <stop offset="1" stopColor={palette.a} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="64" height="64" fill={`url(#g-${hash})`} />
        <circle
          cx={(hash % 24) + 20}
          cy={((hash >> 3) % 24) + 20}
          r={(hash % 10) + 10}
          fill={accent}
          opacity="0.18"
        />
        <path
          d="M10 44 C 18 28, 30 56, 40 34 C 48 18, 52 26, 56 22"
          stroke={accent}
          strokeWidth="3"
          fill="none"
          opacity="0.55"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative z-10 text-sm font-semibold tracking-tight text-[var(--foreground)]">
        {initials}
      </div>
    </div>
  );
}

