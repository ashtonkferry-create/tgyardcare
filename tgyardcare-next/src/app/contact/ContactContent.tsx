'use client';

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle2, Award, Sparkles, Zap, Shield, X, Users, FileCheck, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { validateContactForm } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { ServiceUpsellDialog } from "@/components/ServiceUpsellDialog";
import { getServiceTemplate } from "@/lib/serviceTemplates";

export default function ContactContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string; message: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Prefill message from service query parameter and scroll to form
  useEffect(() => {
    const serviceKey = searchParams.get('service');
    if (serviceKey) {
      const template = getServiceTemplate(serviceKey);
      if (template) {
        setSelectedService(template);
        setFormData(prev => ({ ...prev, message: template.message }));
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate and sanitize input
      const validatedData = validateContactForm(formData);

      // Call edge function to save to database and send email
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: validatedData
      });

      if (error) {
        throw new Error(error.message || "Failed to submit form");
      }

      if (!data?.success) {
        throw new Error("Failed to submit form");
      }

      setFormData({ name: "", email: "", phone: "", address: "", message: "" });
      setShowUpsell(true);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <LocalBusinessSchema cityName="Madison" />
      <Navigation />

      {/* TL;DR for AI/Answer Engines */}
      <section className="sr-only" aria-label="Contact Summary">
        <p>Contact TotalGuard Yard Care for a free lawn care quote in Madison, Middleton, Waunakee, or Dane County, Wisconsin. We respond to all quote requests within 24 hours. Phone: (608) 535-6057. Located in Madison, WI. Service hours: Monday-Saturday. Request your free estimate online or call today.</p>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-card border-2 border-primary text-primary px-6 py-2.5 rounded-full text-sm font-bold mb-6 shadow-sm animate-fade-in">
            <Sparkles className="h-4 w-4 mr-2" />
            24-Hour Response Guarantee
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 animate-fade-in">
            Get Your Free Quote in <span className="text-primary">Under 60 Seconds</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join 500+ homeowners across Madison, Middleton, Waunakee, Sun Prairie & Dane County who trust TotalGuard Yard Care
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm border border-border">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm border border-border">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg shadow-sm border border-border">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>100% Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT - Process transparency strip */}
      <section className="py-6 border-y border-border/50 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</div>
                <span className="text-foreground font-medium">You reach out</span>
                <span className="text-muted-foreground hidden sm:inline">&rarr;</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/80 text-primary-foreground text-xs font-bold">2</div>
                <span className="text-foreground font-medium">Quote in 24hrs</span>
                <span className="text-muted-foreground hidden sm:inline">&rarr;</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/60 text-primary-foreground text-xs font-bold">3</div>
                <span className="text-foreground font-medium">You pick a date</span>
                <span className="text-muted-foreground hidden sm:inline">&rarr;</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/40 text-primary-foreground text-xs font-bold">4</div>
                <span className="text-foreground font-medium">Your crew shows up</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10 relative overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              {/* Contact Form */}
              <div ref={formRef} className="space-y-6 scroll-mt-8">
                {/* Service Indicator Badge */}
                {selectedService && (
                  <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-xl animate-fade-in">
                    <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Requesting a quote for:</p>
                      <p className="text-lg font-bold text-primary">{selectedService.title}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedService(null);
                        setFormData(prev => ({ ...prev, message: '' }));
                      }}
                      className="p-1 hover:bg-primary/20 rounded-full transition-colors"
                      aria-label="Clear service selection"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Request Your Free Quote</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                  <p className="text-muted-foreground text-lg">Get a response in under 24 hours &bull; No obligation &bull; Free estimate</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <Label htmlFor="name" className="text-foreground font-semibold flex items-center gap-2">
                      Full Name *
                      {formData.name && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      maxLength={100}
                      placeholder="John Smith"
                      className={`mt-2 border transition-all duration-300 ${
                        focusedField === 'name'
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      } bg-background`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-destructive text-sm mt-2 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                      Email Address *
                      {formData.email && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      maxLength={255}
                      placeholder="john@example.com"
                      className={`mt-2 border transition-all duration-300 ${
                        focusedField === 'email'
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      } bg-background`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-destructive text-sm mt-2 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Label htmlFor="phone" className="text-foreground font-semibold flex items-center gap-2">
                      Phone Number *
                      {formData.phone && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      required
                      maxLength={20}
                      placeholder="(920) 555-1234"
                      className={`mt-2 border transition-all duration-300 ${
                        focusedField === 'phone'
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      } bg-background`}
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-destructive text-sm mt-2 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Label htmlFor="address" className="text-foreground font-semibold flex items-center gap-2">
                      Property Address *
                      {formData.address && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('address')}
                      onBlur={() => setFocusedField(null)}
                      required
                      maxLength={300}
                      placeholder="123 Main St, Madison, WI 53703"
                      className={`mt-2 border transition-all duration-300 ${
                        focusedField === 'address'
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      } bg-background`}
                      aria-invalid={errors.address ? "true" : "false"}
                      aria-describedby={errors.address ? "address-error" : undefined}
                    />
                    {errors.address && (
                      <p id="address-error" className="text-destructive text-sm mt-2 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Label htmlFor="message" className="text-foreground font-semibold flex items-center gap-2">
                      Tell Us About Your Project *
                      {formData.message && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      maxLength={2000}
                      placeholder="Describe the services you're interested in and any specific details about your property..."
                      className={`mt-2 min-h-[150px] border transition-all duration-300 ${
                        focusedField === 'message'
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      } bg-background resize-none`}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className={`text-xs transition-colors ${
                        formData.message.length > 1900 ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {formData.message.length}/2000 characters
                      </p>
                    </div>
                    {errors.message && (
                      <p id="message-error" className="text-destructive text-sm mt-2 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="h-4 w-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-bold text-lg shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Your Request...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Get My Free Quote Now
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    <span>Your information is secure and will never be shared</span>
                  </div>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Prefer to Call?</h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                  <p className="text-muted-foreground text-lg">Our team is ready to help you right now</p>
                </div>
                <div className="bg-card p-4 sm:p-6 rounded-xl border border-border mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Call Now For Immediate Service</p>
                      <a
                        href="tel:608-535-6057"
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary hover:text-primary/80 transition-colors block"
                      >
                        (608) 535-6057
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>Monday - Saturday: 8:00 AM - 6:00 PM</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">

                    <div className="bg-card rounded-xl w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 border border-border">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:totalguardllc@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm break-all"
                      >
                        totalguardllc@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
                    <div className="bg-card rounded-xl w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0 border border-border">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1">Service Area</h3>
                      <p className="text-muted-foreground text-sm">
                        Madison, WI &amp; Surrounding Areas
                        <br />
                        <span className="text-xs">Including Middleton &amp; Waunakee</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Urgency Element */}
                <div className="bg-card border border-border rounded-xl p-5 mt-6">
                  <div className="flex items-start gap-3">
                    <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Limited Availability</h3>
                      <p className="text-sm text-muted-foreground">
                        We&apos;re booking up fast for this season. Request your quote today to secure your spot!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-muted rounded-xl overflow-hidden h-64 border border-border shadow-lg mt-6">
                  <iframe
                    title="Madison, Wisconsin location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.57290364332!2d-89.54410483516636!3d43.074761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8806536d3a2019ff%3A0x4e0cfcb5ba484198!2sMadison%2C%20WI!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COMMITMENTS - Standards strip */}
      <section className="py-8 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-center text-lg font-bold text-foreground mb-6">Our Commitments to You</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">24hr Response</p>
                  <p className="text-xs text-muted-foreground">Every inquiry answered</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Same Crew</p>
                  <p className="text-xs text-muted-foreground">Every single visit</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                <FileCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Quote Accuracy</p>
                  <p className="text-xs text-muted-foreground">No surprise charges</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                <RefreshCw className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Make-It-Right</p>
                  <p className="text-xs text-muted-foreground">Free return if needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Call us now for immediate service or submit the form above for a quote within 24 hours.
            </p>
            <Button size="lg" asChild className="font-bold shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="tel:608-535-6057">
                <Phone className="mr-2 h-5 w-5" />
                (608) 535-6057
              </a>
            </Button>
          </div>
        </div>
      </section>

      <ServiceUpsellDialog open={showUpsell} onOpenChange={setShowUpsell} selectedService={selectedService} />

      <Footer showCloser={false} />
    </div>
  );
}
