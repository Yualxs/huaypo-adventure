"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function Partners() {
  const t = useTranslations("Partners");

  const logos = [
    "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/682f525da0c913f2d415738e_caltur-brand.webp",
    "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/682f525d114089c61a22ab7b_atta-adventure-travel-brand.webp",
    "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/682f525dccc5e112c266d76a_tourcert-brand.webp",
    "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/682f525dbfb65d2cd07bbcc7_mincetur-brand.webp",
    "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/682f525dd6b6f1d810e9c2cb_aatc-brand.webp",
    "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/682f525debbd3bc5e248eab0_dircetur-brand.webp"
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden border-t border-gray-50">
      <Container>
        
        {/* Cabecera Premium */}
        <div className="text-center mb-16">
          <h2 className="text-h4 md:text-h3 font-extrabold text-brand-dark uppercase tracking-wide">
            {t("title")}
          </h2>
          {/* Línea decorativa consistente con otras secciones */}
          <div className="w-16 h-1 bg-brand-yellow mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- MARQUEE INFINITO --- */}
        <div 
            className="relative w-full overflow-hidden"
            style={{
                // Máscara de degradado más suave y amplia para efecto "Fade"
                maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)',
            }}
        >
            <div className="flex w-max gap-12 md:gap-20 animate-scroll items-center">
                
                {/* Renderizamos 3 grupos para asegurar el bucle infinito perfecto */}
                {[...Array(3)].map((_, groupIndex) => (
                    <div key={`group-${groupIndex}`} className="flex gap-12 md:gap-20 shrink-0">
                        {logos.map((logo, index) => (
                            <div 
                                key={`logo-${groupIndex}-${index}`} 
                                className="relative w-[140px] h-[80px] md:w-[160px] md:h-[90px] flex items-center justify-center transition-all duration-300 group"
                            >
                                {/* Logo con efecto Greyscale -> Color */}
                                <Image 
                                    src={logo} 
                                    alt="Partner Logo" 
                                    width={140} 
                                    height={70} 
                                    className="w-auto h-auto max-h-full object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 cursor-pointer" 
                                />
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>

      </Container>

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); } 
        }
        .animate-scroll {
          animation: scroll 40s linear infinite; /* Un poco más lento para elegancia */
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}