"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { MapPin, ChevronRight, Star } from "lucide-react";

interface TourCardProps {
  image: string;
  title: string;
  price: number;
  slug: string;
  isBestSeller?: boolean;
}

export default function TourCard({ image, title, price, slug, isBestSeller = true }: TourCardProps) {
  const t = useTranslations("PopularTours.card");

  return (
    // CAMBIO 1: Quitamos 'overflow-hidden' del padre. 
    // Mantenemos 'rounded-2xl' para la forma base de la sombra y el borde.
    // Agregamos 'z-0' para contexto de apilamiento.
    <div className="group relative h-full flex flex-col bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-200 hover:border-transparent z-0">
      
      {/* --- IMAGEN (Hijo Superior) --- 
          CAMBIO 2: Aplicamos 'rounded-t-2xl' y 'overflow-hidden' AQUÍ. 
          Así la imagen se recorta al hacer zoom, pero no afecta al resto de la tarjeta.
      */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay degradado */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

        {/* Badge */}
        {isBestSeller && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-brand-orange to-brand-yellow text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1 z-10">
            <Star size={10} fill="currentColor" />
            {t("bestSeller")}
          </div>
        )}
      </div>

      {/* --- CONTENIDO (Hijo Inferior) --- 
          CAMBIO 3: Aplicamos 'rounded-b-2xl' explícito.
          Esto asegura que el fondo blanco respete la curva inferior y no se "salga" del padre.
          Añadimos '-mt-1 pt-7' (margen negativo) para fusionar visualmente ambas partes y evitar líneas blancas finas.
      */}
      <div className="p-6 pt-7 flex flex-col flex-grow relative z-10 bg-white rounded-b-2xl -mt-1">
        
        {/* Ubicación */}
        <div className="flex items-center gap-1.5 text-brand-dark text-tiny md:text-small  font-bold uppercase tracking-widest mb-3">
            <MapPin size={14} className="text-brand-blue" />
            <span>{t("location")}</span>
        </div>

        {/* Título */}
        <h3 className="text-h5 font-extrabold text-brand-dark mb-2 leading-tight group-hover:text-brand-blue transition-colors duration-300">
          {title}
        </h3>

        {/* Footer de la tarjeta */}
        <div className="mt-auto pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-tiny md:text-small text-gray-400 font-medium uppercase">{t("from")}</span>
            
            <div className="flex items-baseline gap-1">
                <span className="text-h5 font-extrabold text-brand-dark">${price}</span>
            </div>

            {/* --- NUEVO: TEXTO POR PERSONA --- */}
            <span className="text-tiny md:text-small  text-gray-500 font-medium -mt-1">
                {t("perPerson")}
            </span>
          </div>
          
          <Link 
              href={`/tours/${slug}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-brand-dark font-bold text-tiny md:text-small uppercase tracking-wide group/btn hover:bg-brand-dark hover:border-brand-dark hover:text-white transition-all duration-300"
          >
              {t("button")}
              <ChevronRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}