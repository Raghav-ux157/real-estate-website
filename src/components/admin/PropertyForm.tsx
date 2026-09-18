"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface PropertyFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PropertyForm({ onSuccess, onCancel }: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "Vaishali Nagar, Jaipur",
    propertyType: "Apartment",
    intent: "Buy",
    price: 15000000,
    areaSqft: 1800,
    bedrooms: 3,
    bathrooms: 3,
    status: "AVAILABLE",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    amenitiesText: "24/7 Security, Covered Parking, Modern Clubhouse, Swimming Pool, Power Backup"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const amenities = formData.amenitiesText
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          propertyType: formData.propertyType,
          intent: formData.intent,
          price: Number(formData.price),
          areaSqft: Number(formData.areaSqft),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          status: formData.status,
          description: formData.description || `Luxurious ${formData.propertyType} located in ${formData.location}.`,
          images: [formData.imageUrl],
          amenities: amenities.length > 0 ? amenities : ["24/7 Security", "Covered Parking"]
        })
      });

      const data = await res.json();
      if (data.success) {
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Failed to create property.");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs border border-destructive/20">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-3 bg-secondary/30 p-4 rounded-xl border border-border/50">
        <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-primary">Basic Listing Info</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="title" className="text-xs">Property Title *</Label>
            <Input 
              id="title" 
              placeholder="e.g. Royal Meadows Villa" 
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="bg-background text-xs h-9" 
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="location" className="text-xs">Location / Micro-Market *</Label>
            <Input 
              id="location" 
              placeholder="e.g. Vaishali Nagar, Jaipur" 
              required
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="bg-background text-xs h-9" 
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type" className="text-xs">Property Type</Label>
            <select 
              id="type" 
              value={formData.propertyType}
              onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
              className="flex h-9 w-full rounded-md border border-border/60 bg-background px-3 py-1 text-xs outline-none"
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
              <option value="Plot">Plot</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="intent" className="text-xs">Transaction Intent</Label>
            <select 
              id="intent" 
              value={formData.intent}
              onChange={e => setFormData({ ...formData, intent: e.target.value })}
              className="flex h-9 w-full rounded-md border border-border/60 bg-background px-3 py-1 text-xs outline-none"
            >
              <option value="Buy">For Sale (Buy)</option>
              <option value="Rent">For Lease (Rent)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing & Dimensions */}
      <div className="space-y-3 bg-secondary/30 p-4 rounded-xl border border-border/50">
        <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-primary">Pricing & Dimensions</h4>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label htmlFor="price" className="text-xs">Price (₹) *</Label>
            <Input 
              id="price" 
              type="number" 
              required
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
              className="bg-background text-xs h-9" 
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="area" className="text-xs">Super Area (Sq.ft)</Label>
            <Input 
              id="area" 
              type="number" 
              value={formData.areaSqft}
              onChange={e => setFormData({ ...formData, areaSqft: Number(e.target.value) })}
              className="bg-background text-xs h-9" 
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="bedrooms" className="text-xs">Bedrooms (BHK)</Label>
            <Input 
              id="bedrooms" 
              type="number" 
              value={formData.bedrooms}
              onChange={e => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
              className="bg-background text-xs h-9" 
            />
          </div>
        </div>
      </div>

      {/* Description & Media */}
      <div className="space-y-3 bg-secondary/30 p-4 rounded-xl border border-border/50">
        <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-primary">Description & Media</h4>
        
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="imageUrl" className="text-xs">Image URL (Unsplash or CDN)</Label>
            <Input 
              id="imageUrl" 
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="bg-background text-xs h-9" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="amenitiesText" className="text-xs">Amenities (Comma-separated)</Label>
            <Input 
              id="amenitiesText" 
              value={formData.amenitiesText}
              onChange={e => setFormData({ ...formData, amenitiesText: e.target.value })}
              className="bg-background text-xs h-9" 
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs">Description</Label>
            <Textarea 
              id="description" 
              rows={3} 
              placeholder="Describe unique architectural elements, finishes, view..." 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="bg-background text-xs" 
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" size="sm" onClick={onCancel} className="text-xs">
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" disabled={loading} className="text-xs font-semibold">
          {loading ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving Listing...</> : "Save Property Listing"}
        </Button>
      </div>
    </form>
  );
}
