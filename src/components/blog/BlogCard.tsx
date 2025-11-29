"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  readTime: number;
  slug: string;
}

export default function BlogCard({ image, title, excerpt, readTime, slug }: BlogCardProps) {
  const t = useTranslations("BlogPreview.card");

  return (
    <Link href={`/blog/${slug}`} className="group flex flex-col h-full bg-transparent cursor-pointer">
      
      {/* --- IMAGEN --- */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-md transition-all duration-500">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge de Tiempo - Estilo "Pastilla" Limpia */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <Clock size={12} className="text-brand-dark" />
          <span className="text-[11px] font-bold text-brand-dark uppercase tracking-wider">
            {readTime} {t("min")}
          </span>
        </div>
      </div>

      {/* --- CONTENIDO --- */}
      <div className="flex flex-col flex-grow pr-4">
        
        {/* Título */}
        <h3 className="text-h5 font-extrabold text-brand-dark mb-3 group-hover:text-brand-blue transition-colors leading-tight">
          {title}
        </h3>
        
        {/* Extracto */}
        <p className="text-p text-gray-500 mb-6 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>

        {/* Botón "Link" Minimalista (Sin fondo amarillo) */}
        <div className="mt-auto flex items-center gap-2 text-[13px] font-black uppercase tracking-widest text-brand-dark group-hover:text-brand-blue transition-colors">
            {t("readMore")}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}