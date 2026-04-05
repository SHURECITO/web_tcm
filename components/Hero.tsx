"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = scrollY * 0.4;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `scale(1.1) translateY(${parallax}px)` }}
      >
        <Image
          src="/img-stage.jpg"
          alt="The Church Medellín — worship service"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 pt-40">
        <div className="max-w-3xl animate-fade-in-up">
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="gold-line" />
            <span className="section-label">The Church Medellín</span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6">
            <span className="block text-[#f4f0e8]">{t("tagline")}</span>
            <span className="block italic text-[#c9a96e] mt-1">{t("tagline2")}</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-xl mt-8 mb-12">
            {t("sub")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#080808] font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#e8c98a] transition-all duration-300 hover:gap-5 rounded"
            >
              {t("cta")}
              <span>→</span>
            </a>
            <a
              href="#donar"
              className="inline-flex items-center gap-3 border border-white/20 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300 rounded"
            >
              {t("donar")}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#c9a96e] animate-pulse" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}
