"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { ArrowUpRight, Map, Mountain, TrainFront, Sun, Clock, Compass, Luggage } from "lucide-react";

export default function CategoriesGrid() {
  const t = useTranslations("ToursPage.CategoriesGrid");

  // Configuración del Grid (Bento 4 columnas)
  const categories = [
    {
      id: "inca",
      icon: Map,
      // Imagen: Camino Inca (Mística)
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baa8b6b42925a135cfac_Camino%20Inca%20Huaypo%20Adventure%2003.webp",
      link: "/camino-inca",
      // Estilo: Cuadrado Grande (Hero)
      gridClass: "lg:col-span-2 lg:row-span-2",
    },
    {
      id: "salkantay",
      icon: Mountain,
      // Imagen: Salkantay (Vertical / Montaña)
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b8911c5f217eaca11acd_Salkantay%20Huaypo%20Adventure%2005.webp",
      link: "/salkantay-trek",
      // Estilo: Torre Vertical
      gridClass: "lg:col-span-1 lg:row-span-2",
    },
    {
      id: "machu",
      icon: TrainFront,
      // Imagen: Machu Picchu (Tren/Vistas)
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837bab6b7dc3704c9ba6bc2_Camino%20Inca%20Huaypo%20Adventure%2004.webp",
      link: "/machu-picchu-tours",
      // Estilo: Estándar
      gridClass: "lg:col-span-1 lg:row-span-1",
    },
    {
      id: "rainbow",
      icon: Sun,
      // Imagen: Montaña Colores
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683640899a1db199507e5d92_Palcoyo%20Huaypo%20Adventure%2003.webp",
      link: "/montana-de-colores",
      // Estilo: Estándar
      gridClass: "lg:col-span-1 lg:row-span-1",
    },
    {
      id: "day",
      icon: Clock,
      // Imagen: Laguna Humantay / Valle
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683b868aa17b559566ac5f7c_City%20Tour%2006%20Huaypo%20Adventure.webp",
      link: "/cusco-day-tours",
      // Estilo: Estándar
      gridClass: "lg:col-span-1 lg:row-span-1",
    },
    {
      id: "alt",
      icon: Compass,
      // Imagen: Choquequirao / Otros
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683656f255725b2a9f824a2b_Choquequirao%20Huaypo%20Adventure%2006.webp",
      link: "/caminatas-alternativas",
      // Estilo: Estándar
      gridClass: "lg:col-span-1 lg:row-span-1",
    },
    {
      id: "packages",
      icon: Luggage,
      // Imagen: Paquetes (City Tour / Panorámica)
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baaf8bf6a5749e50436e_Camino%20Inca%20Huaypo%20Adventure%2007.webp",
      link: "/paquetes-peru",
      // Estilo: Panorámico Ancho
      gridClass: "lg:col-span-2 lg:row-span-1",
    }
  ];

  return (
    <section className="w-full py-20 lg:py-32 bg-white">
      <Container>
        
        {/* Cabecera SEO */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gray border border-gray-200 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-dark animate-pulse"></span>
                <span className="text-[10px] font-bold text-brand-dark uppercase tracking-[0.2em]">Nuestras Colecciones</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-dark uppercase tracking-tight mb-4 text-balance">
                {t("title")}
            </h2>
            <p className="text-lg text-gray-500 font-light">
                {t("subtitle")}
            </p>
        </div>

        {/* BENTO GRID PREMIUM (4 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
            {categories.map((cat) => (
                <Link 
                    key={cat.id} 
                    href={cat.link}
                    className={`group relative rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 ${cat.gridClass}`}
                >
                    {/* Imagen de Fondo */}
                    <Image
                        src={cat.image}
                        alt={t(`items.${cat.id}`)}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    
                    {/* Overlay Degradado (Siempre legible) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-500"></div>

                    {/* Contenido Flotante */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        
                        {/* Icono Superior (Glassmorphism) */}
                        <div className="flex justify-end">
                             <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-brand-dark transition-all duration-300">
                                <cat.icon size={20} strokeWidth={1.5} />
                             </div>
                        </div>

                        {/* Texto Inferior */}
                        <div>
                            <h3 className="text-2xl font-bold text-white leading-tight mb-2 group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md">
                                {t(`items.${cat.id}`)}
                            </h3>
                            
                            {/* Botón "Ver" que aparece al hover */}
                            <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                <span>Explorar</span>
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

      </Container>
    </section>
  );
}