"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Star, MapPin, Clock } from "lucide-react";

interface TourHeroProps {
  title: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  location: string;
}

export default function TourHero({ title, image, price, rating, reviews, duration, location }: TourHeroProps) {
  const t = useTranslations("TourDetail.Hero");

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] flex items-end pb-20 overflow-hidden">
      
      {/* Imagen de Fondo con Parallax Sutil */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradiente Cinemático para leer el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
      </div>

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            
            {/* Columna Izquierda: Título y Datos */}
            <div className="lg:col-span-2 text-white space-y-6">
                
                {/* Breadcrumb / Ubicación */}
                <div className="flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-widest text-sm">
                    <MapPin size={16} />
                    <span>{location}</span>
                </div>

                {/* H1 SEO Optimizado */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-balance shadow-black drop-shadow-lg">
                    {title}
                </h1>

                {/* Rating y Duración */}
                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <div className="flex text-brand-yellow">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < Math.floor(rating) ? "currentColor" : "none"} />
                            ))}
                        </div>
                        <span>{rating} ({reviews} {t("reviews")})</span>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <Clock size={16} />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>

            {/* Columna Derecha: Precio (Visible en Desktop) */}
            <div className="hidden lg:flex flex-col items-end justify-end pb-2">
                <div className="text-right">
                    <p className="text-gray-300 text-lg font-medium mb-1">{t("from")}</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black text-brand-yellow tracking-tight">${price}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{t("perPerson")}</p>
                </div>
            </div>

        </div>
      </Container>
    </section>
  );
}