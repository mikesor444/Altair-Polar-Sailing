"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassButton from "./GlassButton";
import useEscape from "@/hooks/useEscape";

interface Props {
  open: boolean;
  onClose: () => void;
}

const links = [
  { label: "Hero", href: "#hero" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Itinerario", href: "#itinerario" },
  { label: "Momentos", href: "#momentos" },
  { label: "El barco", href: "#barco" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" }
];

export default function MenuOverlay({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEscape(open, onClose);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-fg/20 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            className="absolute inset-4 md:inset-10 glass card p-6 flex flex-col gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <div className="font-serif text-2xl">Navegar</div>
              <GlassButton onClick={onClose} variant="ghost">
                Cerrar
              </GlassButton>
            </div>
            <div className="grid md:grid-cols-2 gap-3 flex-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="glass p-4 rounded-[16px] border border-border/60 hover:border-accent transition-colors duration-swift"
                >
                  <div className="text-lg font-semibold">{link.label}</div>
                  <div className="text-sm text-muted">Ir a {link.label.toLowerCase()}</div>
                </a>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <GlassButton href="#contacto" tone="accent">
                Pedir cotización
              </GlassButton>
              <GlassButton href="#itinerario">
                Ver itinerario
              </GlassButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
