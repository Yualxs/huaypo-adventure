"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-gray-800">
      <Container>
        
        {/* --- FILA 1: ENLACES Y CONTACTO --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 mb-12">
          
          {/* Columna 1: Compañía */}
          <div className="flex flex-col gap-4">
            <h6 className="text-p md:text-h6 font-bold text-brand-blue uppercase tracking-wider">
              {t("company.title")}
            </h6>
            <ul className="space-y-2 text-small md:text-p text-white">
              <li><Link href="/about" className="hover:text-brand-blue transition-colors">{t("company.about")}</Link></li>
              <li><Link href="#" className="hover:text-brand-blue transition-colors">{t("company.projects")}</Link></li>
              <li><Link href="/code-esnna" className="hover:text-brand-blue transition-colors">{t("company.code")}</Link></li>
            </ul>
          </div>

          {/* Columna 2: Nuestros Tours */}
          <div className="flex flex-col gap-4">
            <h6 className="text-p md:text-h6 font-bold text-brand-blue uppercase tracking-wider">
              {t("tours.title")}
            </h6>
            <ul className="space-y-2 text-small md:text-p text-white">
              <li><Link href="/tours" className="hover:text-brand-blue transition-colors">{t("tours.packages")}</Link></li>
              <li><Link href="/tours" className="hover:text-brand-blue transition-colors">{t("tours.dayTrips")}</Link></li>
              <li><Link href="/tours" className="hover:text-brand-blue transition-colors">{t("tours.machuPicchu")}</Link></li>
              <li><Link href="/tours" className="hover:text-brand-blue transition-colors">{t("tours.treks")}</Link></li>
            </ul>
          </div>

          {/* Columna 3: Enlaces Útiles */}
          <div className="flex flex-col gap-4">
            <h6 className="text-p md:text-h6 font-bold text-brand-blue uppercase tracking-wider">
              {t("links.title")}
            </h6>
            <ul className="space-y-2 text-small md:text-p text-white">
              <li><Link href="/plan" className="hover:text-brand-blue transition-colors">{t("links.plan")}</Link></li>
              <li><Link href="/contact" className="hover:text-brand-blue transition-colors">{t("links.contact")}</Link></li>
              <li><Link href="/blog" className="hover:text-brand-blue transition-colors">{t("links.blog")}</Link></li>
              <li><Link href="/terms" className="hover:text-brand-blue transition-colors">{t("links.terms")}</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-blue transition-colors">{t("links.privacy")}</Link></li>
            </ul>
          </div>

          {/* Columna 4: Horario */}
          <div className="flex flex-col gap-4">
            <h6 className="text-p md:text-h6 font-bold text-brand-blue uppercase tracking-wider">
              {t("hours.title")}
            </h6>
            <ul className="space-y-2 text-small md:text-p text-white">
              <li>{t("hours.weekdays")}</li>
              <li className="font-semibold text-white">{t("hours.weekdaysTime")}</li>
              <li className="mt-2">{t("hours.saturdays")}</li>
              <li className="font-semibold text-white">{t("hours.saturdaysTime")}</li>
              <li className="mt-2 ttext-small md:text-p">{t("hours.address")}</li>
            </ul>
          </div>

          {/* Columna 5: Contactos */}
          <div className="flex flex-col gap-4">
            <h6 className="text-p md:text-h6 font-bold text-brand-blue uppercase tracking-wider">
              {t("contacts.title")}
            </h6>
            {/* CAMBIO: Tamaño de texto igualado a las otras columnas */}
            <ul className="space-y-4 text-small md:text-p text-white">
              <li>
                <a href={`mailto:${t("contacts.email")}`} className="flex items-center gap-2 hover:text-brand-blue transition-colors">
                  <Mail size={18} className="text-brand-yellow" />
                  <span>{t("contacts.email")}</span>
                </a>
              </li>
              
              <li>
                <a href="tel:+51935327962" className="flex items-center gap-2 group">
                  {/* CAMBIO: Icono Azul como en Navbar */}
                  <Phone size={18} className="text-brand-blue" />
                  {/* CAMBIO: Hover con subrayado */}
                  <span className="group-hover:text-white group-hover:underline decoration-2 underline-offset-4 transition-all">
                    {t("contacts.phone")}
                  </span>
                </a>
              </li>
              
              <li>
                <a href="https://wa.me/+51903102547" target="_blank" className="flex items-center gap-2 group hover:text-[#28a61b] transition-colors">
                  {/* CAMBIO: Icono Verde específico (#28a61b) como en Navbar */}
                  <div className="w-[18px] h-[18px] text-[#28a61b]">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"/></svg>
                  </div>
                  <span>{t("contacts.whatsapp")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-brand-blue mb-10"></div>

        {/* --- FILA 2: BRANDING Y MÉTODOS DE PAGO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center mb-10">
          
          {/* Logo Footer */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image 
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68f83d5a7b5a7022c287fda2_Logo%20Huaypo%202025%20White.svg"
                alt="Huaypo Adventure"
                width={150}
                height={50}
                className="w-auto h-12"
              />
            </Link>
          </div>

          {/* Redes Sociales */}
          <div className="lg:col-span-1">
            <p className="text-small md:text-p mb-3 text-white">{t("socials")}</p>
            <div className="flex gap-3">
               <SocialIcon href="#" icon="tiktok" />
               <SocialIcon href="#" icon="facebook" />
               <SocialIcon href="#" icon="instagram" />
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="lg:col-span-1">
            <p className="text-small md:text-p mb-3 text-white">{t("payments")}</p>
            <div className="flex gap-2">
                <PaymentIcon src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68e7f9b28f986c4c602c725b_paypal.svg" alt="Paypal" />
                <PaymentIcon src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68e7f9b28f986c4c602c7259_visa.svg" alt="Visa" />
                <PaymentIcon src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68e7f9b28f986c4c602c7258_american-express.svg" alt="Amex" />
                <PaymentIcon src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68e7f9b28f986c4c602c725c_mastercard.svg" alt="Mastercard" />
            </div>
          </div>

          {/* Libro de Reclamaciones */}
          <div className="lg:col-span-1 flex lg:justify-end">
            <Link href="#" className="flex items-center gap-3 group">
                <Image 
                    src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68e7f880ce9d90a2a1e5e228_complaints-book.avif"
                    alt="Libro de Reclamaciones"
                    width={40}
                    height={40}
                    className="rounded-md"
                />
                <span className="text-small md:text-p text-white group-hover:text-brand-blue transition-colors">
                    {t("complaints")}
                </span>
            </Link>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-brand-blue mb-8"></div>

        {/* --- FILA 3: LEGAL --- */}
        <div className="flex flex-col md:flex-row justify-between items-center text-small md:text-p text-white gap-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center text-center md:text-left">
                <span>{t("legal.companyName")}</span>
                <span>{t("legal.ruc")}</span>
                <span>© {currentYear} {t("legal.rights")}</span>
            </div>
            
            <div className="flex items-center gap-1">
                <span>{t("legal.developer")}</span>
                <a href="https://www.andevo.io/" target="_blank" className="text-brand-yellow hover:text-white transition-colors">
                    Andevo
                </a>
            </div>
        </div>

      </Container>
    </footer>
  );
}

// --- SUBCOMPONENTES HELPER ---

function SocialIcon({ href, icon }: { href: string, icon: string }) {
    return (
        <a 
            href={href} 
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-brand-blue transition-all"
        >
            <SimpleIcon name={icon} className="w-5 h-5" />
        </a>
    )
}

function PaymentIcon({ src, alt }: { src: string, alt: string }) {
    return (
        <div className="bg-white rounded-md p-1 h-8 w-12 flex items-center justify-center">
            <Image src={src} alt={alt} width={40} height={20} className="w-auto h-full" />
        </div>
    )
}

function SimpleIcon({ name, className }: { name: string, className?: string }) {
    if (name === 'tiktok') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"/></svg>;
    if (name === 'facebook') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647"/></svg>;
    if (name === 'instagram') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"/></svg>;
    return null;
}