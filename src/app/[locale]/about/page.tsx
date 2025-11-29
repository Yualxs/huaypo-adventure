import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
// import Container ... (Ya no necesitamos Container directo aquí si usamos el componente)
import AboutIntro from "@/components/about/AboutIntro"; // <--- IMPORTAR
import WhyUs from "@/components/home/WhyUs";
import Partners from "@/components/home/Partners";
import TeamSection from "@/components/about/TeamSection";
import CompanyValues from "@/components/about/CompanyValues";
import Certifications from "@/components/about/Certifications";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <main className="bg-white">
      {/* 1. Hero Genérico */}
      <PageHero 
        title={t("Hero.title")}
        subtitle={t("Hero.subtitle")}
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/6830e1706428c5138d6b3601_Galeria%20Huaypo%20Adventure%2011.webp"
      />

      {/* 2. Intro Premium (Reemplaza la sección simple anterior) */}
      <AboutIntro />

      {/* 3. Why Us */}
      <WhyUs />

      {/* 4. Equipo */}
      <TeamSection />

      {/* 5. Valores */}
      <CompanyValues />

      {/* 6. Certificaciones */}
      <Certifications />

      {/* 7. Partners */}
      <Partners />
    </main>
  );
}