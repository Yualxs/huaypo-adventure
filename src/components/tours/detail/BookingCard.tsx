"use client";

import { useTranslations } from "next-intl";
import { Check, Calendar } from "lucide-react";

interface BookingCardProps {
  price: number;
}

export default function BookingCard({ price }: BookingCardProps) {
  const t = useTranslations("TourDetail.Booking");

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 sticky top-32">
        
        <div className="mb-6">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">{t("title")}</p>
            <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-brand-dark">${price}</span>
                <span className="text-gray-500 mb-1">USD</span>
            </div>
        </div>

        <div className="space-y-4 mb-8">
            {/* Selector de Fecha Simulado */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue">
                    <Calendar size={18} />
                </div>
                <input 
                    type="text" 
                    placeholder="Seleccionar Fecha" 
                    className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-medium rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer"
                    readOnly // Por ahora solo visual
                />
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={12} /></div>
                    <span>Confirmación inmediata</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={12} /></div>
                    <span>Guías expertos locales</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={12} /></div>
                    <span>Equipo de camping premium</span>
                </div>
            </div>
        </div>

        <button className="w-full py-4 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            {t("cta")}
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-4">
            Sin cargos ocultos. Reserva 100% segura.
        </p>
    </div>
  );
}