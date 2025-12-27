"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import GlassButton from "@/components/GlassButton";
import DecorativeMark from "@/components/DecorativeMark";
import AdaptiveImage from "@/components/AdaptiveImage";
import ChatbotPanel, { ChatbotFab } from "@/components/Chatbot";
import useSectionTheme from "@/hooks/useSectionTheme";
import { Container } from "@/components/Container";
import {
  experiencePoints,
  itinerary,
  moments,
  specs,
  includes,
  excludes,
  faqs,
  testimonials
} from "@/lib/content";
import { clsx } from "clsx";

export default function Page() {
  const prefersReduced = useReducedMotion();
  useSectionTheme();

  const heroMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: prefersReduced ? 0 : 26 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: prefersReduced ? 0 : 0.45, ease: "easeOut" }
    }),
    [prefersReduced]
  );

  return (
    <>
      <section id="hero" data-section-theme="light" className="section relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="gradient-wash" />
          <div className="noise-overlay" />
        </div>
        <Container className="grid gap-8 md:grid-cols-2 items-end relative">
          <motion.div {...heroMotion} className="relative glass card p-5 md:p-6 max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.24em] text-muted font-medium">Schooner privado</p>
              <h1 className="font-serif text-[var(--h1)] leading-tight">Altair — Antártica, en privado.</h1>
              <p className="text-lg md:text-xl text-muted">
                Máximo 6 invitados. 60 ft, dos mástiles. Tripulación polar. Ritmo humano, calma y flexibilidad para bordear hielo y viento.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <GlassButton href="#itinerario" tone="accent">
                  Ver itinerario
                </GlassButton>
                <GlassButton href="#contacto" variant="ghost">
                  Pedir cotización
                </GlassButton>
              </div>
            </div>
            <div className="absolute right-[-40px] bottom-[-80px] w-[260px] md:w-[320px] h-[260px] md:h-[320px] opacity-[0.16] rotate-[8deg]">
              <DecorativeMark variant="compass" />
            </div>
          </motion.div>
          <div className="relative rounded-[22px] overflow-hidden border border-border/50 aspect-[4/3] w-full">
            <AdaptiveImage src="/altair/hero-altair.png" alt="Altair navegando en Antártica" fillContainer priority overlay />
          </div>
        </Container>
      </section>

      <section id="experiencia" data-section-theme="light" className="section">
        <Container>
          <div className="glass card p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-2 items-start">
              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: prefersReduced ? 0 : 0.32 }}
                className="flex flex-col gap-2"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Experiencia</p>
                <h2 className="font-serif text-[var(--h2)] leading-tight">Micro-expedición, sin multitudes.</h2>
                <p className="text-muted text-[var(--p)]">
                  Navegamos como estudio móvil: decisiones diarias según hielo, viento y vida marina. Cabinas compactas, cubierta cálida, zarpes tempranos y
                  desembarcos en grupos pequeños. Briefings claros, ritmo humano y silencio cuando hace falta.
                </p>
              </motion.div>
              <motion.ul
                initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.08, duration: prefersReduced ? 0 : 0.32 }}
                className="grid gap-3 sm:gap-4"
              >
                {experiencePoints.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-fg leading-relaxed">
                    <span className="mt-[6px] h-[10px] w-[10px] rounded-full bg-accent/70 shadow-[0_0_0_6px_rgba(56,214,198,0.12)]" />
                    <span className="text-base md:text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="itinerario" data-section-theme="light" className="section">
        <Container className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-serif text-[var(--h2)] leading-tight">Itinerario visual 9–11 días</h2>
            <GlassButton
              onClick={() => {
                window.dispatchEvent(new Event("altair:menu"));
              }}
              variant="ghost"
            >
              Menú
            </GlassButton>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {itinerary.map((item, idx) => (
              <motion.article
                key={item.title}
                className="glass card p-4 flex gap-3 items-start"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: prefersReduced ? 0 : 0.28, delay: idx * 0.05 }}
              >
                <div className="relative w-full max-w-[140px] aspect-square rounded-[14px] overflow-hidden border border-border/40">
                  <AdaptiveImage src={item.image} alt={item.title} fillContainer sizes="(max-width: 768px) 30vw, 200px" />
                  <div className="absolute inset-0 opacity-[0.12]">
                    <DecorativeMark variant={idx % 2 === 0 ? "stars" : "compass"} />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm uppercase tracking-[0.12em] text-muted">Día {idx + 1}</p>
                  <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section id="momentos" data-section-theme="light" className="section">
        <Container className="space-y-4 md:space-y-6">
          <h3 className="font-serif text-[var(--h2)] leading-tight">Momentos a bordo</h3>
          <div className="grid gap-4 lg:grid-cols-3">
            {moments.map((moment, idx) => (
              <motion.article
                key={moment.title}
                className={clsx("glass card p-4 flex flex-col gap-3", idx === 0 ? "lg:col-span-2" : "")}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: prefersReduced ? 0 : 0.3, delay: idx * 0.04 }}
              >
                <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden border border-border/40">
                  <AdaptiveImage src={moment.image} alt={moment.title} fillContainer sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute right-4 top-4 w-[90px] opacity-[0.12]">
                    <DecorativeMark variant={idx % 3 === 0 ? "compass" : "stars"} />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold">{moment.title}</h3>
                <p className="text-muted text-base leading-relaxed">{moment.caption}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section id="barco" data-section-theme="light" className="section">
        <Container>
          <div className="glass card p-5 md:p-6">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.18em] text-muted">El barco</p>
                <h2 className="font-serif text-[var(--h2)] leading-tight">Altair, 60 ft — doble mástil, compacto y preciso.</h2>
                <p className="text-muted leading-relaxed">
                  Cubierta preparada para clima austral, cabinas dobles, comedor cálido y espacio de briefing. Propulsión auxiliar silenciosa para maniobras
                  cercanas a hielo. Kayaks y dinghy listos, café listo a las 05:30.
                </p>
                <div className="flex flex-wrap gap-2">
                  {specs.map((spec) => (
                    <span key={spec} className="px-3 py-2 rounded-full bg-border/20 text-sm text-fg border border-border/60">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass p-4 card">
                  <h3 className="text-lg font-semibold mb-2">Incluye</h3>
                  <ul className="space-y-3 sm:space-y-2 text-muted leading-relaxed">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[8px] w-[8px] rounded-full bg-accent/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-4 card">
                  <h3 className="text-lg font-semibold mb-2">No incluye</h3>
                  <ul className="space-y-3 sm:space-y-2 text-muted leading-relaxed">
                    {excludes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[6px] h-[8px] w-[8px] rounded-full bg-accent2/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="testimonios" data-section-theme="light" className="section">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.blockquote
                key={t.author}
                className="glass card p-4 flex flex-col gap-3"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: prefersReduced ? 0 : 0.28, delay: idx * 0.05 }}
              >
                <div className="text-lg text-fg leading-relaxed">“{t.quote}”</div>
                <div className="text-sm text-muted">{t.author}</div>
                <div className="absolute left-[-40px] top-[-24px] w-[120px] opacity-[0.08]">
                  <DecorativeMark variant="stars" />
                </div>
              </motion.blockquote>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq-chat" data-section-theme="night" className="section">
        <Container>
          <div className="glass card p-5 md:p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-night via-night/80 to-fg/10 pointer-events-none" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-muted">Orientación</p>
                  <h2 className="font-serif text-[var(--h2)] leading-tight text-bg">FAQ y pingüino host</h2>
                </div>
                <div className="w-[120px] opacity-[0.12]">
                  <DecorativeMark variant="compass" />
                </div>
              </div>
              <ChatbotPanel faqs={faqs} staticMode className="bg-white/10" />
            </div>
          </div>
        </Container>
      </section>

      <section id="contacto" data-section-theme="light" className="section">
        <Container>
          <div className="glass card p-5 md:p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.18em] text-muted">Contacto</p>
                <h2 className="font-serif text-[var(--h2)] leading-tight">Cuéntanos tu ventana de zarpes.</h2>
                <p className="text-muted leading-relaxed">
                  Respuesta humana en menos de 24 h. Coordinamos videollamada breve y adaptamos la salida al hielo y al viento.
                </p>
                <div className="flex flex-col gap-2 text-base text-fg">
                  <div>Tel: +56 9 1234 5678</div>
                  <div>Radio marina: “Altair Charter” — 16/72</div>
                  <div>Email: booking@altair-antarctica.com</div>
                  <div>Base: Muelle Ushuaia / Temporada austral</div>
                </div>
              </div>
              <form className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-muted" htmlFor="nombre">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    required
                    className="glass px-3 py-3 rounded-[14px] border border-border/60 bg-white/60 text-fg min-h-[44px]"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-muted" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="glass px-3 py-3 rounded-[14px] border border-border/60 bg-white/60 text-fg min-h-[44px]"
                    placeholder="nombre@dominio.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-muted" htmlFor="ventana">
                    Ventana tentativa
                  </label>
                  <input
                    id="ventana"
                    name="ventana"
                    className="glass px-3 py-3 rounded-[14px] border border-border/60 bg-white/60 text-fg min-h-[44px]"
                    placeholder="Ej. diciembre 2025, 10-12 días"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-muted" htmlFor="mensaje">
                    Detalles clave
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={3}
                    className="glass px-3 py-3 rounded-[14px] border border-border/60 bg-white/60 text-fg resize-none"
                    placeholder="Intereses, alergias, nivel de experiencia en navegación"
                  />
                </div>
                <GlassButton type="submit" tone="accent">
                  Enviar
                </GlassButton>
              </form>
            </div>
          </div>
        </Container>
      </section>
      <ChatbotFab faqs={faqs} />
    </>
  );
}



