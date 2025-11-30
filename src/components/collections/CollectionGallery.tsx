"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { Play, Instagram } from "lucide-react";

export default function CollectionGallery() {
  
  // Imágenes seleccionadas para el "Moodboard" de Camino Inca
  const galleryImages = {
    vertical: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b8a28aa94c67439c39aa_Salkantay%20Huaypo%20Adventure%2004.webp", // Guía/Persona
    horizontal1: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b8a08bf6a5749e4eeb22_Salkantay%20Huaypo%20Adventure%2003.webp", // Paisaje 1
    horizontal2: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b89dacc5f9424d56b7a5_Salkantay%20Huaypo%20Adventure%2002.webp", // Paisaje 2
  };

  // Video ID actualizado
  const videoId = "1141740496"; 

  return (
    <section className="py-20 lg:py-24 bg-white">
      <Container>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-auto lg:h-[600px]">
            
            {/* --- COLUMNA 1: VIDEO 4:5 (40% ancho) --- */}
            <div className="lg:w-[40%] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group">
                {/* Wrapper para forzar aspect ratio en móvil, en desktop usa h-full */}
                <div className="absolute inset-0 bg-gray-900">
                    <iframe 
                        src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`} 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] h-[150%] min-w-full min-h-full pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                        allow="autoplay; fullscreen" 
                    ></iframe>
                </div>

                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Etiqueta Flotante */}
                <div className="absolute bottom-8 left-8 flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse-slow">
                        <Play size={16} fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Cinematic View</p>
                        <p className="text-lg font-bold leading-none">Camino Inca</p>
                    </div>
                </div>
            </div>

            {/* --- COLUMNA 2: FOTO VERTICAL (25% ancho) --- */}
            <div className="lg:w-[25%] relative rounded-[2.5rem] overflow-hidden shadow-lg group hidden md:block">
                <Image 
                    src={galleryImages.vertical}
                    alt="Detalle Vertical"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Decoración Social */}
                <div className="absolute top-6 right-6 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-brand-dark opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Instagram size={16} />
                </div>
            </div>

            {/* --- COLUMNA 3: APILADO HORIZONTAL (35% ancho) --- */}
            <div className="lg:w-[35%] flex flex-col gap-6 lg:gap-8">
                
                {/* Foto Superior */}
                <div className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-lg group">
                    <Image 
                        src={galleryImages.horizontal1}
                        alt="Paisaje Andino 1"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-[10px] font-bold uppercase tracking-wide">
                            Machu Picchu
                        </span>
                    </div>
                </div>

                {/* Foto Inferior */}
                <div className="relative flex-1 rounded-[2.5rem] overflow-hidden shadow-lg group">
                    <Image 
                        src={galleryImages.horizontal2}
                        alt="Paisaje Andino 2"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                    <div className="absolute bottom-6 left-6">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-[10px] font-bold uppercase tracking-wide">
                            Valle Sagrado
                        </span>
                    </div>
                </div>

            </div>
        </div>

        {/* --- VERSIÓN MÓVIL: Ajuste de altura para el video --- */}
        <style jsx>{`
            @media (max-width: 1024px) {
                .lg\\:w-\\[40\\%\\] {
                    height: 500px; /* Altura fija para el video en móvil/tablet */
                }
            }
        `}</style>
        
      </Container>
    </section>
  );
}