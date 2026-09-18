"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface LeadCaptureFormProps {
  source?: string;
  propertyId?: string;
  propertyTitle?: string;
  onSuccess?: () => void;
}

export function LeadCaptureForm({
  source = "Website Form",
  propertyId,
  propertyTitle,
  onSuccess
}: LeadCaptureFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    intent: "Buy",
    propertyType: "Apartment",
    budget: "₹1 Cr - ₹3 Cr",
    timeline: "Immediately",
    name: "",
    phone: "",
    email: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const updateData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (step < 5) {
      setTimeout(handleNext, 200);
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source,
          propertyId,
          propertyTitle: propertyTitle || (propertyId ? `Property ID: ${propertyId}` : undefined)
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error. Please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-foreground">Inquiry Received!</h3>
          <p className="text-muted-foreground text-xs mt-1.5 leading-relaxed">
            Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. An EstateModern property specialist will review your preferences and contact you at <span className="text-foreground font-semibold">{formData.phone}</span> shortly.
          </p>
        </div>
        <div className="pt-3">
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              `Hello, I just submitted an inquiry for ${propertyTitle || "a property"} on your website. My name is ${formData.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white">
              Connect on WhatsApp Instantly
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-primary" /> Step {step} of 5
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-6 bg-primary" : i < step ? "w-2 bg-primary/50" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[210px] flex flex-col justify-center">
        {step === 1 && (
          <div className="space-y-3 animate-in slide-in-from-right-3 duration-200">
            <h3 className="font-heading font-semibold text-base text-foreground">What is your primary goal?</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {["Buy", "Rent", "Invest", "Sell"].map(opt => (
                <Button
                  key={opt}
                  type="button"
                  variant={formData.intent === opt ? "default" : "outline"}
                  className={`h-11 border-border/70 text-sm font-medium transition-all ${
                    formData.intent === opt
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-background/60 hover:bg-secondary"
                  }`}
                  onClick={() => updateData("intent", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 animate-in slide-in-from-right-3 duration-200">
            <h3 className="font-heading font-semibold text-base text-foreground">What property category?</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {["Apartment", "Villa", "Plot", "Commercial"].map(opt => (
                <Button
                  key={opt}
                  type="button"
                  variant={formData.propertyType === opt ? "default" : "outline"}
                  className={`h-11 border-border/70 text-sm font-medium transition-all ${
                    formData.propertyType === opt
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-background/60 hover:bg-secondary"
                  }`}
                  onClick={() => updateData("propertyType", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2.5 animate-in slide-in-from-right-3 duration-200">
            <h3 className="font-heading font-semibold text-base text-foreground">What is your budget?</h3>
            <div className="grid grid-cols-1 gap-2">
              {["Under ₹50 Lacs", "₹50 Lacs - ₹1 Cr", "₹1 Cr - ₹3 Cr", "Above ₹3 Cr"].map(opt => (
                <Button
                  key={opt}
                  type="button"
                  variant={formData.budget === opt ? "default" : "outline"}
                  className={`h-10 justify-start px-4 border-border/70 text-xs font-medium transition-all ${
                    formData.budget === opt
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-background/60 hover:bg-secondary"
                  }`}
                  onClick={() => updateData("budget", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2.5 animate-in slide-in-from-right-3 duration-200">
            <h3 className="font-heading font-semibold text-base text-foreground">When do you plan to decide?</h3>
            <div className="grid grid-cols-1 gap-2">
              {["Immediately", "1-3 months", "3-6 months", "Just researching"].map(opt => (
                <Button
                  key={opt}
                  type="button"
                  variant={formData.timeline === opt ? "default" : "outline"}
                  className={`h-10 justify-start px-4 border-border/70 text-xs font-medium transition-all ${
                    formData.timeline === opt
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-background/60 hover:bg-secondary"
                  }`}
                  onClick={() => updateData("timeline", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <form onSubmit={submitLead} className="space-y-3.5 animate-in slide-in-from-right-3 duration-200">
            <h3 className="font-heading font-semibold text-base text-foreground">Where should we send details?</h3>

            {error && (
              <div className="p-2 rounded bg-destructive/10 text-destructive text-xs border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="lead-name" className="text-xs">Full Name *</Label>
              <Input
                id="lead-name"
                placeholder="e.g. Vikram Sharma"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/80 border-border/60 h-10 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="lead-phone" className="text-xs">Phone / WhatsApp *</Label>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="bg-background/80 border-border/60 h-10 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="lead-email" className="text-xs">Email (Optional)</Label>
              <Input
                id="lead-email"
                type="email"
                placeholder="vikram@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/80 border-border/60 h-10 text-sm"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-semibold">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    Request Details <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>

      {step > 1 && step < 5 && (
        <div className="flex justify-between pt-2 border-t border-border/40">
          <Button type="button" variant="ghost" size="sm" onClick={handleBack} className="text-muted-foreground text-xs h-8">
            Back
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleNext} className="text-primary text-xs h-8">
            Skip
          </Button>
        </div>
      )}
    </div>
  );
}
