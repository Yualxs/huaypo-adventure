"use client";

import { useTranslations } from "next-intl";
import { User, Mail, Phone, Globe, MessageSquare, Send } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("ContactPage.Form");

  return (
    <div className="relative">
        
        {/* Elemento Decorativo de Fondo (Blob) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-pale/50 rounded-[4rem] -z-10 blur-3xl"></div>

        <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 lg:p-16 relative overflow-hidden max-w-5xl mx-auto">
            
            {/* Barra Decorativa Superior */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue to-brand-green"></div>

            <div className="text-center mb-10">
                <h3 className="text-2xl font-extrabold text-brand-dark uppercase tracking-wide">
                    Envíanos un mensaje
                </h3>
                <p className="text-gray-500 font-light mt-2">
                    Responderemos a tu consulta en menos de 24 horas.
                </p>
            </div>

            <form className="space-y-8">
                {/* Grid de Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup icon={User} placeholder={t("name")} type="text" required />
                    <InputGroup icon={Mail} placeholder={t("email")} type="email" required />
                    <InputGroup icon={Phone} placeholder={t("phone")} type="tel" />
                    <InputGroup icon={Globe} placeholder={t("country")} type="text" />
                </div>

                {/* Área de Texto */}
                <div className="relative group">
                    <div className="absolute left-5 top-6 text-gray-400 group-focus-within:text-brand-blue transition-colors pointer-events-none">
                        <MessageSquare size={20} />
                    </div>
                    <textarea 
                        rows={6}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-2xl pl-14 pr-5 py-5 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all resize-none placeholder:text-gray-400"
                        placeholder={t("message")}
                        required
                    ></textarea>
                </div>

                {/* Footer del Formulario */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue cursor-pointer accent-brand-blue" 
                            required 
                        />
                        <span className="text-sm text-gray-500 group-hover:text-brand-dark transition-colors">
                            {t("terms")}
                        </span>
                    </label>

                    <button 
                        type="submit" 
                        className="w-full md:w-auto px-12 py-4 bg-brand-dark text-white font-black uppercase tracking-widest rounded-full hover:bg-brand-blue hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                    >
                        {t("submit")}
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

// Subcomponente de Input (Idéntico al de PlanForm para coherencia)
function InputGroup({ icon: Icon, ...props }: any) {
    return (
        <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors pointer-events-none">
                <Icon size={20} />
            </div>
            <input 
                {...props}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-2xl pl-14 pr-5 py-4 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue transition-all placeholder:text-gray-400 h-14"
            />
        </div>
    )
}