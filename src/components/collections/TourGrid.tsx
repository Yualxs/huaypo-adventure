"use client";

import Container from "@/components/ui/Container";
import TourCard from "@/components/tours/TourCard";

interface TourGridProps {
  tours: any[]; // En el futuro, tipar esto con la interfaz de Sanity
}

export default function TourGrid({ tours }: TourGridProps) {
  return (
    <section className="py-12 bg-[#fafaf9]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
                <div key={tour.id} className="h-full">
                    <TourCard 
                        image={tour.image}
                        title={tour.title}
                        price={tour.price}
                        slug={tour.slug}
                        isBestSeller={tour.isBestSeller}
                    />
                </div>
            ))}
        </div>
      </Container>
    </section>
  );
}