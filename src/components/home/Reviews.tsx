"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import ReviewCard from "@/components/home/ReviewCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Reviews() {
  const t = useTranslations("Reviews");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reviewsData = [
    {
      avatar: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/690d292410eda6e22339ef99_default-avatar-2020-34.avif",
      key: 1 
    },
    {
      avatar: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/690d290d5ca14369a4c9ec2f_default-avatar-2020-30.avif",
      key: 2
    },
    {
      avatar: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/690d28218d105dae317a4550_default-avatar-2020-5.avif",
      key: 3
    },
    {
      avatar: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/690d28adb2c47a35a883ecff_default-avatar.avif",
      key: 0
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
    // Color de fondo crema suave
    <section className="w-full bg-[#fff7e5] py-20 md:py-28">
      <Container>
        
        {/* Cabecera Centrada */}
        <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-4 relative w-[50px] h-[50px]">
                <Image 
                    src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b33b7afb4f82f391121508_icon-quote.svg"
                    alt="Quote Icon"
                    fill
                    className="object-contain opacity-80"
                />
            </div>
            
            <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark max-w-2xl mx-auto">
                {t("title")}
            </h2>
        </div>

        {/* CARRUSEL */}
        <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            // Aumentamos padding vertical (py-12) para que las sombras y avatares no se corten
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory py-12 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {reviewsData.map((review, index) => (
                <div 
                    key={index} 
                    className="snap-start flex-shrink-0
                        w-full
                        md:w-[calc(50%-16px)] 
                        lg:w-[calc(33.333%-21.33px)]"
                >
                    <ReviewCard 
                        title={t(`list.${review.key}.title`)}
                        text={t(`list.${review.key}.text`)}
                        author={t(`list.${review.key}.author`)}
                        date={t(`list.${review.key}.date`)}
                        avatarUrl={review.avatar}
                    />
                </div>
            ))}
        </div>

        {/* CONTROLES INFERIORES */}
        <div className="flex items-center justify-between mt-4 px-4 md:px-0 max-w-sm mx-auto">
            {/* Botón Izquierda Premium */}
            <button 
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all shadow-sm hover:shadow-md group"
            >
                <ChevronLeft size={22} strokeWidth={1.5} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Paginación */}
            <div className="flex gap-2.5">
                {reviewsData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                            activeIndex === index 
                            ? "w-8 bg-brand-yellow" 
                            : "w-2.5 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to review ${index + 1}`}
                    />
                ))}
            </div>

            {/* Botón Derecha Premium */}
            <button 
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white transition-all shadow-sm hover:shadow-md group"
            >
                <ChevronRight size={22} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>

      </Container>
    </section>
  );
}