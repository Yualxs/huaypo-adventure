"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface TrekCardProps {
  image: string;
  title: string;
  duration: string; // Ej: "4 días 3 noches"
  slug: string;
}

export default function TrekCard({ image, title, duration, slug }: TrekCardProps) {
  const t = useTranslations("RecommendedTreks.card");

  return (
    <div className="group relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer">
      
      {/* --- IMAGEN DE FONDO --- */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* --- OVERLAY OSCURO --- */}
      {/* Un degradado suave para asegurar que el texto blanco se lea bien */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

      {/* --- CONTENIDO CENTRADO --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        
        {/* Badge de Duración (Blanco con texto oscuro) */}
        <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 shadow-sm">
          <span className="text-[12px] font-bold text-brand-dark uppercase tracking-wide">
            {duration}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-h5 md:text-h4 font-bold text-white mb-6 drop-shadow-md">
          {title}
        </h3>

        {/* Botón (Transparente con borde blanco) */}
        <Link 
          href={`/tours/${slug}`}
          className="inline-block px-6 py-3 border-2 border-white text-white font-bold rounded-full text-sm uppercase tracking-wider hover:bg-white hover:text-brand-dark transition-all duration-300 hover:scale-105"
        >
          {t("button")}
        </Link>
      </div>
    </div>
  );
}