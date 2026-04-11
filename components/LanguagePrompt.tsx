"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguagePrompt() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only show if we are on the English version
    if (locale !== "en") return;

    // Check if the user has previously dismissed the prompt
    const dismissed = localStorage.getItem("lang-prompt-dismissed");
    if (dismissed) return;

    // Detect browser language
    if (navigator.language.toLowerCase().startsWith("es")) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [locale]);

  const switchLocale = () => {
    const next = "es";
    const path = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${next}${path}`);
  };

  const dismiss = () => {
    localStorage.setItem("lang-prompt-dismissed", "true");
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center bg-[#111111] border border-[#c9a96e]/30 rounded-sm p-3 shadow-2xl animate-fade-in-up">
      <div className="mr-3 text-white/80 text-sm">
        ¿Prefieres el sitio en español?
      </div>
      <button
        onClick={switchLocale}
        className="text-[#c9a96e] text-xs font-bold tracking-widest uppercase hover:text-[#e8c98a] transition-colors border border-[#c9a96e]/30 hover:border-[#c9a96e]/60 px-3 py-1.5 rounded mr-2"
      >
        Cambiar
      </button>
      <button
        onClick={dismiss}
        className="text-white/40 hover:text-white transition-colors p-1"
        aria-label="Cerrar"
      >
        ×
      </button>
    </div>
  );
}
