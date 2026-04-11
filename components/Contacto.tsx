"use client";
import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
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

import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";

const WHATSAPP_URL = "https://wa.me/573186898956";

const socials = [
  { label: "Instagram", icon: FiInstagram, url: "https://www.instagram.com/thechurchmedellin/" },
  { label: "Facebook", icon: FiFacebook, url: "https://www.facebook.com/thechurchmedellin/?locale=es_LA" },
  { label: "YouTube", icon: FiYoutube, url: "https://www.youtube.com/@thechurchmedellin" },
];

export default function Contacto() {
  const t = useTranslations("contacto");
  const locale = useLocale();
  const isEs = locale !== "en";

  return (
    <section id="contacto" className="py-32 bg-[#080808] relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: info */}
          <div>
            <RevealDiv>
              <div className="flex items-center gap-3 mb-6">
                <div className="gold-line" /><span className="section-label">{t("label")}</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black text-[#f4f0e8] leading-[0.95] mb-6">{t("title")}</h2>
              <p className="text-white/55 text-lg leading-relaxed mb-10">{t("body")}</p>
            </RevealDiv>

            {/* Pastor card */}
            <RevealDiv delay={150}>
              <div className="flex items-center gap-6 p-6 bg-[#111111] border border-white/8 rounded-sm mb-8 hover:border-[#c9a96e]/30 transition-colors group">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#c9a96e]/25 group-hover:border-[#c9a96e] transition-colors">
                  <Image
                    src="/img-andres-esdras.jpg"
                    alt="Andrés Guerra — Senior Pastor"
                    fill
                    className="object-cover grayscale"
                    style={{ objectPosition: "center 10%" }}
                    quality={70}
                  />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-[#f4f0e8]">{t("pastor")}</p>
                  <p className="text-[#c9a96e] text-xs tracking-widest uppercase mt-1">{t("cargo")}</p>
                </div>
              </div>
            </RevealDiv>

            {/* Socials */}
            <RevealDiv delay={220}>
              <p className="section-label mb-4">{isEs ? "Redes sociales" : "Follow us"}</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/45 hover:text-[#c9a96e] border border-white/10 hover:border-[#c9a96e]/40 px-4 py-2.5 rounded transition-colors group">
                    <s.icon className="w-4 h-4 text-white/35 group-hover:text-[#c9a96e] transition-colors" /> {s.label}
                  </a>
                ))}
              </div>
            </RevealDiv>
          </div>

          {/* Right: WhatsApp CTA */}
          <RevealDiv delay={100}>
            <div className="flex flex-col items-center text-center bg-[#111111] border border-white/8 rounded-sm p-10 lg:p-14 gap-8">
              {/* WhatsApp icon */}
              <div className="w-20 h-20 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/25 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>

              <div>
                <h3 className="font-display text-3xl font-black text-[#f4f0e8] mb-3">
                  {isEs ? "Hablemos directamente" : "Let's talk directly"}
                </h3>
                <p className="text-white/45 text-base leading-relaxed max-w-xs mx-auto">
                  {isEs
                    ? "¿Tienes preguntas, quieres donar o simplemente conectar? Escríbenos por WhatsApp. Estamos aquí."
                    : "Questions, want to give, or just connect? Message us on WhatsApp. We're here."}
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-sm tracking-widest uppercase px-10 py-4 hover:bg-[#20BA5A] transition-all duration-300 rounded w-full justify-center max-w-xs"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {isEs ? "Abrir WhatsApp" : "Open WhatsApp"}
              </a>

              <p className="text-white/20 text-xs">+57 318 689 8956</p>
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
