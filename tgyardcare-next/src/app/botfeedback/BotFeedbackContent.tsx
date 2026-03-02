'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, Loader2, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FeedbackStats {
  total: number;
  averageRating: number;
  distribution: Record<number, number>;
}

interface FeedbackItem {
  id: string;
  session_id: string;
  rating: number;
  feedback_text: string | null;
  created_at: string;
}

interface FeedbackData {
  summary: string;
  stats: FeedbackStats;
  recentFeedback: FeedbackItem[];
}

export default function BotFeedbackContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<FeedbackData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login');
        return;
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (roles?.role !== 'admin') {
        router.push('/');
        return;
      }

      setIsAdmin(true);
      await fetchFeedbackData();
    } catch (err) {
      console.error('Error checking admin:', err);
      router.push('/admin/login');
    }
  };

  const fetchFeedbackData = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/bot-feedback-summary`,
        {
          headers: {
            Authorization: `Bearer ${session.session?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch feedback data');
      }

      const feedbackData = await response.json();
      setData(feedbackData);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback data');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Chatbot Feedback</h1>
            <p className="text-muted-foreground">Customer ratings and feedback for the AI chatbot</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                {error}
              </CardContent>
            </Card>
          ) : data ? (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Total Responses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{data.stats?.total ?? 0}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Average Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold">{data.stats?.averageRating ?? 0}</p>
                      <div className="flex">
                        {renderStars(Math.round(data.stats?.averageRating ?? 0))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Rating Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = data.stats?.distribution?.[rating] || 0;
                        const total = data.stats?.total || 0;
                        const percentage = total > 0
                          ? (count / total) * 100
                          : 0;
                        return (
                          <div key={rating} className="flex items-center gap-2 text-sm">
                            <span className="w-3">{rating}</span>
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Progress value={percentage} className="h-2 flex-1" />
                            <span className="w-8 text-right text-muted-foreground">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground">
                    {(data.summary || 'No summary available.').split('\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-3 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  {(!data.recentFeedback || data.recentFeedback.length === 0) ? (
                    <p className="text-muted-foreground text-center py-8">
                      No feedback collected yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {data.recentFeedback.map((item) => (
                        <div
                          key={item.id}
                          className="border-b border-border last:border-0 pb-4 last:pb-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            {renderStars(item.rating)}
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          {item.feedback_text ? (
                            <p className="text-sm text-foreground">{item.feedback_text}</p>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">No text feedback provided</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </main>

      <Footer showCloser={false} />
    </>
  );
}
