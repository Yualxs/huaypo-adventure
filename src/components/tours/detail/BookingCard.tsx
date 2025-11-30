"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { 
  Calendar, Users, ChevronDown, MessageSquare, CreditCard, 
  ShieldCheck, ArrowLeft, Send, Mail, Phone, User, CheckCircle2, X 
} from "lucide-react";

interface BookingCardProps {
  price: number;
  privatePrices?: number[];
  tourTitle?: string;
}

export default function BookingCard({ price, privatePrices, tourTitle = "Tour" }: BookingCardProps) {
  const t = useTranslations("TourDetail.Booking");
  const locale = useLocale();
  
  // --- ESTADOS DE VISTA ---
  const [view, setView] = useState<"booking" | "inquiry" | "success">("booking");
  
  // --- ESTADOS DE RESERVA ---
  const [serviceType, setServiceType] = useState<"group" | "private">("group");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");

  // --- ESTADOS DE UI ---
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const guestRef = useRef<HTMLDivElement>(null);
  
  // NUEVO: Referencia para controlar el calendario manualmente
  const dateInputRef = useRef<HTMLInputElement>(null);

  // --- ESTADOS FORMULARIO ---
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  // Lógica de Precio
  const currentPrice = serviceType === "group" 
    ? price 
    : (privatePrices ? privatePrices[guests - 1] || privatePrices[privatePrices.length - 1] : price * 1.5);
  const totalPrice = currentPrice * guests;

  // --- NUEVO: LÓGICA DEL CALENDARIO PREMIUM ---
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Días de la semana según idioma
  const weekDays = locale === 'en' 
    ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] 
    : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

  // Click Outside unificado (para Pasajeros Y Calendario)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (guestRef.current && !guestRef.current.contains(target)) setIsGuestOpen(false);
      if (calendarRef.current && !calendarRef.current.contains(target)) setIsCalendarOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Funciones del Calendario
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Domingo

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    // Crear fecha local sin problemas de zona horaria
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Formato YYYY-MM-DD manual para evitar desfases
    const year = selected.getFullYear();
    const month = String(selected.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setDate(`${year}-${month}-${dayStr}`);
    setIsCalendarOpen(false);
  };

  // Cálculo de celdas vacías (offset)
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setIsGuestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isLatamMarket = locale === 'es' || locale === 'pt';
    
    if (isLatamMarket) {
        const message = `Hola Huaypo, soy ${formData.name}. Me interesa el tour *${tourTitle}* para ${guests} personas. Mi duda es: ${formData.message}`;
        const whatsappUrl = `https://wa.me/+51903102547?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setView("success");
    } else {
        // Simulación envío email
        setTimeout(() => setView("success"), 1000);
    }
  };

  // Función para formatear la fecha visualmente bonita
  const formattedDate = date ? new Date(date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) : "";

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 sticky top-32 overflow-hidden transition-all duration-500 relative min-h-[500px]">
        
        {/* ==========================================
            VISTA 1: CONFIGURADOR (Relative si está activo)
           ========================================== */}
        <div 
            className={`transition-all duration-500 ease-in-out w-full ${
                view === "booking" 
                ? "relative opacity-100 translate-x-0" 
                : "absolute top-8 left-8 right-8 opacity-0 -translate-x-full pointer-events-none"
            }`}
        >
            {/* Cabecera Precio */}
            <div className="mb-8 border-b border-gray-50 pb-6">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">{t("priceFrom")}</p>
                <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-brand-dark tracking-tight">${currentPrice}</span>
                    <div className="flex flex-col mb-1.5">
                        <span className="text-sm font-bold text-gray-500 uppercase">USD</span>
                        <span className="text-[10px] text-gray-400 font-medium">{t("perPerson")}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-5 mb-8">
                {/* Switcher */}
                <div className="bg-gray-50 p-1.5 rounded-xl flex relative">
                    <button 
                        onClick={() => setServiceType("group")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                            serviceType === "group" ? "bg-white text-brand-blue shadow-sm" : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {t("group")}
                    </button>
                    <button 
                        onClick={() => setServiceType("private")}
                        className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                            serviceType === "private" ? "bg-brand-dark text-brand-yellow shadow-sm" : "text-gray-400 hover:text-gray-600"
                        }`}
                    >
                        {t("private")}
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    
                    {/* 1. FECHA PREMIUM (Custom Picker) */}
                    <div className="col-span-2 relative" ref={calendarRef}>
                        {/* Trigger (El botón que se ve) */}
                        <div 
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            className={`w-full bg-white border flex items-center gap-3 rounded-2xl pl-4 pr-4 py-4 cursor-pointer transition-all ${
                                isCalendarOpen || date ? 'border-brand-blue ring-2 ring-brand-blue/20' : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <Calendar size={20} className={`flex-shrink-0 ${date ? "text-brand-blue" : "text-gray-400"}`} />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5 select-none">
                                    {date ? t("dateLabel") : (t("datePlaceholder") || "Seleccionar fecha")}
                                </span>
                                <span className={`text-sm font-bold select-none ${date ? "text-brand-dark" : "text-transparent h-4"}`}>
                                    {formattedDate || "-"}
                                </span>
                            </div>
                        </div>

                        {/* DROPDOWN CALENDARIO (Pop-up) */}
                        <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-30 overflow-hidden transition-all duration-200 origin-top ${
                            isCalendarOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                        }`}>
                            
                            {/* Header Mes */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
                                <button onClick={handlePrevMonth} className="p-1 hover:bg-white rounded-full hover:shadow-sm transition-all text-gray-500">
                                    <ChevronDown size={16} className="rotate-90" />
                                </button>
                                <span className="text-sm font-black text-brand-dark uppercase tracking-wide">
                                    {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                                </span>
                                <button onClick={handleNextMonth} className="p-1 hover:bg-white rounded-full hover:shadow-sm transition-all text-gray-500">
                                    <ChevronDown size={16} className="-rotate-90" />
                                </button>
                            </div>

                            {/* Grid Días */}
                            <div className="p-4">
                                {/* Nombres días */}
                                <div className="grid grid-cols-7 mb-2 text-center">
                                    {weekDays.map((d, i) => (
                                        <span key={i} className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
                                    ))}
                                </div>
                                {/* Números */}
                                <div className="grid grid-cols-7 gap-1">
                                    {emptyDays.map(e => <div key={`empty-${e}`} />)}
                                    {days.map(day => {
                                        // Verificar si es el día seleccionado actualmente
                                        const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                                        const isSelected = date === dayDate.toISOString().split('T')[0];
                                        
                                        // Deshabilitar fechas pasadas (Opcional)
                                        const isPast = dayDate < new Date(new Date().setHours(0,0,0,0));

                                        return (
                                            <button
                                                key={day}
                                                disabled={isPast}
                                                onClick={() => handleDateSelect(day)}
                                                className={`
                                                    aspect-square rounded-lg text-xs font-bold transition-all flex items-center justify-center
                                                    ${isSelected 
                                                        ? "bg-brand-blue text-white shadow-md scale-110" 
                                                        : isPast 
                                                            ? "text-gray-300 cursor-not-allowed"
                                                            : "text-gray-600 hover:bg-brand-pale hover:text-brand-blue"
                                                    }
                                                `}
                                            >
                                                {day}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. PASAJEROS (Custom Dropdown) */}
                    <div className="col-span-2 relative" ref={guestRef}>
                        <div 
                            className={`w-full bg-white border flex items-center justify-between rounded-2xl pl-4 pr-4 py-4 cursor-pointer transition-all ${
                                isGuestOpen ? "border-brand-blue ring-2 ring-brand-blue/20" : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setIsGuestOpen(!isGuestOpen)}
                        >
                            <div className="flex items-center gap-3">
                                <Users size={18} className="text-brand-blue" />
                                <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">
                                        {t("guestsLabel")}
                                     </span>
                                     <span className="text-sm font-bold text-gray-700">
                                        {guests} Personas
                                    </span>
                                </div>
                            </div>
                            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isGuestOpen ? "rotate-180" : ""}`} />
                        </div>

                        <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden transition-all duration-200 origin-top ${
                            isGuestOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                        }`}>
                            <div className="max-h-60 overflow-y-auto p-2">
                                {[...Array(16)].map((_, i) => (
                                    <button
                                        key={i}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex justify-between items-center ${
                                            guests === i + 1 ? "bg-brand-pale text-brand-blue" : "hover:bg-gray-50 text-gray-600"
                                        }`}
                                        onClick={() => {
                                            setGuests(i + 1);
                                            setIsGuestOpen(false);
                                        }}
                                    >
                                        <span>{i + 1} {t("guestsLabel")}</span>
                                        {guests === i + 1 && <CheckCircle2 size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center bg-brand-pale/50 p-5 rounded-2xl border border-brand-blue/10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">{t("total")}</span>
                        <span className="text-[10px] text-gray-400">Impuestos incluidos</span>
                    </div>
                    <span className="text-2xl font-black text-brand-dark">${totalPrice}</span>
                </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
                <button className="w-full py-4 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark font-black uppercase tracking-widest rounded-xl shadow-lg shadow-brand-yellow/20 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                    <span>{t("bookBtn")}</span>
                    <CreditCard size={18} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <button 
                    onClick={() => setView("inquiry")}
                    className="w-full py-3.5 bg-white border-2 border-gray-100 text-gray-600 font-bold uppercase tracking-widest rounded-xl hover:border-brand-dark hover:text-brand-dark transition-all flex items-center justify-center gap-3"
                >
                    <span>{t("inquireBtn")}</span>
                    <MessageSquare size={18} />
                </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-50 flex justify-center items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-green-500" />
                {t("guarantee")}
            </div>
        </div>

        {/* ==========================================
            VISTA 2: FORMULARIO DE CONSULTA
            (Relative si está activo, Absolute si no)
           ========================================== */}
        <div 
            className={`transition-all duration-500 ease-in-out w-full ${
                view === "inquiry" 
                ? "relative opacity-100 translate-x-0" 
                : "absolute top-8 left-8 right-8 opacity-0 translate-x-full pointer-events-none"
            }`}
        >
            <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-4">
                <button 
                    onClick={() => setView("booking")}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-brand-dark hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} />
                </button>
                <h3 className="text-lg font-black text-brand-dark">{t("modalTitle")}</h3>
            </div>

            <p className="text-xs text-gray-500 mb-6 leading-relaxed font-medium bg-blue-50 p-3 rounded-lg text-blue-700 border border-blue-100">
                {t("modalSubtitle")}
            </p>

            <form className="space-y-4" onSubmit={handleInquirySubmit}>
                <div className="relative">
                    <input 
                        required
                        type="text" 
                        placeholder={t("formName")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                    <input 
                        required
                        type="email" 
                        placeholder={t("formEmail")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                
                <div className="relative">
                    <input 
                        type="tel" 
                        placeholder={t("formPhone")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <textarea 
                    rows={3} 
                    placeholder={t("formMessage")}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>

                <button className="w-full py-4 bg-brand-dark text-white font-bold uppercase tracking-widest rounded-xl hover:bg-brand-blue transition-all shadow-lg flex items-center justify-center gap-2 mt-2">
                    {t("formSubmit")}
                    <Send size={16} />
                </button>
            </form>
        </div>

        {/* --- VISTA 3: ÉXITO --- */}
        <div 
            className={`transition-all duration-500 ease-in-out absolute inset-0 bg-white p-8 flex flex-col items-center justify-center text-center ${
                view === "success" ? "opacity-100 z-20" : "opacity-0 z-0 pointer-events-none hidden"
            }`}
        >
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce-slow">
                <CheckCircle2 size={40} />
             </div>
             <h3 className="text-2xl font-black text-brand-dark mb-2">¡Mensaje Enviado!</h3>
             <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
                {locale === 'en' 
                    ? "Please check your email inbox. We have sent you the tour details."
                    : "Hemos abierto WhatsApp para continuar la conversación. ¡Gracias!"
                }
             </p>
             <button 
                onClick={() => setView("booking")}
                className="text-sm font-bold text-brand-blue border-b border-brand-blue pb-0.5 hover:text-brand-dark transition-colors"
             >
                Volver al inicio
             </button>
        </div>

    </div>
  );
}