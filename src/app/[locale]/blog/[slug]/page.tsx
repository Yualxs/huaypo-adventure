import BlogPostHero from "@/components/blog/BlogPostHero";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPreview from "@/components/home/BlogPreview"; 
import Partners from "@/components/home/Partners";
import Newsletter from "@/components/blog/Newsletter";

// --- DATOS CON IMÁGENES CORREGIDAS (URLs Seguras) ---
const POST_DATA = {
  title: "Animales de Machu Picchu: Conoce las Llamas, Alpacas y Vicuñas",
  date: "20 Ene, 2025",
  author: "Huaypo Adventure",
  readTime: 5,
  category: "Naturaleza",
  
  // Imagen Hero (Usamos la del Valle Rojo que sabemos que funciona en HD)
  image: "https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif",
  
  content: [
    '<p class="lead">Machu Picchu es un lugar que te deja sin aliento. Pero más allá de las ruinas, hay habitantes peludos que roban el corazón de todos.</p>',
    '<p>Una de las partes más encantadoras de visitar Machu Picchu es encontrarse con los amigables animales que viven allí. La región es hogar de tres especies andinas muy especiales: <strong>las llamas, las alpacas y las vicuñas</strong>.</p>',
    
    '<h2>Alpacas: Las Suaves y Sociales</h2>',
    '<p>Las alpacas son uno de los animales más queridos de los Andes. Se crían principalmente por su lana suave y lujosa.</p>',
    
    // Imagen 1: Usamos una imagen de Chinchero (paisaje con gente/textiles) que carga seguro
    '<img src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a2a2cc1bb92811c4471_Chinchero%20con%20Huaypo%20Adventure.avif" alt="Alpacas y Textiles en los Andes" />',
    
    '<p>Son más pequeñas que las llamas y tienen caras más redonditas con ojos grandes y curiosos. Su lana es gruesa y suave, ¡haciéndolas parecer nubes con patas!</p>',

    '<h2>Vicuñas: Elegancia Salvaje</h2>',
    '<p>Las vicuñas son las primas salvajes de las llamas y alpacas, y viven en las zonas más altas de los Andes. Su lana es considerada una de las más valiosas del mundo.</p>',
    
    // Imagen 2: Usamos la imagen del equipo (About) que tiene buen contraste
    '<img src="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b10d8487e0ffbcf167a004_Huaypo%20Adventure%20About%20Us.avif" alt="Fauna Andina" />',

    '<h2>Cómo Distinguirlas</h2>',
    '<ul>',
    '<li><strong>Tamaño:</strong> Las llamas son las más grandes y fuertes, usadas para carga.</li>',
    '<li><strong>Cara:</strong> Las alpacas tienen caras más cortas y llenas de lana, muy tiernas.</li>',
    '<li><strong>Lana:</strong> La fibra de vicuña es la más fina del mundo, reservada para la realeza Inca.</li>',
    '</ul>',
    
    '<p>En <strong>Huaypo Adventure</strong>, estamos comprometidos con la protección de estas especies. Nuestros tours están diseñados para tener el menor impacto posible.</p>'
  ].join("") 
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="bg-white">
      <BlogPostHero 
        title={POST_DATA.title}
        image={POST_DATA.image}
        date={POST_DATA.date}
        author={POST_DATA.author}
        readTime={POST_DATA.readTime}
        category={POST_DATA.category}
      />
      
      <BlogPostContent content={POST_DATA.content} />
      
      <div className="bg-gray-50">
        <Newsletter />
      </div>
      
      <div className="pt-10">
          <BlogPreview />
      </div>
      
      <Partners />
    </main>
  );
}