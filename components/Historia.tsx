"use client";
import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

const historyData = [
  { img: "/img-inicios.jpg",   pos: "center 20%" },
  { img: "/img-mayorca.jpg",   pos: "center 35%" },
  { img: "/img-lasvegas.jpg",  pos: "center 25%" },
  { img: "/img-inexmoda.jpg",  pos: "center 30%" },
  { img: "/img-itagui.jpg",    pos: "center 35%" },
];

const historyExtra: { es: string; en: string }[] = [
  {
    es: "Con un puñado de creyentes y una promesa en el corazón, Andrés Guerra y su equipo comenzaron a reunirse en espacios pequeños, convencidos de que Dios estaba a punto de hacer algo grande en Medellín. Los inicios fueron austeros, cargados de fe y oración. Cada domingo era un acto de confianza: llegaban sin saber cuántos vendrían, pero Dios no fallaba.",
    en: "With a handful of believers and a promise in their hearts, Andrés Guerra and his team began gathering in small spaces, convinced that God was about to do something great in Medellín. The beginnings were humble, filled with faith and prayer. Each Sunday was an act of trust — they came without knowing how many would show up, but God never failed.",
  },
  {
    es: "El Auditorio Mayorca marcó el primer salto de fe. Por primera vez la congregación tuvo un espacio con infraestructura real: tarima, sonido y capacidad para crecer. Fue la temporada de los cimientos: se formaron los primeros líderes, se estableció la cultura de servicio, y comenzaron las primeras historias de transformación radical que hoy son testimonio vivo.",
    en: "Auditorio Mayorca marked the first leap of faith. For the first time the congregation had a real infrastructure space: a stage, sound, and capacity to grow. It was the season of foundations — the first leaders were formed, a culture of service was established, and the first stories of radical transformation began.",
  },
  {
    es: "La Sede Las Vegas fue el escenario donde The Church Medellín salió del molde de las iglesias convencionales. Con una estética urbana, música contemporánea y mensajes directos, la iglesia comenzó a llegar a jóvenes que nunca habían pisado un templo. El equipo se multiplicó, los ministerios tomaron forma y la visión de impacto social empezó a cobrar vida.",
    en: "The Las Vegas Campus was the setting where The Church Medellín broke away from the mold of conventional churches. With urban aesthetics, contemporary music, and direct messages, the church began reaching young people who had never set foot in a temple. The team multiplied and ministries took shape.",
  },
  {
    es: "Inexmoda fue la sede que nos enseñó que nada puede detener lo que Dios está construyendo. En medio de la pandemia, cuando el mundo cerró sus puertas, la iglesia no se detuvo. Nos adaptamos, innovamos y seguimos sembrando. Fue en esta temporada cuando el modelo 'Noches con Jesús' alcanzó su mayor expansión territorial, llegando a barrios antes inaccesibles.",
    en: "Inexmoda was the campus that taught us that nothing can stop what God is building. In the middle of a pandemic, when the world closed its doors, the church did not stop. We adapted, innovated, and kept sowing. The 'Nights with Jesus' model reached its greatest territorial expansion during this season.",
  },
  {
    es: "Itagüí no es solo una nueva dirección — es una declaración. Después de años de crecimiento en fe, en liderazgo y en impacto, The Church Medellín encontró su hogar en San Fernando, a pasos del Parque de las Chimeneas. Hoy, cada domingo, más de mil personas se reúnen con un propósito: ser transformados y transformar. La historia continúa siendo escrita.",
    en: "Itagüí is not just a new address — it is a declaration. After years of growth in faith, leadership, and impact, The Church Medellín found its home in San Fernando, steps from Parque de las Chimeneas. Today, every Sunday, more than a thousand people gather with one purpose: to be transformed and to transform.",
  },
];

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function Historia() {
  const t = useTranslations("historia");
  const locale = useLocale();
  const isEs = locale !== "en";
  const items = t.raw("items") as Array<{ year: string; lugar: string; desc: string }>;

  return (
    <section id="historia" className="py-32 bg-[#060606] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <RevealDiv className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-line" /><span className="section-label">{t("label")}</span><div className="gold-line" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black tracking-tight text-[#f4f0e8]">{t("title")}</h2>
          <p className="text-white/35 mt-4 text-base max-w-md mx-auto">{t("intro")}</p>
        </RevealDiv>

        {/* Scripture verse */}
        <RevealDiv className="mb-28">
          <div className="relative w-full overflow-hidden rounded-sm" style={{ minHeight: "360px" }}>
            <Image
              src="/img-verse.jpg"
              alt="Salmos 126"
              fill sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
              quality={85}
            />
            <div className="absolute inset-0 bg-[#080808]/62 flex items-center justify-center p-8 md:p-16">
              <blockquote className="font-display text-xl md:text-3xl lg:text-4xl italic text-[#f4f0e8] text-center max-w-3xl leading-snug">
                &ldquo;{t("frase")}&rdquo;
              </blockquote>
            </div>
          </div>
        </RevealDiv>

        {/* Timeline */}
        <div className="space-y-24">
          {items.map((item, i) => {
            const isEven = i % 2 === 0;
            const extra = historyExtra[i];

            return (
              <div key={i}>
                {/* ── DESKTOP: side-by-side, items-start so both columns start at top ── */}
                <div className={`hidden lg:flex gap-14 items-start ${!isEven ? "flex-row-reverse" : ""}`}>

                  {/* Image column — 55% */}
                  <RevealDiv delay={isEven ? 0 : 120} className="w-[55%] flex-shrink-0">
                    <div className="relative w-full overflow-hidden rounded-sm group border border-white/5 hover:border-[#c9a96e]/20 transition-colors duration-500">
                      {/* Full original-ratio image: width=900 height=auto */}
                      <Image
                        src={historyData[i].img}
                        alt={`${item.lugar} — The Church Medellín`}
                        width={900}
                        height={900}
                        sizes="50vw"
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                        quality={85}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060606]/50 to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 bg-[#c9a96e] text-[#080808] px-4 py-1.5 font-bold text-xs tracking-widest uppercase rounded-sm">
                        {item.year}
                      </div>
                    </div>
                  </RevealDiv>

                  {/* Text column — remaining width, sticky to top */}
                  <RevealDiv delay={isEven ? 140 : 0} className="flex-1 pt-4">
                    {/* Dot + year */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-[#c9a96e] bg-[#060606] flex-shrink-0" />
                      <span className="section-label">{item.year}</span>
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-black text-[#f4f0e8] mb-4 leading-tight">
                      {item.lugar}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed mb-3">{item.desc}</p>
                    <p className="text-white/38 text-sm leading-relaxed mb-8">
                      {isEs ? extra.es : extra.en}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-10 bg-[#c9a96e]/35" />
                      <span className="text-[#c9a96e]/40 text-xs tracking-widest font-semibold">
                        {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                  </RevealDiv>
                </div>

                {/* ── MOBILE: stacked, square image ── */}
                <div className="lg:hidden">
                  <RevealDiv className="flex items-center gap-3 mb-5">
                    <div className="w-4 h-4 rounded-full border-2 border-[#c9a96e] bg-[#060606] flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]" />
                    </div>
                    <span className="section-label">{item.year}</span>
                  </RevealDiv>

                  <RevealDiv delay={80} className="relative aspect-square w-full overflow-hidden rounded-sm mb-5">
                    <Image
                      src={historyData[i].img}
                      alt={`${item.lugar} — The Church Medellín`}
                      fill sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: historyData[i].pos }}
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 bg-[#c9a96e] text-[#080808] px-4 py-1.5 font-bold text-xs tracking-widest uppercase rounded-sm">
                      {item.year}
                    </div>
                  </RevealDiv>

                  <RevealDiv delay={150}>
                    <h3 className="font-display text-2xl font-black text-[#f4f0e8] mb-3 leading-tight">{item.lugar}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-2">{item.desc}</p>
                    <p className="text-white/38 text-sm leading-relaxed mb-5">{isEs ? extra.es : extra.en}</p>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-[#c9a96e]/35" />
                      <span className="text-[#c9a96e]/40 text-xs tracking-widest">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    </div>
                  </RevealDiv>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
