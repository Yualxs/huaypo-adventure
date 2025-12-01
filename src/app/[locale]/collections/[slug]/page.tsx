import CollectionHero from "@/components/tours/CollectionHero";
import CollectionInsider from "@/components/collections/CollectionInsider"; // <--- NUEVO
import TourGrid from "@/components/collections/TourGrid";
import ExpertTips from "@/components/collections/ExpertTips";
import Partners from "@/components/home/Partners";
import ToursCTA from "@/components/tours/ToursCTA";
import IncaAvailability from "@/components/collections/IncaAvailability";
import CollectionGallery from "@/components/collections/CollectionGallery";
import RelatedCollections from "@/components/collections/RelatedCollections";

// --- BASE DE DATOS DE AUTORIDAD (Simulada) ---
const COLLECTION_DB: Record<string, any> = {
  "camino-inca": {
    title: "Camino Inca a Machu Picchu",
    subtitle: "La ruta de peregrinación más legendaria de Sudamérica.",
    image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837bab6b7dc3704c9ba6bc2_Camino%20Inca%20Huaypo%20Adventure%2004.webp",
    
    // SEO Content: Texto largo y estructurado
    description: `
      <p class="lead">El <strong>Camino Inca</strong> no es solo un trekking; es un viaje en el tiempo.</p>
      <p>Considerada una de las 5 mejores rutas de senderismo del mundo, esta red de caminos empedrados de 500 años de antigüedad conecta diversos pisos ecológicos, desde los Andes nevados hasta el bosque nuboso, revelando complejos arqueológicos exclusivos.</p>
      <h2>¿Por qué es tan especial?</h2>
      <p>A diferencia de otras rutas, el Camino Inca es el único que te permite ingresar a Machu Picchu a través del <strong>Inti Punku (Puerta del Sol)</strong>, brindándote una vista panorámica al amanecer que los viajeros en tren no pueden experimentar.</p>
      <h2>Permisos y Planificación</h2>
      <p>Debido a su estatus de Patrimonio de la Humanidad, el acceso está limitado a 500 personas por día (incluyendo guías y porteadores). <strong>Es crucial reservar con 6 meses de antelación</strong>, especialmente para la temporada alta (mayo a septiembre).</p>
    `,
    
    // Datos de Experto (Nuevo)
    stats: {
      difficultyLevel: 7, // Del 1 al 10
      difficultyLabel: "Desafiante",
      maxAltitude: "4,215 m.s.n.m",
      totalDistance: "43 km (26 millas)"
    },

    tours: [
      { id: 1, title: "Camino Inca Clásico 4D/3N", price: 780, image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/6837baa8b6b42925a135cfac_Camino%20Inca%20Huaypo%20Adventure%2003.webp", slug: "camino-inca-4d-3n", isBestSeller: true },
      { id: 2, title: "Camino Inca Corto 2D/1N", price: 510, image: "https://cdn.prod.website-files.com/67fc33cd1b7d14a179b6ad62/682fd3c1669955c97bc91db4_pexels-chelsea-cook-1520634-2929906.webp", slug: "camino-inca-2d-1n-hotel" },
    ],
    faqs: [
      { question: "¿Necesito reservar con mucha anticipación?", answer: "Sí, absolutamente. Los permisos se agotan 6-7 meses antes para fechas populares." },
      { question: "¿Qué pasa con el mal de altura?", answer: "El punto más alto es Warmiwañusca (4,215m). Recomendamos 2 días de aclimatación en Cusco." }
    ]
  }
};

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = COLLECTION_DB[slug] || COLLECTION_DB["camino-inca"];
  
  // LÓGICA DE CONDICIONALES
  // Detectamos si es una página relacionada con Camino Inca para mostrar componentes especiales
  const isIncaTrail = slug.includes("camino-inca") || slug.includes("inca-trail");

  return (
    <main className="bg-white">
      
      {/* 1. HERO CON BREADCRUMBS INTEGRADOS */}
      <CollectionHero 
        title={data.title}
        subtitle={data.subtitle}
        backgroundImage={data.image}
        eyebrow="Colección Oficial"
        // Pasamos los breadcrumbs aquí
        breadcrumbItems={[
            { label: "Tours", href: "/tours" },
            { label: data.title, href: `/collections/${slug}` }
        ]}
      />

      <CollectionInsider 
        description={data.description}
        stats={data.stats}
      />

      {/* --- BLOQUE EXCLUSIVO CAMINO INCA --- */}
      {isIncaTrail && (
        <>
            {/* 1. Calendario de Disponibilidad 2026 */}
            <IncaAvailability />
            
            {/* 2. Sección Multimedia (Inspiración Visual) */}
            {/* Reutilizamos TourGallery porque ya es Premium y tiene video vertical + fotos */}
            <div className="border-t border-gray-100">
                <CollectionGallery />
            </div>
        </>
      )}

      <TourGrid tours={data.tours} />

      <ExpertTips faqs={data.faqs} />
      
      {/* 6. ESTRATEGIA DE RETENCIÓN (Cross-Selling) */}
      {/* "Si Camino Inca no es para ti, mira estas alternativas similares" */}
      <div className="bg-gray-50 border-y border-gray-200">
          <RelatedCollections />
      </div>

      <ToursCTA />
      <Partners />
    </main>
  );
}