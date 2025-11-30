"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { 
    Check, X, Backpack, Shirt, Footprints, 
    Map, CircleDollarSign, // <--- NUEVO ICONO (Más claro para tarifas)
    ListChecks, HelpCircle, ChevronRight 
} from "lucide-react";
import TourItinerary from "./TourItinerary";
import ExpertTips from "@/components/collections/ExpertTips";
import TourPrices from "./TourPrices";

interface TourTabsProps {
  itinerary: any[];
  inclusions: string[];
  exclusions: string[];
  packingList: string[];
  prices: { groupPrice: number; privatePrices: number[] };
  faqs: any[];
}

export default function TourTabs({ itinerary, inclusions, exclusions, packingList, prices, faqs }: TourTabsProps) {
  const t = useTranslations("TourDetail.Tabs");
  const tInc = useTranslations("TourDetail.Inclusions");
  const [activeTab, setActiveTab] = useState("itinerary");

  // Configuración de Tabs con Iconos
  const tabs = [
    { id: "itinerary", label: t("itinerary"), icon: Map },
    { id: "price", label: t("price"), icon: CircleDollarSign }, // <--- ASIGNADO AQUÍ
    { id: "inclusions", label: t("inclusions"), icon: ListChecks },
    { id: "packing", label: t("packing"), icon: Backpack },
    { id: "faq", label: t("faq"), icon: HelpCircle },
  ];

  return (
    <div className="w-full">
        
        {/* --- NAVEGACIÓN DE PESTAÑAS PREMIUM (Full Width) --- */}
        <div className="sticky top-0 z-30 bg-[#fafaf9]/95 backdrop-blur-sm pt-2 pb-6 -mx-5 px-5 md:mx-0 md:px-0">
            <div className="bg-white p-1.5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] border border-gray-100">
                <div className="flex md:grid md:grid-cols-5 gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex-1
                                    ${isActive 
                                        ? "bg-brand-dark text-white shadow-md translate-y-0" 
                                        : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-brand-blue"
                                    }
                                `}
                            >
                                <Icon size={18} className={isActive ? "text-brand-yellow" : "opacity-70"} strokeWidth={2} />
                                <span>{tab.label}</span>
                                
                                {/* Indicador activo (punto) */}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-yellow rounded-full md:hidden"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* --- CONTENIDO --- */}
        <div className="min-h-[400px] animate-fade-in-up">
            
            {/* 1. ITINERARIO */}
            {activeTab === "itinerary" && <TourItinerary days={itinerary} />}
            
            {/* 2. PRECIOS */}
            {activeTab === "price" && <TourPrices prices={prices} />}

            {/* 3. INCLUSIONES */}
            {activeTab === "inclusions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Incluye */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-green-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                        
                        <h3 className="text-lg font-black text-brand-dark mb-8 flex items-center gap-3 uppercase tracking-wider relative z-10">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm border border-green-200">
                                <Check size={18} strokeWidth={3} />
                            </div>
                            {tInc("included")}
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            {inclusions.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 text-sm font-medium leading-relaxed group/item">
                                    <ChevronRight size={16} className="text-green-500 mt-0.5 shrink-0 transition-transform group-hover/item:translate-x-1" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* No Incluye */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-red-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                        <h3 className="text-lg font-black text-brand-dark mb-8 flex items-center gap-3 uppercase tracking-wider relative z-10">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-sm border border-red-100">
                                <X size={18} strokeWidth={3} />
                            </div>
                            {tInc("notIncluded")}
                        </h3>
                        <ul className="space-y-4 relative z-10">
                            {exclusions.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-500 text-sm leading-relaxed">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-200 mt-2 shrink-0"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* 4. PACKING */}
            {activeTab === "packing" && (
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-orange"></div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20">
                        {/* Esenciales */}
                        <div>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-brand-pale rounded-lg text-brand-blue">
                                    <Backpack size={24} strokeWidth={1.5} />
                                </div>
                                <h4 className="font-black text-brand-dark uppercase tracking-widest text-sm">Esenciales</h4>
                            </div>
                            <ul className="space-y-3">
                                {packingList.slice(0, 4).map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-brand-pale/50 flex items-center justify-center text-brand-blue text-[10px] font-bold">
                                            {i + 1}
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ropa y Equipo */}
                        <div>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-brand-yellow/10 rounded-lg text-brand-bronze">
                                    <Shirt size={24} strokeWidth={1.5} />
                                </div>
                                <h4 className="font-black text-brand-dark uppercase tracking-widest text-sm">Ropa y Calzado</h4>
                            </div>
                            <ul className="space-y-3">
                                {packingList.slice(4).map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* 5. FAQS */}
            {activeTab === "faq" && <ExpertTips faqs={faqs} />}

        </div>
    </div>
  );
}