"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, CheckCircle2, Building, Sparkles } from "lucide-react";

interface SiteVisitModalProps {
  propertyId?: string;
  propertyTitle?: string;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SiteVisitModal({
  propertyId,
  propertyTitle = "Selected Property",
  trigger,
  isOpen,
  onOpenChange
}: SiteVisitModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    scheduledDate: "",
    scheduledTime: "11:00 AM",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: formData.name,
          leadPhone: formData.phone,
          leadEmail: formData.email,
          propertyId,
          propertyTitle,
          scheduledDate: formData.scheduledDate || "This Weekend",
          scheduledTime: formData.scheduledTime,
          notes: formData.notes
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.warn("API route unavailable, using client store:", err);
    }

    // Fallback for static GitHub Pages
    const { createSiteVisit } = await import("@/lib/data");
    createSiteVisit({
      leadName: formData.name,
      leadPhone: formData.phone,
      leadEmail: formData.email,
      propertyId,
      propertyTitle,
      scheduledDate: formData.scheduledDate || "This Weekend",
      scheduledTime: formData.scheduledTime,
      notes: formData.notes
    });
    setSubmitted(true);
    setLoading(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      scheduledDate: "",
      scheduledTime: "11:00 AM",
      notes: ""
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger render={trigger as React.ReactElement} />}
      <DialogContent className="sm:max-w-md bg-card border border-border/70 p-6 rounded-2xl shadow-2xl">
        {submitted ? (
          <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground">Visit Request Received!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
              Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. Our senior advisor will call you at <span className="text-foreground font-semibold">{formData.phone}</span> to confirm your slot for <span className="text-primary font-semibold">{propertyTitle}</span>.
            </p>
            <div className="pt-4 flex flex-col gap-2">
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I just booked a site visit for ${propertyTitle}. Can you send me the location pin?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white">
                  Chat on WhatsApp Now
                </Button>
              </a>
              <Button variant="outline" onClick={handleReset} className="w-full">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" /> VIP Property Tour
              </div>
              <DialogTitle className="text-2xl font-heading font-bold">Schedule a Private Tour</DialogTitle>
              <p className="text-xs text-muted-foreground">
                Experience the property with a private guided walkthrough.
              </p>
            </DialogHeader>

            {propertyTitle && (
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-secondary/40 border border-border/50 text-sm">
                <Building className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-foreground truncate">{propertyTitle}</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="visit-name" className="text-xs">Your Name *</Label>
                <Input
                  id="visit-name"
                  placeholder="e.g. Rahul Sharma"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background border-border/60"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="visit-phone" className="text-xs">Phone / WhatsApp Number *</Label>
                <Input
                  id="visit-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background border-border/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="visit-date" className="text-xs flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Preferred Date
                  </Label>
                  <Input
                    id="visit-date"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={e => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="bg-background border-border/60 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="visit-time" className="text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" /> Preferred Time
                  </Label>
                  <select
                    id="visit-time"
                    value={formData.scheduledTime}
                    onChange={e => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 text-sm font-semibold mt-2">
              {loading ? "Scheduling Tour..." : "Confirm Visit Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
