"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

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
    <div className="group flex flex-col h-full bg-transparent">
      
      {/* --- IMAGEN --- */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[20px] mb-6">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge de Tiempo (Azul y abajo a la izquierda) */}
        <div className="absolute bottom-4 left-4 bg-brand-blue px-3 py-1 rounded-[6px]">
          <span className="text-[12px] font-medium text-white">
            {readTime} {t("min")}
          </span>
        </div>
      </div>

      {/* --- CONTENIDO --- */}
      <div className="flex flex-col flex-grow">
        {/* Título */}
        <h3 className="text-h5 md:text-h4 font-bold text-brand-dark mb-4 group-hover:text-brand-blue transition-colors">
          {title}
        </h3>
        
        {/* Extracto */}
        <p className="text-small md:text-p text-brand-dark mb-6 line-clamp-3">
          {excerpt}
        </p>

        {/* Botón Amarillo */}
        <div className="mt-auto">
          <Link 
            href={`/blog/${slug}`}
            className="inline-block px-6 py-2.5 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark text-[13px] font-black uppercase tracking-wider rounded-full transition-all shadow-sm hover:shadow-md"
          >
            {t("readMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}