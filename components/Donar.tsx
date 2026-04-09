"use client";
import { useEffect, useRef, useState } from "react";
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="ml-2 text-[10px] border border-[#c9a96e]/25 hover:border-[#c9a96e]/60 text-[#c9a96e]/50 hover:text-[#c9a96e] px-2 py-0.5 rounded transition-all"
    >
      {copied ? "✓" : "copiar"}
    </button>
  );
}

/* QR Lightbox modal */
function QRModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#080808]/92 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 bg-[#111111] border border-[#c9a96e]/30 rounded-sm p-8 max-w-sm w-full flex flex-col items-center gap-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/40 hover:text-[#c9a96e] transition-colors text-xl leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>

        <div>
          <p className="section-label text-center mb-1">Código QR</p>
          <p className="text-[#f4f0e8] font-display font-bold text-center text-lg">Bancolombia</p>
          <p className="text-white/35 text-xs text-center mt-1">IGLESIA CCI Mi Casa — Ahorros</p>
        </div>

        {/* Large QR */}
        <div className="relative w-64 h-64 bg-white rounded-sm overflow-hidden border-4 border-white">
          <Image
            src="/qr-bancolombia.png"
            alt="QR Bancolombia — The Church Medellín"
            fill
            className="object-contain p-1"
            quality={100}
          />
        </div>

        <p className="text-white/40 text-xs text-center leading-relaxed max-w-[240px]">
          Escanea con la app de Bancolombia o cualquier app de pagos
        </p>

        {/* Download button */}
        <button
          onClick={() => { const a = document.createElement("a"); a.href = "/qr-bancolombia.png"; a.download = "QR-TheChurchMedellin-Bancolombia.png"; document.body.appendChild(a); a.click(); document.body.removeChild(a); }}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#c9a96e] text-[#080808] font-bold text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#e8c98a] transition-all rounded"
        >
          ↓ Descargar QR
        </button>
      </div>
    </div>
  );
}

