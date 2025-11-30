"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Info, ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface ExpertTipsProps {
    faqs: FAQItem[];
}

export default function ExpertTips({ faqs }: ExpertTipsProps) {
  const t = useTranslations("CollectionPage.Expertise");
  
  // Estado para saber qué item está abierto (índice). null = ninguno.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Referencia para detectar clics fuera del componente
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para alternar (Toggle)
  const toggleItem = (index: number) => {
    // Si clicamos el que ya está abierto, lo cerramos (null). Si no, abrimos el nuevo.
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Efecto para cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null); // Cierra todo si el clic fue fuera del contenedor
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container size="medium">
        
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-brand-yellow mb-2">
                <Info size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Travel Guide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4">{t("title")}</h2>
            <p className="text-gray-500">{t("subtitle")}</p>
        </div>

        {/* CONTENEDOR DEL ACORDEÓN (Con Ref para detectar clics) */}
        <div ref={containerRef} className="space-y-4">
            {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                    <div 
                        key={idx} 
                        className={`rounded-2xl transition-all duration-300 border ${
                            isOpen 
                            ? "bg-white shadow-lg border-gray-100 ring-1 ring-black/5" 
                            : "bg-gray-50 border-transparent hover:bg-gray-100"
                        }`}
                    >
                        {/* CABECERA (Botón) */}
                        <button 
                            onClick={() => toggleItem(idx)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <h3 className={`text-lg font-bold transition-colors ${
                                isOpen ? "text-brand-blue" : "text-brand-dark group-hover:text-brand-blue"
                            }`}>
                                {faq.question}
                            </h3>
                            <span className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-blue" : "text-gray-400"}`}>
                                <ChevronDown size={20} />
                            </span>
                        </button>

                        {/* CONTENIDO (Visible solo si isOpen es true) */}
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                        >
                            <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

      </Container>
    </section>
  );
}