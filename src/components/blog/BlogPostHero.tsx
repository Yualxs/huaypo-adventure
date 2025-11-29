"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Clock, Calendar, User } from "lucide-react";

interface BlogPostHeroProps {
  title: string;
  image: string;
  date: string;
  author: string;
  readTime: number;
  category: string;
}

export default function BlogPostHero({ title, image, date, author, readTime, category }: BlogPostHeroProps) {
  const t = useTranslations("BlogPost.meta");

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-48 lg:pb-24 bg-brand-pale">
        <Container size="medium">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                
                {/* Categoría */}
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest mb-6">
                    {category}
                </span>

                {/* Título */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark mb-8 leading-[1.1] text-balance">
                    {title}
                </h1>

                {/* Meta Datos */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium mb-12">
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-brand-yellow" />
                        <span>{t("author")} <strong className="text-brand-dark">{author}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-brand-yellow" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-brand-yellow" />
                        <span>{readTime} {t("readTime")}</span>
                    </div>
                </div>

            </div>
        </Container>

        {/* Imagen Principal (Hero Image) */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image 
                    src={image} 
                    alt={title} 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    </section>
  );
}