export default function Donar() {
  const t = useTranslations("donar");
  const locale = useLocale();
  const howItems = t.raw("how_items") as string[];
  const isEs = locale !== "en";
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <section id="donar" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c9a96e]/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <RevealDiv className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="gold-line" /><span className="section-label">{t("label")}</span>
          </div>
          <div className="lg:flex lg:items-end lg:justify-between gap-12">
            <div className="max-w-2xl mb-8 lg:mb-0">
              <h2 className="font-display text-5xl md:text-6xl font-black text-[#f4f0e8] leading-[0.9] mb-6">{t("title")}</h2>
              <p className="text-white/55 text-lg leading-relaxed">{t("body")}</p>
            </div>
            <div className="flex-shrink-0 space-y-3">
              {howItems.map((item, i) => (
                <div key={i} className="flex gap-3 items-start max-w-sm">
                  <div className="mt-0.5 w-5 h-5 bg-[#c9a96e] rounded-full flex items-center justify-center flex-shrink-0 text-[#080808] font-bold text-[10px]">{i + 1}</div>
                  <p className="text-white/50 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Payment methods */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">

          {/* Colombia — Bancolombia */}
          <RevealDiv delay={0}>
            <div className="bg-[#111111] border border-white/8 hover:border-[#c9a96e]/30 transition-colors rounded-sm overflow-hidden h-full">
              <div className="px-8 py-5 border-b border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#c9a96e]/10 rounded-full flex items-center justify-center text-[#c9a96e] text-lg font-black">₱</div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#f4f0e8]">{isEs ? "Transferencia Colombia" : "Colombia Transfer"}</h3>
                  <p className="text-[#c9a96e] text-xs tracking-widest uppercase font-semibold">Bancolombia</p>
                </div>
              </div>
              <div className="px-8 py-6 grid sm:grid-cols-2 gap-8 items-start">
                {/* Account details */}
                <div className="space-y-4">
                  {[
                    { label: isEs ? "Titular" : "Account Holder", value: "CCI Mi Casa" },
                    { label: isEs ? "Tipo de cuenta" : "Account Type", value: isEs ? "Cuenta de Ahorros" : "Savings Account" },
                    { label: isEs ? "N° de cuenta" : "Account N°", value: "37500002218", copy: true },
                    { label: "NIT", value: "901278358", copy: true },
                    { label: "Banco", value: "Bancolombia" },
                  ].map(({ label, value, copy }) => (
                    <div key={label}>
                      <p className="text-white/30 text-[10px] tracking-widest uppercase mb-0.5">{label}</p>
                      <div className="flex items-center">
                        <p className="text-[#f4f0e8] font-semibold text-sm">{value}</p>
                        {copy && <CopyButton text={value} />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* QR — clickable to open lightbox */}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-white/30 text-[10px] tracking-widest uppercase">
                    {isEs ? "Toca el QR para ampliar" : "Tap QR to enlarge"}
                  </p>

                  <button
                    onClick={() => setQrOpen(true)}
                    className="relative w-40 h-40 bg-white rounded-sm overflow-hidden border-2 border-[#c9a96e]/20 hover:border-[#c9a96e]/70 transition-all duration-300 hover:scale-105 group cursor-zoom-in"
                    aria-label="Ver QR más grande"
                  >
                    <Image
                      src="/qr-bancolombia.png"
                      alt="QR Bancolombia"
                      fill
                      className="object-contain p-1"
                      quality={100}
                    />
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-[#c9a96e]/0 group-hover:bg-[#c9a96e]/8 transition-colors flex items-center justify-center">
                      <span className="text-[#c9a96e] text-2xl opacity-0 group-hover:opacity-100 transition-opacity">⊕</span>
                    </div>
                  </button>

                  <button
                    onClick={() => { const a = document.createElement("a"); a.href = "/qr-bancolombia.png"; a.download = "QR-TheChurchMedellin-Bancolombia.png"; document.body.appendChild(a); a.click(); document.body.removeChild(a); }}
                    className="inline-flex items-center gap-2 bg-[#c9a96e]/10 border border-[#c9a96e]/30 hover:bg-[#c9a96e]/20 hover:border-[#c9a96e]/60 text-[#c9a96e] text-xs font-bold tracking-wide uppercase px-4 py-2 rounded transition-all duration-300"
                  >
                    <span>↓</span>
                    {isEs ? "Descargar QR" : "Download QR"}
                  </button>
                </div>
              </div>
            </div>
          </RevealDiv>

          {/* Internacional */}
          <RevealDiv delay={120}>
            <div className="bg-[#111111] border border-white/8 hover:border-[#c9a96e]/30 transition-colors rounded-sm overflow-hidden h-full">
              <div className="px-8 py-5 border-b border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#c9a96e]/10 rounded-full flex items-center justify-center text-[#c9a96e] text-lg font-black">$</div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#f4f0e8]">{isEs ? "Transferencia Internacional" : "International Transfer"}</h3>
                  <p className="text-[#c9a96e] text-xs tracking-widest uppercase font-semibold">USD / EUR / {isEs ? "Otras divisas" : "Other currencies"}</p>
                </div>
              </div>
              <div className="px-8 py-10 flex flex-col items-center justify-center text-center min-h-[220px] gap-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-[#c9a96e]/30 flex items-center justify-center text-2xl">🌐</div>
                <p className="text-[#f4f0e8] font-display font-bold text-xl">{isEs ? "Próximamente" : "Coming Soon"}</p>
                <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                  {isEs
                    ? "Estamos habilitando transferencias internacionales. Por ahora, contáctanos directamente para coordinar tu donación."
                    : "We're enabling international transfers. For now, contact us directly to coordinate your donation."}
                </p>
                <a
                  href="https://wa.me/573186898956"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-[#25D366]/20 hover:border-[#25D366]/60 transition-all rounded"
                >
                  💬 {isEs ? "Escribir por WhatsApp" : "Contact on WhatsApp"}
                </a>
              </div>
            </div>
          </RevealDiv>
        </div>

        {/* Infrastructure banner */}
        <RevealDiv>
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-sm border border-white/8">
            <div className="relative min-h-[320px]">
              <Image
                src="/img-itagui.jpg"
                alt="Infraestructura — The Church Medellín"
                fill sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111] hidden lg:block" />
            </div>
            <div className="bg-[#111111] p-10 lg:p-14 flex flex-col justify-center">
              <div className="w-8 h-0.5 bg-[#c9a96e] mb-6" />
              <h3 className="font-display text-2xl md:text-3xl font-black text-[#f4f0e8] mb-4 leading-tight">{t("infra_title")}</h3>
              <p className="text-white/50 text-base leading-relaxed mb-8">{t("infra_body")}</p>
              <a
                href="https://wa.me/573186898956"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#080808] font-bold text-xs tracking-widest uppercase px-7 py-3 hover:bg-[#e8c98a] transition-all rounded self-start"
              >
                {t("cta")} →
              </a>
            </div>
          </div>
        </RevealDiv>

        {/* Phrase */}
        <RevealDiv className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-[#c9a96e]/25" /><div className="text-[#c9a96e]/25 text-sm">✦</div><div className="h-px w-16 bg-[#c9a96e]/25" />
            </div>
            <p className="font-display text-2xl md:text-3xl italic text-[#c9a96e] leading-relaxed">
              &ldquo;Te bendeciré para que sea de bendición.&rdquo;
            </p>
          </div>
        </RevealDiv>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />
    </section>
  );
}
