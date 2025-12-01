import PageHero from "@/components/ui/PageHero"; // Usamos el genérico o uno custom
import PartnerSegments from "@/components/partners/PartnerSegments";
import WhiteLabelFeature from "@/components/partners/WhiteLabelFeature";
import B2BForm from "@/components/partners/B2BForm";
import Partners from "@/components/home/Partners"; // Reutilizamos el carrusel de logos para dar confianza

export default function PartnersPage() {
  return (
    <main>
      <PageHero 
        title="Tu Socio Estratégico en Cusco"
        subtitle="Operaciones turísticas de clase mundial, ejecutadas bajo tu marca."
        backgroundImage="https://cdn.prod.website-files.com/67fc0e4b369534d2c5f2e0c3/68b11a291cba3fd347682ad9_Vista%20al%20Valle%20Rojo.avif" // Foto de trekking grupal profesional
      />
      <WhiteLabelFeature />
      <PartnerSegments />
      <B2BForm />
      <div className="py-12 bg-white">
        <div className="text-center mb-8">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Confían en nosotros</p>
        </div>
        <Partners />
      </div>
    </main>
  );
}