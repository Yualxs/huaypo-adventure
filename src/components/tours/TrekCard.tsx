"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Clock, ArrowUpRight } from "lucide-react";

interface TrekCardProps {
  image: string;
  title: string;
  duration: string;
  slug: string;
}

export default function TrekCard({ image, title, duration, slug }: TrekCardProps) {
  const t = useTranslations("RecommendedTreks.card");

  return (
    <Link 
      href={`/tours/${slug}`}
      className="group relative block w-full aspect-[3/4] overflow-hidden rounded-3xl cursor-pointer"
    >
      
      {/* --- IMAGEN DE FONDO --- */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* --- OVERLAY DEGRADADO --- 
          Esencial para que el texto blanco se lea sobre cualquier foto.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* --- BADGE "GLASS" (Superior Izquierda) --- */}
      <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
        <Clock size={14} className="text-white" />
        <span className="text-[11px] font-bold text-white uppercase tracking-wider">
          {duration}
        </span>
      </div>

      {/* --- ICONO FLOTANTE (Superior Derecha) --- 
          Aparece solo al hacer Hover
      */}
      <div className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
         <ArrowUpRight size={20} className="text-brand-dark" />
      </div>

      {/* --- CONTENIDO INFERIOR --- */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start transform transition-transform duration-300 group-hover:-translate-y-1">
        
        {/* Título Grande */}
        <h3 className="text-h4 font-extrabold text-white leading-none mb-3 drop-shadow-sm">
          {title}
        </h3>

        {/* Botón Simulado (Texto + Línea) */}
        <div className="flex items-center gap-2 group/btn">
            <span className="text-sm font-bold text-brand-yellow uppercase tracking-widest border-b-2 border-transparent group-hover:border-brand-yellow transition-all pb-0.5">
                {t("button")}
            </span>
            <ArrowUpRight size={16} className="text-brand-yellow transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

      </div>
    </Link>
  );
}