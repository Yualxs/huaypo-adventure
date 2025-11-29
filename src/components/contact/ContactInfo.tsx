"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function ContactInfo() {
  const t = useTranslations("ContactPage.Intro");

  const contactItems = [
    {
      key: "address",
      icon: MapPin,
      title: t("address"),
      value: t("addressValue"),
      action: "Ver ubicación", // O t("viewMap")
      link: "https://goo.gl/maps/TuLinkDeGoogleMaps", 
      color: "text-brand-blue",
      bg: "bg-brand-blue/10",
      borderColor: "hover:border-brand-blue/30"
    },
    {
      key: "phone",
      icon: Phone,
      title: t("phone"),
      value: "+51 963 213 482",
      action: "Llamar ahora",
      link: "tel:+51963213482",
      color: "text-[#28a61b]", // Verde Whatsapp
      bg: "bg-[#28a61b]/10",
      borderColor: "hover:border-[#28a61b]/30"
    },
    {
      key: "email",
      icon: Mail,
      title: t("email"),
      value: "info@huaypoadventure.com",
      action: "Enviar mensaje",
      link: "mailto:info@huaypoadventure.com",
      color: "text-brand-yellow",
      bg: "bg-brand-yellow/10",
      borderColor: "hover:border-brand-yellow/50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      {contactItems.map((item, index) => (
        <a 
          key={index}
          href={item.link}
          target={item.key === 'address' ? '_blank' : '_self'}
          className={`group relative flex flex-col items-center text-center p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent ${item.borderColor}`}
        >
          {/* Icono con Halo */}
          <div className={`w-20 h-20 rounded-full ${item.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
            <item.icon size={36} className={`${item.color}`} />
          </div>
          
          {/* Título (Label) */}
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
            {item.title}
          </h3>
          
          {/* Valor Principal */}
          <p className="text-lg font-extrabold text-brand-dark leading-snug max-w-[250px] mx-auto">
            {item.value}
          </p>

          {/* Botón de Acción (Aparece/Se ilumina al hover) */}
          <div className={`mt-8 flex items-center gap-2 text-sm font-bold ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
            <span>{item.action}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </div>
        </a>
      ))}
    </div>
  );
}