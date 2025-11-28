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
    <section className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        
        <div className="text-center mb-12">
          <h2 className="text-h4 md:text-h3 font-extrabold text-brand-dark uppercase tracking-wide">
            {t("title")}
          </h2>
        </div>

        {/* --- MARQUEE INFINITO --- */}
        <div 
            className="relative w-full overflow-hidden"
            style={{
                maskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)',
            }}
        >
            {/* Contenedor ancho que se mueve */}
            {/* gap-8 = 32px */}
            <div className="flex w-max gap-8 animate-scroll">
                
                {/* GRUPO 1 */}
                {logos.map((logo, index) => (
                    <div 
                        key={`logo-1-${index}`} 
                        className="w-[160px] h-[90px] bg-white border border-gray-100 rounded-xl flex items-center justify-center p-4 transition-all duration-300"
                    >
                        <Image src={logo} alt="Partner Logo" width={120} height={60} className="w-auto h-auto max-h-full object-contain" />
                    </div>
                ))}

                {/* GRUPO 2 */}
                {logos.map((logo, index) => (
                    <div 
                        key={`logo-2-${index}`} 
                        className="w-[160px] h-[90px] bg-white border border-gray-100 rounded-xl flex items-center justify-center p-4 transition-all duration-300"
                    >
                        <Image src={logo} alt="Partner Logo" width={120} height={60} className="w-auto h-auto max-h-full object-contain" />
                    </div>
                ))}

                 {/* GRUPO 3 */}
                 {logos.map((logo, index) => (
                    <div 
                        key={`logo-3-${index}`} 
                        className="w-[160px] h-[90px] bg-white border border-gray-100 rounded-xl flex items-center justify-center p-4 transition-all duration-300"
                    >
                        <Image src={logo} alt="Partner Logo" width={120} height={60} className="w-auto h-auto max-h-full object-contain" />
                    </div>
                ))}
            </div>
        </div>

      </Container>

      {/* CORRECCIÓN DE LA ANIMACIÓN */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          /* CAMBIO CLAVE: -33.333% 
             Como tenemos 3 grupos idénticos, solo necesitamos mover 1/3 del ancho total.
             Al llegar a 33.33%, el Grupo 2 está exactamente donde empezó el Grupo 1,
             permitiendo que la animación se reinicie a 0% sin que el ojo lo note.
          */
          100% { transform: translateX(calc(-100% / 3)); } 
        }
        .animate-scroll {
          /* Ajusté el tiempo a 30s para que sea fluido pero no demasiado lento */
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}