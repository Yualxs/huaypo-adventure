"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { ShieldCheck, CheckCircle2, AlertCircle, ZoomIn, X, BookOpen, Users } from "lucide-react";

export default function EsnnaContent() {
  const t = useTranslations("EsnnaPage.Content");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const imageSrc = "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68e6cffbdbede08b9d73fe26_huaypo-adventure-commitment-to-esnna-code-of-conduct-responsible-tourism.avif";

  return (
    <>
      <section className="w-full bg-white py-16 lg:py-24 relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* --- COLUMNA IMAGEN (Sticky + Lightbox Trigger) --- */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="lg:sticky lg:top-32">
                  
                  {/* Contenedor de Imagen con Efecto Premium */}
                  <div 
                    className="group relative w-full aspect-[3/4] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden cursor-zoom-in transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                      {/* Imagen */}
                      <Image 
                          src={imageSrc}
                          alt="Compromiso ESNNA Huaypo Adventure"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Overlay Hover (Lupa) */}
                      <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                              <ZoomIn size={32} />
                          </div>
                      </div>

                      {/* Badge Flotante (Glassmorphism) */}
                      <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl p-5 rounded-2xl border border-white/60 shadow-lg flex items-center gap-4 group-hover:translate-y-1 transition-transform duration-500">
                          <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue shrink-0">
                              <ShieldCheck size={24} />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-brand-dark uppercase tracking-wide">Turismo Responsable</h4>
                            <p className="text-[11px] text-gray-500 leading-tight mt-1">Protección de la infancia en cada destino.</p>
                          </div>
                      </div>
                  </div>

              </div>
            </div>

            {/* --- COLUMNA TEXTO --- */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              
              <div className="prose prose-lg prose-slate max-w-none">
                  {/* Título */}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-8 leading-tight tracking-tight">
                      {t("title")}
                  </h3>

                  {/* Intro Texto */}
                  <div 
                      className="text-lg text-gray-600 leading-relaxed mb-12 font-light"
                      dangerouslySetInnerHTML={{ __html: t.raw("p1") }} 
                  />

                  {/* --- BLOQUES DE CONTENIDO (Tarjetas Limpias) --- */}
                  <div className="space-y-8">
                      
                      {/* 1. Compromisos (Acento Azul) */}
                      <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-brand-blue/30 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue"></div> {/* Línea de acento */}
                          
                          <div className="flex items-center gap-3 mb-6">
                             <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <BookOpen size={20} />
                             </div>
                             <h4 className="text-xl font-bold text-brand-dark">{t("list1Title")}</h4>
                          </div>
                          
                          <ul className="space-y-4">
                              {t.raw("list1Items").map((item: string, i: number) => (
                                  <ListItem key={i} text={item} iconColor="text-brand-blue" />
                              ))}
                          </ul>
                      </div>

                      {/* 2. Sensibilización (Acento Verde) */}
                      <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-brand-green/30 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-green"></div>
                          
                          <div className="flex items-center gap-3 mb-6">
                             <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <Users size={20} />
                             </div>
                             <h4 className="text-xl font-bold text-brand-dark">{t("list2Title")}</h4>
                          </div>

                          <ul className="space-y-4">
                              {t.raw("list2Items").map((item: string, i: number) => (
                                  <ListItem key={i} text={item} iconColor="text-brand-green" />
                              ))}
                          </ul>
                      </div>

                      {/* 3. Prohibiciones (Acento Rojo - Sutil) */}
                      <div className="group bg-red-50/50 rounded-3xl p-8 border border-red-100 hover:border-red-200 transition-colors relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
                          
                          <div className="flex items-center gap-3 mb-4">
                             <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                <AlertCircle size={20} />
                             </div>
                             <h4 className="text-xl font-bold text-brand-dark">{t("list3Title")}</h4>
                          </div>

                          <p className="text-sm text-gray-500 mb-6 pl-1">{t("list3Desc")}</p>
                          
                          <ul className="space-y-3">
                              {t.raw("list3Items").map((item: string, i: number) => (
                                  <li key={i} className="flex items-start gap-3 text-gray-700">
                                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                                      <span className="font-medium text-sm md:text-base">{item}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>

                      {/* Cierre */}
                      <div className="mt-10 p-6 bg-brand-yellow/10 rounded-2xl border border-brand-yellow/20">
                        <p className="text-lg text-brand-dark font-medium italic text-center">
                            &ldquo;{t("final")}&rdquo;
                        </p>
                      </div>

                  </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* --- LIGHTBOX (MODAL FULLSCREEN) --- */}
      {isLightboxOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setIsLightboxOpen(false)}
        >
            {/* Botón Cerrar */}
            <button 
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
                onClick={() => setIsLightboxOpen(false)}
            >
                <X size={24} />
            </button>

            {/* Imagen Fullscreen */}
            <div 
                className="relative w-full max-w-2xl h-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} 
            >
                <Image 
                    src={imageSrc}
                    alt="Código ESNNA Fullscreen" 
                    fill 
                    className="object-contain rounded-lg shadow-2xl"
                    priority
                />
            </div>
        </div>
      )}
    </>
  );
}

// Subcomponente para items de lista
function ListItem({ text, iconColor = "text-brand-blue" }: { text: string, iconColor?: string }) {
    return (
        <li className="flex items-start gap-4 text-gray-600">
            <CheckCircle2 size={20} className={`${iconColor} mt-1 shrink-0`} />
            <span className="text-[15px] md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
        </li>
    )
}