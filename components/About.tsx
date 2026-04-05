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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#c9a96e] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#c9a96e] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <RevealDiv className="relative" delay={0}>
            <div className="relative aspect-[3/4] max-h-[640px] overflow-hidden rounded-sm">
              <Image
                src="/img-andres-esdras.jpg"
                alt="Pastores The Church Medellín"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                quality={85}
              />
              {/* Gold frame accent */}
              <div className="absolute inset-0 border border-[#c9a96e]/20 rounded-sm pointer-events-none" />
            </div>
            {/* Floating quote */}
            <div className="absolute -bottom-6 -right-6 bg-[#c9a96e] text-[#080808] p-6 max-w-[200px] hidden lg:block">
              <p className="font-display text-sm font-bold italic leading-snug">
                &ldquo;{t("conviction")}&rdquo;
              </p>
            </div>
          </RevealDiv>

          {/* Right: Text */}
          <div>
            <RevealDiv delay={100}>
              <div className="flex items-center gap-3 mb-6">
                <div className="gold-line" />
                <span className="section-label">{t("label")}</span>
              </div>
            </RevealDiv>

            <RevealDiv delay={200}>
              <h2 className="font-display text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-[#f4f0e8] mb-3">
                {t("title")}
              </h2>
              <h3 className="font-display text-4xl md:text-5xl font-black italic text-[#c9a96e] mb-8">
                {t("subtitle")}
              </h3>
            </RevealDiv>

            <RevealDiv delay={300}>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {t("body")}
              </p>
            </RevealDiv>

            {/* Mobile conviction quote */}
            <RevealDiv delay={350} className="lg:hidden mb-8">
              <blockquote className="border-l-2 border-[#c9a96e] pl-5 text-[#c9a96e] font-display italic text-xl">
                &ldquo;{t("conviction")}&rdquo;
              </blockquote>
            </RevealDiv>

            <RevealDiv delay={400}>
              <div className="border-t border-white/10 pt-8">
                <p className="section-label mb-3">{t("mision_label")}</p>
                <p className="text-[#f4f0e8] text-xl font-medium leading-relaxed">
                  {t("mision")}
                </p>
              </div>
            </RevealDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
