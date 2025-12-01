"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, Users, Map, Info, ChevronDown, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { BookingState } from "@/types/booking";

interface Props {
  data: BookingState;
  update: (updates: Partial<BookingState>) => void;
  onNext: () => void;
}

export default function Step1Journey({ data, update, onNext }: Props) {
  const t = useTranslations("BookingWizard.Step1");
  const locale = useLocale();

  // --- ESTADOS LOCALES PARA LA UI (Dropdowns) ---
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  
  // Referencias para cerrar al hacer click fuera
  const tourRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Estado del Calendario
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Datos simulados de Tours (Estos deberían coincidir con tus slugs)
  const tours = [
    { slug: "camino-inca-clasico-4-dias", label: "Camino Inca Clásico 4D/3N", badge: "Best Seller" },
    { slug: "salkantay-trek-5d-4n", label: "Salkantay Trek 5D/4N", badge: "Popular" },
    { slug: "machu-picchu-full-day", label: "Machu Picchu Full Day", badge: null },
    { slug: "montana-de-colores", label: "Montaña de Colores", badge: null },
  ];

  // --- LÓGICA DEL CALENDARIO (Reutilizada de BookingCard) ---
  const weekDays = locale === 'en' 
    ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] 
    : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    update({ date: `${year}-${month}-${dayStr}` });
    setIsCalendarOpen(false);
  };

  // Click Outside Hook unificado
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tourRef.current && !tourRef.current.contains(event.target as Node)) setIsTourOpen(false);
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) setIsCalendarOpen(false);
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) setIsGuestsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Formateo de fecha para mostrar
  const formattedDate = data.date 
    ? new Date(data.date + "T00:00:00").toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) 
    : "";

  // Label del tour seleccionado
  const selectedTourLabel = tours.find(t => t.slug === data.tourSlug)?.label || t("selectTour");

  // Validación
  const isValid = data.tourSlug && data.date && data.travelersCount > 0;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header del Paso */}
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-black text-brand-dark mb-2">{t("title")}</h2>
        <p className="text-gray-500 font-medium text-sm">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* --- 1. SELECTOR DE TOUR PREMIUM --- */}
        <div className="md:col-span-2 space-y-3 relative" ref={tourRef}>
          <label className="text-xs font-extrabold text-brand-dark/50 uppercase tracking-widest ml-1">{t("tourLabel")}</label>
          
          {/* Trigger */}
          <div 
            onClick={() => setIsTourOpen(!isTourOpen)}
            className={`w-full bg-white border flex items-center justify-between rounded-2xl px-5 py-5 cursor-pointer transition-all duration-300 group ${
                isTourOpen ? 'border-brand-blue ring-4 ring-brand-blue/10 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4 overflow-hidden">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${data.tourSlug ? 'bg-brand-blue text-white' : 'bg-brand-pale text-brand-blue'}`}>
                    <Map size={20} />
                </div>
                <div className="flex flex-col truncate">
                    <span className={`text-base font-bold truncate ${data.tourSlug ? 'text-brand-dark' : 'text-gray-400'}`}>
                        {selectedTourLabel}
                    </span>
                </div>
            </div>
            <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isTourOpen ? 'rotate-180 text-brand-blue' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
              isTourOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}>
             <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                {tours.map((tour) => (
                    <button
                        key={tour.slug}
                        onClick={() => { update({ tourSlug: tour.slug }); setIsTourOpen(false); }}
                        className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                            data.tourSlug === tour.slug ? "bg-brand-pale text-brand-blue" : "hover:bg-gray-50 text-brand-dark"
                        }`}
                    >
                        <span className="truncate">{tour.label}</span>
                        {tour.badge && (
                            <span className="text-[9px] bg-brand-yellow text-brand-dark px-2 py-0.5 rounded-full uppercase tracking-wide font-black">
                                {tour.badge}
                            </span>
                        )}
                        {data.tourSlug === tour.slug && <Check size={16} className="text-brand-blue" />}
                    </button>
                ))}
             </div>
          </div>
        </div>

        {/* --- 2. FECHA (CUSTOM CALENDAR) --- */}
        <div className="space-y-3 relative" ref={calendarRef}>
          <label className="text-xs font-extrabold text-brand-dark/50 uppercase tracking-widest ml-1">{t("dateLabel")}</label>
          
          <div 
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full bg-white border flex items-center justify-between rounded-2xl px-5 py-5 cursor-pointer transition-all duration-300 ${
                isCalendarOpen || data.date ? 'border-brand-blue ring-4 ring-brand-blue/10 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
             <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${data.date ? 'bg-brand-blue text-white' : 'bg-brand-pale text-brand-blue'}`}>
                    <Calendar size={20} />
                </div>
                <span className={`text-base font-bold ${data.date ? 'text-brand-dark' : 'text-gray-400'}`}>
                    {formattedDate || t("dateLabel")}
                </span>
             </div>
          </div>

          {/* Pop-up Calendario */}
          <div className={`absolute top-full left-0 w-full md:w-[320px] mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 z-40 overflow-hidden transition-all duration-200 origin-top-left ${
              isCalendarOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}>
              <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                      <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={18} className="text-brand-dark"/></button>
                      <span className="font-black text-brand-dark capitalize">
                          {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                      </span>
                      <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={18} className="text-brand-dark"/></button>
                  </div>
                  
                  <div className="grid grid-cols-7 mb-2 text-center">
                      {weekDays.map((d, i) => (
                          <span key={i} className="text-[10px] font-extrabold text-gray-400 uppercase">{d}</span>
                      ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => <div key={`empty-${i}`} />)}
                      {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => i + 1).map(day => {
                          const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                          const dayString = dayDate.toISOString().split('T')[0]; // Comparación segura YYYY-MM-DD
                          const isSelected = data.date === dayString;
                          const isPast = dayDate < new Date(new Date().setHours(0,0,0,0));

                          return (
                              <button
                                  key={day}
                                  disabled={isPast}
                                  onClick={() => handleDateSelect(day)}
                                  className={`
                                      aspect-square rounded-lg text-sm font-bold transition-all flex items-center justify-center relative
                                      ${isSelected 
                                          ? "bg-brand-dark text-white shadow-md" 
                                          : isPast 
                                              ? "text-gray-300 cursor-not-allowed"
                                              : "text-gray-600 hover:bg-brand-pale hover:text-brand-blue"
                                      }
                                  `}
                              >
                                  {day}
                                  {isSelected && <span className="absolute bottom-1 w-1 h-1 bg-brand-yellow rounded-full"></span>}
                              </button>
                          )
                      })}
                  </div>
              </div>
          </div>
        </div>

        {/* --- 3. VIAJEROS (CUSTOM DROPDOWN) --- */}
        <div className="space-y-3 relative" ref={guestsRef}>
          <label className="text-xs font-extrabold text-brand-dark/50 uppercase tracking-widest ml-1">{t("travelersLabel")}</label>
          
          <div 
            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
            className={`w-full bg-white border flex items-center justify-between rounded-2xl px-5 py-5 cursor-pointer transition-all duration-300 ${
                isGuestsOpen ? 'border-brand-blue ring-4 ring-brand-blue/10 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-pale text-brand-blue flex items-center justify-center shrink-0">
                    <Users size={20} />
                </div>
                <div className="flex flex-col">
                    <span className="text-base font-bold text-brand-dark">
                        {data.travelersCount} {t("pax")}
                    </span>
                </div>
             </div>
             <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isGuestsOpen ? 'rotate-180 text-brand-blue' : ''}`} />
          </div>

          <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 overflow-hidden transition-all duration-200 origin-top ${
              isGuestsOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}>
              <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin">
                  {[...Array(15)].map((_, i) => {
                      const count = i + 1;
                      return (
                        <button
                            key={i}
                            onClick={() => { update({ travelersCount: count }); setIsGuestsOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex justify-between items-center ${
                                data.travelersCount === count ? "bg-brand-pale text-brand-blue" : "hover:bg-gray-50 text-gray-600"
                            }`}
                        >
                            <span>{count} {t("pax")}</span>
                            {data.travelersCount === count && <Check size={16} />}
                        </button>
                      )
                  })}
              </div>
          </div>
        </div>

      </div>

      {/* --- 4. TIPO DE SERVICIO (CARDS MEJORADAS) --- */}
      <div className="pt-6">
        <label className="text-xs font-extrabold text-brand-dark/50 uppercase tracking-widest ml-1 mb-4 block">{t("serviceLabel")}</label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Group */}
          <div 
            onClick={() => update({ serviceType: 'group' })}
            className={`cursor-pointer border-2 rounded-[1.5rem] p-6 transition-all duration-300 flex flex-col gap-3 relative overflow-hidden group ${
                data.serviceType === 'group' 
                ? 'border-brand-blue bg-brand-pale/20 shadow-lg' 
                : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start z-10">
              <span className={`font-black text-lg ${data.serviceType === 'group' ? 'text-brand-dark' : 'text-gray-500'}`}>{t("groupOption")}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  data.serviceType === 'group' ? 'border-brand-blue bg-brand-blue' : 'border-gray-300'
              }`}>
                  {data.serviceType === 'group' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed z-10">
                Únete a otros viajeros de todo el mundo. Salidas diarias garantizadas.
            </p>
            {/* Decoración de fondo */}
            {data.serviceType === 'group' && <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-brand-blue/10 rounded-full blur-xl"></div>}
          </div>

          {/* Private */}
          <div 
            onClick={() => { if(data.travelersCount > 1) update({ serviceType: 'private' }) }}
            className={`cursor-pointer border-2 rounded-[1.5rem] p-6 transition-all duration-300 flex flex-col gap-3 relative overflow-hidden group ${
                data.serviceType === 'private' 
                ? 'border-brand-yellow bg-brand-yellow/5 shadow-lg' 
                : data.travelersCount === 1 ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start z-10">
              <span className={`font-black text-lg ${data.serviceType === 'private' ? 'text-brand-dark' : 'text-gray-500'}`}>{t("privateOption")}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  data.serviceType === 'private' ? 'border-brand-yellow bg-brand-yellow' : 'border-gray-300'
              }`}>
                  {data.serviceType === 'private' && <div className="w-2 h-2 bg-brand-dark rounded-full"></div>}
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed z-10">
                Experiencia exclusiva para tu grupo. Tú eliges el ritmo.
            </p>
            
            {data.travelersCount === 1 && (
              <div className="flex items-center gap-1.5 text-[10px] text-red-500 mt-1 font-bold bg-red-50 w-fit px-2 py-1 rounded-md">
                <Info size={12} /> Mínimo 2 personas
              </div>
            )}
            
            {/* Decoración de fondo */}
            {data.serviceType === 'private' && <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-brand-yellow/20 rounded-full blur-xl"></div>}
          </div>
        </div>
      </div>

      <div className="pt-8">
        <button 
          onClick={onNext}
          disabled={!isValid}
          className="w-full py-5 bg-brand-dark text-white font-black text-lg uppercase tracking-widest rounded-2xl hover:bg-brand-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
        >
          {t("nextBtn")}
          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </div>
  );
}