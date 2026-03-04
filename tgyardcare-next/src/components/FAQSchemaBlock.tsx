import { createClient } from "@supabase/supabase-js";

// Server component — fetches FAQ JSON-LD from page_seo.schema_data
// and injects it into the page <head> for structured data.
// Returns null if no schema exists for this path yet.
export default async function FAQSchemaBlock({ path }: { path: string }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data } = await supabase
      .from("page_seo")
      .select("schema_data")
      .eq("path", path)
      .single();

    const schema = (data as { schema_data: unknown } | null)?.schema_data;
    if (!schema) return null;

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  } catch {
    return null;
  }
}
