import { useTranslations } from "next-intl";
import BlogHero from "@/components/blog/BlogHero";
import BlogFilter from "@/components/blog/BlogFilter";
import Newsletter from "@/components/blog/Newsletter";
import Partners from "@/components/home/Partners"; // Reutilizamos

export default function BlogPage() {
  return (
    <main className="bg-white">
      
      {/* 1. Hero Editorial */}
      <BlogHero />

      {/* 2. Grid de Posts + Filtros + Featured Post */}
      {/* Nota: El BlogFilter incluye la barra sticky y el contenido */}
      <div className="-mt-10 relative z-20"> 
        {/* Margen negativo para que los filtros pisen el borde curvo del hero */}
        <BlogFilter />
      </div>

      {/* 3. Lead Magnet (Newsletter) */}
      <Newsletter />

      {/* 4. Social Proof */}
      <Partners />
    </main>
  );
}