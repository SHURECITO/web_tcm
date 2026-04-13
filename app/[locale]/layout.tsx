import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale !== "en";

  const title = isEs
    ? "The Church Medellín | Fe que transforma vidas e impacta ciudades"
    : "The Church Medellín | Faith That Transforms Lives and Cities";
  const description = isEs
    ? "Desde 2017 en el corazón de Medellín. Transformamos vidas, familias y comunidades a través del evangelio. Impacto social real en jóvenes, mujeres, hombres y niños de Colombia."
    : "Since 2017 at the heart of Medellín, Colombia. Transforming lives, families and communities through the gospel with real social impact.";

  return {
    title,
    description,
    keywords: [
      "The Church Medellín",
      "The Cxurch Latinoamérica",
      "iglesia Medellín",
      "iglesia evangélica Medellín",
      "impacto social Medellín",
      "transformación comunidades Colombia",
      "iglesia Itagüí",
      "noches con jesús Medellín",
      "fe y café Medellín",
      "MADE transformación social",
      "donar iglesia Colombia",
      "church Medellín Colombia",
    ],
    authors: [{ name: "The Church Medellín" }],
    creator: "The Church Medellín",
    publisher: "The Church Medellín",
    metadataBase: new URL("https://thechurchmedellin.com"),
    alternates: {
      canonical: "/",
      languages: {
        "es-CO": "/",
        "en-US": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://thechurchmedellin.com",
      siteName: "The Church Medellín",
      images: [
        {
          url: "/img-itagui.jpg",
          width: 1200,
          height: 630,
          alt: "The Church Medellín — Fe que transforma vidas",
        },
      ],
      locale: isEs ? "es_CO" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img-itagui.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "The Church Medellín",
  alternateName: "The Cxurch Latinoamérica",
  description:
    "Iglesia en Medellín, Colombia. Transformamos vidas, familias y comunidades a través del evangelio con impacto social real desde 2017.",
  url: "https://thechurchmedellin.com",
  foundingDate: "2017",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Medellín",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-321-567-0395",
    contactType: "customer support",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    "https://www.instagram.com/thechurchmedellin/",
    "https://www.facebook.com/thechurchmedellin/",
  ],
};

import LanguagePrompt from "@/components/LanguagePrompt";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <LanguagePrompt />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
