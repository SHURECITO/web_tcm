import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://thechurchmedellin.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages: { es: base, en: `${base}/en` } } },
    { url: `${base}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
