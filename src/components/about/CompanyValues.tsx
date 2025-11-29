"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { ShieldCheck, Heart, Users, Star, Target, Eye } from "lucide-react";

export default function CompanyValues() {
  const t = useTranslations("AboutPage.Values");

  const values = [
    { key: "honesty", icon: Star, color: "bg-brand-yellow" },
    { key: "security", icon: ShieldCheck, color: "bg-brand-blue" },
    { key: "respect", icon: Heart, color: "bg-brand-orange" }, // Asumiendo color o usa hex directo
    { key: "responsibility", icon: Users, color: "bg-green-500" },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-24 lg:py-32 relative overflow-hidden">
      
      {/* Elemento Decorativo de Fondo (Círculo difuso) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -z-10"></div>

      <Container>
        
        {/* --- CABECERA DE SECCIÓN --- */}
        <div className="text-center mb-16">
          <span className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-2 block">
            Nuestra Esencia
          </span>
          <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark uppercase">
            {t("title")}
          </h2>
        </div>

        {/* --- MISIÓN Y VISIÓN (Estilo Tarjeta Editorial) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
            
            {/* Tarjeta Misión */}
            <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Imagen Superior (Mitad de la tarjeta) */}
                <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                        src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
                        alt="Misión Huaypo"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                            <Target size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{t("mission.title")}</h3>
                    </div>
                </div>
                {/* Texto Inferior */}
                <div className="p-8 lg:p-10">
                    <p className="text-[16px] text-gray-600 leading-relaxed font-light">
                        {t("mission.desc")}
                    </p>
                </div>
            </div>

            {/* Tarjeta Visión */}
            <div className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Imagen Superior */}
                <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                        src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif"
                        alt="Visión Huaypo"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-8 flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                            <Eye size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{t("vision.title")}</h3>
                    </div>
                </div>
                {/* Texto Inferior */}
                <div className="p-8 lg:p-10">
                    <p className="text-[16px] text-gray-600 leading-relaxed font-light">
                        {t("vision.desc")}
                    </p>
                </div>
            </div>
        </div>

        {/* --- VALORES CORE (Grid Limpio) --- */}
        <div className="relative">
            <div className="text-center mb-12">
                <h3 className="text-h4 font-extrabold text-brand-dark uppercase tracking-wide bg-[#f8fafc] inline-block px-4 relative z-10">
                    {t("coreTitle")}
                </h3>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-0"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((val) => (
                    <div 
                        key={val.key} 
                        className="group bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-gray-100 flex flex-col items-center text-center"
                    >
                        {/* Círculo de Icono con color dinámico */}
                        <div className={`w-16 h-16 ${val.color} rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center mb-6 shadow-sm`}>
                            <val.icon size={30} className="text-white" />
                        </div>
                        
                        <h4 className="text-lg font-extrabold text-brand-dark mb-3">
                            {t(`core.${val.key}.title`)}
                        </h4>
                        
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {t(`core.${val.key}.desc`)}
                        </p>
                    </div>
                ))}
            </div>
        </div>

      </Container>
    </section>
  );
}