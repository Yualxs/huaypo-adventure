"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import { ArrowRight, Users, Award } from "lucide-react"; // Iconos para detalles

export default function AboutPreview() {
  const t = useTranslations("AboutPreview");

  return (
    <section className="w-full bg-white py-24 lg:py-32 overflow-hidden relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- COLUMNA 1: TEXTO (Izquierda en Desktop) --- */}
          <div className="flex flex-col items-start order-2 lg:order-1 relative z-10">
            
            {/* Eyebrow / Etiqueta Superior */}
            <div className="inline-flex items-center gap-2 mb-6">
                <Users size={18} className="text-brand-blue" />
                <span className="text-[13px] font-bold text-brand-blue uppercase tracking-widest">
                    {t("subtitle")} {/* Asegúrate de tener algo como "Quiénes Somos" o "Nuestra Esencia" en el JSON */}
                </span>
            </div>

            <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark mb-8 leading-tight">
              {t("title")}
            </h2>

            <div className="space-y-6 text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-light mb-12">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            {/* Botón Premium (Consistente con CustomTours) */}
            <Link 
              href="/about" 
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-brand-dark text-white font-bold uppercase tracking-wide shadow-lg hover:bg-brand-blue hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {t("button")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Pequeño detalle de confianza inferior */}
            <div className="mt-10 flex items-center gap-3 text-gray-500 text-sm font-medium">
                <Award size={20} className="text-brand-yellow" />
                <span>Guías locales certificados y apasionados.</span>
            </div>
          </div>


          {/* --- COLUMNA 2: IMAGEN ORGÁNICA (Derecha en Desktop) --- */}
          <div className="relative order-1 lg:order-2">
            
            {/* 1. Mancha orgánica de fondo (Color Crema de la marca) 
                 Crea una capa base suave.
            */}
            <div className="absolute top-1/2 left-1/2 -translate-x-[45%] -translate-y-[55%] w-[110%] h-[110%] bg-[#fff7e5] rounded-[3rem] rotate-3 blur-sm -z-10 opacity-80"></div>
            
            {/* 2. Contenedor de la Imagen Principal */}
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 hover:scale-[1.01] transition-transform duration-700">
              <Image
                // URL Original restaurada:
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b10d8487e0ffbcf167a004_Huaypo%20Adventure%20About%20Us.avif"
                alt="Huaypo Adventure Team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority 
              />
              
              {/* Overlay degradado muy sutil para mejorar contraste en bordes */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem] z-20 pointer-events-none"></div>
            </div>

            {/* 3. Elemento Decorativo Flotante (Opcional - Badge) */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-brand-yellow/20 rounded-full flex items-center justify-center text-brand-dark">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-h6 font-extrabold text-brand-dark">100% Local</p>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Experiencia Auténtica</p>
                    </div>
                </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}