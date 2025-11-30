"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Container from "@/components/ui/Container";
import { Calendar, AlertCircle, CheckCircle2, XCircle, Clock, X, ChevronRight } from "lucide-react";

export default function IncaAvailability() {
  const t = useTranslations("CollectionPage.Availability");
  const locale = useLocale();
  const [selectedMonth, setSelectedMonth] = useState<any | null>(null);

  // --- LÓGICA DE DÍAS ADAPTATIVA ---
  // Si es inglés, empieza en Domingo (S, M, T...). Si es Latam, Lunes (L, M, M...).
  const weekDays = locale === 'en' 
    ? ["S", "M", "T", "W", "T", "F", "S"] // Sunday Start
    : ["L", "M", "M", "J", "V", "S", "D"]; // Lunes Start (ES/PT)

  // Datos para 2026 (Estado Mensual)
  const availability2026 = [
    { id: 1, month: "Enero", status: "high", percent: 80 },
    { id: 2, month: "Febrero", status: "closed", percent: 0 },
    { id: 3, month: "Marzo", status: "high", percent: 90 },
    { id: 4, month: "Abril", status: "medium", percent: 40 },
    { id: 5, month: "Mayo", status: "low", percent: 15 }, 
    { id: 6, month: "Junio", status: "low", percent: 5 }, 
    { id: 7, month: "Julio", status: "sold", percent: 0 }, 
    { id: 8, month: "Agosto", status: "low", percent: 10 },
    { id: 9, month: "Septiembre", status: "medium", percent: 45 },
    { id: 10, month: "Octubre", status: "high", percent: 70 },
    { id: 11, month: "Noviembre", status: "high", percent: 85 },
    { id: 12, month: "Diciembre", status: "high", percent: 80 },
  ];

  // Configuración visual de estados
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "high": return { color: "bg-green-100 text-green-700", ring: "ring-green-500", icon: CheckCircle2, label: t("status.high"), bar: "bg-green-500", dayColor: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" };
      case "medium": return { color: "bg-yellow-100 text-yellow-700", ring: "ring-yellow-500", icon: Clock, label: t("status.medium"), bar: "bg-yellow-500", dayColor: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100" };
      case "low": return { color: "bg-orange-100 text-orange-700", ring: "ring-orange-500", icon: AlertCircle, label: t("status.low"), bar: "bg-orange-500", dayColor: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" };
      case "sold": return { color: "bg-red-100 text-red-700", ring: "ring-red-500", icon: XCircle, label: t("status.sold"), bar: "bg-red-500", dayColor: "bg-red-50 text-red-300 border-red-100 opacity-60 cursor-not-allowed" };
      case "closed": return { color: "bg-gray-100 text-gray-500", ring: "ring-gray-400", icon: XCircle, label: t("status.closed"), bar: "bg-gray-300", dayColor: "bg-gray-100 text-gray-400 border-gray-200 opacity-50 cursor-not-allowed" };
      default: return { color: "bg-gray-100", ring: "ring-gray-300", icon: CheckCircle2, label: "", bar: "bg-gray-300", dayColor: "" };
    }
  };

  // Generador de días simulados para el modal
  const generateDays = (monthStatus: string) => {
    // Creamos un array de 30 días
    return Array.from({ length: 30 }, (_, i) => {
        const day = i + 1;
        let status = "available"; // available, scarce, sold

        // Lógica simulada según el estado del mes
        if (monthStatus === "closed") status = "closed";
        else if (monthStatus === "sold") status = "sold";
        else if (monthStatus === "low") status = Math.random() > 0.3 ? "sold" : "scarce"; // 70% agotado
        else if (monthStatus === "medium") status = Math.random() > 0.6 ? "sold" : "available"; // 40% agotado
        else status = Math.random() > 0.9 ? "sold" : "available"; // Mayoría disponible

        return { day, status };
    });
  };

  return (
    <>
      <section className="py-16 bg-[#fafaf9] border-y border-gray-100" id="availability">
        <Container size="medium">
          
          {/* Cabecera */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
              <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-2">
                      <Calendar className="text-brand-blue" size={20} />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">Live Monitor 2026</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-brand-dark">
                      {t("title")}
                  </h2>
                  <p className="text-gray-500 mt-2 text-sm max-w-lg">
                      {t("subtitle")}
                  </p>
              </div>

              {/* Leyenda */}
              <div className="flex gap-3 text-[10px] font-bold uppercase tracking-wide bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Disp.</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Poca</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Agotado</div>
              </div>
          </div>

          {/* GRID DE MESES INTERACTIVO */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {availability2026.map((item, idx) => {
                  const config = getStatusConfig(item.status);
                  const Icon = config.icon;

                  return (
                      <div 
                        key={idx} 
                        onClick={() => setSelectedMonth(item)}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden cursor-pointer"
                      >
                          <div className="flex justify-between items-start mb-3">
                              <span className="font-bold text-brand-dark group-hover:text-brand-blue transition-colors">{item.month}</span>
                              <Icon size={16} className={config.color.split(" ")[1]} />
                          </div>

                          {/* Barra de Estado */}
                          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                              <div className={`h-full rounded-full ${config.bar}`} style={{ width: `${item.percent}%` }}></div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className={`inline-block px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
                                {config.label}
                            </div>
                            {/* Indicador de 'Ver más' */}
                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-brand-blue group-hover:text-white transition-all">
                                <ChevronRight size={14} />
                            </div>
                          </div>
                      </div>
                  );
              })}
          </div>

          {/* Botón de Acción - WhatsApp */}
          <div className="mt-10 text-center">
              <a 
                href="https://wa.me/+51903102547?text=Hola%20Huaypo%20Adventure,%20quisiera%20consultar%20la%20disponibilidad%20exacta%20para%20el%20Camino%20Inca." 
                target="_blank"
                className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-brand-yellow pb-0.5 hover:text-[#28a61b] hover:border-[#28a61b] transition-colors"
              >
                  {t("cta")}
                  <ChevronRight size={16} />
              </a>
          </div>

        </Container>
      </section>

      {/* --- MODAL DE CALENDARIO DETALLADO --- */}
      {selectedMonth && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-in fade-in duration-200">
            <div 
                className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
                onClick={() => setSelectedMonth(null)}
            ></div>

            <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg p-8 md:p-10 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="text-2xl font-black text-brand-dark">{selectedMonth.month} 2026</h3>
                        <p className="text-sm text-gray-500 mt-1">{t("status." + selectedMonth.status)}</p>
                    </div>
                    <button 
                        onClick={() => setSelectedMonth(null)}
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* HEADER DÍAS ADAPTATIVO */}
                <div className="grid grid-cols-7 mb-4 text-center">
                    {weekDays.map((day, i) => (
                        <span key={i} className="text-xs font-bold text-gray-400">{day}</span>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {/* Padding vacío simulado para empezar el mes */}
                    {[...Array(locale === 'en' ? 2 : 0)].map((_, i) => <div key={`empty-${i}`}></div>)}
                    
                    {generateDays(selectedMonth.status).map((d) => {
                        let cellClass = "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"; 
                        if (d.status === "sold") cellClass = "bg-red-50 text-red-300 border-red-100 opacity-50 cursor-not-allowed line-through decoration-red-300";
                        if (d.status === "scarce") cellClass = "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
                        if (d.status === "closed") cellClass = "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed";

                        return (
                            <div 
                                key={d.day}
                                className={`aspect-square flex items-center justify-center rounded-xl border text-sm font-bold transition-all ${cellClass}`}
                            >
                                {d.day}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Disp.</div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div> Agotado</div>
                    </div>
                    <a 
                        href={`https://wa.me/+51903102547?text=Hola,%20me%20interesa%20reservar%20para%20${selectedMonth.month}%202026`}
                        target="_blank"
                        className="px-6 py-2 bg-brand-dark text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-blue transition-colors"
                    >
                        Reservar Mes
                    </a>
                </div>
            </div>
        </div>
      )}
    </>
  );
}