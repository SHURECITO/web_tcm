import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80, 85, 90, 100],
  },
  compress: true,
  poweredByHeader: false,
  devIndicators: false,
};

export default withNextIntl(nextConfig);
