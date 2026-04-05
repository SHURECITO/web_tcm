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

export default function NochesConJesus() {
  const t = useTranslations("impacto");
  const items = t.raw("noches_items") as string[];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Background — full visible, not cropped */}
      <div className="absolute inset-0">
        <Image
          src="/img-women.jpg"
          alt="Noches con Jesús — The Church Medellín"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
          quality={85}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.75) 55%, rgba(8,8,8,0.25) 100%)" }} />
        <div className="absolute inset-0 bg-[#080808]/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex items-center min-h-[90vh]">
        <div className="max-w-lg">
          <RevealDiv>
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-line" /><span className="section-label">{t("noches_label")}</span>
            </div>
          </RevealDiv>
          <RevealDiv delay={150}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#f4f0e8] leading-[0.95] mb-6">{t("noches_title")}</h2>
          </RevealDiv>
          <RevealDiv delay={250}>
            <p className="text-white/60 text-lg leading-relaxed mb-10">{t("noches_body")}</p>
          </RevealDiv>
          <div className="space-y-4">
            {items.map((item, i) => (
              <RevealDiv key={i} delay={350 + i * 80}>
                <div className="flex items-start gap-4 group">
                  <div className="mt-1.5 w-5 h-5 rounded-full border border-[#c9a96e] flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a96e] transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] group-hover:bg-[#080808] transition-colors" />
                  </div>
                  <p className="text-white/65 text-base leading-relaxed group-hover:text-white transition-colors">{item}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv delay={700}>
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">
              {[{ num: "7+", label: "años" }, { num: "100+", label: "líderes" }, { num: "∞", label: "vidas transformadas" }].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-3xl font-black text-[#c9a96e]">{s.num}</p>
                  <p className="text-white/35 text-xs tracking-widest uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
