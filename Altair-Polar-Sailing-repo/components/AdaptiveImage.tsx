"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import DecorativeMark from "./DecorativeMark";
import { clsx } from "clsx";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  fillContainer?: boolean;
  overlay?: boolean;
}

export default function AdaptiveImage({ src, alt, fillContainer, overlay, className, sizes, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  const defaultSizes = "(max-width: 768px) 100vw, 50vw";

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-white/60 via-accent/10 to-night/10 text-muted flex items-center justify-center relative">
        <div className="absolute inset-4 opacity-[0.14]">
          <DecorativeMark variant="stars" />
        </div>
        <span className="z-10 text-sm">Imagen en preparación</span>
      </div>
    );
  }

  if (fillContainer) {
    return (
      <Image
        src={src}
        fill
        sizes={sizes ?? defaultSizes}
        alt={alt}
        className={clsx("object-cover", overlay && "brightness-[0.9]", className)}
        onError={() => setFailed(true)}
        {...rest}
      />
    );
  }

  return (
    <Image
      src={src}
      width={400}
      height={260}
      alt={alt}
      sizes={sizes ?? defaultSizes}
      className={clsx("object-cover w-full h-full", overlay && "brightness-[0.9]", className)}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
