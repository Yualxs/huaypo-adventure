"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import { ArrowRight, PenTool, Map } from "lucide-react";

export default function ToursCTA() {
  const t = useTranslations("ToursPage.CTA");

  return (
    <section className="w-full py-20 lg:py-28">
      <Container>
        
        {/* TARJETA PREMIUM LIGHT (Estilo Newsletter) */}
        <div className="relative bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden group">
            
            {/* --- DECORACIÓN DE FONDO (Atmósfera) --- */}
            {/* Luz cálida (Amarilla) arriba a la derecha */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
            
            {/* Luz fresca (Azul) abajo a la izquierda */}
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
            
            {/* Patrón sutil de mapa de líneas (opcional, da textura de viaje) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#0b0e1c 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            {/* --- CONTENIDO --- */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                
                {/* Bloque de Texto */}
                <div className="max-w-2xl text-center lg:text-left">
                    
                    {/* Icono + Eyebrow */}
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-brand-pale rounded-2xl flex items-center justify-center text-brand-blue shadow-sm border border-brand-blue/10 group-hover:scale-110 transition-transform duration-500">
                            <PenTool size={22} strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-[0.25em]">
                            Tailor Made
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight leading-[1.1] text-balance">
                        {t("title")}
                    </h2>
                    
                    <p className="text-lg text-gray-500 font-light leading-relaxed text-pretty">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Bloque de Acción */}
                <div className="flex-shrink-0 relative">
                    
                    {/* Elemento decorativo detrás del botón */}
                    <div className="absolute inset-0 bg-brand-yellow blur-2xl opacity-20 rounded-full scale-75 group-hover:scale-110 transition-transform duration-500"></div>

                    <Link 
                        href="/plan" // Apunta al formulario
                        className="relative inline-flex items-center gap-3 px-10 py-5 bg-brand-dark text-white font-black uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-xl group/btn"
                    >
                        <span className="relative z-10">{t("button")}</span>
                        <ArrowRight size={20} className="relative z-10 transition-transform group-hover/btn:translate-x-1 text-brand-yellow" />
                        
                        {/* Efecto de brillo en el botón */}
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    </Link>
                    
                    <p className="text-[10px] text-gray-400 font-bold text-center mt-4 uppercase tracking-wide">
                        Sin compromiso
                    </p>
                </div>

            </div>

        </div>
      </Container>
    </section>
  );
}