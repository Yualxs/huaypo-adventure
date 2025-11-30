"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { ArrowDown } from "lucide-react";

interface CollectionHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  eyebrow?: string; // Opcional: Ej "Colección Exclusiva"
}

export default function CollectionHero({ title, subtitle, backgroundImage, eyebrow = "Explora Perú" }: CollectionHeroProps) {
  return (
    <section className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark rounded-b-[3rem] shadow-2xl">
      
      {/* --- 1. IMAGEN DE FONDO CON EFECTO KEN BURNS --- 
          'animate-ken-burns': Hace un zoom lento y elegante.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover animate-ken-burns opacity-90"
          priority
        />
        
        {/* Overlay de Gradiente (Abajo hacia arriba para leer texto) */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
        
        {/* Textura de Grano (Toque de Cine Premium) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- 2. CONTENIDO --- */}
      <div className="relative z-10 w-full pt-20">
        <Container>
            <div className="max-w-4xl mx-auto text-center">
                
                {/* Eyebrow */}
                <div className="inline-block mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <span className="px-5 py-2 rounded-full border border-white/10 bg-brand-dark/50 backdrop-blur-md shadow-sm text-brand-yellow text-xs font-bold uppercase tracking-[0.3em]">
                        {eyebrow}
                    </span>
                </div>

                {/* Título Masivo */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.95] text-balance opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    {title}
                </h1>

                {/* Subtítulo */}
                <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed text-pretty opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    {subtitle}
                </p>

            </div>
        </Container>
      </div>

      {/* --- 3. INDICADOR DE SCROLL --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-60 animate-bounce-slow">
         <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white"></div>
         <span className="text-[10px] text-white uppercase tracking-widest">Descubre</span>
      </div>

      {/* Estilos Locales para la animación Ken Burns */}
      <style jsx>{`
        @keyframes ken-burns {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
            animation: ken-burns 20s ease-out infinite alternate;
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-slow {
            animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
}