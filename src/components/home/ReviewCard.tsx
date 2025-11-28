"use client";

import Image from "next/image";

interface ReviewCardProps {
  title: string;
  text: string;
  author: string;
  date: string;
  avatarUrl: string;
}

export default function ReviewCard({ title, text, author, date, avatarUrl }: ReviewCardProps) {
  return (
    // CAMBIO: Quitamos 'mt-12'. El espaciado ahora lo maneja el contenedor del slider.
    // Añadimos 'mt-0' explícito por seguridad.
    <div className="relative bg-white rounded-[20px] p-8 pb-10 shadow-sm h-full flex flex-col items-start text-left">
      
      {/* --- AVATAR FLOTANTE --- */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-20 rounded-full border-[5px] border-[#fff7e5] overflow-hidden shadow-sm">
            <Image 
                src={avatarUrl} 
                alt={author} 
                width={80} 
                height={80} 
                className="object-cover w-full h-full"
            />
        </div>
      </div>

      {/* --- CÍRCULOS VERDES --- */}
      <div className="flex gap-1 mb-4 mt-8"> {/* mt-8 para compensar el espacio visual del avatar */}
        {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-[#00AA6C]"></div>
        ))}
      </div>

      {/* --- CONTENIDO --- */}
      <h3 className="text-h6 md:text-h5 font-bold text-brand-dark mb-3">
        {title}
      </h3>

      <p className="text-small md:text-p italic mb-6 flex-grow">
        {text}
      </p>

      {/* --- AUTOR --- */}
      <div>
        <p className="text-[14px] font-bold text-brand-dark">{author}</p>
        <p className="text-[12px] text-gray-500">{date}</p>
      </div>
    </div>
  );
}