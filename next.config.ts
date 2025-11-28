import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com', // El CDN de Webflow
        pathname: '/**', // Permitir cualquier ruta de imagen
      },
    ],
  },
}

export default withNextIntl(nextConfig);