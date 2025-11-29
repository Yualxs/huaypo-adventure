"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react"; // Importamos iconos reales

interface ReviewCardProps {
  title: string;
  text: string;
  author: string;
  date: string;
  avatarUrl: string;
}

export default function ReviewCard({ title, text, author, date, avatarUrl }: ReviewCardProps) {
  return (
    <div className="relative bg-white rounded-3xl p-8 pt-12 shadow-sm border border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 h-full flex flex-col items-center text-center group">
      
      {/* --- ICONO DE COMILLAS DE FONDO (Marca de agua) --- 
          Le da ese toque "Editorial" sin molestar la lectura.
      */}
      <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <Quote size={80} className="text-brand-dark fill-current" />
      </div>

      {/* --- AVATAR FLOTANTE --- 
          border-[#fff7e5] debe coincidir con el fondo de la sección (brand-cream)
          para crear el efecto de "recorte".
      */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-20 h-20 rounded-full border-[6px] border-[#fff7e5] overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
            <Image 
                src={avatarUrl} 
                alt={author} 
                width={80} 
                height={80} 
                className="object-cover w-full h-full"
            />
        </div>
      </div>

      {/* --- ESTRELLAS (Reemplazan a los puntos) --- */}
      <div className="flex gap-1 mb-4 mt-6 relative z-10"> 
        {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-brand-yellow fill-current drop-shadow-sm" />
        ))}
      </div>

      {/* --- TÍTULO --- */}
      <h3 className="text-h6 font-extrabold text-brand-dark mb-3 relative z-10">
        {title}
      </h3>

      {/* --- TEXTO --- */}
      <p className="text-[15px] leading-relaxed text-gray-600 italic mb-6 flex-grow relative z-10">
        &ldquo;{text}&rdquo;
      </p>

      {/* --- AUTOR Y FECHA --- */}
      <div className="relative z-10 border-t border-gray-100 pt-4 w-full">
        <p className="text-[14px] font-black text-brand-dark uppercase tracking-wide">{author}</p>
        <p className="text-[12px] text-gray-400 font-medium mt-0.5">{date}</p>
      </div>
    </div>
  );
}