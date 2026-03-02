'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Users, Award, Target, Heart, Sparkles, Phone } from "lucide-react";
import alexPortrait from "@/assets/alex-portrait.png";
import vancePortrait from "@/assets/vance-portrait.png";

const teamMembers = [
  {
    name: "Alex",
    role: "Co-Founder",
    description: "When Alex isn't making your lawn look sharp, he's probably under the hood of a car figuring out what makes it tick. He's the kind of guy you can actually have a conversation with—no awkward small talk, just genuine and easy to work with. If you've got questions about your yard (or need a second opinion on that weird noise your car's making), he's your guy.",
    image: alexPortrait
  },
  {
    name: "Vance",
    role: "Co-Founder",
    description: "Vance genuinely gets a kick out of seeing customers happy—it's kind of his thing. There's nothing better than finishing a job and knowing someone's going to pull into their driveway and smile. When he's not transforming yards, he's getting ready to play volleyball at UW-Stevens Point. Yes, he'll probably mention it.",
    image: vancePortrait
  }
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on the quality of our work. Every property gets our best effort, every time."
  },
  {
    icon: Target,
    title: "Reliability",
    description: "When we say we'll be there, we'll be there. Consistent, dependable service you can count on."
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Your satisfaction is our priority. We listen, communicate, and go the extra mile for every client."
  },
  {
    icon: Users,
    title: "Local Focus",
    description: "As Madison locals, we take pride in making our community more beautiful, one yard at a time."
  }
];

export default function TeamContent() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="sr-only">
        <h2>Meet the TG Yard Care Team</h2>
        <p>The TG Yard Care team is a dedicated group of lawn care and landscaping professionals serving Madison, Wisconsin. Our crew members are trained, insured, and committed to delivering consistent quality on every property. With our same-crew-every-visit policy, you'll always know who's taking care of your yard.</p>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 via-secondary/30 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wide animate-fade-in">
            The Faces Behind TotalGuard
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Young entrepreneurs with a passion for excellence and a commitment to transforming lawns across Madison, Wisconsin.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Founders
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                TotalGuard Yard Care was founded by two driven young entrepreneurs who saw an opportunity to provide exceptional lawn care services to the Madison community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-b from-card to-card/50 p-10 rounded-2xl border-2 border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="relative w-36 h-36 mx-auto mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                      <img
                        src={typeof member.image === 'string' ? member.image : member.image.src}
                        alt={`${member.name} - ${member.role} of TotalGuard Yard Care - Professional lawn care expert in Madison Wisconsin`}
                        className="w-full h-full object-cover brightness-105"
                        loading="lazy"
                        width="144"
                        height="144"
                      />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2 text-center group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-primary font-bold mb-5 text-center text-lg tracking-wide">{member.role}</p>
                  <p className="text-muted-foreground text-center leading-relaxed text-base">{member.description}</p>
                </div>
              ))}
            </div>

            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 p-10 rounded-2xl border-2 border-primary/30 shadow-xl animate-fade-in overflow-hidden" style={{ animationDelay: '0.5s' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h3>
                <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto text-lg">
                  What started as a simple idea to help neighbors with their lawn care has grown into TotalGuard Yard Care.
                  As young business owners, Alex and Vance bring fresh energy, modern techniques, and an unwavering commitment
                  to customer satisfaction. They understand that your property is your pride, and they treat every lawn with
                  the same care they&apos;d give their own.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our values guide everything we do, from how we interact with clients to the quality of work we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-background p-8 rounded-xl border-2 border-border text-center hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Young Entrepreneurs */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center animate-fade-in">
              Why Choose Young Entrepreneurs?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group bg-card p-8 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Fresh Perspective</h3>
                    <p className="text-muted-foreground leading-relaxed">We bring modern techniques and innovative solutions to traditional lawn care.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-card p-8 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Hungry to Prove Ourselves</h3>
                    <p className="text-muted-foreground leading-relaxed">Every job is an opportunity to exceed expectations and build our reputation.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-card p-8 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Tech-Savvy Communication</h3>
                    <p className="text-muted-foreground leading-relaxed">Easy scheduling, quick responses, and transparent updates throughout the process.</p>
                  </div>
                </div>
              </div>

              <div className="group bg-card p-8 rounded-xl border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Invested in Growth</h3>
                    <p className="text-muted-foreground leading-relaxed">Your satisfaction means everything to us. We rely on happy customers and word-of-mouth referrals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}
