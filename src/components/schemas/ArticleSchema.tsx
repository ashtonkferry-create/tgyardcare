import { buildArticleSchema } from '@/lib/seo/schema-factory';

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function ArticleSchema(props: ArticleSchemaProps) {
  const schema = buildArticleSchema(props);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
