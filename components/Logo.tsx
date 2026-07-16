type Props = {
  /** Height of the square mark in px; the wordmark scales with it */
  size?: number;
  className?: string;
};

/**
 * fennr brand logo — black rounded square with the yellow F-glyph
 * (middle bar bleeds through the right edge), followed by "ennr".
 */
export default function Logo({ size = 32, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-[0.32em] ${className}`} style={{ fontSize: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 88 88"
        fill="none"
        aria-hidden="true"
        className="flex-none"
      >
        <rect width="88" height="88" rx="24" fill="hsl(var(--ink))" />
        <path
          d="M31 21H62V30H41V43H88V52H41V66H31V21Z"
          fill="hsl(var(--accent))"
        />
      </svg>
      <span
        className="font-display font-extrabold lowercase leading-none tracking-[-0.02em] text-ink"
        style={{ fontSize: size * 0.95 }}
      >
        ennr
      </span>
    </span>
  );
}
