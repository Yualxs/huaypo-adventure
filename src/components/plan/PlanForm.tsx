"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { 
  User, Mail, Phone, Globe, Calendar, Users, 
  MapPin, Send, CheckCircle2, Plane, Star 
} from "lucide-react";

export default function PlanForm() {
  const t = useTranslations("PlanPage.Form");
  
  // Estados para interacciones ricas
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [hotelRating, setHotelRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Opciones de Marketing
  const interests = ["culture", "adventure", "nature", "food", "luxury", "family"];
  const budgets = ["economy", "standard", "premium", "luxury"];

  // Toggle de intereses (Multi-select)
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulación de envío
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
    }, 1500);
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-gradient-to-b from-white to-brand-pale/30">
      <Container size="medium">
        
        {/* FORMULARIO CARD PRINCIPAL */}
        <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden relative">
            
            {/* Barra superior decorativa */}
            <div className="h-2 w-full bg-gradient-to-r from-brand-blue via-brand-yellow to-brand-orange"></div>

            <div className="p-8 md:p-12 lg:p-16">
                
                {/* Header del Formulario */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-extrabold text-brand-dark uppercase tracking-wide mb-2">
                        {t("title")}
                    </h3>
                    <p className="text-gray-500 font-light">
                        {t("subtitle")}
                    </p>
                </div>

                {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="space-y-12">
                        
                        {/* --- 1. TUS DATOS (Grid 2 columnas) --- */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                    <User size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-brand-dark uppercase tracking-wider">{t("contactInfo")}</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup icon={User} placeholder={t("name")} type="text" required />
                                <InputGroup icon={Mail} placeholder={t("email")} type="email" required />
                                <InputGroup icon={Phone} placeholder={t("phone")} type="tel" required />
                                <InputGroup icon={Globe} placeholder={t("country")} type="text" />
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-100"></div>

                        {/* --- 2. DETALLES DEL VIAJE --- */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-bronze">
                                    <Plane size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-brand-dark uppercase tracking-wider">{t("tripDetails")}</h4>
                            </div>

                            {/* Fechas y Viajeros */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wide">{t("arrival")}</label>
                                    <InputGroup icon={Calendar} type="date" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wide">{t("departure")}</label>
                                    <InputGroup icon={Calendar} type="date" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 ml-3 uppercase tracking-wide">{t("travelers")}</label>
                                    <InputGroup icon={Users} type="number" placeholder={t("travelersPlaceholder")} min={1} />
                                </div>
                            </div>

                            {/* INTERESES (Tags Seleccionables - Marketing Key) */}
                            <div>
                                <label className="block text-sm font-bold text-brand-dark mb-4">{t("interestsTitle")}</label>
                                <div className="flex flex-wrap gap-3">
                                    {interests.map((interest) => (
                                        <button
                                            key={interest}
                                            type="button"
                                            onClick={() => toggleInterest(interest)}
                                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                                                selectedInterests.includes(interest)
                                                ? "bg-brand-blue border-brand-blue text-white shadow-md transform scale-105"
                                                : "bg-white border-gray-200 text-gray-500 hover:border-brand-blue hover:text-brand-blue"
                                            }`}
                                        >
                                            {t(`interests.${interest}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* PRESUPUESTO (Selector de Tarjetas) */}
                            <div>
                                <label className="block text-sm font-bold text-brand-dark mb-4">{t("budgetTitle")}</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {budgets.map((bg) => (
                                        <button
                                            key={bg}
                                            type="button"
                                            onClick={() => setSelectedBudget(bg)}
                                            className={`py-3 px-2 rounded-xl text-sm font-bold transition-all border-2 ${
                                                selectedBudget === bg
                                                ? "bg-brand-pale border-brand-blue text-brand-blue shadow-inner"
                                                : "bg-gray-50 border-transparent text-gray-500 hover:bg-white hover:border-gray-200"
                                            }`}
                                        >
                                            {t(`budget.${bg}`)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* HOTEL (Estrellas) */}
                            <div>
                                <label className="block text-sm font-bold text-brand-dark mb-3">{t("hotelTitle")}</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setHotelRating(star)}
                                            className="group focus:outline-none"
                                        >
                                            <Star 
                                                size={32} 
                                                className={`transition-all duration-300 ${
                                                    star <= hotelRating 
                                                    ? "fill-brand-yellow text-brand-yellow scale-110" 
                                                    : "fill-gray-100 text-gray-200 group-hover:text-brand-yellow/50"
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* MENSAJE */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{t("messageLabel")}</label>
                                <textarea 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none h-32 text-gray-700"
                                    placeholder="Ej: Viajo de luna de miel, me gustaría una cena romántica..."
                                ></textarea>
                            </div>

                        </div>

                        {/* --- SUBMIT --- */}
                        <div className="pt-6">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-5 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark font-black uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span>{t("sending")}</span>
                                ) : (
                                    <>
                                        {t("submit")}
                                        <Send size={20} />
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                * Tus datos están protegidos y no serán compartidos.
                            </p>
                        </div>

                    </form>
                ) : (
                    /* ESTADO DE ÉXITO */
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-2">¡Solicitud Recibida!</h3>
                        <p className="text-gray-600 max-w-md mx-auto">{t("success")}</p>
                        <button onClick={() => setIsSuccess(false)} className="mt-8 text-brand-blue font-bold hover:underline">
                            Enviar otra consulta
                        </button>
                    </div>
                )}

            </div>
        </div>
      </Container>
    </section>
  );
}

// Subcomponente de Input Reutilizable
function InputGroup({ icon: Icon, ...props }: any) {
    return (
        <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors pointer-events-none">
                <Icon size={20} />
            </div>
            <input 
                {...props}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-2xl pl-14 pr-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all placeholder:text-gray-400"
            />
        </div>
    )
}