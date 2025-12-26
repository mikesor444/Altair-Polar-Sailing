"use client";

import { useEffect, useState } from "react";
import GlassButton from "./GlassButton";
import MenuOverlay from "./MenuOverlay";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "night">("light");

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 12);
    };
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.body.getAttribute("data-section-theme");
      if (current === "night" || current === "light") setTheme(current);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-section-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const openMenu = () => setMenuOpen(true);
    window.addEventListener("altair:menu", openMenu as EventListener);
    return () => window.removeEventListener("altair:menu", openMenu as EventListener);
  }, []);

  return (
    <>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-glide ${
          scrolled ? "glass py-2 shadow-glass" : "bg-transparent py-4"
        }`}
        data-theme={theme}
      >
        <div className="section-shell flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-[34px] w-[34px] rounded-full bg-white/60 border border-border/60 backdrop-blur-md flex items-center justify-center text-sm font-semibold text-fg">
              A
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-lg">Altair</span>
              <span className="text-xs text-muted uppercase tracking-[0.18em]">Antártica</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <GlassButton href="#itinerario" variant="ghost">
              Itinerario
            </GlassButton>
            <GlassButton href="#momentos" variant="ghost">
              Momentos
            </GlassButton>
            <GlassButton href="#barco" variant="ghost">
              El barco
            </GlassButton>
            <GlassButton href="#contacto" tone="accent">
              Cotizar
            </GlassButton>
          </nav>
          <div className="md:hidden">
            <GlassButton onClick={() => setMenuOpen(true)} variant="ghost">
              Menú
            </GlassButton>
          </div>
        </div>
      </header>
    </>
  );
}
