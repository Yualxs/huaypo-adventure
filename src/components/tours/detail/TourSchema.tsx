import Script from "next/script";

interface TourSchemaProps {
  tour: {
    title: string;
    description: string; // Texto plano idealmente
    image: string;
    price: number;
    rating: number;
    reviews: number;
    location: string;
  };
}

export default function TourSchema({ tour }: TourSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product", // O 'Tour' si usas tipos específicos de turismo
    "name": tour.title,
    "image": [tour.image],
    "description": tour.description.substring(0, 160), // Meta description
    "brand": {
      "@type": "Brand",
      "name": "Huaypo Adventure"
    },
    "offers": {
      "@type": "Offer",
      "url": typeof window !== 'undefined' ? window.location.href : "",
      "priceCurrency": "USD",
      "price": tour.price,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": tour.rating,
      "reviewCount": tour.reviews
    }
  };

  return (
    <Script
      id="tour-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}