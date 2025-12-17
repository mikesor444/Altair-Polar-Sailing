import { clsx } from "clsx";

interface Props {
  variant?: "compass" | "stars";
  className?: string;
}

export default function DecorativeMark({ variant = "compass", className }: Props) {
  if (variant === "stars") {
    return (
      <svg viewBox="0 0 120 120" className={clsx("w-full h-full text-fg/50", className)} fill="none">
        <path d="M60 10l3 20-3 12-3-12 3-20z" stroke="currentColor" strokeWidth="1" />
        <path d="M60 110l-3-20 3-12 3 12-3 20z" stroke="currentColor" strokeWidth="1" />
        <path d="M10 60l20 3 12-3-12-3-20 3z" stroke="currentColor" strokeWidth="1" />
        <path d="M110 60l-20-3-12 3 12 3 20-3z" stroke="currentColor" strokeWidth="1" />
        <circle cx="60" cy="60" r="10" stroke="currentColor" strokeWidth="1" />
        <path d="M30 30l10 6M90 30l-10 6M30 90l10-6M90 90l-10-6" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <circle cx="34" cy="24" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="88" cy="24" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="28" cy="94" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="96" cy="84" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 200" className={clsx("w-full h-full text-fg/60", className)} fill="none">
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="100" y1="16" x2="100" y2="184" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="100" x2="184" y2="100" stroke="currentColor" strokeWidth="1" />
      <path d="M100 24l14 48-14 16-14-16 14-48z" stroke="currentColor" strokeWidth="1" />
      <path d="M100 176l-14-48 14-16 14 16-14 48z" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
