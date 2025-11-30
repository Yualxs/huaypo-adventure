"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Mountain, Users, Activity, CalendarClock, TrendingUp } from "lucide-react";

interface InfoBarProps {
  difficulty: string;
  altitude: string;
  groupSize: number;
  activityType: string;
}

export default function TourInfoBar({ difficulty, altitude, groupSize, activityType }: InfoBarProps) {
  const t = useTranslations("TourDetail.Info");

  const items = [
    { 
      label: t("difficulty"), 
      value: difficulty, 
      icon: TrendingUp,
      color: "text-brand-orange",
      bg: "bg-brand-orange/10"
    },
    { 
      label: t("altitude"), 
      value: altitude, 
      icon: Mountain, 
      color: "text-brand-blue",
      bg: "bg-brand-blue/10"
    },
    { 
      label: t("groupSize"), 
      value: `Max ${groupSize}`, 
      icon: Users, 
      color: "text-brand-green",
      bg: "bg-brand-green/10"
    },
    { 
      label: t("activity"), 
      value: activityType, 
      icon: CalendarClock, 
      color: "text-brand-yellow",
      bg: "bg-brand-yellow/10"
    },
  ];

  return (
    // Ajustamos el margen negativo para que "monte" un poco sobre la sección anterior o quede pegado visualmente
    <div className="relative z-20 w-full -mt-8 pb-12">
      <Container>
        
        {/* TARJETA CÁPSULA PREMIUM */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 p-4 md:p-6">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-gray-100">
                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-4 text-center group hover:bg-gray-50/50 rounded-xl transition-colors">
                        
                        {/* Icono con Halo de Color */}
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon size={22} strokeWidth={2} />
                        </div>
                        
                        {/* Textos */}
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                {item.label}
                            </p>
                            <p className="text-sm md:text-base font-extrabold text-brand-dark leading-tight">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </Container>
    </div>
  );
}