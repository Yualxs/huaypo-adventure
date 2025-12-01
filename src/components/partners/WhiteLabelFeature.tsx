"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, UserCheck, Car, Ghost, Fingerprint, Award } from "lucide-react";
import Image from "next/image";

export default function WhiteLabelFeature() {
  const t = useTranslations("PartnersPage.Features");

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Fondo sutil para separar secciones */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50/50 to-white -z-10"></div>

      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* --- COLUMNA IZQUIERDA: MENSAJE ESTRATÉGICO --- */}
            <div>
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white font-bold text-[10px] uppercase tracking-[0.2em] mb-8 shadow-lg shadow-brand-dark/20">
                    <Ghost size={12} className="text-brand-yellow" />
                    <span>Ghost Operation</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 leading-[1.1] tracking-tight">
                    {t("title")}
                </h2>
                
                <p className="text-lg text-gray-500 font-light mb-10 leading-relaxed text-pretty border-l-4 border-brand-yellow pl-6">
                    {t("description")}
                </p>

                {/* Grid de Características (Diseño Tarjetas Flotantes) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FeatureCard 
                        icon={Fingerprint} 
                        title={t("f1.title")} 
                        desc={t("f1.desc")}
                        color="bg-brand-dark text-white" 
                    />
                    <FeatureCard 
                        icon={Car} 
                        title={t("f2.title")} 
                        desc={t("f2.desc")}
                        color="bg-brand-blue/10 text-brand-blue" 
                    />
                    <FeatureCard 
                        icon={UserCheck} 
                        title={t("f3.title")} 
                        desc={t("f3.desc")}
                        color="bg-brand-yellow/10 text-brand-bronze" 
                    />
                    <FeatureCard 
                        icon={ShieldCheck} 
                        title={t("f4.title")} 
                        desc={t("f4.desc")}
                        color="bg-green-50 text-green-600" 
                    />
                </div>
            </div>

            {/* --- COLUMNA DERECHA: VISUALIZACIÓN "TU MARCA AQUÍ" --- */}
            <div className="relative h-[600px] w-full rounded-[3rem] bg-gray-100 overflow-hidden shadow-2xl group border border-gray-200">
                
                {/* 1. Imagen de Fondo: Operación Real (Guía recibiendo pax) */}
                <Image 
                    src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
                    alt="Recepción de pasajeros en Cusco"
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-90"
                />
                
                {/* Overlay Oscuro Gradual */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>

                {/* 2. ELEMENTOS FLOTANTES (Simulación de Marca Blanca) */}
                
                {/* Elemento A: El Cartel de Bienvenida (Aeropuerto) */}
                <div className="absolute bottom-10 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl animate-in slide-in-from-bottom-8 duration-700 shadow-2xl">
                    <div className="flex items-center gap-5">
                        {/* Avatar del Guía */}
                        <div className="w-16 h-16 rounded-full border-2 border-brand-yellow p-1 shrink-0">
                            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden relative">
                                <Image 
                                    src="https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830df9573b3008295327dea_Machu-Picchu-Peru..webp"
                                    alt="Guía Profesional"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        
                        {/* Simulación del Cartel */}
                        <div className="flex-1 bg-white rounded-xl p-4 shadow-sm relative overflow-hidden">
                            {/* "Tu Logo Aquí" */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <span className="text-4xl font-black uppercase text-gray-900 rotate-[-10deg]">Tu Agencia</span>
                            </div>
                            <div className="relative z-10 text-center">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Bienvenido a Cusco</p>
                                <div className="h-8 bg-gray-100 rounded-lg w-3/4 mx-auto flex items-center justify-center border border-dashed border-gray-300">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Espacio para tu Logo</span>
                                </div>
                                <p className="text-xs text-brand-dark font-bold mt-2">Familia Smith</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elemento B: Credencial / Fotocheck (Flotando arriba a la derecha) */}
                <div className="absolute top-8 right-8 w-48 bg-white rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden border border-gray-100 hidden sm:block">
                    <div className="bg-brand-dark h-16 flex items-center justify-center relative">
                        <div className="w-12 h-12 bg-white/10 rounded-full absolute -top-4 -right-4"></div>
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest opacity-50">Staff Oficial</span>
                    </div>
                    <div className="p-4 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto -mt-10 border-4 border-white relative overflow-hidden">
                             <Image 
                                    src="https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830bd0ecac3a8f022e4b7a0_000463197W.webp"
                                    alt="Guía"
                                    fill
                                    className="object-cover"
                                />
                        </div>
                        <p className="font-bold text-brand-dark mt-2 text-sm">Carlos M.</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Guía Certificado</p>
                        <div className="mt-3 py-1 px-2 bg-gray-50 border border-dashed border-gray-300 rounded text-[9px] text-gray-400 font-bold uppercase">
                            Tu Logo Aquí
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </section>
  );
}

// Subcomponente de Tarjeta de Característica
function FeatureCard({ icon: Icon, title, desc, color }: any) {
    return (
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color} transition-transform group-hover:scale-110`}>
                <Icon size={20} strokeWidth={2} />
            </div>
            <h4 className="font-bold text-brand-dark text-base mb-2">{title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
        </div>
    )
}