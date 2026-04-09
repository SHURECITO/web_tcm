"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.disconnect(); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Impacto() {
  const t = useTranslations("impacto");
  const cards = t.raw("cards") as Array<{ icon: string; title: string; sub: string; body: string }>;

  return (
    <section id="impacto" className="py-32 relative bg-[#0d0d0d]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <RevealDiv className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="gold-line" /><span className="section-label">{t("label")}</span>
          </div>
          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-black text-[#f4f0e8] leading-[0.95]">{t("title")}</h2>
              <p className="text-white/40 text-xl mt-3 max-w-lg">{t("intro")}</p>
            </div>
          </div>
        </RevealDiv>

        {/* MADE banner — redesigned */}
        <RevealDiv className="mb-16">
          <div className="relative overflow-hidden rounded-xl bg-[#c9a96e]">
            <div className="grid lg:grid-cols-5 min-h-[360px]">

              {/* Left: text content */}
              <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-between relative z-10">
                {/* Top block */}
                <div>
                  {/* MADE as contained heading */}
                  <h2 className="font-display text-[5.5rem] lg:text-[7rem] font-black text-[#080808] leading-none tracking-tighter mb-3">
                    MADE
                  </h2>
                  <div className="h-0.5 w-full bg-[#080808]/20 mb-6" />
                  <p className="section-label text-[#080808]/60 mb-2">{t("made_label")}</p>
                  <h3 className="font-display text-2xl lg:text-3xl font-black text-[#080808] mb-4 leading-tight">
                    {t("made_title")}
                  </h3>
                  <p className="text-[#080808]/70 text-sm leading-relaxed max-w-sm">
                    {t("made_body")}
                  </p>
                </div>

                {/* Bottom: 5 spheres */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "Gobierno",
                    "Fuerzas Militares",
                    "Educación",
                    "Deporte",
                    "Sistema Penitenciario",
                  ].map((sphere) => (
                    <span
                      key={sphere}
                      className="text-[11px] font-bold tracking-wide uppercase bg-[#080808]/10 hover:bg-[#080808]/20 text-[#080808] px-3 py-1.5 rounded-full transition-colors cursor-default"
                    >
                      {sphere}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: image */}
              <div className="lg:col-span-3 relative">
                <Image
                  src="/img-teaching.jpg"
                  alt="MADE — The Church Medellín"
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  className="object-cover"
                  style={{ objectPosition: "center 25%" }}
                  quality={85}
                />
                {/* Fade from gold to image */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#c9a96e] to-transparent hidden lg:block pointer-events-none" />
              </div>
            </div>
          </div>
        </RevealDiv>


        {/* 4 impact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {cards.map((card, i) => (
            <RevealDiv key={i} delay={i * 100}>
              <div className={`h-full bg-[#111111] border ${i % 3 === 0 ? "border-[#c9a96e]/30" : "border-white/8"} p-8 hover:border-[#c9a96e]/50 transition-all duration-500 group rounded-sm overflow-hidden relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/0 group-hover:from-[#c9a96e]/5 to-transparent transition-all duration-500" />
                <div className="relative z-10">
                  <div className="text-3xl mb-5">{card.icon}</div>
                  <h4 className="font-display text-xl font-bold text-[#f4f0e8] mb-1">{card.title}</h4>
                  <p className="text-[#c9a96e] text-xs font-semibold tracking-widest uppercase mb-4">{card.sub}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
    </section>
  );
}
