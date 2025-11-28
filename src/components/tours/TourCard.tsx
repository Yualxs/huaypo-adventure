"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { MapPin, ChevronRight } from "lucide-react";

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
    // CAMBIO 1: Agregamos 'h-full' para que la tarjeta ocupe toda la altura que le da el slider
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      
      {/* --- IMAGEN (Aspect Ratio 4:5) --- */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge Best Seller */}
        {isBestSeller && (
          <div className="absolute top-4 left-4 bg-brand-orange text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {t("bestSeller")}
          </div>
        )}
      </div>

      {/* --- CONTENIDO --- */}
      {/* CAMBIO 2: 'flex-grow' permite que este div crezca para llenar el hueco vacío */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Bloque Superior (Ubicación y Título) */}
        <div>
            {/* Ubicación */}
            <div className="flex items-center gap-1 text-gray-500 text-[12px] mb-2 font-medium">
            <MapPin size={14} className="text-brand-blue" />
            <span>{t("location")}</span>
            </div>

            {/* Título */}
            {/* Quitamos line-clamp estricto o lo dejamos en 3 para seguridad, 
                pero ahora la altura se gestiona sola */}
            <h3 className="text-h5 md:text-h4 font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">
            {title}
            </h3>
        </div>

        {/* Bloque Inferior (Precio y Botón) */}
        {/* CAMBIO 3: 'mt-auto' es el secreto. Empuja este bloque siempre al final de la tarjeta */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          <p className="text-[12px] text-gray-500 mb-1">{t("priceLabel")}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[13px] text-gray-600 font-medium">{t("from")}</span>
            <span className="text-[22px] font-black text-brand-blue">${price}</span>
            <span className="text-[13px] text-gray-500">{t("perPerson")}</span>
          </div>
          
          {/* Botón */}
          <div className="mt-5">
            <Link 
                href={`/tours/${slug}`}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-pale text-brand-blue font-bold rounded-lg hover:bg-brand-blue hover:text-white transition-all duration-300 uppercase tracking-wider text-sm group/btn"
            >
                {t("button")}
                <ChevronRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            </div>
        </div>

      </div>
    </div>
  );
}