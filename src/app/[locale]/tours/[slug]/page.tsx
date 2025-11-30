import { notFound } from "next/navigation";
import TourHeaderGallery from "@/components/tours/detail/TourHeaderGallery";
import TourInfoBar from "@/components/tours/detail/TourInfoBar";
import BookingCard from "@/components/tours/detail/BookingCard";
import TourOverview from "@/components/tours/detail/TourOverview"; 
import TourTabs from "@/components/tours/detail/TourTabs"; 
import TourMap from "@/components/tours/detail/TourMap";
import Container from "@/components/ui/Container";
import Partners from "@/components/home/Partners";
import Reviews from "@/components/home/Reviews";
import TourSchema from "@/components/tours/detail/TourSchema";
import MobileBookingBar from "@/components/tours/detail/MobileBookingBar";
import PopularTours from "@/components/home/PopularTours";

// --- DB SIMULADA EXTENDIDA ---
const TOUR_DB: Record<string, any> = {
  "camino-inca-clasico-4-dias": {
    title: "Camino Inca Clásico a Machu Picchu 4 Días",
    price: 780,
    rating: 5.0,
    reviews: 124,
    location: "Cusco, Perú",
    videoId: "1141740496",
    images: [
        "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837bab6b7dc3704c9ba6bc2_Camino%20Inca%20Huaypo%20Adventure%2004.webp",
        "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp",
        "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baaf8bf6a5749e50436e_Camino%20Inca%20Huaypo%20Adventure%2007.webp"
    ],
    stats: {
        difficulty: "Difícil",
        altitude: "4,215 m",
        groupSize: 16,
        activityType: "Caminata"
    },
    elevationData: {
        maxAltitude: 4215,
        minAltitude: 2400,
        totalDistance: "43 km",
        difficulty: "Nivel 4/5"
    },
    description: `
      <p>En este viaje de 4 días experimentarás una de las rutas legendarias del imperio inca. Durante el trayecto disfrutarás de una ruta única en la que descubriremos flora y fauna, lugares mágicos como la ciudad Inca de <strong>Llactapata</strong>, el valle de Pacaymayo o los complejos de Sayacmarca.</p>
      <p>El último día pasaremos por un bosque único accediendo a Machu Picchu por la <strong>Puerta del Sol</strong>, donde disfrutaremos de un mágico amanecer.</p>
    `,
    places: [
      { name: "Cusco", image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp" },
      { name: "Piskacuchu", image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp" },
      { name: "Llactapata", image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp" },
      { name: "Warmiwañusca", image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp" }, 
      { name: "Wiñay Wayna", image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp" },
      { name: "Machu Picchu", image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baad74043325a288d53c_Camino%20Inca%20Huaypo%20Adventure%2002.webp" }
    ],
    season: "Marzo a Enero (Cerrado en Febrero)",
    
    inclusions: [
      "Charla informativa previa al tour",
      "Recojo del hotel y transporte privado",
      "Guía profesional bilingüe",
      "Cocinero y porteadores",
      "Equipo de camping (Carpa 4 estaciones)",
      "Alimentación (3D, 3A, 3C)",
      "Boleto de ingreso a Camino Inca",
      "Tren de retorno Vistadome/Expedition"
    ],
    exclusions: [
      "Primer desayuno y último almuerzo",
      "Bolsa de dormir (Alquiler disponible)",
      "Bastones de trekking",
      "Seguro de viaje",
      "Propinas"
    ],
    packingList: [
      "Pasaporte original",
      "Mochila pequeña (20-30L)",
      "Ropa para lluvia (Poncho)",
      "Zapatos de trekking resistentes",
      "Repelente de insectos",
      "Protector solar y sombrero",
      "Linterna frontal"
    ],
    prices: { 
        groupPrice: 780,
        privatePrices: [1500, 1200, 1000, 900, 850, 820, 800, 790, 780, 780, 780, 780, 780, 780, 780, 780]
    },
    faqs: [
      { question: "¿Necesito reservar con anticipación?", answer: "Sí, los permisos se agotan 6 meses antes." },
      { question: "¿Hay baños en la ruta?", answer: "Sí, en los campamentos hay servicios básicos." }
    ],
    itinerary: [
      { 
        day: 1, 
        title: "Cusco - Km 82 - Hatunchaca - Ayapata", 
        description: "<p>Nuestra aventura empezará a las 04:30 am...</p>",
        stats: { distance: "14 km", meals: "A/C", accommodation: "Campamento Ayapata" }
      },
      { 
        day: 2, 
        title: "Ayapata - Warmiwañusca - Pacaymayo", 
        description: "<p>El día más desafiante ascendiendo a 4200m...</p>",
        stats: { distance: "16 km", meals: "D/A/C", accommodation: "Campamento Chaquicocha" }
      }
    ]
  }
};

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = TOUR_DB[slug] || TOUR_DB["camino-inca-clasico-4-dias"];
  const plainDescription = tour.description.replace(/<[^>]*>?/gm, ''); // Corregido a tour.description

  return (
    <main className="bg-white relative">
      
      {/* 1. INYECCIÓN SEO (Invisible) */}
      <TourSchema 
        tour={{
            ...tour,
            description: plainDescription
        }} 
      />

      {/* 2. CRO MÓVIL (Barra Flotante) */}
      <MobileBookingBar price={tour.price} />

      {/* 3. HERO & HEADER */}
      <TourHeaderGallery 
        title={tour.title}
        location={tour.location}
        rating={tour.rating}
        reviews={tour.reviews}
        images={tour.images}
        videoId={tour.videoId}
        breadcrumbItems={[
            { label: "Tours", href: "/tours" },
            { label: "Camino Inca", href: "/collections/camino-inca" },
            { label: tour.title, href: "#" }
        ]}
      />

      <TourInfoBar 
        difficulty={tour.stats.difficulty}
        altitude={tour.stats.altitude}
        groupSize={tour.stats.groupSize}
        activityType={tour.stats.activityType}
      />

      {/* 4. CONTENIDO PRINCIPAL */}
      <section className="py-12 lg:py-20 bg-[#fafaf9]">
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
                
                {/* --- COLUMNA IZQUIERDA (Contenido Rico) --- */}
                <div className="lg:col-span-2">
                    
                    {/* Intro & Quick Facts */}
                    <TourOverview 
                      description={tour.description}
                      places={tour.places}
                      season={tour.season}
                      elevationData={tour.elevationData} 
                    />

                    {/* Sistema de Pestañas (Itinerario, Incluye, etc) */}
                    <TourTabs 
                        itinerary={tour.itinerary}
                        inclusions={tour.inclusions}
                        exclusions={tour.exclusions}
                        packingList={tour.packingList}
                        prices={tour.prices}
                        faqs={tour.faqs}
                    />

                    {/* Mapa */}
                    <div className="mt-12">
                        <TourMap />
                    </div>

                </div>

                {/* --- COLUMNA DERECHA (Booking Sticky) --- */}
                <div className="lg:col-span-1 hidden lg:block relative">
                    <div className="sticky top-32">
                        {/* Pasa el array de precios privados del objeto TOUR_DB */}
                        <BookingCard 
                            price={tour.price} 
                            privatePrices={tour.prices.privatePrices}
                            tourTitle={tour.title}
                        />
                    </div>
                </div>

            </div>
        </Container>
      </section>

      {/* 5. RETENCIÓN (Tours Relacionados) */}
      <div className="bg-white border-t border-gray-100 pt-16 pb-8">
          <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-brand-dark uppercase">Podría interesarte también</h3>
          </div>
          <PopularTours /> 
      </div>
      
      <Reviews />
      <Partners />
    </main>
  );
}