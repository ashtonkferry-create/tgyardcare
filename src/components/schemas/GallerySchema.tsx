import { buildGallerySchema } from '@/lib/seo/schema-factory';

interface GalleryImage {
  url: string;
  caption: string;
}

interface GallerySchemaProps {
  images: GalleryImage[];
}

export function GallerySchema({ images }: GallerySchemaProps) {
  const schema = buildGallerySchema(images);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
