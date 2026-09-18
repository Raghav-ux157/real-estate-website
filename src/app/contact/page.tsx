"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Property Inquiry",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          intent: "Buy",
          source: "Contact Us Page",
          timeline: "Immediately",
          notes: `Subject: ${formData.subject}. Message: ${formData.message}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Contact error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Connect with Our Advisors
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Whether you are planning to purchase, lease, or divest a high-value property in Jaipur, our team is ready to assist with absolute discretion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Office info and details */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-card border border-border/70 shadow-xl space-y-6">
              <h3 className="font-heading font-bold text-2xl text-foreground">Jaipur Headquarters</h3>
              
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Office Address</p>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed">
                      Level 4, Modern Tower, C-Scheme<br/>
                      Jaipur, Rajasthan 302001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone & WhatsApp</p>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors block mt-0.5">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email Inquiries</p>
                    <a href="mailto:contact@estatemodern.com" className="text-muted-foreground hover:text-primary transition-colors block mt-0.5">
                      contact@estatemodern.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Consultation Hours</p>
                    <p className="text-muted-foreground mt-0.5">
                      Monday to Saturday: 9:30 AM – 7:30 PM<br/>
                      Sunday: By Prior Appointment Only
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex gap-3">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    "Hello EstateModern, I would like to schedule an in-person meeting at your C-Scheme office."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold h-11">
                    <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us
                  </Button>
                </a>
                <a href="tel:+919876543210" className="flex-1">
                  <Button variant="outline" className="w-full text-xs font-semibold h-11 border-border/70">
                    <Phone className="w-4 h-4 mr-2 text-primary" /> Direct Call
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div>
            <Card className="bg-card border-border/70 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">Message Dispatched!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting EstateModern. A dedicated property advisor will review your message and reach out shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Send Us a Direct Message</h2>
                    <p className="text-xs text-muted-foreground mb-6">
                      Fill in your requirements and we will connect you with the appropriate locality specialist.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-name" className="text-xs">Your Name *</Label>
                        <Input
                          id="contact-name"
                          placeholder="e.g. Vikram Sharma"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-background/80 border-border/60 text-sm h-11"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="contact-phone" className="text-xs">Phone / WhatsApp *</Label>
                          <Input
                            id="contact-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-background/80 border-border/60 text-sm h-11"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="contact-email" className="text-xs">Email Address</Label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="vikram@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-background/80 border-border/60 text-sm h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-subject" className="text-xs">Subject / Purpose</Label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="flex h-11 w-full rounded-md border border-border/60 bg-background/80 px-3 py-2 text-sm outline-none focus:border-primary"
                        >
                          <option value="Buying Property">Looking to Buy Property in Jaipur</option>
                          <option value="Selling Property">Looking to Sell / Divest Property</option>
                          <option value="Leasing">Commercial or Residential Leasing</option>
                          <option value="NRI Advisory">NRI Investment Portfolio Advisory</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="contact-message" className="text-xs">Your Requirements</Label>
                        <Textarea
                          id="contact-message"
                          placeholder="Preferred locality, budget, configuration, or any specific instructions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-background/80 border-border/60 resize-none h-24 text-sm"
                        />
                      </div>

                      <Button type="submit" disabled={loading} className="w-full h-12 text-sm font-semibold mt-2">
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message <ArrowRight className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </Button>
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
