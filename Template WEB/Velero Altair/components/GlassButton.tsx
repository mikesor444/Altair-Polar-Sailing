import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { clsx } from "clsx";

type BaseProps = {
  tone?: "accent";
  variant?: "solid" | "ghost";
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

export default function GlassButton({ tone, variant = "solid", className, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-swift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles = clsx(
    variant === "solid" && "glass border border-border/70",
    variant === "ghost" && "border border-transparent hover:border-border/70 glass",
    tone === "accent" && "bg-accent/90 text-night hover:bg-accent/80 focus-visible:outline-accent",
    tone !== "accent" && "text-fg hover:bg-white/40 focus-visible:outline-border",
    className
  );

  if ("href" in rest && rest.href) {
    return (
      <a className={clsx(base, styles)} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={clsx(base, styles)} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
