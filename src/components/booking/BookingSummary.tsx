"use client";

import Image from "next/image";
import { BookingState } from "@/types/booking";
import { Calendar, Users, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";

// Función auxiliar fuera del componente para no recrearla en cada render
const getRelevantAddons = (tourSlug: string) => {
  const isTrekking = tourSlug.includes('inca') || tourSlug.includes('salkantay') || tourSlug.includes('trek');
  if (isTrekking) {
    return [
      { id: 'sleeping-bag', price: 25 },
      { id: 'walking-sticks', price: 15 },
      { id: 'porter-extra', price: 70 },
    ];
  } 
  return [
    { id: 'photography', price: 35 },
    { id: 'buffet', price: 20 },
  ];
};

export default function BookingSummary({ data }: { data: BookingState }) {
  const locale = useLocale();
  
  // 1. Datos del Tour (Mock o Backend)
  const tourImage = "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baa8b6b42925a135cfac_Camino%20Inca%20Huaypo%20Adventure%2003.webp";
  const tourName = data.tourSlug 
    ? (data.tourSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())) 
    : "Selecciona tu experiencia";

  // 2. Cálculos de Precio (Aquí se definen las variables que te faltaban)
  const pricePerPerson = data.serviceType === 'private' ? 650 : 500;
  
  // variable 'subtotal' definida aquí
  const subtotal = pricePerPerson * data.travelersCount;

  // Calcular extras
  const availableAddons = getRelevantAddons(data.tourSlug);
  const addonsTotal = availableAddons
    .filter(addon => data.selectedAddons?.includes(addon.id)) // El '?' protege si selectedAddons es undefined
    .reduce((sum, addon) => sum + (addon.price * data.travelersCount), 0);

  const grandTotal = subtotal + addonsTotal;
  const deposit = grandTotal * 0.30;
  const amountToShow = data.paymentPreference === 'deposit' ? deposit : grandTotal;

  // 3. Formateo de Fecha (variable 'formattedDate' definida aquí)
  const formattedDate = data.date 
    ? new Date(data.date + "T00:00:00").toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
    : "Fecha pendiente";

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden sticky top-32 transition-all duration-300 hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)]">
      
      {/* Header Premium con Imagen */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 group">
        <Image 
            src={tourImage} 
            alt="Tour Preview" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent"></div>
        
        {/* Contenido sobre la imagen */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
                <span className="bg-brand-yellow text-brand-dark text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> Tu Aventura
                </span>
                {data.serviceType && (
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${data.serviceType === 'private' ? 'bg-brand-dark text-white border border-white/30' : 'bg-brand-blue/80 text-white'}`}>
                        {data.serviceType === 'private' ? 'Privado VIP' : 'Grupal'}
                    </span>
                )}
            </div>
            <h4 className="text-2xl font-black leading-tight tracking-tight mb-1">{tourName}</h4>
        </div>
      </div>

      {/* Detalles del Viaje (Iconos) */}
      <div className="space-y-5 mb-8 px-2">
        <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-pale flex items-center justify-center text-brand-blue shrink-0 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Calendar size={20} strokeWidth={2.5} />
            </div>
            <div>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Fecha de Inicio</p>
                <p className="text-base font-bold text-brand-dark capitalize">{formattedDate}</p>
            </div>
        </div>
        <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-pale flex items-center justify-center text-brand-blue shrink-0 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                <Users size={20} strokeWidth={2.5} />
            </div>
            <div>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Viajeros</p>
                <p className="text-base font-bold text-brand-dark">{data.travelersCount} Personas</p>
            </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 mb-8"></div>

      {/* Desglose Financiero */}
      <div className="space-y-4 mb-8 px-2">
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium flex items-center gap-2">
                Precio por persona 
                {data.serviceType === 'private' && <span className="text-[10px] bg-brand-yellow/20 text-brand-dark px-2 rounded-full font-bold">VIP</span>}
            </span>
            <span className="font-bold text-brand-dark">${pricePerPerson}</span>
        </div>
        
        {/* Mostrar Add-ons si hay */}
        {addonsTotal > 0 && (
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Mejoras / Extras</span>
                <span className="font-bold text-brand-dark">+${addonsTotal.toLocaleString()}</span>
            </div>
        )}

        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 font-medium">Subtotal ({data.travelersCount} pax)</span>
            <span className="font-bold text-brand-dark">${grandTotal.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-green-600">
            <span className="font-bold flex items-center gap-1.5"><ShieldCheck size={14}/> Impuestos y Tasas</span>
            <span className="font-extrabold uppercase text-xs bg-green-100 px-2 py-0.5 rounded-md">Incluidos</span>
        </div>
      </div>

      {/* Total a Pagar */}
      <div className="bg-brand-dark p-6 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="relative z-10 flex justify-between items-end">
            <div>
                <p className="text-sm font-bold text-brand-yellow uppercase tracking-wider mb-2 opacity-80">
                    {data.paymentPreference === 'deposit' ? 'Depósito a Pagar (30%)' : 'Monto Total a Pagar'}
                </p>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold">$</span>
                    <span className="text-4xl font-black tracking-tight">{amountToShow.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="text-sm font-bold text-brand-yellow ml-1">USD</span>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}