"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, MapPin, Utensils, Bed, Flag } from "lucide-react";

interface Day {
  day: number;
  title: string;
  description: string;
  stats: {
    distance?: string;
    meals?: string;
    accommodation?: string;
  };
}

export default function TourItinerary({ days }: { days: Day[] }) {
  const t = useTranslations("TourDetail.Itinerary");
  // Estado inicial: [1] para que el Día 1 esté abierto siempre al cargar
  const [openDays, setOpenDays] = useState<number[]>([1]);

  const toggleDay = (dayNum: number) => {
    setOpenDays(prev => 
      prev.includes(dayNum) ? prev.filter(d => d !== dayNum) : [...prev, dayNum]
    );
  };

  return (
    <div className="space-y-8">
        <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
            {days.map((day, index) => {
                const isOpen = openDays.includes(day.day);
                const isLast = index === days.length - 1;
                
                return (
                    <div key={day.day} className="relative pl-8 group">
                        
                        {/* Conector Visual (Bolita en la línea de tiempo) */}
                        <div className={`absolute -left-[21px] top-6 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center font-black text-sm shadow-md transition-all duration-300 z-10 ${
                            isOpen ? "bg-brand-yellow text-brand-dark scale-110" : "bg-gray-100 text-gray-400 group-hover:bg-brand-blue/20 group-hover:text-brand-blue"
                        }`}>
                            {day.day}
                        </div>

                        <div 
                            className={`bg-white border rounded-[1.5rem] overflow-hidden transition-all duration-300 ${
                                isOpen ? "border-brand-blue/20 shadow-lg" : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                            }`}
                        >
                            {/* Cabecera del Día */}
                            <button 
                                onClick={() => toggleDay(day.day)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <h3 className={`text-lg font-bold pr-4 transition-colors ${isOpen ? "text-brand-blue" : "text-brand-dark"}`}>
                                    {day.title}
                                </h3>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    isOpen ? "bg-brand-blue text-white rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                                }`}>
                                    <ChevronDown size={16} strokeWidth={3} />
                                </div>
                            </button>

                            {/* Contenido Desplegable */}
                            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-6 pb-8">
                                    
                                    {/* Descripción Rica */}
                                    <div 
                                        className="prose prose-sm prose-slate max-w-none text-gray-600 font-light leading-relaxed mb-6"
                                        dangerouslySetInnerHTML={{ __html: day.description }}
                                    />
                                    
                                    {/* Datos Técnicos del Día (Cards) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-dashed border-gray-100">
                                        {day.stats.distance && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                                                <MapPin size={16} className="text-brand-orange" />
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Distancia</span>
                                                    <span className="text-xs font-bold text-brand-dark">{day.stats.distance}</span>
                                                </div>
                                            </div>
                                        )}
                                        {day.stats.meals && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                                                <Utensils size={16} className="text-brand-green" />
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Comidas</span>
                                                    <span className="text-xs font-bold text-brand-dark">{day.stats.meals}</span>
                                                </div>
                                            </div>
                                        )}
                                        {day.stats.accommodation && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/80">
                                                <Bed size={16} className="text-brand-blue" />
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Alojamiento</span>
                                                    <span className="text-xs font-bold text-brand-dark">{day.stats.accommodation}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
}