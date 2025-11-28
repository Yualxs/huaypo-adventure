"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import TrekCard from "@/components/tours/TrekCard"; // Usamos la tarjeta nueva
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RecommendedTreks() {
  const t = useTranslations("RecommendedTreks");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // DATOS REALES (Extraídos de tu HTML de Webflow)
  const treks = [
    {
      id: 1,
      title: "Lares a Machu Picchu",
      duration: "4 días 3 noches",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/682fd3c1669955c97bc91db4_pexels-chelsea-cook-1520634-2929906.webp",
      slug: "lares-machu-picchu-4d-3n"
    },
    {
      id: 2,
      title: "Camino Inca con Hotel",
      duration: "2 días 1 noche",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/682fd3c1669955c97bc91db4_pexels-chelsea-cook-1520634-2929906.webp", // Nota: Revisa si la imagen es la misma en tu diseño original o cámbiala
      slug: "camino-inca-2d-1n-hotel"
    },
    {
      id: 3,
      title: "Huchuy Qosqo",
      duration: "3 días 2 noches",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/682fd3c1669955c97bc91db4_pexels-chelsea-cook-1520634-2929906.webp",
      slug: "huchuy-qosqo-3d-2n"
    },
    {
      id: 4,
      title: "Salkantay Trek",
      duration: "5 días 4 noches",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b8911c5f217eaca11acd_Salkantay%20Huaypo%20Adventure%2005.webp",
      slug: "salkantay-trek-5d-4n"
    },
    {
      id: 5,
      title: "Choquequirao",
      duration: "4 días 3 noches",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683656e44c4510ec65be1884_Choquequirao%20Huaypo%20Adventure%2001.webp",
      slug: "choquequirao-4d-3n"
    }
  ];

  // Lógica de Scroll (Idéntica a PopularTours para consistencia UX)
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 300; 
      const gap = 24; 
      const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = (container.firstElementChild?.clientWidth || 0) + 24; 
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = (container.firstElementChild?.clientWidth || 0) + 24;
        container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <Container>
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
          
          <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark uppercase tracking-wide">
            {t("title")}
          </h2>
          <div className="h-1 w-20 bg-brand-yellow mt-4 rounded-full"></div>
          

          {/* Botones Flechas */}
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carrusel (Scroll Snap) */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {treks.map((trek) => (
            <div 
              key={trek.id} 
              className="snap-start flex-shrink-0
                min-w-full 
                md:min-w-[calc(50%-12px)] 
                lg:min-w-[calc(33.333%-16px)]"
            >
              <TrekCard 
                image={trek.image}
                title={trek.title}
                duration={trek.duration}
                slug={trek.slug}
              />
            </div>
          ))}
        </div>

        {/* Puntitos */}
        <div className="flex justify-center gap-2 mt-2">
            {treks.map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index ? "w-8 bg-brand-yellow" : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        {/* Botón Ver Todos */}
        <div className="mt-12 text-center">
          <Link 
            href="/tours/caminatas-alternas" 
            className="inline-block px-8 py-3 bg-brand-dark text-white font-bold rounded-full hover:bg-brand-blue transition-colors shadow-lg hover:shadow-xl uppercase tracking-wider text-sm"
          >
            {t("viewAll")}
          </Link>
        </div>

      </Container>
    </section>
  );
}