"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Play, Grid3X3, X, ChevronLeft, ChevronRight, Maximize2, Home, MapPin, ShieldCheck, Volume2, VolumeX, Pause } from "lucide-react";
import Container from "@/components/ui/Container";

interface TourHeaderGalleryProps {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  images: string[]; 
  videoId: string;
  breadcrumbItems: { label: string; href: string }[];
}

export default function TourHeaderGallery({ title, location, rating, reviews, images, videoId, breadcrumbItems }: TourHeaderGalleryProps) {
  const t = useTranslations("TourDetail.Hero");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Estados para el Control de Video Personalizado
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Bloquear scroll al abrir modales
  useEffect(() => {
    if (isLightboxOpen || isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isLightboxOpen, isVideoOpen]);

  // Función para enviar comandos al player de Vimeo
  const postMessageToVimeo = (action: string, value?: any) => {
    if (!iframeRef.current?.contentWindow) return;
    const data = { method: action, value: value };
    iframeRef.current.contentWindow.postMessage(JSON.stringify(data), '*');
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    postMessageToVimeo('setVolume', newMutedState ? 0 : 1);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    postMessageToVimeo(newPlayState ? 'play' : 'pause');
  };

  // Handlers de Galería de Imágenes
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="pt-[120px] lg:pt-[180px] pb-12 bg-white">
      <Container>
        
        {/* --- 1. HEADER --- */}
        <div className="mb-12 max-w-5xl mx-auto text-center md:text-left">
            <nav className="flex items-center justify-center md:justify-start gap-2 text-xs font-medium text-gray-500 mb-6 uppercase tracking-wider">
                <Link href="/" className="hover:text-brand-blue transition-colors"><Home size={14} /></Link>
                {breadcrumbItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <ChevronRight size={12} className="text-gray-300" />
                        {idx === breadcrumbItems.length - 1 ? (
                            <span className="text-brand-dark font-bold line-clamp-1">{item.label}</span>
                        ) : (
                            <Link href={item.href} className="hover:text-brand-blue transition-colors whitespace-nowrap">{item.label}</Link>
                        )}
                    </div>
                ))}
            </nav>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pale text-brand-blue border border-brand-blue/10">
                    <MapPin size={12} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{location}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-bronze border border-brand-yellow/20">
                    <ShieldCheck size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Huaypo Certified</span>
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-dark leading-[1.05] tracking-tight text-balance mb-6">
                {title}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="flex text-brand-yellow">
                    {[...Array(5)].map((_,i) => <StarIcon key={i} filled />)}
                </div>
                <span className="text-sm font-bold text-gray-600 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-brand-blue hover:decoration-brand-blue transition-all">
                    {reviews} {t("reviews")} verificadas
                </span>
            </div>
        </div>

        {/* --- 2. GRID MULTIMEDIA --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] w-full">
            
            {/* VIDEO REEL (Clic para abrir) */}
            <div 
                className="hidden md:block md:col-span-1 relative rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group cursor-pointer hover:-translate-y-1 transition-transform duration-500"
                onClick={() => { setIsVideoOpen(true); setIsPlaying(true); setIsMuted(false); }}
            >
                 <div className="absolute inset-0 bg-gray-900">
                     <iframe 
                        src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`} 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] h-[150%] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        allow="autoplay; fullscreen" 
                    ></iframe>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                <div className="absolute bottom-6 left-0 w-full flex flex-col items-center text-white">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-3 group-hover:scale-110 transition-transform group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-brand-dark">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Ver Video</span>
                </div>
            </div>

            {/* FOTO PRINCIPAL */}
            <div 
                className="col-span-1 md:col-span-2 relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                onClick={() => openLightbox(0)}
            >
                <Image 
                    src={images[0]} 
                    alt="Vista Principal" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" size={48} strokeWidth={1} />
                </div>
            </div>

            {/* FOTOS SECUNDARIAS */}
            <div className="hidden md:flex flex-col col-span-1 gap-4 h-full">
                <div className="relative flex-1 rounded-[2rem] overflow-hidden shadow-sm group cursor-pointer" onClick={() => openLightbox(1)}>
                    <Image src={images[1]} alt="Detalle 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="relative flex-1 rounded-[2rem] overflow-hidden shadow-sm group cursor-pointer" onClick={() => openLightbox(2)}>
                    <Image src={images[2]} alt="Detalle 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                         <div className="bg-white/20 backdrop-blur-lg border border-white/50 px-5 py-2.5 rounded-full flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wide hover:bg-white hover:text-brand-dark transition-all">
                            <Grid3X3 size={14} />
                            <span>{t("galleryBtn")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Container>

      {/* --- IMAGES LIGHTBOX --- */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
             <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
                <span className="text-white/70 text-sm font-medium tracking-wider">{currentImageIndex + 1} / {images.length}</span>
                <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors" onClick={() => setIsLightboxOpen(false)}>
                    <X size={24} />
                </button>
            </div>
            <div className="flex-grow relative flex items-center justify-center px-4 md:px-20">
                <button onClick={prevImage} className="absolute left-6 md:left-10 text-white/50 hover:text-white hover:scale-110 transition-all p-4 z-50"><ChevronLeft size={48} strokeWidth={1} /></button>
                <div className="relative w-full h-[75vh] max-w-7xl">
                    <Image src={images[currentImageIndex]} alt="Gallery Fullscreen" fill className="object-contain drop-shadow-2xl" />
                </div>
                <button onClick={nextImage} className="absolute right-6 md:right-10 text-white/50 hover:text-white hover:scale-110 transition-all p-4 z-50"><ChevronRight size={48} strokeWidth={1} /></button>
            </div>
            <div className="h-24 w-full bg-black/40 backdrop-blur-md border-t border-white/5 flex items-center justify-center gap-3 px-4 overflow-x-auto">
                {images.map((img, idx) => (
                    <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${currentImageIndex === idx ? "ring-2 ring-brand-yellow scale-110 opacity-100" : "opacity-50 hover:opacity-100"}`}>
                        <Image src={img} alt="thumb" fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* --- VIDEO LIGHTBOX PREMIUM (REEL STYLE) --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in zoom-in-95 duration-300">
            
            {/* 1. Backdrop con Blur y clic para cerrar */}
            <div 
                className="absolute inset-0 bg-brand-dark/80 backdrop-blur-3xl"
                onClick={() => setIsVideoOpen(false)}
            ></div>

            {/* 2. Contenedor del Video Vertical */}
            <div className="relative w-full max-w-[450px] aspect-[9/16] mx-4 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group">
                
                {/* Iframe limpio (Background=1 para quitar controles nativos feos) */}
                <iframe 
                    ref={iframeRef}
                    src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`} 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none" // pointer-events-none para que los clics vayan a nuestros controles
                    allow="autoplay; fullscreen"
                ></iframe>

                {/* 3. Overlay de Controles Personalizados (Estilo Instagram/TikTok) */}
                <div 
                    className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-b from-black/40 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={togglePlay} // Clic en la pantalla pausa/reproduce
                >
                    
                    {/* Top Bar */}
                    <div className="flex justify-end">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsVideoOpen(false); }}
                            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Center Play Icon (Solo si está pausado) */}
                    {!isPlaying && (
                        <div className="self-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white animate-in fade-in zoom-in">
                                <Play size={32} fill="currentColor" />
                             </div>
                        </div>
                    )}

                    {/* Bottom Controls */}
                    <div className="flex items-center justify-between">
                        <div className="text-white">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Huaypo Experience</p>
                            <p className="text-lg font-bold">{title}</p>
                        </div>
                        
                        {/* Botón Mute/Unmute */}
                        <button 
                            onClick={toggleMute}
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-dark transition-all"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                    </div>

                </div>
            </div>
        </div>
      )}
    </section>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="mr-0.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}