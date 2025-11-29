"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { Search, ArrowRight, Sparkles, Clock } from "lucide-react";

export default function BlogFilter() {
  const t = useTranslations("BlogPage");
  const [activeCategory, setActiveCategory] = useState("all");

  // --- DATOS DE EJEMPLO ---
  const allPosts = [
    {
      id: 1,
      title: "Animales de Machu Picchu: Conoce las Llamas, Alpacas y Vicuñas",
      excerpt: "Huaypo Adventure te acerca a estos íconos andinos, revelando su historia, secretos y cómo apreciarlos.",
      readTime: 5,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830df9573b3008295327dea_Machu-Picchu-Peru..webp",
      slug: "animales-de-machu-picchu",
      category: "nature"
    },
    {
      id: 2,
      title: "¿Cuándo Viajar a Perú? Tu Guía Completa de Clima",
      excerpt: "Planifica tu viaje ideal según la región y su mejor temporada para visitarla.",
      readTime: 7,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830d99837d4db978497be09_15-Mooiste-plekken-voor-een-rondreis-Peru-e1536475505578.webp",
      slug: "cuando-viajar-a-peru",
      category: "tips"
    },
    {
      id: 3,
      title: "Una Aventura Natural: Descubre la Flora y Fauna Peruana",
      excerpt: "Descubre la mágica flora y fauna del Camino Inca en una aventura natural inolvidable.",
      readTime: 6,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6830bd0ecac3a8f022e4b7a0_000463197W.webp",
      slug: "flora-y-fauna-camino-inca",
      category: "nature"
    },
    {
      id: 4,
      title: "Gastronomía en Cusco: Los mejores platos típicos",
      excerpt: "Una guía completa para deleitar tu paladar con los sabores andinos más auténticos.",
      readTime: 4,
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/68362e70aeb6a6ba12a08edc_Laguna%20Humantay%20Huaypo%20Adventure%2001.webp",
      slug: "gastronomia-cusco",
      category: "gastronomy"
    }
  ];

  const categories = [
    { id: "all", label: t("Categories.all") },
    { id: "culture", label: t("Categories.culture") },
    { id: "adventure", label: t("Categories.adventure") },
    { id: "tips", label: t("Categories.tips") },
    { id: "gastronomy", label: t("Categories.gastronomy") },
  ];

  const filteredPosts = activeCategory === "all" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory || post.category === "nature");

  return (
    <section className="w-full bg-white pb-24 relative z-20">
      
      {/* --- BARRA DE FILTROS (CORREGIDA: Scroll Invisible + Diseño Limpio) --- */}
      <div className="relative z-30 -mt-12 mb-24 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-full p-1.5 pr-2 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-between gap-4">
            
            {/* CONTENEDOR DE FILTROS (SCROLLABLE):
               1. 'flex-1': Ocupa todo el espacio disponible excepto el buscador.
               2. 'mask-image': Crea un desvanecimiento (fade) sutil a la derecha para indicar que hay más contenido.
               3. '[&::-webkit-scrollbar]:hidden': Oculta la barra en Chrome/Safari/Edge.
               4. '[scrollbar-width:none]': Oculta la barra en Firefox.
            */}
            <div 
                className="flex-1 overflow-x-auto flex items-center gap-1 px-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                style={{ maskImage: 'linear-gradient(to right, black 90%, transparent 100%)' }}
            >
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        // CORRECCIÓN: 
                        // 1. Quitamos 'transform scale-105'.
                        // 2. Bajamos padding a 'py-2'.
                        // 3. Añadimos 'border' para evitar saltos de layout.
                        className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-200 whitespace-nowrap border ${
                            activeCategory === cat.id
                            ? "bg-brand-dark text-white border-brand-dark shadow-md"
                            : "text-gray-500 border-transparent hover:bg-gray-100 hover:text-brand-dark"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Separador y Buscador (Fijos a la derecha) */}
            <div className="flex items-center gap-2 shrink-0 pl-2 border-l border-gray-100">
                <div className="relative w-40 md:w-56 transition-all focus-within:w-48 md:focus-within:w-64">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full bg-transparent border-none text-sm font-medium placeholder:text-gray-400 focus:ring-0 focus:outline-none pl-8 h-10 rounded-full hover:bg-gray-50 focus:bg-white transition-colors"
                    />
                    <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-blue/80" />
                </div>
            </div>
            
        </div>
      </div>

      <Container>
        
        {/* --- ARTÍCULO DESTACADO (Hero Card) --- */}
        {activeCategory === "all" && (
            <div className="mb-24 animate-fade-in-up">
                <Link href="/blog/guia-definitiva-camino-inca" className="group relative block w-full aspect-[4/3] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer">
                    
                    {/* Imagen (URL Corregida) */}
                    <Image 
                        src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif"
                        alt="Featured Post"
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                        priority
                    />
                    
                    {/* Gradiente Cinemático */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    {/* Contenido */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start">
                        
                        {/* Badge Glass */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6 shadow-lg">
                            <Sparkles size={14} className="text-brand-yellow fill-current" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{t("Featured.badge")}</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 max-w-4xl leading-[1.1] drop-shadow-lg text-balance">
                            Guía Definitiva del Camino Inca: Todo lo que necesitas saber
                        </h2>

                        <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{t("Featured.readTime")}</span>
                            </div>
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                            <span>Junio 12, 2025</span>
                        </div>

                        {/* Botón de Texto "Leer" */}
                        <div className="mt-8 flex items-center gap-3 group/btn">
                            <span className="text-white font-bold text-sm uppercase tracking-widest border-b-2 border-brand-yellow pb-1 transition-all group-hover/btn:text-brand-yellow">
                                Leer Artículo Completo
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm group-hover/btn:bg-brand-yellow group-hover/btn:text-brand-dark transition-all">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )}

        {/* --- GRID DE ARTÍCULOS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {filteredPosts.map((post) => (
                <div key={post.id} className="h-full">
                    <BlogCard 
                        image={post.image}
                        title={post.title}
                        excerpt={post.excerpt}
                        readTime={post.readTime}
                        slug={post.slug}
                    />
                </div>
            ))}
        </div>

      </Container>
    </section>
  );
}