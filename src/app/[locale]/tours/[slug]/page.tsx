import { notFound } from "next/navigation";
import TourHero from "@/components/tours/detail/TourHero";
import TourInfoBar from "@/components/tours/detail/TourInfoBar";
import BookingCard from "@/components/tours/detail/BookingCard";
import Container from "@/components/ui/Container";
import Partners from "@/components/home/Partners";
import { MapPin, Clock, Utensils, Bed } from "lucide-react";

// --- DB SIMULADA (Tour Específico para la Demo) ---
const TOUR_DB: Record<string, any> = {
  "camino-inca-clasico-4-dias": {
    title: "Camino Inca Clásico a Machu Picchu 4 Días",
    price: 780,
    rating: 5.0,
    reviews: 124,
    duration: "4 Días / 3 Noches",
    location: "Cusco, Perú",
    difficulty: "Moderado - Difícil",
    altitude: "4,215 m.s.n.m",
    groupSize: 8,
    activityType: "Trekking & Historia",
    image: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/6837baa8b6b42925a135cfac_Camino%20Inca%20Huaypo%20Adventure%2003.webp",
    overview: "El Camino Inca es, sin duda, una de las caminatas más famosas y espectaculares del mundo. Esta ruta ancestral de 43 kilómetros combina impresionantes paisajes de montaña, bosques nubosos y una increíble variedad de sitios arqueológicos incas, culminando con la entrada triunfal a Machu Picchu a través del Inti Punku (Puerta del Sol).",
    itinerary: [
      { day: 1, title: "Cusco - Km 82 - Wayllabamba", desc: "Comenzamos nuestra aventura recogiéndote de tu hotel..." },
      { day: 2, title: "Wayllabamba - Warmiwañusca - Pacaymayo", desc: "El día más desafiante, ascendiendo al punto más alto..." },
      { day: 3, title: "Pacaymayo - Wiñay Wayna", desc: "El día más hermoso, cruzando el bosque nuboso..." },
      { day: 4, title: "Wiñay Wayna - Machu Picchu - Cusco", desc: "¡El gran día! Llegada a la Puerta del Sol..." }
    ]
  }
};

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Fallback para la demo: Si el slug no existe, mostramos el Camino Inca
  const tour = TOUR_DB[slug] || TOUR_DB["camino-inca-clasico-4-dias"];

  return (
    <main className="bg-white">
      
      {/* 1. Hero de Producto */}
      <TourHero 
        title={tour.title}
        image={tour.image}
        price={tour.price}
        rating={tour.rating}
        reviews={tour.reviews}
        duration={tour.duration}
        location={tour.location}
      />

      {/* 2. Barra Informativa (Sticky) */}
      <TourInfoBar 
        difficulty={tour.difficulty}
        altitude={tour.altitude}
        groupSize={tour.groupSize}
        activityType={tour.activityType}
      />

      {/* 3. Contenido Principal (2 Columnas) */}
      <section className="py-16 lg:py-24">
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                
                {/* COLUMNA IZQUIERDA: Detalles (2/3) */}
                <div className="lg:col-span-2 space-y-16">
                    
                    {/* Overview */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-brand-dark mb-6 uppercase tracking-wide">Resumen de la Experiencia</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            {tour.overview}
                        </p>
                    </div>

                    {/* Itinerario (Timeline Visual) */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-brand-dark mb-8 uppercase tracking-wide">Itinerario Día a Día</h2>
                        <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-100">
                            {tour.itinerary.map((day: any) => (
                                <div key={day.day} className="relative pl-16 group">
                                    {/* Bolita del Timeline */}
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-brand-yellow text-brand-dark font-bold flex items-center justify-center text-sm shadow-md z-10 group-hover:scale-110 transition-transform">
                                        {day.day}
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-[1.5rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                                        <h3 className="text-xl font-bold text-brand-dark mb-3">{day.title}</h3>
                                        <p className="text-gray-600 mb-4 leading-relaxed">{day.desc}</p>
                                        
                                        {/* Iconos de servicios del día */}
                                        <div className="flex gap-4 pt-4 border-t border-gray-200/50">
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                <Utensils size={14} className="text-brand-blue" />
                                                <span>Comidas Incluidas</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                <Bed size={14} className="text-brand-blue" />
                                                <span>Hotel / Campamento</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* COLUMNA DERECHA: Booking (1/3) */}
                <div className="lg:col-span-1">
                    <BookingCard price={tour.price} />
                </div>

            </div>
        </Container>
      </section>

      <Partners />
    </main>
  );
}