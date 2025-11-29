"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Sparkles } from "lucide-react";

export default function AboutIntro() {
  const t = useTranslations("AboutPage.Intro");

  return (
    <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* --- COLUMNA 1: TEXTO --- */}
          <div className="flex flex-col items-start relative z-10">
            
            {/* Eyebrow / Etiqueta */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-brand-yellow"></div>
                <span className="text-[12px] font-bold text-brand-dark uppercase tracking-[0.2em]">
                    {t("eyebrow")}
                </span>
            </div>

            {/* Título */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-8 leading-[1.15] text-balance">
              {t("title")}
            </h2>

            {/* Contenido con Resaltado */}
            <div className="text-[17px] md:text-[19px] text-gray-600 font-light leading-relaxed space-y-6">
              <p>
                <span className="font-bold text-brand-blue text-xl block mb-2">
                    {t("highlight")}
                </span>
                {t("description")}
              </p>
            </div>

            {/* Firma o Detalle Decorativo (Opcional) */}
            <div className="mt-10 pt-8 border-t border-gray-100 w-full flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-pale flex items-center justify-center text-brand-blue">
                    <Sparkles size={20} />
                </div>
                <div>
                    <p className="text-sm font-bold text-brand-dark">Experiencias Auténticas</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Desde 2015</p>
                </div>
            </div>
          </div>

          {/* --- COLUMNA 2: IMAGEN CON ESTILO EDITORIAL --- */}
          <div className="relative">
            
            {/* Elemento Decorativo de Fondo (Cuadro) */}
            <div className="absolute top-8 -right-8 w-full h-full border-2 border-brand-yellow/30 rounded-[3rem] z-0 hidden lg:block"></div>

            {/* Imagen Principal */}
            {/* Nota: rounded-tl-[4rem] y rounded-br-[4rem] crean esa forma orgánica diagonal */}
            <div className="relative w-full aspect-[4/5] rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-xl rounded-bl-xl overflow-hidden shadow-2xl z-10">
              <Image
                // Usamos una imagen de paisaje de tus assets para dar contexto
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/6830e1706428c5138d6b3601_Galeria%20Huaypo%20Adventure%2011.webp" 
                alt="Paisaje de Cusco Huaypo Adventure"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Gradiente sutil inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}