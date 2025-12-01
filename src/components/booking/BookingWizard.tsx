// src/components/booking/BookingWizard.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Step1Journey from "./Step1Journey";
import Step2Travelers from "./Step2Travelers";
import Step3Payment from "./Step3Payment";
import BookingSummary from "./BookingSummary"; // Barra lateral
import { BookingState, Traveler } from "@/types/booking";

// Datos simulados (Idealmente vendrían de props o contexto)
const INITIAL_STATE: BookingState = {
  step: 1,
  tourSlug: "",
  date: "",
  travelersCount: 2,
  serviceType: "group",
  travelers: [],
  poc: { name: "", email: "", phone: "" },
  paymentPreference: "deposit",
  paymentMethod: "paypal",
  selectedAddons: []
};

export default function BookingWizard() {
  const t = useTranslations("BookingWizard");
  const [state, setState] = useState<BookingState>(INITIAL_STATE);

  // Generador de viajeros inicial
  useEffect(() => {
    const newTravelers: Traveler[] = Array.from({ length: state.travelersCount }, (_, i) => ({
      id: i + 1,
      firstName: state.travelers[i]?.firstName || "",
      lastName: state.travelers[i]?.lastName || "",
      gender: state.travelers[i]?.gender || "",
      country: state.travelers[i]?.country || "",
      docType: state.travelers[i]?.docType || "",
      docNumber: state.travelers[i]?.docNumber || "",
      birthDate: state.travelers[i]?.birthDate || "",
      isStudent: state.travelers[i]?.isStudent || false,
    }));
    setState(prev => ({ ...prev, travelers: newTravelers }));
  }, [state.travelersCount]);

  const nextStep = () => setState(prev => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () => setState(prev => ({ ...prev, step: prev.step - 1 }));

  // Scroll al top al cambiar de paso (Lógica mantenida)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.step]);

  return (
    // CAMBIO CLAVE AQUÍ: 'pt-32 lg:pt-48' para bajar todo el contenido y librar el Navbar
    <section className="min-h-screen bg-[#f8fafc] pt-32 lg:pt-48 pb-20">
      <Container>
        
        {/* Header del Wizard */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 tracking-tight">
            {t("title")}
          </h1>
          
          {/* Progress Bar Premium */}
          <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-bold select-none">
            {/* Paso 1 */}
            <div className={`flex items-center gap-2 ${state.step >= 1 ? "text-brand-dark" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${state.step >= 1 ? "border-brand-dark bg-brand-dark text-brand-yellow" : "border-gray-200"}`}>1</div>
                <span className="uppercase tracking-wider">{t("steps.journey")}</span>
            </div>
            
            <div className={`w-12 h-[2px] rounded-full ${state.step >= 2 ? "bg-brand-dark" : "bg-gray-200"}`}></div>
            
            {/* Paso 2 */}
            <div className={`flex items-center gap-2 ${state.step >= 2 ? "text-brand-dark" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${state.step >= 2 ? "border-brand-dark bg-brand-dark text-brand-yellow" : "border-gray-200"}`}>2</div>
                <span className="uppercase tracking-wider hidden sm:inline">{t("steps.travelers")}</span>
            </div>

            <div className={`w-12 h-[2px] rounded-full ${state.step >= 3 ? "bg-brand-dark" : "bg-gray-200"}`}></div>

            {/* Paso 3 */}
            <div className={`flex items-center gap-2 ${state.step >= 3 ? "text-brand-dark" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${state.step >= 3 ? "border-brand-dark bg-brand-dark text-brand-yellow" : "border-gray-200"}`}>3</div>
                <span className="uppercase tracking-wider hidden sm:inline">{t("steps.payment")}</span>
            </div>
          </div>
        </div>

        {/* ... Resto del Grid igual ... */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            {/* Agregamos una sombra más difusa y borde suave para efecto 'Glass' sobre fondo sólido */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100">
              
              {state.step === 1 && (
                <Step1Journey 
                  data={state} 
                  update={(updates) => setState(prev => ({ ...prev, ...updates }))} 
                  onNext={nextStep}
                />
              )}

              {state.step === 2 && (
                <Step2Travelers 
                  data={state} 
                  update={(updates) => setState(prev => ({ ...prev, ...updates }))} 
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {state.step === 3 && (
                <Step3Payment 
                  data={state} 
                  update={(updates) => setState(prev => ({ ...prev, ...updates }))} 
                  onPrev={prevStep}
                />
              )}

            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <BookingSummary data={state} />
          </div>

        </div>
      </Container>
    </section>
  );
}