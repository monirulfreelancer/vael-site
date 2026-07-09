// Brand lockup: drawn mark plus wordmark. The mark is a rounded accent square
// with a wide-stance geometric V; colors come from tokens only.
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="8" fill="var(--color-accent)" />
        <path
          d="M7.5 9.5 14 20l6.5-10.5"
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-text">
        Vael
      </span>
    </span>
  );
}
