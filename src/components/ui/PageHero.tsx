"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center bg-brand-dark rounded-b-[3rem] overflow-hidden shadow-xl mb-10">
      
      {/* Imagen de Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
      </div>

      {/* Contenido */}
      {/* CAMBIO APLICADO: pt-16 -> pt-32 lg:pt-48 para librar el Navbar */}
      <div className="relative z-10 w-full pt-32 lg:pt-48">
        <Container>
          <div className="flex flex-col items-center text-center">
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-4 text-balance">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl text-pretty">
                {subtitle}
              </p>
            )}

            <div className="w-20 h-1.5 bg-brand-yellow rounded-full mt-8 shadow-[0_0_15px_rgba(255,201,75,0.5)]"></div>
          </div>
        </Container>
      </div>
    </section>
  );
}