import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

interface DefaultMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
}

// Fetches AI-generated meta description from page_seo table.
// Falls back to hardcoded default if no DB override exists.
export async function getPageMetadata(path: string, defaults: DefaultMeta): Promise<Metadata> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { data } = await supabase
      .from("page_seo")
      .select("suggested_meta_description")
      .eq("path", path)
      .single();

    const description =
      (data as { suggested_meta_description: string | null } | null)
        ?.suggested_meta_description ?? defaults.description;

    return {
      title: defaults.title,
      description,
      keywords: defaults.keywords,
      alternates: { canonical: defaults.canonical },
    };
  } catch {
    return {
      title: defaults.title,
      description: defaults.description,
      keywords: defaults.keywords,
      alternates: { canonical: defaults.canonical },
    };
  }
}
