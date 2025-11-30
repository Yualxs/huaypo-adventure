"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { CheckCircle2, Play, Users, HeartHandshake } from "lucide-react";

export default function TourGallery() {
  const t = useTranslations("ToursPage.Gallery");

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* --- COLUMNA 1: TEXTO DE VENTA (Izquierda) --- */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pale text-brand-blue border border-brand-blue/10 w-fit mb-6">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest">{t("eyebrow")}</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 leading-[1.1] text-balance">
                    {t("title")}
                </h2>
                
                <p className="text-lg text-gray-600 leading-relaxed font-light mb-10 text-pretty">
                    {t("description")}
                </p>

                {/* Badges de Confianza (Texto) */}
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-sm">
                            <HeartHandshake size={20} />
                        </div>
                        <span className="text-sm font-bold text-brand-dark uppercase tracking-wide">{t("stat1")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-bronze shadow-sm">
                            <CheckCircle2 size={20} />
                        </div>
                        <span className="text-sm font-bold text-brand-dark uppercase tracking-wide">{t("stat2")}</span>
                    </div>
                </div>
            </div>

            {/* --- COLUMNA 2: TWIN TOWERS (Experiencia + Confianza) --- */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
                
                {/* Decoración de fondo sutil */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-brand-blue/5 rounded-[3rem] blur-[60px] -z-10"></div>

                <div className="grid grid-cols-2 gap-6 h-[550px] md:h-[650px]">
                    
                    {/* TORRE 1: VIDEO (La Experiencia) */}
                    <div className="col-span-1 h-full relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] border-white group">
                        <div className="absolute inset-0 bg-gray-900 z-0">
                             <iframe 
                                src="https://player.vimeo.com/video/1141740496?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1" 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[150%] pointer-events-none scale-105 group-hover:scale-100 transition-transform duration-1000"
                                allow="autoplay; fullscreen" 
                            ></iframe>
                        </div>
                        
                        {/* Overlay y Texto */}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <div className="absolute top-6 left-6 z-20">
                             <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 animate-pulse-slow">
                                <Play size={20} fill="currentColor" />
                             </div>
                        </div>
                        <div className="absolute bottom-8 left-6 right-6 z-20 text-white">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-2">Inmersión Total</p>
                            <p className="text-2xl font-black leading-none">Vibra Andina</p>
                        </div>
                    </div>

                    {/* TORRE 2: FOTO EQUIPO (La Confianza) -> CAMBIOS AQUÍ
                        - Usamos la nueva imagen del equipo.
                        - Añadimos un overlay más oscuro abajo para leer el texto.
                        - Agregamos copy potente sobre "personas reales".
                    */}
                    <div className="col-span-1 h-full mt-16 relative rounded-[2.5rem] overflow-hidden shadow-xl border-[4px] border-white group">
                        <Image 
                            src="https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683b862e88c72324504371cc_Waqrapucara%2008%20Huaypo%20Adventure.webp" 
                            alt="El equipo de guías expertos de Huaypo Adventure en ruta" 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                        
                        {/* Overlay Gradiente Potente para el Texto */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-80 transition-opacity"></div>

                        {/* Contenido de Confianza */}
                        <div className="absolute bottom-8 left-6 right-6 z-20 text-white">
                            {/* Badge de Equipo */}
                            <div className="inline-flex items-center gap-2 bg-brand-yellow px-3 py-1.5 rounded-full text-brand-dark mb-4 shadow-sm">
                                 <Users size={14} strokeWidth={2.5} />
                                 <span className="text-[10px] font-extrabold uppercase tracking-wider">Tu Familia Local</span>
                            </div>
                            
                            <h3 className="text-2xl font-black leading-tight mb-3">
                                Expertos Reales, <br/> Pasión Genuina.
                            </h3>
                            <p className="text-sm text-white/90 font-medium leading-relaxed line-clamp-3">
                                Más que una agencia, somos tus anfitriones cusqueños. Guías certificados listos para cuidar cada detalle de tu aventura.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
      </Container>
    </section>
  );
}