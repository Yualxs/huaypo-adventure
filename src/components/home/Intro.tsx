"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";

export default function Intro() {
  const t = useTranslations("Intro");

  return (
    <section className="w-full bg-brand-pale py-20 lg:py-32">
      <Container>
        {/* Usamos 'max-w-4xl' y 'mx-auto' para centrar y contener todo el bloque */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* TÍTULO */}
          <h2 className="text-h3 md:text-h2 font-extrabold text-brand-dark mb-8 tracking-tight text-balance leading-tight">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-brand-blue">{chunks}</span>
              ),
            })}
          </h2>

          {/* DETALLE MINIMALISTA (Separador) 
              Este pequeño detalle aporta estructura sin añadir ruido visual.
          */}
          <div className="w-12 h-1.5 bg-brand-blue rounded-full mb-8 opacity-80"></div>

          {/* PÁRRAFO 
              Cambios Premium:
              1. text-[17px] md:text-[19px]: Un poco más grande que el estándar para elegancia.
              2. text-gray-700: Suaviza el contraste (no negro puro).
              3. max-w-3xl: Evita líneas eternas difíciles de leer.
              4. text-pretty: Evita viudas (palabras solas al final de línea).
          */}
          <p className="text-[16px] md:text-[18px] leading-relaxed text-gray-700 font-medium max-w-3xl text-pretty">
            {t("description")}
          </p>

        </div>
      </Container>
    </section>
  );
}