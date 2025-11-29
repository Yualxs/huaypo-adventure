import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import TermsContent from "@/components/legal/TermsContent";
import Partners from "@/components/home/Partners"; 

export default function TermsPage() {
  const t = useTranslations("TermsPage");

  return (
    <main className="bg-white">
      
      {/* 1. Hero Genérico */}
      <PageHero 
        title={t("Hero.title")}
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68408473f492d240b83fae3b_Waqrapucara%2003%20Huaypo%20Adventure.webp" // Usé la imagen de Waqrapucara del HTML original
      />

      {/* 2. Contenido Legal Premium */}
      <TermsContent />

      {/* 3. Partners */}
      <Partners />
    </main>
  );
}