"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Users, Crown, Check, Info, User } from "lucide-react";

interface PriceTable {
  groupPrice: number;
  privatePrices: number[];
}

export default function TourPrices({ prices }: { prices: PriceTable }) {
  const t = useTranslations("TourDetail.Price");
  const [serviceType, setServiceType] = useState<"group" | "private">("group");

  return (
    <div className="space-y-10">
        
        {/* --- SWITCHER DE SERVICIO (Estilo Píldora Flotante) --- */}
        <div className="flex justify-center">
            <div className="flex p-1.5 bg-gray-100 rounded-full shadow-inner">
                <button
                    onClick={() => setServiceType("group")}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                        serviceType === "group" 
                        ? "bg-white text-brand-dark shadow-md transform scale-105" 
                        : "text-gray-500 hover:text-brand-dark"
                    }`}
                >
                    <Users size={18} />
                    {t("groupTitle")}
                </button>
                <button
                    onClick={() => setServiceType("private")}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                        serviceType === "private" 
                        ? "bg-brand-dark text-white shadow-md transform scale-105" 
                        : "text-gray-500 hover:text-brand-dark"
                    }`}
                >
                    <Crown size={18} className={serviceType === "private" ? "text-brand-yellow" : ""} />
                    {t("privateTitle")}
                </button>
            </div>
        </div>

        {/* --- CONTENIDO DINÁMICO --- */}
        <div className="animate-fade-in-up">
            
            {/* 1. SERVICIO GRUPAL (Tarjeta Horizontal Limpia) */}
            {serviceType === "group" && (
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
                    
                    {/* Decoración */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue"></div>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-blue/5 rounded-full blur-3xl"></div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pale text-brand-blue text-[10px] font-bold uppercase tracking-wider mb-4">
                            <Users size={12} /> Opción Popular
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-brand-dark mb-3">{t("groupTitle")}</h3>
                        <p className="text-gray-500 leading-relaxed font-light">{t("groupDesc")}</p>
                        
                        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                <Check size={14} className="text-green-500"/> Salidas Diarias
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                <Users size={14} className="text-blue-500"/> Max 16 Personas
                            </div>
                        </div>
                    </div>
                    
                    {/* Bloque de Precio */}
                    <div className="text-center bg-gray-50 rounded-3xl p-8 min-w-[240px] border border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">{t("perPerson")}</p>
                        <div className="flex items-center justify-center gap-1 text-brand-dark mb-4">
                            <span className="text-2xl font-medium text-gray-400">$</span>
                            <span className="text-6xl font-black tracking-tighter">{prices.groupPrice}</span>
                            <span className="text-lg font-bold text-gray-400">USD</span>
                        </div>
                        <button className="w-full py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-blue transition-colors shadow-lg shadow-brand-dark/10">
                            Reservar Ahora
                        </button>
                    </div>
                </div>
            )}

            {/* 2. SERVICIO PRIVADO (Grid Escalado - Light Premium) */}
            {serviceType === "private" && (
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] relative overflow-hidden">
                    
                    {/* Decoración Dorada */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-dark via-brand-yellow to-brand-dark"></div>
                    
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-dark text-brand-yellow mb-4 shadow-lg shadow-brand-yellow/20">
                            <Crown size={24} fill="currentColor" />
                        </div>
                        <h3 className="text-2xl font-black text-brand-dark mb-3">{t("privateTitle")}</h3>
                        <p className="text-gray-500 font-light">{t("privateDesc")}</p>
                        
                        <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold">
                            <Info size={14} />
                            El precio por persona baja si viajas con más amigos
                        </div>
                    </div>

                    {/* GRID DE TARIFAS (Claridad Total) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {prices.privatePrices.map((price, idx) => {
                            const pax = idx + 1;
                            // Resaltar tamaños de grupo comunes (2, 4, 8)
                            const isHighlight = pax === 2 || pax === 4 || pax === 8;
                            
                            return (
                                <div 
                                    key={pax} 
                                    className={`
                                        relative flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 group
                                        ${isHighlight 
                                            ? "bg-brand-yellow/5 border-brand-yellow shadow-sm scale-105 z-10" 
                                            : "bg-white border-gray-100 hover:border-brand-blue/30 hover:shadow-md"
                                        }
                                    `}
                                >
                                    {isHighlight && (
                                        <span className="absolute -top-3 bg-brand-yellow text-brand-dark text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                                            Popular
                                        </span>
                                    )}

                                    {/* Iconografía de Cantidad */}
                                    <div className="flex -space-x-2 mb-3 text-gray-300 group-hover:text-brand-blue transition-colors">
                                        <User size={16} fill="currentColor" />
                                        {pax > 1 && <User size={16} fill="currentColor" className={pax > 2 ? "opacity-50" : ""} />}
                                        {pax > 3 && <span className="text-xs font-bold ml-2">+{pax-2}</span>}
                                    </div>

                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{pax} Pasajeros</p>
                                    <p className="text-xl font-black text-brand-dark group-hover:text-brand-blue transition-colors">
                                        ${price}
                                    </p>
                                    <p className="text-[9px] text-gray-400 mt-1 font-medium">pp</p>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                         <p className="text-sm text-gray-500">
                            ¿Viajas con un grupo más grande? <a href="/contact" className="text-brand-blue font-bold underline hover:no-underline">Contáctanos para una cotización especial.</a>
                         </p>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
}