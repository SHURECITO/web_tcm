"use client";
import { useEffect, useRef, useState } from "react";

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

const videos = [
  {
    src: "/videos/testimony-caro-alejo-1.mp4",
    label_es: "Testimonio",
    title_es: "El milagro de la salvación",
    sub_es: "Caro y Alejo en Fe y Café",
    label_en: "Testimony",
    title_en: "The miracle of salvation",
    sub_en: "Caro & Alejo at Fe y Café",
  },
  {
    src: "/videos/inspire-transform.mp4",
    label_es: "Transformación",
    title_es: "Dios puede transformar tu vida",
    sub_es: "Tu dolor se convierte en adoración",
    label_en: "Transformation",
    title_en: "God can transform your life",
    sub_en: "Your pain becomes worship",
  },
  {
    src: "/videos/inspire-complete.mp4",
    label_es: "Esperanza",
    title_es: "Dios puede llenarte",
    sub_es: "Completitud en Cristo",
    label_en: "Hope",
    title_en: "God can fill you",
    sub_en: "Wholeness in Christ",
  },
];

function VideoCard({ video, locale }: { video: typeof videos[0]; locale: string }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isEs = locale !== "en";

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else { v.play(); setPlaying(true); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="relative flex-shrink-0 w-[220px] sm:w-[240px] cursor-pointer group rounded-sm overflow-hidden border border-white/8 hover:border-[#c9a96e]/40 transition-all duration-300"
      style={{ aspectRatio: "9/16" }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />

      {/* Dark overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent transition-opacity duration-300 ${playing ? "opacity-60" : "opacity-80"}`} />

      {/* Play/Pause button */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-2 border-[#c9a96e] bg-[#080808]/40 flex items-center justify-center group-hover:bg-[#c9a96e]/20 transition-all duration-300">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-[#c9a96e] ml-1" />
          </div>
        </div>
      )}

      {/* Mute toggle when playing */}
      {playing && (
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#080808]/60 flex items-center justify-center text-white/70 hover:text-[#c9a96e] transition-colors text-xs z-10"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}

      {/* Text overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="section-label mb-1">{isEs ? video.label_es : video.label_en}</p>
        <h4 className="font-display text-sm font-bold text-[#f4f0e8] leading-tight mb-1">
          {isEs ? video.title_es : video.title_en}
        </h4>
        <p className="text-white/40 text-xs">{isEs ? video.sub_es : video.sub_en}</p>
      </div>
    </div>
  );
}

export default function Testimonios({ locale }: { locale: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "r" ? 280 : -280, behavior: "smooth" });
  };

  return (
    <section id="testimonios" className="py-28 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <RevealDiv className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gold-line" />
              <span className="section-label">{locale === "en" ? "Testimonies" : "Testimonios"}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#f4f0e8] leading-tight">
              {locale === "en" ? "Lives transformed" : "Vidas transformadas"}
            </h2>
            <p className="text-white/40 mt-2 text-sm max-w-sm">
              {locale === "en"
                ? "Real stories of real people changed by faith."
                : "Historias reales de personas reales cambiadas por la fe."}
            </p>
          </div>
          {/* Scroll arrows */}
          <div className="flex gap-3">
            {(["l", "r"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-10 h-10 border border-white/15 hover:border-[#c9a96e]/50 text-white/40 hover:text-[#c9a96e] transition-all flex items-center justify-center rounded"
              >
                {dir === "l" ? "←" : "→"}
              </button>
            ))}
          </div>
        </RevealDiv>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video, i) => (
            <RevealDiv key={i} delay={i * 80}>
              <VideoCard video={video} locale={locale} />
            </RevealDiv>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
    </section>
  );
}
