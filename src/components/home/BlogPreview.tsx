"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard"; // Asegúrate que la ruta sea correcta
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPreview() {
  const t = useTranslations("BlogPreview");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // DATOS DE EJEMPLO (Mantén tus datos reales aquí)
  const posts = [
    {
      id: 1,
      title: "Animales de Machu Picchu: Conoce las Llamas, Alpacas y Vicuñas",
      excerpt: "Huaypo Adventure te acerca a estos íconos andinos, revelando su historia, secretos y cómo apreciarlos de forma respetuosa y memorable.",
      readTime: 5,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830df9573b3008295327dea_Machu-Picchu-Peru..webp",
      slug: "animales-de-machu-picchu"
    },
    {
      id: 2,
      title: "¿Cuándo Viajar a Perú? Tu Guía Completa de Clima",
      excerpt: "Perú: un mundo de costa, sierra y selva. Planifica tu viaje ideal según la región y su mejor temporada para visitarla.",
      readTime: 5,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830d99837d4db978497be09_15-Mooiste-plekken-voor-een-rondreis-Peru-e1536475505578.webp",
      slug: "cuando-viajar-a-peru"
    },
    {
      id: 3,
      title: "Una Aventura Natural: Descubre la Flora y Fauna Peruana",
      excerpt: "Descubre la mágica flora y fauna del Camino Inca. Huaypo Adventure te guía en una aventura natural, inolvidable y responsable.",
      readTime: 5,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830bd0ecac3a8f022e4b7a0_000463197W.webp",
      slug: "flora-y-fauna-camino-inca"
    },
    {
      id: 4,
      title: "Gastronomía en Cusco: Los mejores platos típicos",
      excerpt: "Una guía completa para deleitar tu paladar con los sabores andinos más auténticos de la región imperial.",
      readTime: 4,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/68362e70aeb6a6ba12a08edc_Laguna%20Humantay%20Huaypo%20Adventure%2001.webp",
      slug: "gastronomia-cusco"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = (container.firstElementChild?.clientWidth || 300) + 32; 
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = (container.firstElementChild?.clientWidth || 0) + 32; 
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = (container.firstElementChild?.clientWidth || 0) + 32;
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

          {/* Flechas de Navegación Premium */}
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

        {/* CARRUSEL */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="snap-start flex-shrink-0
                w-full
                md:w-[calc(50%-16px)] 
                lg:w-[calc(33.333%-21.33px)]"
            >
              <BlogCard 
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                readTime={post.readTime}
                slug={post.slug}
              />
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center gap-2 mt-4 mb-10">
            {posts.map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                        activeIndex === index ? "w-8 bg-brand-blue" : "w-3 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>

        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-block px-8 py-3 bg-transparent border border-brand-dark text-brand-dark font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all shadow-sm hover:shadow-lg uppercase tracking-wider text-[13px]"
          >
            {t("viewAll")}
          </Link>
        </div>

      </Container>
    </section>
  );
}