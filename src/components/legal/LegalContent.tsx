"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Shield, Lock } from "lucide-react";

export default function LegalContent() {
  const t = useTranslations("PrivacyPage.Content");

  // Recuperamos el array de secciones. 
  // Nota: next-intl requiere un método específico para iterar arrays de objetos si no usas 'raw'.
  // Aquí usaremos una técnica de mapeo simple basada en las claves que definimos arriba.
  // Pero para arrays de objetos en JSON, lo mejor es usar t.raw('sections')
  
  const sections = t.raw("sections") as Array<{ title: string; content: string }>;

  return (
    <section className="w-full bg-white py-20 lg:py-28 relative">
      <Container size="small"> {/* Contenedor más estrecho para facilitar la lectura */}
        
        {/* Intro Destacada - Versión Premium Actualizada */}
        {/* CAMBIO: De bg-brand-pale a bg-white + shadow-xl (Estilo Tarjeta Física) */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 mb-20 flex gap-8 items-start relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
            
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="hidden md:flex w-14 h-14 bg-brand-blue/10 rounded-2xl items-center justify-center shrink-0 text-brand-blue group-hover:scale-110 transition-transform duration-500">
                <Shield size={28} />
            </div>
            <div className="relative z-10">
                <h3 className="text-sm font-extrabold text-brand-blue mb-3 uppercase tracking-[0.2em]">
                    Introducción
                </h3>
                <p className="text-[17px] text-gray-600 leading-relaxed font-light">
                    {t("intro")}
                </p>
            </div>
        </div>

        {/* Contenido Legal */}
        <div className="space-y-12 relative">
            
            {/* Línea de tiempo decorativa lateral */}
            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gray-100 hidden lg:block"></div>

            {sections.map((section, index) => (
                <div key={index} className="relative lg:pl-12 group">
                    
                    {/* Punto decorativo en la línea */}
                    <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-gray-200 border-2 border-white group-hover:bg-brand-blue transition-colors hidden lg:block"></div>

                    <h2 className="text-2xl font-extrabold text-brand-dark mb-4 flex items-center gap-3">
                        {/* Icono pequeño para móviles */}
                        <span className="lg:hidden text-brand-blue"><Lock size={18}/></span>
                        {section.title}
                    </h2>
                    
                    <div 
                        className="text-[16px] md:text-[17px] text-gray-600 leading-[1.8] font-light text-pretty"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                </div>
            ))}
        </div>

        {/* Footer del documento */}
        <div className="mt-20 pt-10 border-t border-gray-100 text-center text-gray-400 text-sm">
            <p>Última actualización: Noviembre 2025</p>
            <p>Huaypo Adventure - Todos los derechos reservados.</p>
        </div>

      </Container>
    </section>
  );
}