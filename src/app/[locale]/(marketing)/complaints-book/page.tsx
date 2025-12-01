import { useTranslations } from "next-intl"; // 1. Importar el hook
import PageHero from "@/components/ui/PageHero";
import ComplaintsForm from "@/components/legal/ComplaintsForm";

export default function ComplaintsBookPage() {
  const t = useTranslations("ComplaintsPage.Hero"); // 2. Conectar al namespace correcto

  return (
    <main>
      <PageHero 
        title={t("title")}      // 3. Usar la clave de traducción
        subtitle={t("subtitle")} // 3. Usar la clave de traducción
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif" 
      />
      <ComplaintsForm />
    </main>
  );
}