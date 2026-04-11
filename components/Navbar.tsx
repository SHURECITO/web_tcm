"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "es" ? "en" : "es";
    const path = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${next}${path}`);
  };

  const navItems = [
    { label: t("about"), href: "#about" },
    { label: t("historia"), href: "#historia" },
    { label: t("impacto"), href: "#impacto" },
    { label: t("vision"), href: "#vision" },
    { label: t("ubicacion"), href: "#ubicacion" },
    { label: t("contacto"), href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/96 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo + Name */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="The Cxurch Medellín"
              fill
              sizes="40px"
              className="object-contain"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#f4f0e8] font-bold text-sm tracking-wide group-hover:text-[#c9a96e] transition-colors">
              The Church
            </span>
            <span className="text-[#c9a96e] text-xs font-semibold tracking-widest uppercase">
              Medellín
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium tracking-widest uppercase text-white/60 hover:text-[#c9a96e] transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="text-xs font-semibold tracking-widest uppercase text-white/40 hover:text-[#c9a96e] transition-colors border border-white/10 hover:border-[#c9a96e]/50 px-3 py-1.5 rounded"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <a
            href="#donar"
            className="hidden lg:block bg-[#c9a96e] text-[#080808] text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:bg-[#e8c98a] transition-colors rounded"
          >
            {t("donar")}
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-1"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}>
        <nav className="bg-[#080808]/98 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium tracking-widest uppercase text-white/70 hover:text-[#c9a96e] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#donar"
            onClick={() => setOpen(false)}
            className="mt-2 bg-[#c9a96e] text-[#080808] text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-[#e8c98a] transition-colors rounded text-center"
          >
            {t("donar")}
          </a>
        </nav>
      </div>
    </header>
  );
}
