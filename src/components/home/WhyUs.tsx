"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function WhyUs() {
  const t = useTranslations("WhyUs");

  const features = [
    { 
      key: "local", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d2a67e335e66b8d5d7_local-company.svg",
    },
    { 
      key: "quality", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d28dd07f69fce5fa93_quality-guaranteed.svg",
    },
    { 
      key: "groups", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d25410ac135c85d732_small-groups.svg",
    },
    { 
      key: "sustainable", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d2cc04eda11c9200f1_sustainable-travel.svg",
    },
    { 
      key: "impact", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d28dd07f69fce5fa93_quality-guaranteed.svg",
    },
    { 
      key: "guides", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d254d97d19bfa0f3d1_local-guides.svg",
    },
  ];

  return (
    // CAMBIO 1: Fondo Stone/Gris cálido muy suave para contraste con tarjetas blancas
    <section className="w-full bg-[#fff7e5] py-24 lg:py-32 relative overflow-hidden">
      
      {/* --- PATRÓN DE FONDO (Dot Pattern) --- 
          Esto añade textura "editorial" sutil.
      */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <Container className="relative z-10">
        
        {/* Cabecera */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h3 className="text-h4 md:text-h3 font-extrabold text-brand-dark uppercase tracking-tight mb-4">
            {t("title")}
          </h3>
          <div className="w-24 h-1.5 bg-brand-yellow mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-[2rem] p-10 h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 hover:border-brand-yellow/50 overflow-hidden"
            >
              {/* --- NÚMERO DE FONDO (Detalle Premium) --- 
                  Añade un 01, 02, 03 gigante y sutil en el fondo de la tarjeta.
              */}
              <div className="absolute -right-4 -top-6 text-[120px] font-black text-gray-50 opacity-5 group-hover:opacity-10 group-hover:text-brand-yellow transition-all duration-500 select-none z-0">
                0{index + 1}
              </div>

              <div className="relative z-10 flex flex-col items-start text-left">
                
                {/* Ícono con Círculo de Color Suave */}
                <div className="mb-8 w-20 h-20 bg-brand-pale/50 rounded-2xl flex items-center justify-center group-hover:bg-brand-yellow group-hover:rotate-6 transition-all duration-500 shadow-sm">
                  <img 
                    src={feature.iconUrl} 
                    alt="" 
                    className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:brightness-0 group-hover:invert" // Invertimos color al hover para contraste con amarillo
                  />
                </div>

                {/* Título */}
                <h4 className="text-h5 font-extrabold text-brand-dark mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {t(`cards.${feature.key}.title`)}
                </h4>

                {/* Texto */}
                <p className="text-[16px] leading-relaxed text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                  {t(`cards.${feature.key}.description`)}
                </p>

                {/* Línea decorativa que crece al hover */}
                <div className="mt-8 w-12 h-1 bg-gray-100 rounded-full group-hover:w-full group-hover:bg-brand-yellow transition-all duration-700 ease-in-out"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}