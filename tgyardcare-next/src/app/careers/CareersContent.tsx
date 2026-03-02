'use client';

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  TrendingUp,
  Users,
  Shield,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  MapPin,
  Phone,
  Mail,
  FileText,
  UserCheck,
  MessageSquare,
  Handshake,
  Calendar
} from "lucide-react";

const openPositions = [
  {
    title: "Lawn Care Technician",
    type: "Full-Time / Seasonal",
    summary: "Operate professional-grade equipment and deliver exceptional property maintenance to residential and commercial clients.",
    available: true
  },
  {
    title: "Snow Removal Operator",
    type: "Seasonal (Winter)",
    summary: "Provide reliable winter property management including plowing, salting, and walkway clearing with precision and timeliness.",
    available: true
  },
  {
    title: "Crew Leader",
    type: "Full-Time",
    summary: "Lead a team of technicians, manage daily operations, ensure quality standards, and serve as the primary client liaison.",
    available: false
  },
  {
    title: "Landscape Maintenance Specialist",
    type: "Full-Time / Seasonal",
    summary: "Execute mulching, pruning, garden bed maintenance, and seasonal property care with attention to detail and professionalism.",
    available: true
  }
];

const coreValues = [
  {
    icon: Shield,
    title: "Ownership",
    description: "We take full responsibility for our work. Every property we service reflects our professional standards and commitment to excellence."
  },
  {
    icon: Target,
    title: "Accountability",
    description: "We deliver on our commitments. Clear communication, punctual service, and consistent follow-through define how we operate."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do. Our reputation is built on the quality of our work, not promises."
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "We respect time—ours and our clients&apos;. Smart systems, proper training, and disciplined execution drive our operations."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Strong teams produce exceptional results. We support each other, share knowledge, and succeed together."
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We do the right thing, especially when it&apos;s difficult. Honesty and ethical conduct are non-negotiable."
  }
];

const whyWorkWithUs = [
  {
    icon: TrendingUp,
    title: "Professional Development",
    description: "We invest in our team members. Structured training, skill development, and clear advancement pathways are part of our commitment to your growth."
  },
  {
    icon: Briefcase,
    title: "Industry-Leading Training",
    description: "Learn to operate professional equipment and master techniques that set industry standards. Your expertise grows with us."
  },
  {
    icon: Calendar,
    title: "Structured Scheduling",
    description: "We offer consistent, reliable schedules that allow you to plan your life. Full-time and seasonal positions available."
  },
  {
    icon: Award,
    title: "Performance Recognition",
    description: "Outstanding work is acknowledged and rewarded. We recognize those who consistently exceed expectations."
  },
  {
    icon: Users,
    title: "Professional Environment",
    description: "Join a team that takes pride in their work. We maintain high standards and expect the same from everyone."
  }
];

const hiringSteps = [
  {
    step: 1,
    title: "Apply",
    description: "Submit your application through our contact form. Share your experience and what you&apos;re looking for in a position.",
    icon: FileText
  },
  {
    step: 2,
    title: "Review",
    description: "Our team reviews every application within 48 hours. Qualified candidates will be contacted to schedule an interview.",
    icon: UserCheck
  },
  {
    step: 3,
    title: "Interview",
    description: "Meet with our leadership team. We&apos;ll discuss expectations, your goals, and determine mutual fit.",
    icon: MessageSquare
  },
  {
    step: 4,
    title: "Offer",
    description: "Successful candidates receive a clear offer outlining compensation, schedule, and start date.",
    icon: Handshake
  },
  {
    step: 5,
    title: "Onboarding",
    description: "Comprehensive orientation and training ensure you&apos;re prepared to represent TotalGuard Yard Care with confidence.",
    icon: Zap
  }
];

const idealCandidateTraits = [
  "Demonstrates consistent reliability and punctuality",
  "Physically capable of outdoor work in varied conditions",
  "Maintains attention to detail and quality standards",
  "Receptive to feedback and committed to improvement",
  "Contributes positively to team dynamics and operations",
  "Self-directed with strong work ethic",
  "Represents the company professionally in all client interactions"
];

const benefits = [
  "Competitive compensation based on experience and role",
  "Performance-based advancement opportunities",
  "Comprehensive equipment training and certification",
  "Professional development and skill building",
  "Structured scheduling with advance notice",
  "Seasonal and year-round positions available",
  "Work across the greater Madison metropolitan area"
];

const serviceAreas = [
  { name: "Madison", path: "/locations/madison" },
  { name: "Middleton", path: "/locations/middleton" },
  { name: "Verona", path: "/locations/verona" },
  { name: "Fitchburg", path: "/locations/fitchburg" },
  { name: "Sun Prairie", path: "/locations/sun-prairie" },
  { name: "Waunakee", path: "/locations/waunakee" },
  { name: "Monona", path: "/locations/monona" },
  { name: "McFarland", path: "/locations/mcfarland" },
  { name: "Cottage Grove", path: "/locations/cottage-grove" },
  { name: "DeForest", path: "/locations/deforest" },
  { name: "Oregon", path: "/locations/oregon" },
  { name: "Stoughton", path: "/locations/stoughton" }
];

