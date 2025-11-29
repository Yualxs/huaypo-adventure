"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { ZoomIn, X, CheckCircle, FileCheck } from "lucide-react";

export default function Certifications() {
  const t = useTranslations("AboutPage.Certifications");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const certs = [
    {
      id: 1,
      title: "SERNANP",
      desc: "Autorización Red de Caminos Inca",
      src: "https://cdn.prod.website-files.com/674f0070dbfaa0751c7d33f5/6754b1958b1bc1cfa3a0f4e4_Sernanp-Inca-Peru-Travel.webp",
    },
    {
      id: 2,
      title: "GERCETUR",
      desc: "Constancia de Operador de Turismo",
      src: "https://cdn.prod.website-files.com/674f0070dbfaa0751c7d33f5/6754b195df191fb40513c5e8_GERCETUR-Inca-Peru-Travel.webp",
    },
    {
      id: 3,
      title: "Marca Perú",
      desc: "Licencia de Uso de Marca",
      src: "https://cdn.prod.website-files.com/674f0070dbfaa0751c7d33f5/6754b195a6d38877e86a41d1_Marca-Peru-Inca-Peru-Travel.webp"
    }
  ];

  return (
    <>
      <section className="w-full bg-white py-20 lg:py-28 border-t border-gray-50">
        <Container>
          
          {/* Cabecera con estilo Premium */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 mb-6">
                <CheckCircle size={14} />
                <span className="text-[11px] font-bold uppercase tracking-widest">Garantía Legal</span>
            </div>
            
            <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark uppercase tracking-wide">
              {t("title")}
            </h2>
            <div className="w-20 h-1.5 bg-brand-yellow mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Grid de Documentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 px-4 md:px-0">
              {certs.map((item) => (
                  <div 
                    key={item.id} 
                    className="group flex flex-col items-center"
                  >
                    {/* Marco del Documento */}
                    <div 
                        className="relative w-full aspect-[3/4] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden cursor-zoom-in transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        onClick={() => setSelectedImage(item.src)}
                    >
                        {/* Imagen del Documento */}
                        <div className="absolute inset-4 bg-white border border-gray-50 shadow-inner">
                            <Image 
                                src={item.src} 
                                alt={item.title} 
                                fill 
                                className="object-contain p-2" 
                            />
                        </div>

                        {/* Overlay al Hover (Lente) */}
                        <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <ZoomIn size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Meta Info del Documento */}
                    <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-brand-dark font-bold text-lg mb-1">
                            <FileCheck size={18} className="text-brand-blue" />
                            <h3>{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
              ))}
          </div>

        </Container>
      </section>

      {/* --- LIGHTBOX (MODAL) --- 
          Se renderiza solo si hay una imagen seleccionada
      */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)} // Cierra al hacer clic fuera
        >
            {/* Botón Cerrar */}
            <button 
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                onClick={() => setSelectedImage(null)}
            >
                <X size={24} />
            </button>

            {/* Contenedor de Imagen Fullscreen */}
            <div 
                className="relative w-full max-w-4xl h-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en la imagen
            >
                <Image 
                    src={selectedImage} 
                    alt="Certificado Fullscreen" 
                    fill 
                    className="object-contain"
                    priority
                />
            </div>
        </div>
      )}
    </>
  );
}