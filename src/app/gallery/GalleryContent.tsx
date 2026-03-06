'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from '@/components/CTASection';
import { GallerySchema } from "@/components/schemas/GallerySchema";
import { WebPageSchema } from "@/components/schemas/WebPageSchema";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  title: string;
  service: string;
  display_order: number;
}

export default function GalleryContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeTab === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category.toLowerCase() === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <GallerySchema images={[]} />
      <WebPageSchema name="Work Gallery" description="Before and after photos of our lawn care work in Madison, WI" url="/gallery" />
      <Navigation />

      <section className="sr-only">
        <h2>TG Yard Care Project Gallery</h2>
        <p>Browse before-and-after photos of TG Yard Care's lawn mowing, mulching, garden bed, gutter cleaning, and seasonal cleanup projects across Madison, Wisconsin. Our portfolio showcases the quality and attention to detail that has earned us a 4.9-star Google rating from 60+ satisfied customers.</p>
      </section>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b-2 border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 animate-fade-in tracking-tight">
            Real Results. Real Properties. Real Transformations.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            Explore <span className="font-bold text-primary">19+ stunning before &amp; after photos</span> from actual TotalGuard projects across Madison, Middleton, Waunakee &amp; surrounding Wisconsin communities.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            See the incredible detail of our professional lawn care, landscaping, and property maintenance work.
          </p>
        </div>
      </section>

      {/* Gallery with Tabs */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="w-full">
              <div className="flex justify-center mb-8 md:mb-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 w-full max-w-5xl">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                      activeTab === "all"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTab("mowing")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                      activeTab === "mowing"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    Mowing
                  </button>
                  <button
                    onClick={() => setActiveTab("weeding")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                      activeTab === "weeding"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    Weeding
                  </button>
                  <button
                    onClick={() => setActiveTab("mulching")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                      activeTab === "mulching"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    Mulching
                  </button>
                  <button
                    onClick={() => setActiveTab("gutters")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                      activeTab === "gutters"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    Gutters
                  </button>
                  <button
                    onClick={() => setActiveTab("landscaping")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
                      activeTab === "landscaping"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    Landscaping
                  </button>
                  <button
                    onClick={() => setActiveTab("seasonal")}
                    className={`py-3 px-3 md:px-4 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 col-span-2 md:col-span-3 lg:col-span-6 ${
                      activeTab === "seasonal"
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white/80 text-foreground hover:bg-primary/10 border-2 border-primary/20"
                    }`}
                  >
                    Seasonal Services
                  </button>
                </div>
              </div>

              <div className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="relative">
                      <Image
                        src={item.image_url}
                        alt={`${item.service} ${item.title} Madison WI - TotalGuard Yard Care`}
                        className="w-full h-auto rounded-lg"
                        width={600}
                        height={400}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>

                {filteredItems.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">No projects found in this category yet. Check back soon!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Trust Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-primary/3 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-6">
                Why Madison Homeowners Choose TotalGuard
              </h2>
              <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Every transformation you see above represents <span className="font-semibold text-foreground">real results from real properties</span> in your neighborhood. Professional quality, reliable service, and stunning outcomes&mdash;guaranteed for every project we complete.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-card rounded-2xl p-8 shadow-xl border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="text-5xl font-extrabold text-primary mb-3">
                    100+
                  </div>
                  <p className="text-base text-muted-foreground font-semibold">Properties Transformed</p>
                </div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-card rounded-2xl p-8 shadow-xl border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="text-5xl font-extrabold text-primary mb-3">
                    4.9
                  </div>
                  <p className="text-base text-muted-foreground font-semibold">Google Rating</p>
                </div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-card rounded-2xl p-8 shadow-xl border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="text-5xl font-extrabold text-primary mb-3">
                    24hr
                  </div>
                  <p className="text-base text-muted-foreground font-semibold">Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <Footer showCloser={false} />
    </div>
  );
}
