"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import { 
  CheckCircle2, Calendar, Users, MapPin, Download, 
  MessageCircle, Mail, ArrowRight, Instagram, Facebook 
} from "lucide-react";
import Image from "next/image";

export default function ThankYouContent() {
  const t = useTranslations("ThankYouPage");
  const locale = useLocale();
  const searchParams = useSearchParams();

  // Recuperar datos de la URL
  const bookingId = searchParams.get("bookingId") || "TPE-PENDING";
  const tourName = searchParams.get("tour") || "Experiencia Huaypo";
  const date = searchParams.get("date") || new Date().toISOString();
  const name = searchParams.get("name") || "Viajero";
  
  // Lógica de Mercado
  const isLatamMarket = locale === 'es' || locale === 'pt';

  return (
    // CAMBIO APLICADO: Aumentamos pt-32 -> pt-40 (móvil) y añadimos lg:pt-56 (desktop)
    // Esto garantiza que el Navbar nunca tape el contenido y da una entrada "Teatral".
    <section className="min-h-screen bg-[#f8fafc] pt-40 lg:pt-56 pb-20 relative overflow-hidden">
      
      {/* Decoración de Fondo (Confeti sutil) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-brand-dark rounded-b-[3rem] -z-10 overflow-hidden">
        <Image 
            src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/6830e1706428c5138d6b3601_Galeria%20Huaypo%20Adventure%2011.webp"
            alt="Celebration"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/90"></div>
      </div>

      <Container size="medium">
        
        {/* --- TARJETA PRINCIPAL (El Ticket Dorado) --- */}
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden relative animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Barra de Estado */}
            <div className="bg-green-500 h-3 w-full"></div>

            <div className="p-8 md:p-16 text-center">
                
                {/* Icono de Éxito Animado */}
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow shadow-lg shadow-green-500/20">
                    <CheckCircle2 size={48} className="text-green-600" strokeWidth={2.5} />
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-brand-dark mb-4 tracking-tight">
                    {t("title")}, {name}!
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                    {t("subtitle")} <span className="font-bold text-brand-dark">{bookingId}</span>.
                </p>

                {/* --- GRID DE DETALLES (Resumen Visual) --- */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    
                    {/* Tour */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-gray-400 uppercase text-xs font-bold tracking-widest">
                            <MapPin size={14} />
                            {t("details.tour")}
                        </div>
                        <p className="text-lg font-black text-brand-dark leading-tight">{tourName}</p>
                    </div>

                    {/* Fecha */}
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-2 text-gray-400 uppercase text-xs font-bold tracking-widest">
                            <Calendar size={14} />
                            {t("details.date")}
                        </div>
                        <p className="text-lg font-black text-brand-dark">{new Date(date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>

                    {/* Estado */}
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                        <div className="flex items-center gap-3 mb-2 text-green-600 uppercase text-xs font-bold tracking-widest">
                            <CheckCircle2 size={14} />
                            {t("details.status")}
                        </div>
                        <p className="text-lg font-black text-green-700">{t("details.confirmed")}</p>
                    </div>
                </div>

                {/* --- NEXT STEPS --- */}
                <div className="mt-12 pt-12 border-t border-gray-100">
                    <h3 className="text-xl font-bold text-brand-dark mb-6">{t("nextSteps.title")}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        
                        {/* ACCIÓN PRINCIPAL (Dinámica) */}
                        {isLatamMarket ? (
                            // Opción LATAM: WhatsApp
                            <a 
                                href={`https://wa.me/+51903102547?text=Hola,%20acabo%20de%20reservar%20${tourName}%20(ID:%20${bookingId}).%20¿Cuáles%20son%20los%20siguientes%20pasos?`}
                                target="_blank"
                                className="group bg-[#25D366] hover:bg-[#20b85c] text-white p-1 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="bg-white/10 border border-white/20 h-full rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                                    <MessageCircle size={32} />
                                    <div>
                                        <p className="font-black text-lg uppercase tracking-wide">Coordinar por WhatsApp</p>
                                        <p className="text-xs opacity-90 font-medium">Habla con tu asesor personal ahora</p>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            // Opción ANGLO: Email
                            <div className="bg-brand-blue text-white p-1 rounded-2xl shadow-lg">
                                <div className="bg-white/10 border border-white/20 h-full rounded-xl p-6 flex flex-col items-center justify-center gap-3">
                                    <Mail size={32} />
                                    <div>
                                        <p className="font-black text-lg uppercase tracking-wide">Check Your Email</p>
                                        <p className="text-xs opacity-90 font-medium">We sent you the voucher & itinerary</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ACCIÓN SECUNDARIA: Descargable */}
                        <Link 
                            href="/blog/packing-list-camino-inca" 
                            className="bg-gray-50 hover:bg-gray-100 text-brand-dark p-6 rounded-2xl border border-gray-200 transition-all flex flex-col items-center justify-center gap-3 group"
                        >
                            <Download size={32} className="text-brand-yellow group-hover:scale-110 transition-transform" />
                            <div>
                                <p className="font-bold text-lg">Guía de Equipaje PDF</p>
                                <p className="text-xs text-gray-500">Prepárate como un experto</p>
                            </div>
                        </Link>

                    </div>
                </div>

            </div>
            
            {/* Footer de la Tarjeta */}
            <div className="bg-brand-pale py-6 px-8 text-center border-t border-brand-blue/10 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm font-medium text-brand-blue/80">
                <span>{t("social.text")}</span>
                <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-brand-dark transition-colors"><Instagram size={16}/></a>
                    <a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-brand-dark transition-colors"><Facebook size={16}/></a>
                </div>
            </div>

        </div>

        {/* Botón Volver */}
        <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-brand-dark font-bold hover:text-brand-blue transition-colors border-b-2 border-transparent hover:border-brand-blue pb-0.5">
                {t("backHome")} <ArrowRight size={16} />
            </Link>
        </div>

      </Container>
    </section>
  );
}