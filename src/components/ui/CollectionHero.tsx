"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing"; // Importante para los links internos
import Container from "@/components/ui/Container";
import { ChevronRight, Home } from "lucide-react";

interface CollectionHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  eyebrow?: string;
  // Nueva prop para pasar los datos del breadcrumb
  breadcrumbItems?: { label: string; href: string }[];
}

export default function CollectionHero({ 
  title, 
  subtitle, 
  backgroundImage, 
  eyebrow = "Explora Perú",
  breadcrumbItems 
}: CollectionHeroProps) {
  return (
    <section className="relative w-full h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-brand-dark rounded-b-[3rem] shadow-2xl">
      
      {/* --- 1. IMAGEN DE FONDO (Ken Burns) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover animate-ken-burns opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- 2. CONTENIDO --- */}
      <div className="relative z-10 w-full pt-20">
        <Container>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                
                {/* --- BREADCRUMBS INTEGRADO --- 
                    Se renderiza aquí dentro, centrado y elegante.
                */}
                {breadcrumbItems && (
                    <nav className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                        <ol className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                            <li className="inline-flex items-center">
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    <Home size={12} />
                                </Link>
                            </li>
                            {breadcrumbItems.map((item, index) => (
                                <li key={index} className="inline-flex items-center">
                                    <ChevronRight size={12} className="text-gray-500 mx-1" />
                                    {index === breadcrumbItems.length - 1 ? (
                                        <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wide">
                                            {item.label}
                                        </span>
                                    ) : (
                                        <Link 
                                            href={item.href} 
                                            className="text-[10px] font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* Eyebrow (Bajó un poco de jerarquía visual al tener breadcrumbs) */}
                <div className="mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <span className="px-3 py-1 rounded border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">
                        {eyebrow}
                    </span>
                </div>

                {/* Título Masivo */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.95] text-balance opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    {title}
                </h1>

                {/* Subtítulo */}
                <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed text-pretty opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                    {subtitle}
                </p>

            </div>
        </Container>
      </div>
      
      {/* ... Indicador de Scroll y Estilos (se mantienen igual) ... */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 opacity-60 animate-bounce-slow">
         <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white"></div>
         <span className="text-[10px] text-white uppercase tracking-widest">Descubre</span>
      </div>

      <style jsx>{`
        @keyframes ken-burns {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
            animation: ken-burns 20s ease-out infinite alternate;
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-slow {
            animation: bounce 3s infinite;
        }
      `}</style>
    </section>
  );
}