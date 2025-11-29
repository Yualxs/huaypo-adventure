import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import EsnnaContent from "@/components/esnna/EsnnaContent";
import Partners from "@/components/home/Partners"; // Reutilizamos

export default function EsnnaPage() {
  const t = useTranslations("EsnnaPage");

  return (
    <main className="bg-white">
      
      {/* 1. Hero Genérico */}
      <PageHero 
        title={t("Hero.title")}
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/6830e1706428c5138d6b3601_Galeria%20Huaypo%20Adventure%2011.webp"
      />

      {/* 2. Intro Texto Centrado */}
      <section className="pt-16 pb-0">
        <Container size="medium">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark uppercase leading-tight text-balance">
                    {t("Intro.title")}
                </h2>
                <p className="text-[18px] text-gray-600 font-light leading-relaxed">
                    {t("Intro.description")}
                </p>
                <div className="w-24 h-1 bg-brand-blue mx-auto rounded-full mt-8 opacity-20"></div>
            </div>
        </Container>
      </section>

      {/* 3. Contenido Principal */}
      <EsnnaContent />

      {/* 4. Partners */}
      <Partners />
    </main>
  );
}