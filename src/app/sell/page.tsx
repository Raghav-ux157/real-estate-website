"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, Sparkles, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function SellPropertyPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    intent: "Sell",
    propertyType: "Apartment",
    location: "",
    details: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim() || "Property Owner";
      const notes = `Location: ${formData.location || 'Not Specified'}. Notes: ${formData.details || 'None'}`;

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone: formData.phone,
          intent: formData.intent === "Sell" ? "Sell" : "Rent",
          propertyType: formData.propertyType,
          timeline: "Immediately",
          source: `Seller Portal (${formData.intent})`,
          notes: notes
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Failed to submit property details. Please try again.");
      }
    } catch (err) {
      console.error("Seller submission error:", err);
      setError("Network error. Please try again or reach out to us via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Value Proposition */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> High Net Worth Network
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-foreground">
              Sell or Lease Your Property with <span className="text-primary italic">Jaipur's Elite.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We connect your premium residential and commercial assets with pre-qualified buyers, corporate tenants, and institutional investors. Experience total discretion, rapid turnaround, and data-backed valuation.
            </p>
            
            <div className="space-y-6 pt-4">
              {[
                { title: "Bespoke Architectural Marketing", desc: "High-resolution 4K photography, drone walkthroughs, and targeted private campaigns." },
                { title: "Pre-Screened Buyers & Tenants", desc: "We vet financial qualifications upfront so you never waste time on low-intent inquiries." },
                { title: "Comparative Market Analysis", desc: "Scientific pricing strategies to maximize your asset's net realized value." },
                { title: "Turnkey Documentation & Closing", desc: "Fiduciary supervision of sale agreements, registry, society NOCs, and possession handover." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-xl h-fit shrink-0 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-foreground">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-foreground">Prefer direct consultation?</p>
                <p className="text-xs text-muted-foreground mt-0.5">Speak with our Principal Partner in Jaipur</p>
              </div>
              <a href="tel:+919876543210" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-xs font-semibold text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91 98765 43210
              </a>
            </div>
          </div>

          {/* Right Side: Lead Form */}
          <div>
            <Card className="bg-card border-border/70 shadow-2xl relative overflow-hidden rounded-3xl">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/20"></div>
              
              <CardContent className="p-6 md:p-10">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">Property Details Received</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="text-foreground font-semibold">{formData.firstName}</span>. A senior property valuation advisor from our C-Scheme office will contact you at <span className="text-foreground font-semibold">{formData.phone}</span> within 4 hours.
                    </p>
                    <div className="pt-6 flex flex-col gap-3">
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(
                          `Hello EstateModern, I submitted my property in ${formData.location || 'Jaipur'} for evaluation. Can we connect?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white">
                          <MessageCircle className="w-4 h-4 mr-2" /> Follow up on WhatsApp
                        </Button>
                      </a>
                      <Button variant="outline" onClick={() => setSubmitted(false)}>
                        Submit Another Property
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold mb-2">Tell Us About Your Property</h2>
                    <p className="text-xs text-muted-foreground mb-6">
                      Provide a few details and receive a confidential market valuation.
                    </p>

                    {error && (
                      <div className="p-3 mb-4 rounded-xl bg-destructive/10 text-destructive text-xs border border-destructive/20">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="firstName" className="text-xs">First Name *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="e.g. Vikram" 
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="bg-background/80 border-border/60 text-sm h-11" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                          <Input 
                            id="lastName" 
                            placeholder="e.g. Rathore" 
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="bg-background/80 border-border/60 text-sm h-11" 
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs">Phone / WhatsApp *</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+91 98765 43210" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-background/80 border-border/60 text-sm h-11" 
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="intent" className="text-xs">I want to *</Label>
                          <select 
                            id="intent" 
                            value={formData.intent}
                            onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                            className="flex h-11 w-full rounded-md border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary"
                          >
                            <option value="Sell">Sell my property</option>
                            <option value="Rent">Rent out / Lease</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="propertyType" className="text-xs">Property Type *</Label>
                          <select 
                            id="propertyType" 
                            value={formData.propertyType}
                            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                            className="flex h-11 w-full rounded-md border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary"
                          >
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa / Kothi</option>
                            <option value="Plot">Residential Plot</option>
                            <option value="Commercial">Commercial Office / Retail</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="location" className="text-xs">Location / Locality *</Label>
                        <Input 
                          id="location" 
                          placeholder="e.g. Vaishali Nagar, C-Scheme, Jagatpura" 
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-background/80 border-border/60 text-sm h-11" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="details" className="text-xs">Property Details (Optional)</Label>
                        <Textarea 
                          id="details" 
                          placeholder="Super area in sq.ft, expected price, furnishing status, age..." 
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          className="bg-background/80 border-border/60 resize-none h-20 text-sm" 
                        />
                      </div>

                      <Button type="submit" disabled={loading} className="w-full h-12 text-sm font-semibold mt-2">
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting Request...
                          </>
                        ) : (
                          <>
                            Request Valuation & Listing <ArrowRight className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
                      
                      <p className="text-center text-[11px] text-muted-foreground mt-3">
                        100% Confidential. Your contact information is never shared with third parties.
                      </p>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
