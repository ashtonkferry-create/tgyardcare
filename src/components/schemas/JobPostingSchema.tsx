import { buildJobPostingSchema } from '@/lib/seo/schema-factory';

interface JobPostingSchemaProps {
  title: string;
  description: string;
  datePosted: string;
}

export function JobPostingSchema(props: JobPostingSchemaProps) {
  const schema = buildJobPostingSchema(props);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
