"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function WhyUs() {
  const t = useTranslations("WhyUs");

  // Datos exactos extraídos de tu Webflow (URLs de los íconos)
  const features = [
    { 
      key: "local", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d2a67e335e66b8d5d7_local-company.svg",
      width: 60 
    },
    { 
      key: "quality", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d28dd07f69fce5fa93_quality-guaranteed.svg",
      width: 50 
    },
    { 
      key: "groups", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d25410ac135c85d732_small-groups.svg",
      width: 70 
    },
    { 
      key: "sustainable", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d2cc04eda11c9200f1_sustainable-travel.svg",
      width: 55 
    },
    { 
      key: "impact", 
      // Nota: En el HTML que me pasaste, este ícono se repetía con el de calidad. 
      // He mantenido la lógica del código original, pero si tienes otra URL, cámbiala aquí.
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d28dd07f69fce5fa93_quality-guaranteed.svg",
      width: 50 
    },
    { 
      key: "guides", 
      iconUrl: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b219d254d97d19bfa0f3d1_local-guides.svg",
      width: 55 
    },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <Container>
        {/* Título de la Sección */}
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-h4 md:text-h3 font-extrabold text-brand-dark uppercase tracking-wide">
            {t("title")}
          </h3>
        </div>

        {/* Grid de Tarjetas - Réplica exacta del layout 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-brand-cream rounded-[12px] p-8 flex flex-col items-center text-center h-full hover:shadow-sm transition-shadow duration-300"
            >
              {/* Ícono (Centrado verticalmente en un espacio fijo) */}
              <div className="mb-6 h-16 flex items-center justify-center">
                <img 
                  src={feature.iconUrl} 
                  alt="" 
                  className="h-full w-auto object-contain"
                  style={{ maxHeight: '60px' }} // Altura máxima para uniformidad visual
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-col gap-3">
                <h4 className="text-h6 md:text-h5 font-bold text-brand-dark">
                  {t(`cards.${feature.key}.title`)}
                </h4>

                <p className="text-small md:text-p text-brand-dark">
                  {t(`cards.${feature.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}