"use client";
import { useLocale } from "next-intl";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Historia from "@/components/Historia";
import Impacto from "@/components/Impacto";
import Testimonios from "@/components/Testimonios";
import NochesConJesus from "@/components/NochesConJesus";
import Vision from "@/components/Vision";
import Donar from "@/components/Donar";
import Ubicacion from "@/components/Ubicacion";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  const locale = useLocale();
  return (
    <main className="bg-[#080808] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Historia />
      <Impacto />
      <Testimonios locale={locale} />
      <NochesConJesus />
      <Vision />
      <Donar />
      <Ubicacion />
      <Contacto />
      <Footer />
    </main>
  );
}
