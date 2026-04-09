"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

function RevealDiv({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Vision() {
  const t = useTranslations("vision");
  const dItems = t.raw("diferencia_items") as string[];

  return (
    <section id="vision" className="py-32 bg-[#080808] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a96e]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Why Medellín */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          <RevealDiv delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-line" />
              <span className="section-label">{t("label")}</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black text-[#f4f0e8] leading-[0.95] mb-8">
              {t("title")}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">{t("body")}</p>

            </RevealDiv>

          {/* Differentiators */}
          <div>
            <RevealDiv delay={200}>
              <h3 className="font-display text-2xl font-bold text-[#f4f0e8] mb-8">
                {t("diferencia_title")}
              </h3>
            </RevealDiv>
            <div className="space-y-6">
              {dItems.map((item, i) => (
                <RevealDiv key={i} delay={250 + i * 80}>
                  <div className="flex gap-5 items-start group">
                    <span className="font-display text-4xl font-black text-[#c9a96e]/20 group-hover:text-[#c9a96e]/40 transition-colors leading-none mt-1 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-white/60 text-base leading-relaxed pt-2 group-hover:text-white/80 transition-colors border-b border-white/5 pb-6 w-full">
                      {item}
                    </p>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </div>

        {/* Long-term vision — image only (sembramos, avanzamos, permanecemos) */}
        <RevealDiv>
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-2xl w-full max-w-4xl">
              <Image
                src="/img-frase.jpg"
                alt="Sembramos, Avanzamos, Permanecemos — The Church Medellín"
                width={1400}
                height={900}
                className="w-full h-auto"
                quality={85}
              />
              {/* Subtle vignette only, no text */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/8 via-transparent to-[#080808]/8 pointer-events-none" />
            </div>
          </div>
        </RevealDiv>
      </div>
    </section>
  );
}
