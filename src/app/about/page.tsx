"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { SiteVisitModal } from "@/components/lead/SiteVisitModal";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-8 max-w-5xl text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
          <Award className="w-3.5 h-3.5" /> Established 2014 • Jaipur, Rajasthan
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground tracking-tight">
          Redefining Real Estate Advisory in <span className="text-primary italic">Jaipur.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          EstateModern is a boutique luxury property consultancy dedicated to matching discerning clients, non-resident Indians, and institutional investors with exceptional residential and commercial spaces.
        </p>
      </section>

      {/* Story & Philosophy */}
      <section className="container mx-auto px-4 md:px-8 max-w-6xl mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-border">
            <Image 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="EstateModern Jaipur Office" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end p-8">
              <div>
                <p className="font-heading font-bold text-xl text-white">Boutique Headquarters</p>
                <p className="text-xs text-zinc-300">Level 4, Modern Tower, C-Scheme, Jaipur</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase">
              Our Vision & Philosophy
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              A Fiduciary Standard in an Unstructured Market.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We believe that acquiring or divesting real estate should never be a stressful transaction fraught with uncertainty. By combining granular hyper-local market intelligence with institutional-grade due diligence, we ensure absolute transparency from title searches to physical handover.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Whether you are an NRI seeking high-yield capital preservation, a family finding your multi-generational sanctuary in Vaishali Nagar or Civil Lines, or an enterprise scaling commercial footprints, we represent your interest with total confidentiality.
            </p>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-border/60">
              <div>
                <h4 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">₹500Cr+</h4>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Properties Transacted</p>
              </div>
              <div>
                <h4 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1">1,200+</h4>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-card/40 py-20 border-y border-border/60 mb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-3">Our Core Commitments</h2>
            <p className="text-muted-foreground text-sm">Every consultation is guided by 4 uncompromising principles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "100% Legal Scrutiny", desc: "Rigorous 30-year title search, municipal zoning approval, and encumbrance verification." },
              { title: "Zero Speculation", desc: "We only recommend properties backed by reputable developers or clear private deeds." },
              { title: "Discrete Negotiation", desc: "Protecting your privacy and securing favorable deal structures through skilled advocacy." },
              { title: "Post-Possession Care", desc: "Ongoing assistance with interior fitouts, tenant leasing, and municipal utility transfers." }
            ].map((pillar, i) => (
              <div key={i} className="p-6 rounded-2xl bg-secondary/30 border border-border/50 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">{pillar.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Founders CTA */}
      <section className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
          Ready to Consult on Your Next Acquisition?
        </h2>
        <p className="text-muted-foreground text-base mb-8">
          Meet with our Senior Partners at our C-Scheme office or arrange a private phone consultation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => setModalOpen(true)}
            className="px-8 h-13 text-sm font-semibold rounded-xl"
          >
            Schedule Consultation <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              "Hello, I would like to schedule a consultation with EstateModern founders regarding Jaipur real estate."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-13 text-sm font-semibold rounded-xl flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" /> Chat on WhatsApp
            </Button>
          </a>
        </div>
      </section>

      <SiteVisitModal 
        isOpen={modalOpen} 
        onOpenChange={setModalOpen} 
        propertyTitle="VIP Client Consultation" 
      />
    </div>
  );
}
