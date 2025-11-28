"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function Intro() {
  const t = useTranslations("Intro");

  return (
    // CAMBIO 1: Fondo cambiado a 'bg-brand-pale' (color-5: #f0f9ff) para coincidir con el original
    <section className="w-full bg-brand-pale py-16 md:py-24">
      <Container>
        <div className="mx-auto text-center space-y-6">
          
          {/* TÍTULO H2 */}
          <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark">
            {t.rich("title", {
              // CAMBIO 2: Color de resaltado cambiado a 'text-brand-blue' (color-2: #15a0ff)
              highlight: (chunks) => (
                <span className="text-brand-blue">{chunks}</span>
              ),
            })}
          </h2>

          {/* PÁRRAFO */}
          <p className="text-p md:text-h6 text-brand-dark">
            {t("description")}
          </p>

        </div>
      </Container>
    </section>
  );
}