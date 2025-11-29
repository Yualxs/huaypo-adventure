import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import LegalContent from "@/components/legal/LegalContent";
import Partners from "@/components/home/Partners"; 

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

  return (
    <main className="bg-white">
      
      {/* 1. Hero Genérico */}
      <PageHero 
        title={t("Hero.title")}
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/6830e1706428c5138d6b3601_Galeria%20Huaypo%20Adventure%2011.webp"
      />

      {/* 2. Contenido Legal Premium */}
      <LegalContent />

      {/* 3. Partners */}
      <Partners />
    </main>
  );
}