export default function CareersContent() {
  const availablePositions = openPositions.filter(p => p.available);
  const careersContactUrl = "/contact?service=careers";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="sr-only">
        <h2>Careers at TG Yard Care</h2>
        <p>Join the TG Yard Care team in Madison, Wisconsin. We're looking for reliable, hardworking individuals who take pride in outdoor work. TotalGuard offers competitive pay, consistent schedules, and the opportunity to work with a growing, locally owned lawn care company serving 500+ properties across Dane County.</p>
      </section>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-28 pb-16 md:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-6">
              <Briefcase className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Now Accepting Applications for 2025</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Careers at{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                TotalGuard Yard Care
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-cyan-100 mb-4 font-medium">
              Build a Career with a Company That Values Excellence
            </p>

            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              We are building a team of dedicated professionals who take pride in their work and are committed to
              delivering exceptional results. If you value reliability, growth, and working alongside people who
              hold themselves to high standards, we invite you to explore opportunities with us.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg font-bold px-8 py-6 h-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg font-bold px-8 py-6 h-auto border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white"
                asChild
              >
                <Link href={careersContactUrl}>
                  Submit Application
                </Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400">Properties Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">12+</div>
                <div className="text-sm text-slate-400">Service Areas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">4.9</div>
                <div className="text-sm text-slate-400">Google Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Build Your Career Here
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              TotalGuard Yard Care is committed to developing professionals who take ownership of their work and
              are driven to grow within a structured, standards-based organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyWorkWithUs.map((item) => (
              <Card key={item.title} className="bg-white border-slate-200 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture & Values */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Standards and Values
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              These principles guide how we operate and what we expect from every member of our team.
              They are not aspirational statements—they are the foundation of how we work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value) => (
              <div key={value.title} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-slate-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {availablePositions.length > 0
                ? "We are seeking qualified candidates for the following positions. Review the requirements and apply if you meet our standards."
                : "We are not actively hiring at this time. However, we welcome applications from qualified professionals for future consideration."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card
                key={index}
                className={`bg-white border-slate-200 hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 ${!position.available ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground">{position.title}</h3>
                        {position.available ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Accepting Applications
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-full">
                            Position Filled
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-cyan-600 font-medium mb-2">{position.type}</p>
                      <p className="text-muted-foreground">{position.summary}</p>
                    </div>
                    {position.available && (
                      <Button
                        className="shrink-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        asChild
                      >
                        <Link href={careersContactUrl}>
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* General application CTA */}
          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4">
              Position not listed? We are always interested in hearing from qualified professionals.
            </p>
            <Button
              variant="outline"
              className="border-cyan-500/50 text-cyan-600 hover:bg-cyan-50"
              asChild
            >
              <Link href={careersContactUrl}>
                Submit General Application
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Hiring Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in a clear, respectful hiring process. Here is what you can expect when you apply.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
              {hiringSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 shadow-lg">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="text-sm font-bold text-cyan-600 mb-1">Step {step.step}</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {/* Connector line */}
                  {index < hiringSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who We Are Looking For
              </h2>
              <p className="text-lg text-muted-foreground">
                We maintain high standards because our clients expect excellence. The following qualities
                define successful team members at TotalGuard Yard Care.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {idealCandidateTraits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                    <span className="text-foreground">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Opportunities */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Compensation and Benefits
              </h2>
              <p className="text-lg text-slate-300">
                TotalGuard Yard Care offers competitive compensation and benefits. Specific details may vary by role and position type.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas - for SEO */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our Service Areas
            </h2>
            <p className="text-muted-foreground">
              TotalGuard Yard Care serves clients throughout the greater Madison, Wisconsin metropolitan area.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <Link
                key={area.path}
                href={area.path}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-cyan-100 text-slate-700 hover:text-cyan-700 rounded-full text-sm font-medium transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Equal Opportunity Statement */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Equal Opportunity Employer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TotalGuard Yard Care is an equal opportunity employer. We are committed to creating an inclusive
              environment for all employees. All qualified applicants will receive consideration for employment without regard
              to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status,
              or any other protected characteristic.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              If you are committed to professional standards, take pride in your work, and are looking for an
              organization that values reliability and growth, we welcome your application.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-lg font-bold px-8 py-6 h-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href={careersContactUrl}>
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg font-bold px-8 py-6 h-auto border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white"
                asChild
              >
                <a href="tel:608-535-6057">
                  <Phone className="mr-2 h-5 w-5" />
                  (608) 535-6057
                </a>
              </Button>
            </div>

            {/* Contact info */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
              <a href="mailto:totalguardllc@gmail.com" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="h-4 w-4" />
                totalguardllc@gmail.com
              </a>
              <a href="tel:608-535-6057" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Phone className="h-4 w-4" />
                (608) 535-6057
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
