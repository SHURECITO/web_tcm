"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

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

const MAP_LINKS = {
  gmaps: "https://maps.app.goo.gl/L33xbdoegGU3wfuA9",
  waze:  "https://ul.waze.com/ul?place=ChIJu2cfFouDRo4R5C2zrqr4Bvg&ll=6.19219590%2C-75.59143540&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
  apple: "https://maps.apple.com/place?ll=6.19219590,-75.59143540&q=The+Church+Medell%C3%ADn&_provider=9902",
};

const GmapsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);
const WazeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
    <path d="M20.54 6.63C19.46 4.52 17.56 2.96 15.27 2.3 13 1.65 10.56 1.97 8.53 3.14 6.5 4.31 5.04 6.24 4.43 8.5c-.61 2.27-.28 4.68.9 6.71l.01.02 3.38 5.85c.37.64 1.04 1.02 1.76 1.02h2.93c.72 0 1.39-.38 1.76-1.02l3.39-5.86c1.21-2.1 1.49-4.55.98-6.59zm-8.54 9.87c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"/>
  </svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
  </svg>
);

export default function Ubicacion() {
  const t = useTranslations("ubicacion");

  const mapButtons = [
    { label: t("btn_gmaps"), href: MAP_LINKS.gmaps, icon: <GmapsIcon />, color: "bg-[#4285F4]/10 border-[#4285F4]/25 text-[#4285F4] hover:bg-[#4285F4]/20 hover:border-[#4285F4]/50" },
    { label: t("btn_waze"),  href: MAP_LINKS.waze,  icon: <WazeIcon />,  color: "bg-[#05C8F7]/10 border-[#05C8F7]/25 text-[#05C8F7] hover:bg-[#05C8F7]/20 hover:border-[#05C8F7]/50" },
    { label: t("btn_apple"), href: MAP_LINKS.apple, icon: <AppleIcon />, color: "bg-white/5 border-white/15 text-white/60 hover:bg-white/10 hover:border-white/30" },
  ];

  return (
    <section id="ubicacion" className="py-28 bg-[#060606] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#c9a96e]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <RevealDiv className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="gold-line" /><span className="section-label">{t("label")}</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-[#f4f0e8] leading-[0.95]">{t("title")}</h2>
        </RevealDiv>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Left: schedule + address stacked */}
          <div className="space-y-5">

            {/* Schedule card */}
            <RevealDiv delay={0}>
              <div className="bg-[#c9a96e] rounded-sm p-8 relative overflow-hidden">
                <span className="absolute -right-3 -bottom-5 font-display text-9xl font-black text-[#080808]/10 select-none pointer-events-none leading-none">10AM</span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5 text-[#080808]">
                    <ClockIcon />
                    <span className="text-xs font-bold tracking-widest uppercase opacity-70">{t("horario_label")}</span>
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-black text-[#080808] leading-tight mb-1">{t("horario")}</p>
                  <p className="text-[#080808]/80 text-xl font-semibold">{t("hora")}</p>
                </div>
              </div>
            </RevealDiv>

            {/* Address + schedule details in same card */}
            <RevealDiv delay={100}>
              <div className="bg-[#111111] border border-white/8 hover:border-[#c9a96e]/25 transition-colors rounded-sm p-8">

                {/* Two-column mini-grid: address left, schedule right */}
                <div className="grid sm:grid-cols-2 gap-6 mb-7">

                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-[#c9a96e]">
                      <PinIcon /><span className="section-label">{t("dir_label")}</span>
                    </div>
                    <p className="text-[#f4f0e8] font-display text-lg font-bold leading-tight mb-1">{t("dir1")}</p>
                    <p className="text-white/40 text-xs leading-relaxed mb-2">{t("dir2")}</p>
                    <p className="text-[#c9a96e] text-sm font-semibold">{t("dir3")}</p>
                    <p className="text-white/65 text-sm font-medium">{t("dir4")}</p>
                  </div>

                  {/* Schedule summary */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-[#c9a96e]">
                      <ClockIcon /><span className="section-label">{t("horario_label")}</span>
                    </div>
                    <p className="text-[#f4f0e8] font-display text-lg font-bold leading-tight mb-1">{t("horario")}</p>
                    <p className="text-white/55 text-sm">{t("hora")}</p>
                    <div className="mt-3 inline-flex items-center gap-2 bg-[#c9a96e]/10 border border-[#c9a96e]/20 rounded px-3 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
                      <span className="text-[#c9a96e] text-xs font-semibold tracking-wide">Único servicio</span>
                    </div>
                  </div>
                </div>

                {/* Map buttons */}
                <div className="flex flex-wrap gap-3">
                  {mapButtons.map((btn) => (
                    <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border text-xs font-bold tracking-wide uppercase px-4 py-2.5 rounded transition-all duration-300 ${btn.color}`}>
                      {btn.icon}{btn.label}
                    </a>
                  ))}
                </div>
              </div>
            </RevealDiv>
          </div>

          {/* Right: embedded map */}
          <RevealDiv delay={150}>
            <div className="relative rounded-sm overflow-hidden border border-white/8 h-full min-h-[440px] group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d994!2d-75.59143540!3d6.19219590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4683138b271fab%3A0xf806f8aaadb32de4!2sCalle%2086%20%2351A-16%2C%20Itag%C3%BC%C3%AD%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1700000000000"
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full transition-all duration-700"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.25) brightness(0.85)", opacity: 0.75 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Church Medellín — Ubicación"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                <a href={MAP_LINKS.gmaps} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#080808] font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded hover:bg-[#e8c98a] transition-colors pointer-events-auto">
                  <GmapsIcon />{t("btn_get_directions")} →
                </a>
              </div>
            </div>
          </RevealDiv>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
    </section>
  );
}
