import { useTranslations } from "next-intl";
import CollectionHero from "@/components/tours/CollectionHero"; // <--- AHORA SÍ: Hero Premium
import TourGallery from "@/components/tours/TourGallery";
import CategoriesGrid from "@/components/tours/CategoriesGrid";
import PopularTours from "@/components/home/PopularTours";
import WhyUs from "@/components/home/WhyUs";
import ToursCTA from "@/components/tours/ToursCTA"; 
import Reviews from "@/components/home/Reviews";
import Partners from "@/components/home/Partners";

export default function ToursPage() {
  const t = useTranslations("ToursPage.Hero");

  return (
    <main className="bg-white">
      
      {/* 1. HERO PREMIUM EDITORIAL (Ken Burns) */}
      <CollectionHero 
        title={t("title")}
        subtitle={t("subtitle")}
        eyebrow="Catálogo 2025"
        // Usamos una imagen panorámica de alta calidad para el encabezado
        backgroundImage="https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837bab95a3f074ad685f779_Camino%20Inca%20Huaypo%20Adventure%2006.webp"
      />

      {/* 2. Inspiración Visual (Video Vertical + Marquee) */}
      <TourGallery />

      {/* 3. Navegación Estratégica (Los 7 Nichos) */}
      <CategoriesGrid />

      {/* 4. Productos Gancho (Lo más vendido) */}
      <div className="bg-[#fafaf9] border-t border-gray-100">
        <PopularTours /> 
      </div>

      {/* 5. Autoridad (Why Us) */}
      <WhyUs />

      {/* 6. CTA "Tailor Made" (Ruptura Visual Light) */}
      <ToursCTA />

      {/* 7. Confianza (Reviews) */}
      <Reviews />
      
      {/* 8. Social Proof (Partners) */}
      <Partners />
    </main>
  );
}