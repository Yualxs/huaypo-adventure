"use client";

import { useTranslations } from "next-intl";
import { Globe, MapPin, Check, Crown, Briefcase, Zap, TrendingUp, Users, Plane, Building2 } from "lucide-react";

export default function PartnerSegments() {
  const t = useTranslations("PartnersPage.Segments");

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Fondo Decorativo Sutil */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        
        {/* Cabecera */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pale text-brand-blue border border-brand-blue/10 mb-6">
             <Briefcase size={14} />
             <span className="text-[11px] font-bold uppercase tracking-widest">Modelos de Cooperación</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight text-balance">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* --- TARJETA 1: INTERNACIONAL (Azul) --- */}
            <div className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-brand-blue/30 hover:-translate-y-1">
                
                {/* Barra Superior de Color */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-cyan-400"></div>

                <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-pale flex items-center justify-center text-brand-blue shadow-sm border border-brand-blue/10 group-hover:scale-110 transition-transform duration-500">
                        <Globe size={32} strokeWidth={1.5} />
                    </div>
                    {/* Badge destacado */}
                    <div className="px-4 py-1.5 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-brand-blue/20">
                        Global Partner
                    </div>
                </div>
                
                <h3 className="text-3xl font-black text-brand-dark mb-4">{t("intl.title")}</h3>
                <p className="text-gray-500 mb-10 leading-relaxed font-medium">
                    {t("intl.desc")}
                </p>

                {/* Grid de Beneficios (Más completo) */}
                <div className="bg-gray-50 rounded-3xl p-8 mb-8 border border-gray-100">
                    <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Crown size={16} className="text-brand-yellow"/> Beneficios Exclusivos
                    </h4>
                    <ul className="space-y-4">
                        <FeatureItem text="Operación integral en todo el Perú (DMC)" />
                        <FeatureItem text="Marca Blanca Total (Uniforme, Vehículos, Papelería)" />
                        <FeatureItem text="Key Account Manager dedicado 24/7" />
                        <FeatureItem text="Tarifas Netas confidenciales por volumen" />
                        <FeatureItem text="Acceso a inventario en tiempo real (API)" />
                    </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">UE</div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">US</div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-blue text-white flex items-center justify-center text-xs font-bold">+15</div>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Agencias confían en nosotros</p>
                </div>
            </div>

            {/* --- TARJETA 2: LOCAL / NACIONAL (Bronce/Naranja) --- */}
            <div className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-brand-bronze/30 hover:-translate-y-1">
                
                {/* Barra Superior de Color */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-bronze to-brand-yellow"></div>

                <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-brand-bronze shadow-sm border border-brand-yellow/20 group-hover:scale-110 transition-transform duration-500">
                        <MapPin size={32} strokeWidth={1.5} />
                    </div>
                    <div className="px-4 py-1.5 bg-brand-dark text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                        Operador Local
                    </div>
                </div>
                
                <h3 className="text-3xl font-black text-brand-dark mb-4">{t("local.title")}</h3>
                <p className="text-gray-500 mb-10 leading-relaxed font-medium">
                    {t("local.desc")}
                </p>

                {/* Grid de Beneficios */}
                <div className="bg-gray-50 rounded-3xl p-8 mb-8 border border-gray-100">
                    <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Zap size={16} className="text-brand-bronze"/> Alta Rotación
                    </h4>
                    <ul className="space-y-4">
                        <FeatureItem text="Especialistas en Cusco: City, Valle, Machupicchu" color="text-brand-bronze" />
                        <FeatureItem text="Salidas diarias garantizadas (Pool)" color="text-brand-bronze" />
                        <FeatureItem text="Comisión inmediata por pasajero" color="text-brand-bronze" />
                        <FeatureItem text="Material audiovisual para tus ventas" color="text-brand-bronze" />
                        <FeatureItem text="Resolución de conflictos in-situ" color="text-brand-bronze" />
                    </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={20} className="text-green-500" />
                        <span className="text-sm font-bold text-brand-dark">Maximiza tu rentabilidad</span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Sin costos fijos</p>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}

// Componente de Item de Lista
function FeatureItem({ text, color = "text-brand-blue" }: { text: string, color?: string }) {
    return (
        <li className="flex items-start gap-3">
            <div className={`mt-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center ${color} shadow-sm border border-gray-100 shrink-0`}>
                <Check size={12} strokeWidth={4} />
            </div>
            <span className="text-[15px] text-gray-600 leading-tight">{text}</span>
        </li>
    )
}