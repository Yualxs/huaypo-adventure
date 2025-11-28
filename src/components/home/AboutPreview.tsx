"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";

export default function AboutPreview() {
  const t = useTranslations("AboutPreview");

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* --- COLUMNA IMAGEN (Izquierda) --- */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b10d8487e0ffbcf167a004_Huaypo%20Adventure%20About%20Us.avif"
              alt="Equipo Huaypo Adventure"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* --- COLUMNA TEXTO (Derecha) --- */}
          <div className="flex flex-col items-start text-left">
            <h2 className="text-h4 md:text-h3 font-extrabold text-brand-dark mb-6 uppercase">
              {t("title")}
            </h2>

            <div className="space-y-4 text-p md:text-h6 text-brand-dark mb-8">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            {/* Botón */}
            <Link 
              href="/about" 
              className="inline-block px-8 py-3 bg-brand-blue hover:bg-[#128add] text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 uppercase tracking-wider text-sm"
            >
              {t("button")}
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}