"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Mountain, Calendar, BarChart, Ticket } from "lucide-react";

interface CollectionIntroProps {
  description: string; // HTML string
  stats: {
    difficulty: string;
    season: string;
    altitude: string;
    permitReq: string;
  };
}

export default function CollectionIntro({ description, stats }: CollectionIntroProps) {
  const t = useTranslations("CollectionPage.Intro");

  const statItems = [
    { label: t("difficulty"), value: stats.difficulty, icon: BarChart },
    { label: t("season"), value: stats.season, icon: Calendar },
    { label: t("altitude"), value: stats.altitude, icon: Mountain },
    { label: t("permit"), value: stats.permitReq, icon: Ticket },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <Container size="medium">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* COLUMNA 1: Texto SEO (2/3) */}
            <div className="lg:col-span-2">
                <div 
                    className="prose prose-lg prose-slate text-gray-600 font-light leading-relaxed text-pretty
                    prose-strong:text-brand-dark prose-strong:font-bold prose-a:text-brand-blue"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>

            {/* COLUMNA 2: Datos Rápidos (Sticky Card) (1/3) */}
            <div className="lg:col-span-1">
                <div className="bg-brand-pale rounded-[2rem] p-8 border border-brand-blue/10 sticky top-32">
                    <h3 className="text-sm font-bold text-brand-blue uppercase tracking-widest mb-6 border-b border-brand-blue/10 pb-4">
                        {t("title")}
                    </h3>
                    
                    <div className="space-y-6">
                        {statItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark shadow-sm shrink-0">
                                    <item.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">{item.label}</p>
                                    <p className="text-brand-dark font-medium leading-tight">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </Container>
    </section>
  );
}