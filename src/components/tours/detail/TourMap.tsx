"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Map as MapIcon, Maximize2, X, Download, Compass, ZoomIn } from "lucide-react";

export default function TourMap() {
  const t = useTranslations("TourDetail.Map");
  const [isOpen, setIsOpen] = useState(false);

  // URL del Mapa (Extraída de tu web original para el ejemplo)
  const mapImage = "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/692cadbec4798c0d4739ee16_map.webp";

  // Bloquear scroll al abrir
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
        {/* --- TARJETA DEL MAPA (Vista Previa) --- */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group bg-white">
            
            {/* Header Flotante */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm border border-white/50 pointer-events-auto flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                        <Compass size={18} />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-brand-dark uppercase tracking-wide leading-none">{t("title")}</h3>
                        <p className="text-[10px] text-gray-500 font-bold mt-1">Vista Ilustrada</p>
                    </div>
                </div>
            </div>

            {/* Contenedor de Imagen (Trigger del Lightbox) */}
            <div 
                className="relative w-full h-[450px] bg-gray-50 cursor-pointer overflow-hidden"
                onClick={() => setIsOpen(true)}
            >
                <Image 
                    src={mapImage} 
                    alt="Mapa de la Ruta" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay al Hover */}
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/20 backdrop-blur-md border border-white/40 px-6 py-3 rounded-full flex items-center gap-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <Maximize2 size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Ver Pantalla Completa</span>
                    </div>
                </div>
            </div>

            {/* Footer Flotante */}
            <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
                <button className="pointer-events-auto flex items-center gap-2 bg-white hover:bg-brand-yellow text-brand-dark px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1">
                    <Download size={16} />
                    Descargar Mapa
                </button>
            </div>
        </div>

        {/* --- LIGHTBOX PREMIUM (Pantalla Completa) --- */}
        {isOpen && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center animate-in fade-in duration-300">
                
                {/* 1. Fondo Oscuro (Backdrop) - Cierra al hacer clic */}
                <div 
                    className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
                    onClick={() => setIsOpen(false)} // <--- Clic en lo negro cierra
                ></div>

                {/* 2. Botón Cerrar (Fijo arriba a la derecha) */}
                <button 
                    className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>

                {/* 3. Imagen del Mapa (Centrada y Ajustada) */}
                <div 
                    className="relative w-full h-full max-w-5xl max-h-[90vh] p-4 flex items-center justify-center pointer-events-none"
                >
                    {/* pointer-events-auto en la imagen para que si le dan clic a la foto NO se cierre (opcional, o quitar para que cierre siempre) */}
                    <div className="relative w-full h-full pointer-events-auto"> 
                         <Image 
                            src={mapImage} 
                            alt="Mapa Fullscreen" 
                            fill 
                            className="object-contain"
                            quality={100}
                        />
                    </div>
                </div>

                {/* Etiqueta informativa inferior */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium uppercase tracking-widest pointer-events-none">
                    Pulsa fuera para cerrar
                </div>
            </div>
        )}
    </>
  );
}