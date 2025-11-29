"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  const t = useTranslations("BlogPage.Newsletter");

  return (
    <section className="w-full py-20 lg:py-32">
      <Container size="medium">
        
        {/* TARJETA PREMIUM LIGHT
            - bg-white: Fondo limpio.
            - shadow-[...]: Sombra personalizada muy suave y amplia para efecto "flotante".
            - border-gray-100: Borde sutil para definición.
        */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 group">
            
            {/* Decoración de Fondo (Manchas de luz muy sutiles) */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-brand-blue/5 opacity-50"></div>
            <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
                
                {/* Icono Flotante */}
                <div className="w-20 h-20 bg-brand-pale rounded-3xl rotate-3 flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:rotate-6 transition-transform duration-500">
                    <Mail size={36} className="text-brand-blue" />
                </div>
                
                {/* Textos Oscuros */}
                <h2 className="text-3xl md:text-5xl font-black text-brand-dark mb-4 tracking-tight text-balance">
                    {t("title")}
                </h2>
                <p className="text-lg text-gray-500 mb-10 font-light leading-relaxed max-w-lg mx-auto text-pretty">
                    {t("subtitle")}
                </p>

                {/* Formulario Light */}
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <div className="flex-grow relative">
                        <input 
                            type="email" 
                            placeholder={t("placeholder")} 
                            className="w-full px-6 py-4 rounded-full bg-gray-50 border border-gray-200 text-brand-dark placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all font-medium"
                        />
                    </div>
                    
                    <button className="px-8 py-4 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark font-black uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 shrink-0">
                        {t("button")}
                        <Send size={18} />
                    </button>
                </form>
                
                {/* Disclaimer Sutil */}
                <p className="text-xs text-gray-400 mt-6 font-medium">
                    🔒 No spam. Solo aventuras. Puedes cancelar cuando quieras.
                </p>
            </div>
        </div>
      </Container>
    </section>
  );
}