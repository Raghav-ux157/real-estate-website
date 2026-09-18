import { getProperties } from "@/lib/data";
import { PropertyDetailClient } from "@/components/property/PropertyDetailClient";

export function generateStaticParams() {
  const properties = getProperties();
  return properties.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return <PropertyDetailClient id={params.id} />;
}
