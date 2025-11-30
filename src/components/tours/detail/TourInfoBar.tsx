"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Mountain, Users, Activity, CalendarClock } from "lucide-react";

interface InfoBarProps {
  difficulty: string;
  altitude: string;
  groupSize: number;
  activityType: string;
}

export default function TourInfoBar({ difficulty, altitude, groupSize, activityType }: InfoBarProps) {
  const t = useTranslations("TourDetail.Info");

  const items = [
    { label: t("difficulty"), value: difficulty, icon: Mountain },
    { label: t("altitude"), value: altitude, icon: Activity },
    { label: t("groupSize"), value: `Max ${groupSize}`, icon: Users },
    { label: t("activity"), value: activityType, icon: CalendarClock },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-[90px] z-30 shadow-sm hidden md:block">
      <Container>
        <div className="grid grid-cols-4 divide-x divide-gray-100 py-6">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 px-4 justify-center first:justify-start">
                    <div className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-blue shrink-0">
                        <item.icon size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-brand-dark font-bold leading-tight">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
      </Container>
    </div>
  );
}