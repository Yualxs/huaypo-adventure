"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import TourCard from "@/components/tours/TourCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PopularTours() {
  const t = useTranslations("PopularTours");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // DATOS REALES
  const tours = [
    {
      id: 1,
      title: "Maras - Moray En Cuatrimoto",
      price: 30,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/682fd3c1669955c97bc91db4_pexels-chelsea-cook-1520634-2929906.webp",
      slug: "maras-moray-en-cuatrimoto"
    },
    {
      id: 2,
      title: "Palccoyo",
      price: 60,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/68364082fe9fdb03cca9a763_Palcoyo%20Huaypo%20Adventure%2001.webp",
      slug: "palccoyo"
    },
    {
      id: 3,
      title: "Waqrapucara",
      price: 60,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683b8603cdebe0a37a89da30_Waqrapucara%2001%20Huaypo%20Adventure.webp",
      slug: "waqrapucara"
    },
    {
      id: 4,
      title: "Puente Qeswachaka",
      price: 60,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/68363ac27e2c70dbb90b0d7f_Puente%20Queshuachaca%20Huaypo%20Adventure%2001.webp",
      slug: "puente-qeswachaka"
    },
    {
      id: 5,
      title: "7 Lagunas Ausangate",
      price: 50,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683661b6e8ca5f93fc94fc96_7%20Lagunas%20Ausangate%20Huaypo%20Adventure%2001.webp",
      slug: "7-lagunas-ausangate"
    }
  ];

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
        {/* CAMBIO 1: mb-10 -> mb-2 (Reducimos margen porque el carrusel ahora tiene padding-top) */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-2 gap-6">
          
          <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark uppercase tracking-wide">
            {t("title")}
          </h2>
          <div className="h-1 w-20 bg-brand-yellow mt-4 rounded-full"></div>
          

          {/* Botones Flechas Premium */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 group"
            >
              <ChevronLeft size={22} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-300 group"
            >
              <ChevronRight size={22} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          // CAMBIO 2: pb-8 -> py-12 (Mucho espacio vertical para que la sombra y el hover no se corten)
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-12 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tours.map((tour) => (
            <div 
              key={tour.id} 
              className="snap-start flex-none
                w-full 
                md:w-[calc(50%-12px)] 
                lg:w-[calc(33.333%-16px)]"
            >
              <TourCard 
                image={tour.image}
                title={tour.title}
                price={tour.price}
                slug={tour.slug}
              />
            </div>
          ))}
        </div>

        {/* Puntitos */}
        {/* CAMBIO 3: mt-2 -> -mt-2 (Subimos un poco los puntitos para compensar el padding extra del carrusel) */}
        <div className="flex justify-center gap-2 -mt-2">
            {tours.map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index 
                        ? "w-8 bg-brand-yellow" 
                        : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        {/* Botón Ver Todos */}
        <div className="mt-12 text-center">
          <Link 
            href="/tours" 
            className="inline-block px-8 py-3 bg-brand-dark text-white font-bold rounded-full hover:bg-brand-blue transition-colors shadow-lg hover:shadow-xl uppercase tracking-wider text-sm"
          >
            {t("viewAll")}
          </Link>
        </div>

      </Container>
    </section>
  );
}