import { buildReviewSchema } from '@/lib/seo/schema-factory';
import { TOP_REVIEWS } from '@/lib/seo/schema-constants';

export function ReviewPageSchema() {
  const schema = buildReviewSchema(TOP_REVIEWS);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
