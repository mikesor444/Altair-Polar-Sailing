"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassButton from "./GlassButton";
import useEscape from "@/hooks/useEscape";
import { clsx } from "clsx";

export type FAQ = { q: string; a: string };

interface PanelProps {
  faqs: FAQ[];
  open?: boolean;
  onClose?: () => void;
  staticMode?: boolean;
  className?: string;
}

function useFocusTrap(active: boolean, panelRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button, textarea, input, select, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;
      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active, panelRef]);
}

const Avatar = () => (
  <div className="h-[42px] w-[42px] rounded-full bg-white/70 border border-border/70 overflow-hidden flex items-center justify-center">
    <Image src="/chatbot-avatar.png" alt="Chatbot avatar" width={42} height={42} className="h-full w-full object-cover" />
  </div>
);

export default function ChatbotPanel({ faqs, open = false, onClose, staticMode, className }: PanelProps) {
  const isOpen = staticMode ? true : open;
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState<string | null>(faqs[0]?.q || null);
  const [input, setInput] = useState("");

  useEscape(Boolean(isOpen && !staticMode), () => onClose?.());
  useFocusTrap(Boolean(isOpen && !staticMode), panelRef);

  useEffect(() => {
    if (!isOpen || staticMode) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose?.();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, staticMode, onClose]);

  useEffect(() => {
    if (!isOpen || staticMode) return;
    inputRef.current?.focus();
  }, [isOpen, staticMode]);

  if (!isOpen) return null;

  const content = (
    <div className="space-y-2 overflow-y-auto pr-1 max-h-[360px]">
      {faqs.map((faq) => (
        <div key={faq.q} className="border border-border/50 rounded-[14px] overflow-hidden bg-white/50">
          <button
            className="w-full flex items-center justify-between px-3 py-3 text-left"
            onClick={() => setExpanded(expanded === faq.q ? null : faq.q)}
            aria-expanded={expanded === faq.q}
          >
            <span className="font-medium">{faq.q}</span>
            <span className="text-muted">{expanded === faq.q ? "—" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {expanded === faq.q && (
              <motion.div
                className="px-3 pb-3 text-sm text-muted"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div>
        <div className="text-xs uppercase tracking-[0.12em] text-muted mb-2">Quick replies</div>
        <div className="flex flex-wrap gap-2">
          {["Fechas", "Precio aprox", "Qué incluye", "Qué llevar", "Mareo"].map((q) => (
            <button
              key={q}
              className="px-3 py-2 rounded-full border border-border/60 bg-white/60 text-sm text-fg hover:border-accent transition-colors duration-swift"
              onClick={() => setInput(q)}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const panel = (
    <div
      ref={panelRef}
      className={clsx("glass card p-4 w-full max-w-[360px] border border-border/80", className)}
      role={staticMode ? "region" : "dialog"}
      aria-modal={staticMode ? undefined : true}
      aria-label="Panel de consulta Altair"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar />
          <div>
            <div className="font-semibold">Pingüino Host</div>
            <div className="text-xs text-muted">Disponible</div>
          </div>
        </div>
        {!staticMode && (
          <GlassButton onClick={onClose} variant="ghost">
            ESC
          </GlassButton>
        )}
      </div>
      {content}
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setInput("");
        }}
      >
        <input
          ref={inputRef}
          aria-label="Mensaje"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 glass px-3 py-2 rounded-[12px] border border-border/70 bg-white/70 text-fg"
          placeholder="Escribe tu duda"
        />
        <GlassButton type="submit" tone="accent">
          Enviar
        </GlassButton>
      </form>
    </div>
  );

  if (staticMode) {
    return <div className="w-full max-w-[520px]">{panel}</div>;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed bottom-24 right-4 md:right-8 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          {panel}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ChatbotFab({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            className="fixed bottom-6 right-4 md:right-8 z-30 glass rounded-full px-4 py-3 shadow-glass border border-border/80 flex items-center gap-3"
            onClick={() => setOpen(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            aria-label="Abrir chat con pingüino"
          >
            <Avatar />
            <div className="text-left">
              <div className="font-semibold">Pingüino</div>
              <div className="text-xs text-muted">{hover ? "¿Te cotizo tu salida?" : "Hola"}</div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      <ChatbotPanel faqs={faqs} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
