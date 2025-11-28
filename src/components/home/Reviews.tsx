"use client";

import Image from "next/image"; // IMPORTANTE: Importar Image
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
    <section className="w-full bg-brand-cream py-20 md:py-28">
      <Container>
        
        {/* Cabecera Centrada */}
        <div className="flex flex-col items-center text-center mb-4">
            {/* CORRECCIÓN: Usamos la imagen original de Webflow */}
            <div className="mb-2 relative w-[50px] h-[50px]">
                <Image 
                    src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b33b7afb4f82f391121508_icon-quote.svg"
                    alt="Quote Icon"
                    fill
                    className="object-contain"
                />
            </div>
            
            <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark mt-2">
                {t("title")}
            </h2>
        </div>

        {/* CARRUSEL */}
        <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pt-16 pb-8 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0"
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

        {/* Controles */}
        <div className="flex items-center justify-between mt-2 px-4 md:px-0">
            <button 
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-[#008a3c] flex items-center justify-center text-white hover:bg-[#006e30] transition-colors shadow-lg hover:scale-105"
            >
                <ChevronLeft size={24} strokeWidth={3} />
            </button>

            <div className="flex gap-3">
                {reviewsData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            activeIndex === index 
                            ? "bg-[#008a3c] scale-125" 
                            : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>

            <button 
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-[#008a3c] flex items-center justify-center text-white hover:bg-[#006e30] transition-colors shadow-lg hover:scale-105"
            >
                <ChevronRight size={24} strokeWidth={3} />
            </button>
        </div>

      </Container>
    </section>
  );
}