"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Compass } from "lucide-react"; // Icono para el detalle premium

export default function BlogHero() {
  const t = useTranslations("BlogPage.Hero");

  return (
    // Fondo base muy claro (casi blanco) con borde inferior curvo suave
    <section className="w-full bg-white pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden rounded-b-[3rem]">
        
        {/* FONDO PREMIUM (Grid + Aurora) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            
            {/* 1. Patrón Geométrico (Macro Grid) 
                Aporta una textura técnica y moderna, muy sutil (opacity muy baja).
            */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            
            {/* 2. Máscara Radial (Fondo infinito)
                Hace que la cuadrícula desaparezca suavemente hacia los bordes.
            */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_0px,transparent,white)]"></div>
            
            {/* 3. Luz "Aurora" Superior
                Un degradado suave que baja desde el menú, mezclando tus colores de marca.
            */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-brand-yellow/5 via-brand-blue/5 to-transparent blur-[80px] rounded-full opacity-80"></div>
        </div>

        <Container>
            <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                
                {/* Etiqueta "Eyebrow" Flotante */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-dark/5 bg-white/60 backdrop-blur-sm mb-8 shadow-sm">
                    <Compass size={14} className="text-brand-blue" />
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.25em]">
                        Travel Journal
                    </span>
                </div>

                {/* Título Editorial 
                    Grande, pesado y con un 'punto' de color al final para carácter.
                */}
                <h1 className="text-6xl md:text-8xl font-black text-brand-dark mb-6 tracking-tighter leading-[0.95] text-balance">
                    {t("title")}
                    <span className="text-brand-blue">.</span>
                </h1>

                {/* Subtítulo */}
                <p className="text-lg md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed text-pretty">
                    {t("subtitle")}
                </p>
                
            </div>
        </Container>
    </section>
  );
}