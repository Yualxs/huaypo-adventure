import { useTranslations } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Partners from "@/components/home/Partners"; // Reutilizamos

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <main className="bg-white">
      
      {/* 1. Hero Genérico */}
      <PageHero 
        title={t("Hero.title")}
        // URL CORREGIDA:
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif"
      />

      {/* 2. Contenido Principal */}
      <section className="py-16 lg:py-24">
        <Container>
            
            {/* Título Intro */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark uppercase leading-tight text-balance">
                    {t("Intro.title")}
                </h2>
            </div>

            {/* Datos de Contacto */}
            <ContactInfo />

            {/* Formulario */}
            <ContactForm />

            {/* Mapa (Iframe con estilo) */}
            <div className="mt-20 w-full h-[450px] rounded-[3rem] overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.376472697864!2d-71.97999862417765!3d-13.512630786854784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916e78a631627575%3A0x7c73752e50529606!2sCalle%20Marquez%20122%2C%20Cusco%2008002!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

        </Container>
      </section>

      {/* 3. Partners */}
      <Partners />
    </main>
  );
}