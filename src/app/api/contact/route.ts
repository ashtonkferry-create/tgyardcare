import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contactFormSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Validate with Zod (uses .issues in v4, .errors in v3)
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const issues: Array<{ message: string }> | undefined =
        (result.error as any).issues ?? (result.error as any).errors;
      const message = issues?.[0]?.message ?? 'Validation failed';
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const data = result.data;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('[contact] Missing Supabase env vars');
      return NextResponse.json({ success: true });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const nameParts = data.name.trim().split(/\s+/);
    const firstName = nameParts[0] ?? data.name;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // 1. Save to leads table (for lead scoring, n8n workflows, pipeline)
    const { error: dbError } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName || null,
      email: data.email,
      phone: data.phone,
      address: data.address,
      notes: data.message,
      status: 'new',
      referral_source: 'contact_form',
      lead_score: 60,
    });

    if (dbError) {
      console.error('[contact] DB insert error:', dbError.message);
    }

    // 2. Call edge function to send confirmation + owner notification emails
    try {
      const { error: fnError } = await supabase.functions.invoke('contact-form', {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          message: data.message,
        },
      });

      if (fnError) {
        console.error('[contact] Edge function error:', fnError.message);
      }
    } catch (emailErr) {
      console.error('[contact] Email sending error:', emailErr);
      // Don't block user — lead is already saved
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Unhandled error:', err);
    return NextResponse.json({ error: 'Failed to submit form. Please try again.' }, { status: 500 });
  }
}
