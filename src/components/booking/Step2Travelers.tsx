"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { BookingState, Traveler } from "@/types/booking";
import { 
  User, Mail, Phone, ArrowLeft, ArrowRight, Globe, 
  CreditCard, Calendar, ChevronDown, Check, UsersRound, 
  ShieldCheck, ChevronLeft, ChevronRight as ChevronRightIcon 
} from "lucide-react";

interface Props {
  data: BookingState;
  update: (updates: Partial<BookingState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

// --- COMPONENTES UI REUTILIZABLES INTERNOS ---

// 1. Dropdown Custom (Igual al Paso 1)
const CustomSelect = ({ label, icon: Icon, value, options, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o: any) => o.value === value)?.label || placeholder;

  return (
    <div className="relative group" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white border flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 ${
            isOpen ? 'border-brand-blue ring-4 ring-brand-blue/10 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }`}
      >
        <div className="flex items-center gap-4 overflow-hidden">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${value ? 'bg-brand-blue text-white' : 'bg-brand-pale text-brand-blue'}`}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <span className={`text-sm font-bold truncate ${value ? 'text-brand-dark' : 'text-gray-400'}`}>
                {selectedLabel}
            </span>
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-blue' : ''}`} />
      </div>

      <div className={`absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top ${
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
      }`}>
         <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin">
            {options.map((opt: any) => (
                <button
                    key={opt.value}
                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                        value === opt.value ? "bg-brand-pale text-brand-blue" : "hover:bg-gray-50 text-brand-dark"
                    }`}
                >
                    <span className="truncate">{opt.label}</span>
                    {value === opt.value && <Check size={16} className="text-brand-blue" />}
                </button>
            ))}
         </div>
      </div>
    </div>
  );
};

// 2. DatePicker Custom con Selector de Año (Para Cumpleaños)
const CustomDatePicker = ({ value, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date(1995, 0, 1)); // Default 1995
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generador de años (1920 - Actualidad)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const handleDateSelect = (day: number) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dateStr = selected.toISOString().split('T')[0];
    onChange(dateStr);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  // Formato visual
  const formattedDate = value 
    ? new Date(value + "T00:00:00").toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) 
    : placeholder;

  return (
    <div className="relative group" ref={containerRef}>
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full bg-white border flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 ${
                isOpen || value ? 'border-brand-blue ring-4 ring-brand-blue/10 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${value ? 'bg-brand-blue text-white' : 'bg-brand-pale text-brand-blue'}`}>
                    <Calendar size={20} strokeWidth={2.5} />
                </div>
                <span className={`text-sm font-bold ${value ? 'text-brand-dark' : 'text-gray-400'}`}>
                    {formattedDate}
                </span>
            </div>
        </div>

        {/* Pop-up Calendario */}
        <div className={`absolute top-full left-0 w-full md:w-[320px] mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 origin-top-left ${
            isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        }`}>
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-2">
                {/* Selector Año */}
                <select 
                    className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-brand-dark flex-1 outline-none focus:border-brand-blue"
                    value={viewDate.getFullYear()}
                    onChange={(e) => setViewDate(new Date(parseInt(e.target.value), viewDate.getMonth(), 1))}
                >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                {/* Selector Mes */}
                <select 
                    className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-brand-dark flex-[2] outline-none focus:border-brand-blue"
                    value={viewDate.getMonth()}
                    onChange={(e) => setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value), 1))}
                >
                    {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
            </div>
            
            <div className="p-4">
                <div className="grid grid-cols-7 mb-2 text-center">
                    {['D','L','M','M','J','V','S'].map((d, i) => (
                        <span key={i} className="text-[10px] font-extrabold text-gray-400">{d}</span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: getFirstDayOfMonth(viewDate) }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: getDaysInMonth(viewDate) }, (_, i) => i + 1).map(day => {
                        const dayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
                        const isSelected = value === dayDate.toISOString().split('T')[0];
                        
                        return (
                            <button
                                key={day}
                                onClick={() => handleDateSelect(day)}
                                className={`
                                    aspect-square rounded-lg text-xs font-bold transition-all flex items-center justify-center
                                    ${isSelected 
                                        ? "bg-brand-dark text-white shadow-md" 
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
  );
};

// 3. Input Text Custom (Para Nombres, Documentos)
const PremiumInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative group">
    <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${props.value ? 'text-brand-blue' : 'text-gray-400'} group-focus-within:text-brand-blue`}>
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <input
      {...props}
      className={`w-full bg-white border rounded-2xl pl-14 pr-5 py-4 font-bold text-sm text-brand-dark placeholder:text-gray-400 placeholder:font-medium outline-none transition-all duration-300 
      ${props.value ? 'border-brand-blue ring-4 ring-brand-blue/10' : 'border-gray-200 hover:border-gray-300 hover:shadow-md focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10'}`}
    />
  </div>
);


export default function Step2Travelers({ data, update, onNext, onPrev }: Props) {
  const t = useTranslations("BookingWizard.Step2");

  const updateTraveler = (index: number, field: keyof Traveler, value: any) => {
    const newTravelers = [...data.travelers];
    const finalValue = field === 'isStudent' ? (value === 'yes') : value;
    newTravelers[index] = { ...newTravelers[index], [field]: finalValue };
    update({ travelers: newTravelers });
  };

  const updatePOC = (field: keyof typeof data.poc, value: string) => {
    update({ poc: { ...data.poc, [field]: value } });
  };

  const availablePocNames = useMemo(() => {
    return data.travelers
      .filter(t => t.firstName.trim() !== "" && t.lastName.trim() !== "")
      .map(t => ({ value: `${t.firstName} ${t.lastName}`, label: `${t.firstName} ${t.lastName}` }));
  }, [data.travelers]);

  const isValid = data.poc.name && data.poc.email && data.poc.phone && data.travelers.every(t => t.firstName && t.lastName && t.country && t.docNumber && t.birthDate);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-black text-brand-dark mb-2">{t("title")}</h2>
        <p className="text-gray-500 font-medium text-sm">{t("subtitle")}</p>
      </div>

      <div className="space-y-10">
        {data.travelers.map((traveler, index) => (
          <div key={traveler.id} className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-200/80 shadow-sm relative transition-all hover:shadow-md">
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-dark text-brand-yellow font-black text-lg rounded-2xl flex items-center justify-center shadow-lg shadow-brand-dark/20">
                    {index + 1}
                </div>
                <h3 className="text-lg font-black text-brand-dark uppercase tracking-wider">
                  {t("travelerTitle")} {index + 1}
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <PremiumInput 
                icon={User} placeholder={t("firstName")} value={traveler.firstName}
                onChange={(e: any) => updateTraveler(index, "firstName", e.target.value)}
              />
              <PremiumInput 
                icon={User} placeholder={t("lastName")} value={traveler.lastName}
                onChange={(e: any) => updateTraveler(index, "lastName", e.target.value)}
              />

              <CustomSelect 
                icon={UsersRound} value={traveler.gender} placeholder={t("gender")}
                options={[{value: 'male', label: 'Masculino'}, {value: 'female', label: 'Femenino'}]}
                onChange={(val: any) => updateTraveler(index, "gender", val)}
              />

              <CustomSelect 
                icon={Globe} value={traveler.country} placeholder={t("country")}
                options={[
                    {value: 'pe', label: 'Perú'}, {value: 'us', label: 'Estados Unidos'},
                    {value: 'es', label: 'España'}, {value: 'br', label: 'Brasil'},
                    {value: 'mx', label: 'México'}, {value: 'co', label: 'Colombia'}
                ]}
                onChange={(val: any) => updateTraveler(index, "country", val)}
              />
              
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <CustomSelect 
                        icon={CreditCard} value={traveler.docType} placeholder="Tipo Doc"
                        options={[{value: 'passport', label: 'Pasaporte'}, {value: 'dni', label: 'DNI / Cédula'}]}
                        onChange={(val: any) => updateTraveler(index, "docType", val)}
                    />
                </div>
                <div className="md:col-span-2">
                    <PremiumInput 
                        icon={CreditCard} placeholder={t("docNumber")} value={traveler.docNumber}
                        onChange={(e: any) => updateTraveler(index, "docNumber", e.target.value)}
                    />
                </div>
              </div>

              {/* Calendario Custom para Cumpleaños */}
              <div className="md:col-span-1">
                 <CustomDatePicker 
                    value={traveler.birthDate} 
                    onChange={(date: string) => updateTraveler(index, "birthDate", date)} 
                    placeholder={t("birthDate")}
                 />
              </div>

              {/* Radio Group Estudiante */}
              <div className="md:col-span-1 flex items-center justify-between border border-gray-200 rounded-2xl p-2 px-5 bg-white hover:border-gray-300 transition-all h-[60px]">
                 <span className="font-bold text-brand-dark text-xs flex items-center gap-2">
                    <ShieldCheck size={18} className="text-gray-400"/> ¿Eres estudiante?
                 </span>
                 <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => updateTraveler(index, "isStudent", 'yes')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${traveler.isStudent ? 'bg-brand-blue text-white shadow-sm' : 'text-gray-500 hover:bg-white'}`}>Sí</button>
                    <button onClick={() => updateTraveler(index, "isStudent", 'no')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!traveler.isStudent ? 'bg-brand-dark text-white shadow-sm' : 'text-gray-500 hover:bg-white'}`}>No</button>
                 </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-gray-100 my-8"></div>

      {/* --- POC PREMIUM --- */}
      <div className="bg-brand-pale/30 p-8 rounded-[2rem] border border-brand-blue/10 relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl group-hover:bg-brand-blue/10 transition-all"></div>
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center shadow-lg shadow-brand-blue/20">
            <Mail size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-xl font-black text-brand-dark mb-1">{t("pocTitle")}</h4>
            <p className="text-sm text-gray-500 font-medium">A donde enviaremos la confirmación.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="md:col-span-2">
            <CustomSelect 
                icon={User} value={data.poc.name} placeholder="Selecciona al contacto principal..."
                options={availablePocNames.length > 0 ? availablePocNames : [{value: '', label: 'Completa los nombres arriba primero'}]}
                onChange={(val: any) => updatePOC("name", val)}
            />
          </div>
          <PremiumInput icon={Mail} type="email" placeholder={t("email")} value={data.poc.email} onChange={(e: any) => updatePOC("email", e.target.value)} />
          <PremiumInput icon={Phone} type="tel" placeholder={t("phone")} value={data.poc.phone} onChange={(e: any) => updatePOC("phone", e.target.value)} />
        </div>
      </div>

      {/* Navegación */}
      <div className="flex flex-col-reverse md:flex-row gap-4 pt-8">
        <button onClick={onPrev} className="px-8 py-5 border-2 border-gray-200 text-brand-dark font-bold rounded-2xl hover:border-brand-dark/30 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 group">
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" /> {t("backBtn")}
        </button>
        <button onClick={onNext} disabled={!isValid} className="flex-1 py-5 bg-brand-dark text-white font-black text-lg uppercase tracking-widest rounded-2xl hover:bg-brand-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
          {t("nextBtn")} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}