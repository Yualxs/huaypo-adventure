"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function ToursHero() {
  const t = useTranslations("ToursPage.Hero");

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark rounded-b-[3rem]">
      
      {/* Video de Fondo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe 
            src="https://player.vimeo.com/video/1114982004?background=1&quality=1080p&autoplay=1&loop=1&byline=0&title=0" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full"
            allow="autoplay; fullscreen" 
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-brand-dark"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-4">
        <Container>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                {t("title")}
            </h1>
            <p className="text-xl text-white/90 font-light max-w-2xl mx-auto">
                {t("subtitle")}
            </p>
            <div className="w-24 h-1.5 bg-brand-yellow mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(255,201,75,0.5)]"></div>
        </Container>
      </div>
    </section>
  );
}