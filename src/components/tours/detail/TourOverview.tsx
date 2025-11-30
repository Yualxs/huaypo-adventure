"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, ChevronDown, Info, Mountain, Ruler, TrendingUp } from "lucide-react";

// Actualizamos la interfaz para recibir objetos con imagen en 'places'
interface TourOverviewProps {
  description: string;
  places: { name: string; image: string }[]; // <--- CAMBIO AQUÍ
  season: string;
  elevationData?: {
    maxAltitude: number;
    minAltitude: number;
    totalDistance: string;
    difficulty: string;
  };
}

export default function TourOverview({ description, places, season, elevationData }: TourOverviewProps) {
  const t = useTranslations("TourDetail.Overview");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-16 mb-16 border-b border-gray-100 pb-12">
        
        {/* --- 1. INTRODUCCIÓN --- */}
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-bronze">
                    <Info size={20} />
                </div>
                <h2 className="text-2xl font-black text-brand-dark uppercase tracking-wide">
                    {t("title")}
                </h2>
            </div>

            <div className="relative">
                <div 
                    className={`prose prose-lg prose-slate max-w-none text-gray-600 font-light leading-relaxed transition-all duration-700 overflow-hidden ${
                        isExpanded ? "max-h-[2000px]" : "max-h-[160px]"
                    }`}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#fafaf9] to-transparent"></div>
                )}
            </div>

            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-dark transition-colors uppercase tracking-wider group"
            >
                {isExpanded ? t("readLess") : t("readMore")}
                <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover:translate-y-1"}`} 
                />
            </button>
        </div>

        {/* --- 2. RUTA DEL VIAJE (Timeline Visual con Fotos) --- */}
        <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <MapPin size={14} />
                Ruta Visual
            </h3>
            
            {/* Contenedor con scroll horizontal suave */}
            <div className="relative pb-8 overflow-x-auto no-scrollbar">
                <div className="flex items-start min-w-max px-4 pt-4">
                    {places.map((place, i) => (
                        <div key={i} className="flex flex-col items-center relative group min-w-[120px]">
                            
                            {/* Línea Conectora (Detrás) */}
                            {i !== places.length - 1 && (
                                <div className="absolute top-8 left-[50%] w-full h-[2px] bg-gray-200 -z-10">
                                    <div className="h-full bg-brand-blue/30 w-0 group-hover:w-full transition-all duration-1000 ease-out origin-left"></div>
                                </div>
                            )}

                            {/* Foto del Lugar (Circular) */}
                            <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-md overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl z-10 bg-gray-100">
                                <Image 
                                    src={place.image} 
                                    alt={place.name} 
                                    fill 
                                    className="object-cover"
                                />
                            </div>

                            {/* Punto de Hito */}
                            <div className={`w-3 h-3 rounded-full mb-2 transition-colors ${
                                i === 0 || i === places.length - 1 ? "bg-brand-yellow" : "bg-brand-blue"
                            }`}></div>

                            {/* Nombre */}
                            <span className="text-[11px] font-bold text-center text-gray-500 uppercase tracking-wide px-1 group-hover:text-brand-dark transition-colors max-w-[120px]">
                                {place.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- 3. PERFIL DE ELEVACIÓN (Gráfico Pulido con Guías) --- */}
        {elevationData && (
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden group mt-8">
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative z-10 gap-4">
                    <h3 className="text-lg font-black text-brand-dark flex items-center gap-2">
                        <TrendingUp size={18} className="text-brand-blue" />
                        {t("statsTitle")}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wide border border-brand-orange/20">
                        {elevationData.difficulty}
                    </span>
                </div>

                {/* GRÁFICO SVG MEJORADO */}
                <div className="relative h-64 w-full mb-8 mt-4">
                    
                    {/* Grilla de fondo (Ejes Y) */}
                    <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-gray-300 font-bold uppercase tracking-widest pointer-events-none z-0 py-8">
                        <div className="border-b border-dashed border-gray-100 w-full pb-1 flex justify-between"><span>{elevationData.maxAltitude} m</span></div>
                        <div className="border-b border-dashed border-gray-100 w-full pb-1 flex justify-between"><span>3,000 m</span></div>
                        <div className="border-b border-dashed border-gray-100 w-full pb-1 flex justify-between"><span>{elevationData.minAltitude} m</span></div>
                    </div>

                    {/* SVG */}
                    <svg viewBox="0 0 100 60" className="absolute bottom-0 left-0 w-full h-full overflow-visible drop-shadow-lg z-10" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#15a0ff" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#15a0ff" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        
                        {/* Curva: Ajustada para dejar espacio arriba para las etiquetas */}
                        <path d="M0,60 L0,50 L20,45 L40,15 L60,35 L80,40 L100,52 L100,60 Z" fill="url(#gradientArea)" />
                        <path d="M0,50 Q10,50 20,45 Q30,30 40,15 Q50,30 60,35 Q70,38 80,40 Q90,45 100,52" 
                              fill="none" stroke="#15a0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Hito: Warmiwañusca (Pico) */}
                        <g className="group cursor-pointer">
                            <circle cx="40" cy="15" r="2.5" fill="#ffc94b" stroke="white" strokeWidth="1" className="animate-pulse" />
                            {/* Línea Guía Vertical (Dotted) */}
                            <line x1="40" y1="15" x2="40" y2="0" stroke="#ffc94b" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                        </g>

                        {/* Hito: Machu Picchu (Fin) */}
                        <g className="group cursor-pointer">
                            <circle cx="100" cy="52" r="2" fill="#7dd532" stroke="white" strokeWidth="1" />
                        </g>
                    </svg>

                    {/* ETIQUETAS ESTRATÉGICAS (Fuera de la curva) */}
                    
                    {/* Etiqueta Pico (Arriba, conectada por la línea punteada del SVG) */}
                    <div className="absolute top-[-10px] left-[40%] -translate-x-1/2 bg-white border border-brand-yellow/30 text-brand-dark text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-md z-20 flex flex-col items-center">
                        <span className="uppercase tracking-wide text-[8px] text-gray-400 mb-0.5">Punto Más Alto</span>
                        <span>Paso Warmiwañusca</span>
                        <span className="text-brand-yellow font-black text-xs">{elevationData.maxAltitude}m</span>
                    </div>

                    {/* Etiqueta Final (Abajo a la derecha, sin tapar) */}
                    <div className="absolute bottom-[15%] right-0 translate-x-2 bg-green-50 border border-green-200 text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm z-20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Machu Picchu
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark">
                             <Mountain size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t("maxAltitude")}</p>
                            <p className="text-sm font-black text-brand-dark">{elevationData.maxAltitude} m</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark">
                             <Ruler size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{t("distance")}</p>
                            <p className="text-sm font-black text-brand-dark">{elevationData.totalDistance}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}