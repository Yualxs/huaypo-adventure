"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Send, Building2, Globe, Users, Mail, Phone, ChevronDown, Check, Plane } from "lucide-react";

// --- COMPONENTES UI REUTILIZABLES (Iguales al Booking Wizard) ---

const PremiumInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative group">
    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-brand-blue">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <input
      {...props}
      className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 font-bold text-brand-dark placeholder:text-gray-400 placeholder:font-medium focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 hover:border-gray-300"
    />
  </div>
);

const PremiumSelect = ({ icon: Icon, value, onChange, options, placeholder }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
  
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
                      type="button" // Importante para no enviar form
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

export default function B2BForm() {
  const t = useTranslations("PartnersPage.Form");
  const [formState, setFormState] = useState({
      agency: "",
      website: "",
      email: "",
      phone: "",
      type: "",
      volume: ""
  });

  const handleChange = (field: string, value: string) => {
      setFormState(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 lg:py-32 bg-[#f8fafc] border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        
        <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-16 text-center relative overflow-hidden">
            
            {/* Decoración de Fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-4">{t("title")}</h2>
                <p className="text-gray-500 mb-12 max-w-xl mx-auto text-lg font-light leading-relaxed text-pretty">{t("subtitle")}</p>

                <form className="space-y-6 text-left max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PremiumInput 
                            icon={Building2} 
                            placeholder={t("agencyName")} 
                            value={formState.agency}
                            onChange={(e: any) => handleChange("agency", e.target.value)}
                        />
                        <PremiumInput 
                            icon={Globe} 
                            placeholder={t("website")} 
                            value={formState.website}
                            onChange={(e: any) => handleChange("website", e.target.value)}
                        />
                        <PremiumInput 
                            icon={Mail} 
                            type="email"
                            placeholder={t("email")} 
                            value={formState.email}
                            onChange={(e: any) => handleChange("email", e.target.value)}
                        />
                        <PremiumInput 
                            icon={Phone} 
                            type="tel"
                            placeholder={t("phone")} 
                            value={formState.phone}
                            onChange={(e: any) => handleChange("phone", e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PremiumSelect 
                            icon={Plane}
                            placeholder={t("originSelect")}
                            value={formState.type}
                            onChange={(val: string) => handleChange("type", val)}
                            options={[
                                { value: "intl", label: "Agencia Internacional / Tour Operador" },
                                { value: "local", label: "Agencia Peruana / Minorista" },
                                { value: "freelance", label: "Travel Designer / Freelance" }
                            ]}
                        />
                        <PremiumSelect 
                            icon={Users}
                            placeholder={t("volumeSelect")}
                            value={formState.volume}
                            onChange={(val: string) => handleChange("volume", val)}
                            options={[
                                { value: "1-10", label: "1 - 10 Pasajeros al mes" },
                                { value: "10-50", label: "10 - 50 Pasajeros al mes" },
                                { value: "50+", label: "Más de 50 Pasajeros al mes" }
                            ]}
                        />
                    </div>

                    <div className="pt-8 text-center">
                        <button className="w-full md:w-auto px-12 py-5 bg-brand-dark text-white font-black uppercase tracking-widest rounded-2xl hover:bg-brand-blue transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto group">
                            {t("submit")} 
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-xs text-gray-400 mt-6 font-medium">
                            🔒 Tus datos son tratados confidencialmente. Respuesta en 24h.
                        </p>
                    </div>
                </form>
            </div>

        </div>
      </div>
    </section>
  );
}