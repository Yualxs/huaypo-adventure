"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const t = useTranslations("BlogPost.meta");

  return (
    <section className="w-full bg-white py-16 lg:py-24 relative">
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* BARRA LATERAL (Sticky Share) */}
                <div className="hidden lg:block lg:col-span-2 h-full">
                    <div className="sticky top-32 flex flex-col items-center gap-5">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest vertical-lr mb-2" style={{ writingMode: 'vertical-lr' }}>
                            {t("share")}
                        </span>
                        <ShareButton icon={Facebook} color="hover:text-blue-600 hover:bg-blue-50" />
                        <ShareButton icon={Twitter} color="hover:text-sky-500 hover:bg-sky-50" />
                        <ShareButton icon={Linkedin} color="hover:text-blue-700 hover:bg-blue-50" />
                        <div className="w-8 h-px bg-gray-200 my-2"></div>
                        <ShareButton icon={LinkIcon} color="hover:text-brand-dark hover:bg-gray-100" />
                    </div>
                </div>

                {/* CONTENIDO DEL ARTÍCULO */}
                <div className="col-span-1 lg:col-span-8">
                    <article 
                        className="prose prose-lg prose-slate max-w-none 
                        
                        prose-headings:font-extrabold prose-headings:text-brand-dark prose-headings:tracking-tight
                        prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-balance
                        
                        prose-p:text-[18px] md:prose-p:text-[20px] prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:font-light
                        
                        prose-p:first-of-type:text-xl md:prose-p:first-of-type:text-2xl prose-p:first-of-type:text-gray-800 prose-p:first-of-type:font-medium
                        
                        prose-a:text-brand-blue prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        
                        prose-ul:my-10 prose-li:text-gray-600 prose-li:text-lg prose-li:marker:text-brand-yellow prose-li:pl-2
                        
                        prose-strong:text-brand-dark prose-strong:font-bold

                        [&_img]:w-full 
                        [&_img]:rounded-[2.5rem] 
                        [&_img]:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] 
                        [&_img]:my-16 
                        [&_img]:border [&_img]:border-gray-100
                        hover:[&_img]:scale-[1.01] [&_img]:transition-transform [&_img]:duration-500"
                        
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

            </div>
        </Container>
    </section>
  );
}

function ShareButton({ icon: Icon, color }: any) {
    return (
        <button className={`w-11 h-11 rounded-full border border-gray-100 bg-white flex items-center justify-center text-gray-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${color}`}>
            <Icon size={18} />
        </button>
    )
}