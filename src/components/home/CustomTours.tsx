"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";

export default function CustomTours() {
  const t = useTranslations("CustomTours");

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      {/* Usamos size="medium" para replicar el 'container-medium' de Webflow */}
      <Container size="medium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* --- COLUMNA IMÁGENES (Grid tipo Bento) --- */}
          <div className="grid grid-cols-2 gap-4">
            {/* Imagen 1 (Cuadrada) */}
            <div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
              <Image
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif"
                alt="Chinchero"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Imagen 2 (Cuadrada) */}
            <div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
              <Image
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a29d7603099b7070e53_Cuatrimotos%20con%20Huaypo%20Adventure.avif"
                alt="Cuatrimotos"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>

            {/* Imagen 3 (Rectangular - Ancho completo) */}
            <div className="relative w-full aspect-[2/1] col-span-2 rounded-[12px] overflow-hidden">
              <Image
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif"
                alt="Valle Rojo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* --- COLUMNA TEXTO --- */}
          <div className="flex flex-col items-start text-left">
            <h2 className="ttext-h4 md:text-h3 font-extrabold text-brand-dark mb-6 uppercase">
              {t("title")}
            </h2>

            <div className="space-y-4 text-p md:text-h6 text-brand-dark mb-8">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
            </div>

            {/* Botón (Azul Brand) */}
            <Link 
              href="/planifica-tu-aventura" 
              className="inline-block px-8 py-3.5 bg-brand-blue hover:bg-[#128add] text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 uppercase tracking-wider text-[13px]"
            >
              {t("button")}
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}