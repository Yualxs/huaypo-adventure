"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full h-[calc(100vh-90px)] xl:h-[calc(100vh-150px)] flex items-center justify-center overflow-hidden bg-brand-dark">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="relative min-w-full min-h-full w-auto h-auto aspect-video">
            <iframe 
                src="https://player.vimeo.com/video/1114982004?background=1&quality=1080p&autoplay=1&loop=1&byline=0&title=0" 
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; fullscreen" 
                frameBorder="0"
            ></iframe>
        </div>
        {/* Overlay Oscuro */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* --- CONTENT --- */}
      {/* CORRECCIÓN: Necesitamos este div 'relative z-20' para que el texto esté SOBRE el video */}
      <div className="relative z-20 w-full mt-[-50px]">
        <Container>
            <div className="mx-auto space-y-8 text-center">
                
                {/* Título Principal */}
                <h1 className="text-h2 md:text-h1 font-extrabold text-white tracking-tight drop-shadow-md">
                    {t("title")}
                </h1>

                {/* Subtítulo */}
                <p className="text-h4 md:text-h3 font-medium text-white max-w-2xl mx-auto drop-shadow-sm">
                    {t("subtitle")}
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link 
                        href="/tours/machu-picchu" 
                        className="w-full sm:w-auto px-8 py-4 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark text-[15px] font-black uppercase tracking-wider rounded-full transition-all shadow-lg hover:scale-105"
                    >
                        {t("ctaTours")}
                    </Link>

                    <Link 
                        href="/contact" 
                        className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-brand-dark text-white text-[15px] font-black uppercase tracking-wider rounded-full transition-all shadow-lg hover:scale-105"
                    >
                        {t("ctaContact")}
                    </Link>
                </div>
            </div>
        </Container>
      </div>
    </section>
  );
}