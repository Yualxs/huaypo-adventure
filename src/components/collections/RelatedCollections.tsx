"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export default function RelatedCollections() {
  // En el futuro con Sanity, pasarás "currentSlug" para excluir la categoría actual
  // y mostrarás categorías relacionadas reales.

  const related = [
    {
      title: "Salkantay Trek",
      subtitle: "La mejor alternativa al Camino Inca",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b8a7b0e0e207eec2be70_Salkantay%20Huaypo%20Adventure%2006.webp",
      link: "/salkantay-trek"
    },
    {
      title: "Montaña de Colores",
      subtitle: "Paisajes surreales en un día",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/683640899a1db199507e5d92_Palcoyo%20Huaypo%20Adventure%2003.webp",
      link: "/montana-de-colores"
    },
    {
      title: "Caminatas Alternas",
      subtitle: "Rutas sin multitudes",
      image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837b8ad4ca4b079efe91654_Salkantay%20Huaypo%20Adventure%2007.webp",
      link: "/caminatas-alternativas"
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <Container>
        <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tight">Explora otros destinos</h3>
            <Link href="/tours" className="text-sm font-bold text-brand-blue hover:underline">Ver todo</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item, idx) => (
                <Link key={idx} href={item.link} className="group relative h-64 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                    <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                            {item.title}
                            <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-brand-yellow" />
                        </h4>
                        <p className="text-xs text-gray-300 uppercase tracking-wider font-medium">{item.subtitle}</p>
                    </div>
                </Link>
            ))}
        </div>
      </Container>
    </section>
  );
}