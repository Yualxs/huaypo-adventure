"use client";

import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    // CAMBIOS:
    // 1. 'top-32' (128px) para darle más aire respecto al Navbar (90px).
    // 2. 'z-40' para asegurar que esté por encima del overlay del Hero.
    <nav className="absolute top-32 left-0 w-full z-40 px-4 pointer-events-none">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10">
        <ol className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 pointer-events-auto shadow-lg">
          
          {/* Home */}
          <li className="inline-flex items-center">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              <Home size={14} />
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              <ChevronRight size={14} className="text-gray-400 mx-1" />
              {index === items.length - 1 ? (
                // Último ítem (Página actual)
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-wide">
                    {item.label}
                </span>
              ) : (
                // Enlaces intermedios
                <Link 
                    href={item.href} 
                    className="text-xs font-medium text-gray-200 hover:text-white transition-colors uppercase tracking-wide"
                >
                    {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}