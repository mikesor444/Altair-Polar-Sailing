"use client";

import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div className="absolute inset-0">
        <Image
          src="/altair/bg-ocean-aurora.png"
          alt="Fondo oce�nico aurora"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
      </div>
      <div className="gradient-wash" />
      <div className="noise-overlay" />
    </div>
  );
}
