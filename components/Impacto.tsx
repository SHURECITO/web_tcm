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

        {/* MADE banner */}
        <RevealDiv className="mb-16">
          <div className="relative overflow-hidden rounded-sm bg-[#c9a96e]">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-center relative overflow-hidden">
                <span className="font-display text-[8rem] font-black text-[#080808]/15 absolute -top-3 -left-2 select-none hidden lg:block pointer-events-none leading-none tracking-tighter">MADE</span>
                <p className="section-label text-[#080808]/70 mb-3 relative z-10">{t("made_label")}</p>
                <h3 className="font-display text-3xl font-black text-[#080808] mb-4 leading-tight relative z-10">{t("made_title")}</h3>
                <p className="text-[#080808]/75 text-sm leading-relaxed relative z-10">{t("made_body")}</p>
              </div>
              <div className="lg:col-span-3 relative" style={{ minHeight: "340px" }}>
                <Image
                  src="/img-teaching.jpg"
                  alt="MADE — The Church Medellín"
                  fill
                  sizes="(max-width:1024px) 100vw, 60vw"
                  className="object-cover"
                  style={{ objectPosition: "center 25%" }}
                  quality={85}
                />
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
