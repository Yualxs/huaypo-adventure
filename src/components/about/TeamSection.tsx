"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Map, Car, Utensils } from "lucide-react"; // Iconos temáticos

export default function TeamSection() {
  const t = useTranslations("AboutPage.Team");

  const team = [
    {
      key: "guides",
      number: "01",
      icon: Map,
      color: "bg-brand-blue", // Color del acento decorativo
      image: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
    },
    {
      key: "drivers",
      number: "02",
      icon: Car,
      color: "bg-brand-yellow",
      image: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
    },
    {
      key: "cooks",
      number: "03",
      icon: Utensils,
      color: "bg-brand-orange", // Asumiendo que tienes esta variable o usa un hex directo
      image: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
    }
  ];

  return (
    <section className="w-full bg-white py-24 lg:py-32 overflow-hidden relative">
      
      {/* Línea decorativa vertical de fondo (Conecta la historia) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2 hidden lg:block"></div>

      <Container>
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark uppercase tracking-wide bg-white inline-block px-6">
            {t("title")}
          </h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {team.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={item.key} className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center group">
                
                {/* --- IMAGEN CON EFECTO DE CAPAS --- */}
                <div className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  {/* 1. Elemento decorativo trasero (Caja de color desplazada) */}
                  <div className={`absolute top-4 ${isEven ? '-left-4' : '-right-4'} w-full h-full rounded-[2.5rem] opacity-20 ${item.color} -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2`}></div>
                  
                  {/* 2. Imagen Principal */}
                  <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <Image
                      src={item.image}
                      alt={t(`${item.key}.title`)}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Badge con Número (Flotante sobre la imagen) */}
                    <div className={`absolute bottom-0 ${isEven ? 'right-0 rounded-tl-[2rem]' : 'left-0 rounded-tr-[2rem]'} bg-white p-6 shadow-lg z-20`}>
                        <span className="text-4xl font-black text-brand-dark opacity-20">{item.number}</span>
                    </div>
                  </div>
                </div>

                {/* --- TEXTO --- */}
                <div className={`flex flex-col justify-center ${isEven ? 'lg:order-2 text-left' : 'lg:order-1 lg:text-right'}`}>
                  
                  {/* Icono Temático + Etiqueta */}
                  <div className={`flex items-center gap-3 mb-6 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-brand-dark shadow-sm`}>
                        <item.icon size={20} />
                    </div>
                    <div className={`h-[2px] w-12 bg-gray-200`}></div>
                  </div>

                  <h3 className="text-h4 md:text-3xl font-extrabold text-brand-dark mb-6 leading-tight">
                    {t(`${item.key}.title`)}
                  </h3>
                  
                  <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed font-light">
                    {t(`${item.key}.desc`)}
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}