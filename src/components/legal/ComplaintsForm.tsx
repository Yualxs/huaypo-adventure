"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { 
  User, Mail, Phone, MapPin, FileText, AlertCircle, 
  Send, CheckCircle2, ChevronDown, CreditCard, Building2 
} from "lucide-react";

// --- COMPONENTES UI REUTILIZABLES (Consistentes con tu Design System) ---

const PremiumInput = ({ icon: Icon, label, ...props }: any) => (
  <div className="relative group w-full">
    {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{label}</label>}
    <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-brand-blue">
        <Icon size={20} strokeWidth={2.5} />
        </div>
        <input
        {...props}
        className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 font-bold text-brand-dark placeholder:text-gray-300 placeholder:font-normal focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 hover:border-gray-300"
        />
    </div>
  </div>
);

const PremiumTextArea = ({ label, ...props }: any) => (
    <div className="w-full">
      {label && <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 ml-1">{label}</label>}
      <textarea
        {...props}
        rows={5}
        className="w-full bg-white border border-gray-200 rounded-2xl p-5 font-medium text-brand-dark placeholder:text-gray-300 focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue outline-none transition-all duration-300 hover:border-gray-300 resize-none"
      />
    </div>
);

const RadioCard = ({ title, desc, value, selectedValue, onChange, icon: Icon }: any) => (
    <div 
        onClick={() => onChange(value)}
        className={`cursor-pointer border-2 rounded-2xl p-5 transition-all flex flex-col gap-2 relative group ${selectedValue === value ? 'border-brand-blue bg-brand-pale/30 shadow-md' : 'border-gray-100 hover:border-gray-300'}`}
    >
        <div className="flex justify-between items-start">
            <span className={`font-black text-lg ${selectedValue === value ? 'text-brand-dark' : 'text-gray-500'}`}>{title}</span>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedValue === value ? 'border-brand-blue bg-brand-blue text-white' : 'border-gray-300 text-transparent'}`}>
                <CheckCircle2 size={14} />
            </div>
        </div>
        <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
        <Icon className={`absolute bottom-4 right-4 opacity-10 transition-transform group-hover:scale-110 ${selectedValue === value ? 'text-brand-blue opacity-20' : ''}`} size={40} />
    </div>
);

export default function ComplaintsForm() {
  const t = useTranslations("ComplaintsPage.Form");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimType, setClaimType] = useState<'reclamo' | 'queja'>('reclamo');
  const [goodType, setGoodType] = useState<'producto' | 'servicio'>('servicio');
  
  // Fecha actual para el display
  const currentDate = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
  const claimNumber = `LIBRO-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar a tu API/Sanity/Email
    setTimeout(() => setIsSubmitted(true), 1500);
  };

  if (isSubmitted) {
    return (
        <div className="max-w-3xl mx-auto bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
                <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-black text-brand-dark mb-4">{t("success.title")}</h2>
            <p className="text-gray-500 text-lg mb-8">{t("success.subtitle")}</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 inline-block text-left min-w-[300px]">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tu Código de Registro</p>
                <p className="text-2xl font-black text-brand-dark tracking-wider">{claimNumber}</p>
                <div className="w-full h-px bg-gray-200 my-3"></div>
                <p className="text-xs text-gray-500">Hemos enviado una copia a tu correo electrónico.</p>
            </div>
        </div>
    );
  }

  return (
    <section className="py-20 lg:py-24 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        
        {/* --- CABECERA LEGAL (Clean Premium Style) --- */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 mb-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 relative overflow-hidden group">
            
            {/* Línea decorativa superior (Identidad de Marca) */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue via-brand-dark to-brand-blue"></div>
            
            {/* Mancha de luz sutil en el fondo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pale rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <div className="inline-flex items-center gap-2 bg-brand-dark text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] mb-4 shadow-md">
                        <Building2 size={12} className="text-brand-yellow" /> 
                        <span>Razón Social</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-2 tracking-tight">
                        Huaypo Adventure E.I.R.L.
                    </h2>
                    <p className="text-gray-500 font-medium text-lg flex items-center gap-2">
                        <span className="text-brand-blue font-bold">RUC:</span> 20608615106
                    </p>
                </div>

                <div className="text-left md:text-right bg-gray-50 p-4 rounded-2xl border border-gray-100 min-w-[200px]">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Fecha de Registro</p>
                    <p className="text-xl font-black text-brand-dark">{currentDate}</p>
                    <div className="flex items-center justify-end gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Libro Virtual Activo</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- FORMULARIO PRINCIPAL --- */}
        <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-16 relative">
            
            {/* SECCIÓN 1: DATOS DEL CONSUMIDOR */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center font-black text-brand-dark shadow-md">1</div>
                    <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide">{t("sections.consumer")}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PremiumInput icon={User} label={t("labels.name")} placeholder="Nombre Completo" required />
                    <PremiumInput icon={User} label={t("labels.lastname")} placeholder="Apellidos" required />
                    <PremiumInput icon={CreditCard} label={t("labels.docNumber")} placeholder="DNI / CE / Pasaporte" required />
                    <PremiumInput icon={Phone} label={t("labels.phone")} placeholder="Teléfono" type="tel" required />
                    <PremiumInput icon={Mail} label={t("labels.email")} placeholder="Correo Electrónico" type="email" required />
                    <div className="md:col-span-2">
                        <PremiumInput icon={MapPin} label={t("labels.address")} placeholder="Domicilio Completo" required />
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-gray-100 mb-12"></div>

            {/* SECCIÓN 2: BIEN CONTRATADO */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center font-black text-white shadow-md">2</div>
                    <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide">{t("sections.good")}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <RadioCard 
                        title="Producto" 
                        desc="Artículos físicos, merchandising, equipo."
                        value="producto"
                        selectedValue={goodType}
                        onChange={setGoodType}
                        icon={AlertCircle}
                    />
                    <RadioCard 
                        title="Servicio" 
                        desc="Tours, transporte, guiado, alimentación."
                        value="servicio"
                        selectedValue={goodType}
                        onChange={setGoodType}
                        icon={FileText}
                    />
                </div>
                
                <PremiumInput icon={CreditCard} label={t("labels.amount")} placeholder="Monto Reclamado (Opcional)" type="number" />
                <div className="mt-6">
                    <PremiumTextArea label={t("labels.description")} placeholder="Descripción del bien o servicio contratado..." required />
                </div>
            </div>

            <div className="w-full h-px bg-gray-100 mb-12"></div>

            {/* SECCIÓN 3: DETALLE DE RECLAMACIÓN */}
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center font-black text-white shadow-md">3</div>
                    <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide">{t("sections.detail")}</h3>
                </div>

                {/* Explicación Legal (UX Premium) */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex gap-4 items-start">
                    <AlertCircle className="text-blue-600 shrink-0 mt-1" size={24} />
                    <div className="text-sm text-blue-900 leading-relaxed">
                        <p className="font-bold mb-1">Definiciones Legales:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Reclamo:</strong> Disconformidad relacionada a los productos o servicios.</li>
                            <li><strong>Queja:</strong> Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <RadioCard 
                        title="Reclamo" 
                        desc="El producto/servicio no cumplió lo prometido."
                        value="reclamo"
                        selectedValue={claimType}
                        onChange={setClaimType}
                        icon={AlertCircle}
                    />
                    <RadioCard 
                        title="Queja" 
                        desc="Mala atención o trato inadecuado del personal."
                        value="queja"
                        selectedValue={claimType}
                        onChange={setClaimType}
                        icon={User}
                    />
                </div>

                <div className="space-y-6">
                    <PremiumTextArea label={t("labels.detailDesc")} placeholder={`Detalle su ${claimType} aquí...`} required />
                    <PremiumTextArea label={t("labels.request")} placeholder="¿Qué solución espera de nosotros?" required />
                </div>
            </div>

            {/* LEGAL CHECKBOXES */}
            <div className="space-y-4 mb-10">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue cursor-pointer accent-brand-blue" required />
                    <span className="text-sm text-gray-500 group-hover:text-brand-dark transition-colors">
                        Declaro que los datos consignados son verdaderos y acepto que la comunicación de respuesta sea enviada a mi correo electrónico.
                    </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue cursor-pointer accent-brand-blue" required />
                    <span className="text-sm text-gray-500 group-hover:text-brand-dark transition-colors">
                        He leído y acepto la <a href="/privacy" className="text-brand-blue font-bold underline hover:no-underline">Política de Privacidad</a>.
                    </span>
                </label>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="text-center">
                <button type="submit" className="w-full md:w-auto px-12 py-5 bg-brand-dark text-white font-black uppercase tracking-widest rounded-2xl hover:bg-brand-blue transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto">
                    {t("submit")}
                    <Send size={18} />
                </button>
                <p className="text-[10px] text-gray-400 mt-6 uppercase tracking-wide font-bold">
                    La respuesta será remitida en un plazo máximo de 15 días hábiles.
                </p>
            </div>

        </form>
      </div>
    </section>
  );
}