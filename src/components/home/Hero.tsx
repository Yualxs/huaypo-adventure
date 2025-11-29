"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import { ArrowRight, MousePointer2 } from "lucide-react"; // Iconos sutiles

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-brand-dark">
      
      {/* --- BACKGROUND VIDEO --- */}
      {/* Agregamos 'rounded-b-[3rem]' para esa curva premium al final de la pantalla */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="relative min-w-full min-h-full w-auto h-auto aspect-video scale-110"> {/* scale-110 para evitar bordes blancos por el redondeo */}
            <iframe 
                src="https://player.vimeo.com/video/1114982004?background=1&quality=1080p&autoplay=1&loop=1&byline=0&title=0" 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-[177.77vh] min-h-[56.25vw]"
                allow="autoplay; fullscreen" 
                frameBorder="0"
            ></iframe>
        </div>
        
        {/* --- OVERLAY PREMIUM (Gradiente Cinemático) --- 
            En lugar de negro plano, usamos un degradado que oscurece arriba (nav) y abajo,
            pero deja brillar el centro.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 z-10"></div>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 w-full mt-10">
        <Container>
            <div className="mx-auto max-w-5xl flex flex-col items-center text-center animate-fade-in-up">
                
                {/* Eyebrow (Etiqueta Superior) */}
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                    <span className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">Premium Travel Experience</span>
                </div>

                {/* Título Principal 
                    Usamos 'text-balance' para evitar viudas y 'drop-shadow-lg' para contraste.
                */}
                <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-xl text-balance">
                    {t("title")}
                </h1>

                {/* Subtítulo */}
                <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
                    {t("subtitle")}
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                    
                    {/* Botón Principal (Amarillo) */}
                    <Link 
                        href="/tours/machu-picchu" 
                        className="group relative px-8 py-4 bg-brand-yellow text-brand-dark text-[15px] font-black uppercase tracking-wider rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,201,75,0.6)] hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {t("ctaTours")}
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                        {/* Efecto de brillo al hover */}
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Link>

                    {/* Botón Secundario (Glassmorphism / Vidrio) */}
                    <Link 
                        href="/contact" 
                        className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/40 text-white text-[15px] font-black uppercase tracking-wider rounded-full transition-all hover:bg-white hover:text-brand-dark hover:border-white shadow-lg"
                    >
                        {t("ctaContact")}
                    </Link>
                </div>

            </div>
        </Container>
      </div>

      {/* --- SCROLL INDICATOR (Animación Ratón) --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 animate-bounce-slow">
         <span className="text-[10px] text-white uppercase tracking-widest font-bold">Descubre</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-brand-yellow to-transparent"></div>
      </div>

      {/* Estilos para animaciones puntuales */}
      <style jsx>{`
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
        }
        .animate-bounce-slow {
            animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
}