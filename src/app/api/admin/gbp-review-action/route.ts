import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { replyToReview } from "@/lib/gbp/client";

interface ReviewActionBody {
  reviewId: string;
  action: "approve" | "reject";
}

interface ReviewRow {
  id: string;
  google_review_id: string | null;
  response_draft: string | null;
  response_status: string | null;
}

export async function POST(req: NextRequest) {
  // ---------------------------------------------------------------------------
  // 1. Validate admin JWT
  // ---------------------------------------------------------------------------
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: roleData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .single();
  if (!roleData) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ---------------------------------------------------------------------------
  // 2. Parse request body
  // ---------------------------------------------------------------------------
  const { reviewId, action } = (await req.json()) as ReviewActionBody;

  if (!reviewId || !action || !["approve", "reject"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid request. Provide reviewId and action (approve | reject)." },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // 3. Handle reject
  // ---------------------------------------------------------------------------
  if (action === "reject") {
    const { error: updateError } = await supabase
      .from("reviews")
      .update({ response_status: "rejected" })
      .eq("id", reviewId);

    if (updateError) {
      return NextResponse.json(
        { error: `Failed to reject review: ${updateError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, action: "rejected", reviewId });
  }

  // ---------------------------------------------------------------------------
  // 4. Handle approve — publish reply via GBP API
  // ---------------------------------------------------------------------------
  const { data: review, error: fetchError } = await supabase
    .from("reviews")
    .select("id, google_review_id, response_draft, response_status")
    .eq("id", reviewId)
    .single();

  if (fetchError || !review) {
    return NextResponse.json(
      { error: "Review not found" },
      { status: 404 }
    );
  }

  const typedReview = review as unknown as ReviewRow;

  if (!typedReview.response_draft) {
    return NextResponse.json(
      { error: "No response draft available for this review" },
      { status: 400 }
    );
  }

  if (!typedReview.google_review_id) {
    return NextResponse.json(
      { error: "No Google review ID associated with this review" },
      { status: 400 }
    );
  }

  const locationName = process.env.GBP_LOCATION_NAME;
  if (!locationName) {
    return NextResponse.json(
      { error: "GBP_LOCATION_NAME env var not configured" },
      { status: 500 }
    );
  }

  // Construct the full review resource name for the GBP API
  const reviewName = `${locationName}/reviews/${typedReview.google_review_id}`;

  try {
    await replyToReview(reviewName, typedReview.response_draft);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown GBP API error";
    return NextResponse.json(
      { error: `Failed to publish reply via GBP: ${message}` },
      { status: 502 }
    );
  }

  // Update the review record in the database
  const now = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("reviews")
    .update({
      response_status: "manually_published",
      auto_responded: false,
      response_published_at: now,
      responded_at: now,
    })
    .eq("id", reviewId);

  if (updateError) {
    // The reply was published to Google but DB update failed — log but still return success
    console.error("Reply published to GBP but DB update failed:", updateError.message);
    return NextResponse.json({
      success: true,
      action: "approved",
      reviewId,
      warning: "Reply published to Google but database update failed. Please update manually.",
    });
  }

  return NextResponse.json({ success: true, action: "approved", reviewId });
}
