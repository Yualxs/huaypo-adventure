"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { CloudRain, Sun, Mountain, Check, Info, Ruler } from "lucide-react";

interface CollectionInsiderProps {
  description: string;
  stats: {
    difficultyLevel: number;
    difficultyLabel: string;
    maxAltitude: string;
    totalDistance: string;
  };
}

export default function CollectionInsider({ description, stats }: CollectionInsiderProps) {
  const t = useTranslations("CollectionPage.Insider");

  const weatherData = [
    { month: "ENE", rain: 80, type: "wet" },
    { month: "FEB", rain: 95, type: "wet" }, 
    { month: "MAR", rain: 60, type: "wet" },
    { month: "ABR", rain: 30, type: "dry" },
    { month: "MAY", rain: 10, type: "dry" },
    { month: "JUN", rain: 5, type: "dry" },
    { month: "JUL", rain: 2, type: "dry" },
    { month: "AGO", rain: 5, type: "dry" },
    { month: "SEP", rain: 20, type: "dry" },
    { month: "OCT", rain: 40, type: "wet" },
    { month: "NOV", rain: 50, type: "wet" },
    { month: "DIC", rain: 70, type: "wet" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* --- COLUMNA 1: CONTENIDO SEO --- */}
            <div className="lg:col-span-7 order-2 lg:order-1">
                
                {/* NUEVO H2: Título de Sección Claro */}
                <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-8 tracking-tight">
                    Información Clave del Destino
                </h2>

                {/* Etiqueta Insider */}
                <div className="inline-flex items-center gap-2 mb-6 text-brand-blue bg-brand-blue/5 px-3 py-1 rounded-full">
                    <Info size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Datos de Experto</span>
                </div>

                <div 
                    className="prose prose-lg prose-slate max-w-none 
                    prose-headings:font-extrabold prose-headings:text-brand-dark 
                    prose-p:text-[18px] prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-light
                    prose-strong:text-brand-dark prose-strong:font-bold
                    prose-li:marker:text-brand-yellow"
                    dangerouslySetInnerHTML={{ __html: description }}
                />

                <div className="mt-12 bg-[#fafaf9] rounded-[2rem] p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-brand-dark mb-6">{t("whyTitle")}</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-4 text-gray-700 items-start">
                            <div className="mt-1 w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-bronze shrink-0"><Check size={14}/></div>
                            <span>Única ruta que llega directamente a la <strong>Puerta del Sol (Inti Punku)</strong>.</span>
                        </li>
                        <li className="flex gap-4 text-gray-700 items-start">
                            <div className="mt-1 w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-bronze shrink-0"><Check size={14}/></div>
                            <span>Combina historia inca con paisajes de selva alta.</span>
                        </li>
                        <li className="flex gap-4 text-gray-700 items-start">
                            <div className="mt-1 w-6 h-6 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-bronze shrink-0"><Check size={14}/></div>
                            <span>Experiencia de camping de lujo con porteadores legendarios.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- COLUMNA 2: GRÁFICOS (Sticky) --- */}
            <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="sticky top-32 space-y-8">
                    
                    {/* 1. WIDGET DE CLIMA */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h4 className="font-bold text-brand-dark text-lg">{t("weatherTitle")}</h4>
                                <p className="text-xs text-gray-400 font-medium mt-1">Precipitación anual</p>
                            </div>
                            <div className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-wide">
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-brand-yellow"></div> {t("drySeason")}
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div> {t("wetSeason")}
                                </div>
                            </div>
                        </div>

                        {/* Gráfico */}
                        <div className="flex justify-between items-end h-40 gap-1.5">
                            {weatherData.map((d, i) => (
                                <div key={i} className="flex flex-col items-center justify-end h-full w-full group relative">
                                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-dark text-white text-[10px] px-2 py-1 rounded mb-1 pointer-events-none whitespace-nowrap z-10">
                                        {d.type === 'dry' ? 'Sol' : 'Lluvia'}
                                    </div>
                                    <div className="w-full h-full bg-gray-100 rounded-full relative overflow-hidden">
                                        <div 
                                            className={`absolute bottom-0 left-0 right-0 w-full rounded-full transition-all duration-1000 ease-out ${
                                                d.type === 'dry' ? 'bg-brand-yellow' : 'bg-blue-400'
                                            }`}
                                            style={{ height: d.type === 'dry' ? `${100 - d.rain}%` : `${d.rain}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-[9px] font-bold text-gray-400 mt-3 group-hover:text-brand-dark transition-colors">
                                        {d.month.charAt(0)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. WIDGET DE DIFICULTAD Y DISTANCIA (VERSIÓN LIGHT PREMIUM) */}
                    {/* Cambios: Fondo blanco, sombras suaves, textos oscuros */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden">
                        
                        {/* Decoración de fondo muy sutil */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-pale rounded-full blur-[50px] -z-0"></div>
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h4 className="font-bold text-brand-dark text-lg">{t("difficultyTitle")}</h4>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Ruta Clásica (Referencia)</p>
                                </div>
                                <div className="w-10 h-10 bg-brand-pale rounded-full flex items-center justify-center text-brand-blue">
                                    <Mountain size={20} />
                                </div>
                            </div>

                            <div className="flex items-end gap-2 mb-3">
                                <span className="text-5xl font-black text-brand-dark">{stats.difficultyLevel}</span>
                                <span className="text-xl text-gray-400 font-medium mb-1">/ 10</span>
                            </div>
                            
                            {/* Barra de Progreso (Color Brand) */}
                            <div className="flex gap-1 h-2.5 mb-4 bg-gray-100 rounded-full overflow-hidden p-[2px]">
                                <div 
                                    className="h-full rounded-full bg-gradient-to-r from-brand-yellow to-brand-orange transition-all duration-1000 ease-out"
                                    style={{ width: `${stats.difficultyLevel * 10}%` }}
                                ></div>
                            </div>
                            
                            <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-8">
                                <span>Fácil</span>
                                <span className="text-brand-orange">{stats.difficultyLabel}</span>
                                <span>Extremo</span>
                            </div>

                            {/* Grid de Datos Técnicos */}
                            <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Altitud Máxima</p>
                                    <p className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                        <Mountain size={16} className="text-brand-blue" />
                                        {stats.maxAltitude}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Distancia Total</p>
                                    <p className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                        <Ruler size={16} className="text-brand-blue" />
                                        {stats.totalDistance}
                                    </p>
                                    {/* Aclaración sutil para la duda de "de dónde a dónde" */}
                                    <p className="text-[9px] text-gray-400 mt-1">Km 82 → Machu Picchu</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </Container>
    </section>
  );
}