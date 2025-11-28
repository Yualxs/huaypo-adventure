"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const navItems = [
    { 
      label: t("menu.incaTrail"), 
      href: "/tours/camino-inca",
      subItems: [
        { label: "Camino Inca 2D/1N con Hotel", href: "#", badge: "Más Vendido" },
        { label: "Camino Inca 4D/3N", href: "#", badge: "Más Vendido" },
      ]
    },
    { 
      label: t("menu.machuPicchu"), 
      href: "/tours/machu-picchu",
      subItems: [
        { label: "Machu Picchu Full Day", href: "#", badge: "Más Vendido" },
        { label: "Machu Picchu con Montaña", href: "#", badge: null },
      ]
    },
    { 
      label: t("menu.alternateTreks"), 
      href: "/tours/caminatas-alternas",
      subItems: [
        { label: "Salkantay Trek 5D/4N", href: "#", badge: "Más Vendido" },
        { label: "Choquequirao Trek", href: "#", badge: null },
      ]
    },
    { 
      label: t("menu.dayTours"), 
      href: "/tours/full-day",
      subItems: [
        { label: "Montaña de Colores", href: "#", badge: "Más Vendido" },
        { label: "Laguna Humantay", href: "#", badge: null },
      ]
    },
    { 
      label: t("menu.packages"), 
      href: "/tours/paquetes",
      subItems: [
        { label: "Cusco Mágico 5 Días", href: "#", badge: null },
        { label: "Perú Completo", href: "#", badge: null },
      ]
    },
  ];

  return (
    <header className="w-full bg-white shadow-sm font-sans z-50 relative">
      
      {/* ==============================================
          NIVEL 1: BARRA SUPERIOR (LOGO + UTILIDADES)
         ============================================== */}
      <div className="border-b border-gray-100">
        <Container>
          <div className="flex justify-between items-center h-[90px]">
            
            {/* --- IZQUIERDA: LOGO --- */}
            <Link href="/" className="flex-shrink-0 pt-2">
              <img
                src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68f83d16eb9758c2e5c5bba9_Logo%20Huaypo%202025.svg"
                alt="Huaypo Adventure Logo"
                className="h-[55px] w-auto object-contain" // Tamaño ajustado al original
              />
            </Link>

            {/* --- DERECHA: BLOQUE DE UTILIDADES (Desktop) --- */}
            <div className="hidden xl:flex flex-col items-end justify-center gap-1.5 h-full py-1">
              
              {/* FILA SUPERIOR: Links utilitarios + Idioma */}
              <div className="flex items-center justify-end gap-4 text-[14px] font-semibold text-brand-dark uppercase tracking-wide">
                <Link href="/about" className="hover:underline underline-offset-4 decoration-2 transition-all">
                    {t("links.about")}
                </Link>
                <span className="text-gray-300 font-normal">|</span>
                <Link href="/blog" className="hover:underline underline-offset-4 decoration-2 transition-all">
                    {t("links.blog")}
                </Link>
                <span className="text-gray-300 font-normal">|</span>
                <Link href="/contact" className="hover:underline underline-offset-4 decoration-2 transition-all">
                    {t("links.contact")}
                </Link>
                
                {/* Selector de Idioma (Ajustado al nuevo tamaño) */}
                <div className="ml-2 pl-2 flex items-center gap-1 cursor-pointer group relative">
                   <span className="hover:text-brand-orange flex items-center gap-1">
                     Español <ChevronDown size={14} strokeWidth={2.5} />
                   </span>
                   {/* Dropdown Idioma */}
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block border border-gray-100 z-50">
                    <button onClick={() => handleLanguageChange('en')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-[13px] font-bold text-gray-600">English</button>
                    <button onClick={() => handleLanguageChange('pt')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-[13px] font-bold text-gray-600">Português</button>
                  </div>
                </div>
              </div>

              {/* FILA INFERIOR: Redes + Contacto + CTA */}
              <div className="flex items-center gap-5 mt-1">
                 
                 {/* Redes Sociales (Círculos al hacer Hover) */}
                 <div className="flex items-center gap-2 text-black">
                    <SocialLink href="https://tiktok.com" icon="tiktok" />
                    <SocialLink href="https://facebook.com" icon="facebook" />
                    <SocialLink href="https://instagram.com" icon="instagram" />
                    <SocialLink href="https://tripadvisor.com" icon="tripadvisor" />
                 </div>

                 {/* Teléfono */}
                 <a href="tel:+51903102547" className="flex items-center gap-2 group ml-2">
                    <Phone size={18} className="text-brand-blue fill-current" />
                    <span className="text-[16px] font-semibold text-brand-dark group-hover:underline decoration-2 underline-offset-4 decoration-brand-dark transition-all">+51 903 102 547</span>
                 </a>

                 {/* WhatsApp */}
                 <a href="https://wa.me/+51903102547" target="_blank" className="flex items-center gap-2 px-4 py-1.5 rounded-full border-[2px] border-[#28a61b] text-[#28a61b] hover:bg-[#28a61b] hover:text-white transition-all group">
                    <SimpleIcon name="whatsapp" className="w-5 h-5" />
                    <span className="text-[16px] font-semibold uppercase tracking-wide">WhatsApp</span>
                 </a>

                 {/* Botón CTA (Amarillo con Texto Negro) */}
                 <Link href="/book" className="ml-1 bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark px-7 py-2.5 rounded-full text-[16px] font-bold uppercase tracking-wide transition-all shadow-sm hover:shadow-md">
                    {t("links.book")}
                 </Link>
              </div>
            </div>

            {/* BOTÓN HAMBURGUESA (Móvil/Tablet) */}
            <div className="xl:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700">
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ==============================================
          NIVEL 2: BARRA DE NAVEGACIÓN (CORREGIDO)
         ============================================== */}
      <div className="hidden xl:block bg-brand-dark relative z-40">
        <Container>
            <nav className="flex justify-between items-center h-[60px]">
                {navItems.map((item, index) => (
                    <div key={index} className="group h-full flex items-center relative">
                        {/* Enlace Principal */}
                        <Link 
                            href={item.href} 
                            className="flex items-center gap-1.5 h-full px-2 relative"
                        >
                            <span className="text-[14px] font-bold text-white uppercase tracking-wider group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                            <ChevronDown size={14} strokeWidth={3} className="text-white group-hover:rotate-180 transition-transform duration-300" />
                            
                            {/* LÍNEA AZUL INFERIOR */}
                            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                        </Link>
                        
                        {/* DROPDOWN ESTILO TARJETA 
                            Cambios: 
                            1. 'top-full' coloca el inicio justo al final de la barra (60px).
                            2. 'mt-[2px]' añade un respiro milimétrico para no pisar la línea azul.
                        */}
                        <div className="absolute top-full left-0 mt-[2px] w-[340px] bg-white rounded-2xl shadow-2xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 cursor-default">
                            
                            {/* Triangulito decorativo (Ajustado para no tapar la línea) */}
                            <div className="absolute -top-[6px] left-8 w-4 h-4 bg-white transform rotate-45 shadow-sm border-t border-l border-gray-100/50"></div>

                            {/* Lista de Tours */}
                            <div className="flex flex-col gap-4 relative z-10">
                                {item.subItems?.map((sub, i) => (
                                    <Link key={i} href={sub.href} className="flex items-start justify-between group/item gap-3">
                                        <span className="text-[15px] text-gray-700 font-medium group-hover/item:text-brand-orange transition-colors leading-tight">
                                            {sub.label}
                                        </span>
                                        {/* Badge Best Seller 
                                            Cambio: 'whitespace-nowrap' obliga a una sola línea.
                                            'shrink-0' evita que el badge se aplaste.
                                        */}
                                        {sub.badge && (
                                            <span className="whitespace-nowrap shrink-0 bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide h-fit">
                                                {sub.badge}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* BOTÓN EXPLORE ALL TOURS */}
                            <div className="mt-6 pt-2 relative z-10">
                                <Link 
                                    href={item.href} 
                                    className="block w-full bg-brand-yellow hover:bg-[#eeb63a] text-brand-dark text-center text-[13px] font-extrabold py-3 rounded-full uppercase tracking-wider transition-colors shadow-sm hover:shadow-md"
                                >
                                    Explore All Tours
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </nav>
        </Container>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[90px] bg-white z-40 overflow-y-auto">
            <div className="p-6 flex flex-col gap-2">
                {navItems.map((item, index) => (
                    <Link 
                        key={index} 
                        href={item.href} 
                        className="flex items-center justify-between text-[16px] font-semibold text-gray-800 py-3 border-b border-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.label}
                        <ChevronDown size={18} className="text-orange-500"/>
                    </Link>
                ))}
                
                {/* Links utilitarios en móvil */}
                <div className="mt-6 space-y-4">
                     <Link href="/book" className="block w-full bg-orange-500 text-white text-center py-3 rounded font-bold uppercase tracking-wider">
                        {t("links.book")}
                    </Link>
                    
                    <div className="flex flex-col gap-3 text-sm text-gray-600 font-medium">
                        <Link href="/about" className="py-2 border-b border-gray-50">{t("links.about")}</Link>
                        <Link href="/blog" className="py-2 border-b border-gray-50">{t("links.blog")}</Link>
                        <Link href="/contact" className="py-2 border-b border-gray-50">{t("links.contact")}</Link>
                    </div>

                    <div className="flex justify-center gap-8 pt-6">
                        <SocialLink href="#" icon="facebook" mobile />
                        <SocialLink href="#" icon="instagram" mobile />
                        <SocialLink href="#" icon="tiktok" mobile />
                        <SocialLink href="#" icon="whatsapp" mobile />
                    </div>
                </div>
            </div>
        </div>
      )}
    </header>
  );
}

// --- SUBCOMPONENTES ---

function SocialLink({ href, icon, mobile }: { href: string, icon: string, mobile?: boolean }) {
    // Versión Móvil
    if (mobile) {
        return (
             <a href={href} target="_blank" className="inline-block p-2">
                <SimpleIcon name={icon} className="w-7 h-7 text-gray-600" />
            </a>
        );
    }

    // Versión Desktop (1.25x más grande)
    return (
        <a 
            href={href} 
            target="_blank" 
            /* Cambios aquí: w-10 h-10 para el círculo más grande */
            className="w-10 h-10 flex items-center justify-center rounded-full text-black transition-all duration-300 hover:bg-brand-yellow hover:scale-105"
        >
            {/* Cambios aquí: w-[23px] para el ícono más grande */ }
            <SimpleIcon name={icon} className="w-[23px] h-[23px]" />
        </a>
    )
}

function SimpleIcon({ name, className }: { name: string, className?: string }) {
    if (name === 'tiktok') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"/></svg>;
    if (name === 'facebook') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647"/></svg>;
    if (name === 'instagram') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"/></svg>;
    if (name === 'tripadvisor') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43a5.98 5.98 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.97 5.97 0 0 0 4.072 1.598a6 6 0 0 0 6-5.998a5.98 5.98 0 0 0-1.957-4.432L24 6.648h-4.35a13.57 13.57 0 0 0-7.644-2.353M12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.7 11.7 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118a4.059 4.059 0 0 1 0-8.118m11.992.002a4.057 4.057 0 1 1 .003 8.115a4.057 4.057 0 0 1-.003-8.115m-11.992 1.93a2.128 2.128 0 0 0 0 4.256a2.128 2.128 0 0 0 0-4.256m11.992 0a2.128 2.128 0 0 0 0 4.256a2.128 2.128 0 0 0 0-4.256"/></svg>;
    if (name === 'whatsapp') return <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413"></path></svg>;
    return null;
}