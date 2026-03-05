'use client';

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  MessageSquare,
  BarChart3,
  Send,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Play,
  Loader2,
  AlertTriangle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ReviewRow {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  response_draft: string | null;
  response_status: string;
  auto_responded: boolean;
  created_at: string;
  google_review_id: string | null;
}

interface PostRow {
  id: string;
  content: string;
  post_type: string;
  status: string;
  published_at: string | null;
  created_at: string;
  service_slug: string | null;
}

interface QuickStats {
  totalReviews: number;
  avgRating: number;
  responseRate: number;
  postsThisMonth: number;
  removalRate: number;
}

type CronKey = "review-responder" | "gbp-post-publisher" | "review-faq-miner" | "gbp-audit";

const CRON_BUTTONS: { key: CronKey; label: string; path: string; icon: React.ReactNode }[] = [
  { key: "review-responder", label: "Review Responder", path: "/api/cron/review-responder", icon: <MessageSquare className="h-4 w-4" /> },
  { key: "gbp-post-publisher", label: "Post Publisher", path: "/api/cron/gbp-post-publisher", icon: <Send className="h-4 w-4" /> },
  { key: "review-faq-miner", label: "FAQ Miner", path: "/api/cron/review-faq-miner", icon: <FileText className="h-4 w-4" /> },
  { key: "gbp-audit", label: "GBP Audit", path: "/api/cron/gbp-audit", icon: <BarChart3 className="h-4 w-4" /> },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncate(text: string | null | undefined, max: number): string {
  if (!text) return "—";
  return text.length > max ? text.slice(0, max) + "..." : text;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ratingColor(r: number): string {
  if (r >= 4) return "bg-green-600 text-white";
  if (r >= 3) return "bg-yellow-600 text-white";
  return "bg-red-600 text-white";
}

function statusVariant(status: string): string {
  switch (status) {
    case "auto_published":
    case "published":
      return "bg-green-600/20 text-green-400 border-green-600/30";
    case "needs_review":
    case "draft":
      return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30";
    case "rejected":
    case "removed":
      return "bg-red-600/20 text-red-400 border-red-600/30";
    default:
      return "bg-gray-600/20 text-gray-400 border-gray-600/30";
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LocalGBPPanel() {
  const supabase = createClient();

  const [stats, setStats] = useState<QuickStats>({
    totalReviews: 0,
    avgRating: 0,
    responseRate: 0,
    postsThisMonth: 0,
    removalRate: 0,
  });
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [cronLoading, setCronLoading] = useState<Record<CronKey, boolean>>({
    "review-responder": false,
    "gbp-post-publisher": false,
    "review-faq-miner": false,
    "gbp-audit": false,
  });
  const [cronResult, setCronResult] = useState<Record<CronKey, { ok: boolean; msg: string } | null>>({
    "review-responder": null,
    "gbp-post-publisher": null,
    "review-faq-miner": null,
    "gbp-audit": null,
  });

  // ---- Data fetching ----

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setReviews(data as unknown as ReviewRow[]);
    return data as unknown as ReviewRow[] | null;
  }, [supabase]);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("gbp_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setPosts(data as unknown as PostRow[]);
    return data as unknown as PostRow[] | null;
  }, [supabase]);

  const fetchStats = useCallback(async (reviewRows: ReviewRow[] | null, postRows: PostRow[] | null) => {
    // Reviews stats
    const { count: totalReviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true });

    const { data: ratingData } = await supabase
      .from("reviews")
      .select("rating");
    const ratings = (ratingData as unknown as { rating: number }[]) ?? [];
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;

    const { count: respondedCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .not("responded_at", "is", null);

    const total = totalReviews ?? 0;
    const responseRate = total > 0 ? ((respondedCount ?? 0) / total) * 100 : 0;

    // Posts stats
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const { count: postsThisMonth } = await supabase
      .from("gbp_posts")
      .select("*", { count: "exact", head: true })
      .gte("created_at", firstOfMonth);

    const { count: totalPosts } = await supabase
      .from("gbp_posts")
      .select("*", { count: "exact", head: true });
    const { count: removedPosts } = await supabase
      .from("gbp_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "removed");
    const removalRate =
      (totalPosts ?? 0) > 0 ? ((removedPosts ?? 0) / (totalPosts ?? 1)) * 100 : 0;

    setStats({
      totalReviews: total,
      avgRating: Math.round(avgRating * 10) / 10,
      responseRate: Math.round(responseRate),
      postsThisMonth: postsThisMonth ?? 0,
      removalRate: Math.round(removalRate),
    });
  }, [supabase]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [reviewRows, postRows] = await Promise.all([fetchReviews(), fetchPosts()]);
    await fetchStats(reviewRows, postRows);
    setLoading(false);
  }, [fetchReviews, fetchPosts, fetchStats]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ---- Review actions ----

  async function handleReviewAction(reviewId: string, action: "approve" | "reject") {
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    if (!token) {
      alert("Not authenticated. Please log in again.");
      return;
    }

    try {
      const res = await fetch("/api/admin/gbp-review-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewId, action }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(`Action failed: ${err.error ?? res.statusText}`);
      }
    } catch (e) {
      alert("Network error");
    }
    // Refetch
    await fetchReviews();
  }

  // ---- Run cron ----

  async function runCron(key: CronKey, path: string) {
    setCronLoading((prev) => ({ ...prev, [key]: true }));
    setCronResult((prev) => ({ ...prev, [key]: null }));

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData?.session?.access_token;
    if (!token) {
      setCronLoading((prev) => ({ ...prev, [key]: false }));
      setCronResult((prev) => ({ ...prev, [key]: { ok: false, msg: "Not authenticated" } }));
      return;
    }

    try {
      const res = await fetch("/api/admin/run-cron", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ path }),
      });
      const body = await res.json();
      setCronResult((prev) => ({
        ...prev,
        [key]: { ok: res.ok, msg: res.ok ? "Completed successfully" : (body.error ?? "Failed") },
      }));
    } catch {
      setCronResult((prev) => ({ ...prev, [key]: { ok: false, msg: "Network error" } }));
    }

    setCronLoading((prev) => ({ ...prev, [key]: false }));
  }

  // ---- Render ----

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Local / Google Business Profile</h2>
          <p className="text-muted-foreground">
            Live review feed, post calendar, and GBP automation controls.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchAll} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 1. Quick Stats Strip                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Star className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-xl font-bold">{loading ? "..." : stats.totalReviews}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Star className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-xl font-bold">{loading ? "..." : stats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-xl font-bold">{loading ? "..." : `${stats.responseRate}%`}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Send className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Posts This Month</p>
                <p className="text-xl font-bold">{loading ? "..." : stats.postsThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Removal Rate</p>
                <p className="text-xl font-bold">{loading ? "..." : `${stats.removalRate}%`}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. Review Feed                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Recent Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p>No reviews found. Reviews will appear here once the review pipeline is active.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[70px]">Stars</TableHead>
                    <TableHead className="w-[140px]">Reviewer</TableHead>
                    <TableHead>Review Text</TableHead>
                    <TableHead>AI Draft</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[160px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <Badge className={ratingColor(review.rating)}>
                          {review.rating} <Star className="h-3 w-3 ml-0.5 inline" />
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {review.reviewer_name || "Anonymous"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {truncate(review.review_text, 100)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {truncate(review.response_draft, 100)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusVariant(review.response_status)}>
                          {review.response_status?.replace(/_/g, " ") ?? "pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {review.response_status === "needs_review" ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-500 border-green-500/30 hover:bg-green-500/10"
                              onClick={() => handleReviewAction(review.id, "approve")}
                            >
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 border-red-500/30 hover:bg-red-500/10"
                              onClick={() => handleReviewAction(review.id, "reject")}
                            >
                              <XCircle className="h-3.5 w-3.5 mr-1" />
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 3. Post Calendar                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Send className="h-5 w-5 text-purple-500" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Send className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p>No posts found. Posts will appear here once the GBP post pipeline is active.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[120px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {post.post_type?.replace(/_/g, " ") ?? "post"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {truncate(post.content, 120)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusVariant(post.status)}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(post.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* 4. Run Now                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Play className="h-5 w-5 text-green-500" />
            Run Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manually trigger GBP automation crons. These normally run on schedule via Vercel Cron.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CRON_BUTTONS.map(({ key, label, path, icon }) => (
              <div key={key} className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  disabled={cronLoading[key]}
                  onClick={() => runCron(key, path)}
                >
                  {cronLoading[key] ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    icon
                  )}
                  {label}
                </Button>
                {cronResult[key] && (
                  <div
                    className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                      cronResult[key]!.ok
                        ? "bg-green-600/10 text-green-400"
                        : "bg-red-600/10 text-red-400"
                    }`}
                  >
                    {cronResult[key]!.ok ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {cronResult[key]!.msg}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
