"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import { ArrowRight, Sparkles } from "lucide-react"; // Iconos para detalles

export default function CustomTours() {
  const t = useTranslations("CustomTours");

  return (
    <section className="w-full bg-white py-20 lg:py-32 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- COLUMNA 1: TEXTO (Izquierda) --- 
              Cambiamos el orden en Desktop para variar el ritmo visual 
              (Imagen derecha, Texto izquierda).
          */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1 relative z-10">
            
            {/* Etiqueta "Eyebrow" (Detalle Premium) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-dark mb-6">
                <Sparkles size={14} className="text-brand-yellow fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Premium Experience</span>
            </div>

            <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark mb-6 leading-tight">
              {t("title")}
            </h2>

            <div className="space-y-6 text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-light mb-10">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            {/* Botón Premium (Estilo consistente con el resto de la web) */}
            <Link 
              href="/planifica-tu-aventura" 
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-brand-dark text-white font-bold uppercase tracking-wide shadow-lg hover:bg-brand-blue hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {t("button")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>


          {/* --- COLUMNA 2: IMÁGENES (Derecha - Layout Asimétrico) --- */}
          <div className="relative order-1 lg:order-2">
            
            {/* Elemento Decorativo de Fondo (Blob Amarillo) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-cream/50 rounded-full blur-3xl -z-10 opacity-70"></div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
                
                {/* COLUMNA A: Imagen Alta (Vertical) */}
                <div className="relative pt-12"> {/* pt-12 baja esta columna para el efecto escalonado */}
                    <div className="relative w-full aspect-[3/5] rounded-[2rem] overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif"
                            alt="Valle Rojo"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        {/* Overlay sutil */}
                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                </div>

                {/* COLUMNA B: Dos Imágenes Cuadradas */}
                <div className="flex flex-col gap-4 md:gap-6">
                    {/* Imagen Superior */}
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a29d7603099b7070e53_Cuatrimotos%20con%20Huaypo%20Adventure.avif"
                            alt="Cuatrimotos"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                    
                    {/* Imagen Inferior */}
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
                            alt="Chinchero"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                    </div>
                </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}