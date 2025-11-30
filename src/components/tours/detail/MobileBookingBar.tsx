"use client";

import { useTranslations } from "next-intl";
import { CreditCard } from "lucide-react";

interface MobileBookingBarProps {
  price: number;
}

export default function MobileBookingBar({ price }: MobileBookingBarProps) {
  const t = useTranslations("TourDetail.Booking");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.15)] animate-fade-in-up">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
            
            {/* Precio Móvil */}
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t("priceFrom")}</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-brand-dark">${price}</span>
                    <span className="text-xs text-gray-400 font-medium">USD</span>
                </div>
            </div>

            {/* Botón de Acción */}
            <button 
                // Aquí podrías poner un scroll suave hacia el BookingCard principal o abrir un modal
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex-1 bg-brand-yellow text-brand-dark font-black uppercase tracking-widest py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                {t("bookBtn")}
                <CreditCard size={18} />
            </button>
        </div>
    </div>
  );
}