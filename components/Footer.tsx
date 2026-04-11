"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

import { FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isEs = locale !== "en";

  const socials = [
    { label: "Instagram", icon: FiInstagram, url: "https://www.instagram.com/thechurchmedellin/" },
    { label: "Facebook", icon: FiFacebook, url: "https://www.facebook.com/thechurchmedellin/?locale=es_LA" },
    { label: "YouTube", icon: FiYoutube, url: "https://www.youtube.com/@thechurchmedellin" },
  ];

  const navLinks = [
    { label: isEs ? "Quiénes somos" : "About", href: "#about" },
    { label: isEs ? "Historia" : "Our Story", href: "#historia" },
    { label: isEs ? "Impacto" : "Impact", href: "#impacto" },
    { label: isEs ? "Testimonios" : "Testimonies", href: "#testimonios" },
    { label: isEs ? "Visión" : "Vision", href: "#vision" },
    { label: isEs ? "Donar" : "Give", href: "#donar" },
    { label: isEs ? "Ubicación" : "Location", href: "#ubicacion" },
    { label: isEs ? "Contacto" : "Contact", href: "#contacto" },
  ];

  return (
    <footer className="bg-[#040404] border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-14">

          {/* Logo + tagline */}
          <div>
            <div className="relative w-16 h-16 mb-4">
              <Image src="/logo.png" alt="The Cxurch Medellín" fill sizes="64px" className="object-contain" style={{ mixBlendMode: "screen" }} />
            </div>
            <p className="text-[#f4f0e8] font-display font-bold text-lg leading-tight mb-2">The Church Medellín</p>
            <p className="text-white/25 text-sm leading-relaxed max-w-[220px] mb-6">
              {isEs ? "Fe que transforma vidas. Impacto que transforma ciudades." : "Faith that transforms lives. Impact that transforms cities."}
            </p>
            {/* Schedule teaser */}
            <div className="flex items-start gap-3 p-4 bg-[#c9a96e]/8 border border-[#c9a96e]/15 rounded-sm">
              <span className="text-[#c9a96e] text-lg mt-0.5">🗓</span>
              <div>
                <p className="text-[#c9a96e] text-xs font-bold tracking-widest uppercase">{isEs ? "Domingos" : "Sundays"}</p>
                <p className="text-white/60 text-sm">10:00 AM — Itagüí</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label mb-5">{isEs ? "Secciones" : "Sections"}</p>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-3">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href}
                  className="text-white/30 text-sm hover:text-[#c9a96e] transition-colors">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact + address + socials */}
          <div>
            <p className="section-label mb-5">{isEs ? "Contacto" : "Contact"}</p>
            <div className="space-y-2 text-sm mb-5">
              <a href="tel:+573186898956" className="block text-white/35 hover:text-[#c9a96e] transition-colors">+57 318 689 8956</a>
              <a href="mailto:info@thechurchmedellin.com" className="block text-white/35 hover:text-[#c9a96e] transition-colors">info@thechurchmedellin.com</a>
            </div>
            <div className="text-white/25 text-xs leading-relaxed mb-6 space-y-0.5">
              <p>Calle 86 # 51A – 16, Itagüí</p>
              <p>Edificio Electroservimos – Piso 3</p>
              <a
                href="https://maps.app.goo.gl/L33xbdoegGU3wfuA9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors mt-2 text-xs"
              >
                📍 {isEs ? "Ver en Google Maps →" : "View on Google Maps →"}
              </a>
            </div>
            <p className="section-label mb-4">{t("follow")}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/35 hover:text-[#c9a96e] hover:border-[#c9a96e]/40 transition-colors text-xs font-bold rounded"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">{t("rights")}</p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#c9a96e]/20" />
            <p className="text-[#c9a96e]/20 text-xs tracking-widest uppercase">The Cxurch Latinoamérica</p>
            <div className="w-4 h-0.5 bg-[#c9a96e]/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}
