"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  MapPin, Bed, Bath, Square, Check, Share2, Heart, Phone, MessageCircle, 
  ArrowLeft, Calendar, ShieldCheck, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LeadCaptureForm } from "@/components/lead/LeadCaptureForm";
import { SiteVisitModal } from "@/components/lead/SiteVisitModal";
import { getPropertyById, Property } from "@/lib/data";

export function PropertyDetailClient({ id }: { id: string }) {
  const property = getPropertyById(id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  if (!property) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-background text-center px-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-secondary text-muted-foreground rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-heading font-bold">Property Not Found</h1>
          <p className="text-muted-foreground text-sm">
            The property listing you are looking for may have been leased, sold, or moved.
          </p>
          <Link href="/properties">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: property.title,
            text: `Check out ${property.title} in ${property.location} on EstateModern`,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      } catch (e) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello EstateModern, I am interested in "${property.title}" (${property.displayPrice}) in ${property.location} (Ref ID: ${property.id}). Please share more details.`
  );

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Properties
          </Link>

          <Badge variant="outline" className="text-xs bg-secondary/40 border-border">
            Listing ID: {property.id}
          </Badge>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-primary text-primary-foreground font-semibold shadow-md">
                For {property.intent}
              </Badge>
              <Badge variant="outline" className="border-border bg-card">
                {property.propertyType}
              </Badge>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                Verified Listing
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3 tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
              <MapPin className="w-4 h-4 text-primary shrink-0" /> {property.location}
            </div>
          </div>

          <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end border-t md:border-t-0 pt-4 md:pt-0 border-border/50">
            <div className="mb-0 md:mb-3">
              <p className="text-xs text-muted-foreground mb-0.5">Price</p>
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary">{property.displayPrice}</p>
            </div>

            <div className="flex gap-2.5">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleShare}
                aria-label="Share property"
                className={`rounded-full border-border/70 relative transition-colors ${copied ? 'border-primary text-primary' : ''}`}
              >
                <Share2 className="w-4 h-4" />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-foreground text-[10px] px-2 py-0.5 rounded shadow border border-border whitespace-nowrap animate-in fade-in">
                    Link Copied!
                  </span>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setFavorited(!favorited)}
                aria-label="Favorite property"
                className={`rounded-full border-border/70 transition-colors ${favorited ? 'border-rose-500 text-rose-500 fill-rose-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bento Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3.5 h-[55vh] min-h-[380px] max-h-[550px] mb-12 rounded-3xl overflow-hidden shadow-2xl bg-muted">
          <div 
            className="md:col-span-2 md:row-span-2 relative cursor-pointer group overflow-hidden"
            onClick={() => { setActiveImageIndex(0); setGalleryOpen(true); }}
          >
            <Image 
              src={property.images[0]} 
              alt={`${property.title} Main Exterior`} 
              fill 
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
          </div>

          {property.images.slice(1, 4).map((imgUrl, idx) => (
            <div 
              key={idx} 
              className="relative hidden md:block cursor-pointer group overflow-hidden"
              onClick={() => { setActiveImageIndex(idx + 1); setGalleryOpen(true); }}
            >
              <Image 
                src={imgUrl} 
                alt={`${property.title} Photo ${idx + 2}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors"></div>
            </div>
          ))}

          <div 
            className="relative hidden md:block group cursor-pointer overflow-hidden"
            onClick={() => { setActiveImageIndex(0); setGalleryOpen(true); }}
          >
            <Image 
              src={property.images[0]} 
              alt="More photos" 
              fill 
              className="object-cover opacity-50 group-hover:opacity-40 transition-opacity" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs group-hover:bg-black/40 transition-colors">
              <span className="text-white font-semibold text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" /> View Gallery ({property.images.length})
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Details, Specs, Amenities) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Key Specs Bar */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/60 bg-card/40 rounded-2xl px-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/80 rounded-xl text-primary shrink-0">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                  <p className="font-semibold text-base text-foreground">{property.bedrooms} Beds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/80 rounded-xl text-primary shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                  <p className="font-semibold text-base text-foreground">{property.bathrooms} Baths</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/80 rounded-xl text-primary shrink-0">
                  <Square className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Super Area</p>
                  <p className="font-semibold text-base text-foreground">{property.areaSqft.toLocaleString()} sq.ft</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">About This Property</h2>
              <div className="text-muted-foreground leading-relaxed text-base space-y-4">
                <p>{property.description}</p>
                <p>
                  Situated in prime {property.location}, this property presents exceptional value with unmatched connectivity to international schools, commercial centers, healthcare facilities, and Jaipur's arterial roadways.
                </p>
                <p>
                  Complete with RERA approvals, clear legal title reports, and dedicated estate management, it stands as an elite residence or high-appreciation asset in Rajasthan's capital.
                </p>
              </div>
            </section>

            {/* Amenities */}
            <section className="space-y-5 pt-4">
              <h2 className="text-2xl font-heading font-bold text-foreground">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 text-sm text-foreground bg-secondary/30 p-2.5 rounded-xl border border-border/40">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Fiduciary Guarantee */}
            <div className="p-6 rounded-2xl bg-secondary/25 border border-border/60 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-semibold text-base text-foreground">Verified by EstateModern Legal Counsel</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Every property listed on EstateModern undergoes strict title verification, encumbrance searches, and physical site inspections before publication.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (Sticky Lead Capture & Direct CTAs) */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-28 space-y-6">
              
              {/* Quick Contact Card */}
              <Card className="bg-card border-border/70 shadow-2xl overflow-hidden rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-bold mb-1">Inquire About This Property</h3>
                  <p className="text-muted-foreground text-xs mb-5">
                    Connect directly with the assigned senior advisor or request a private walkthrough.
                  </p>
                  
                  {/* Direct WhatsApp & Call Buttons */}
                  <div className="space-y-2.5 mb-5">
                    <a 
                      href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full h-11 text-xs font-semibold gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md shadow-emerald-950/20">
                        <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Property Advisor
                      </Button>
                    </a>

                    <Button 
                      variant="outline" 
                      onClick={() => setSiteVisitOpen(true)}
                      className="w-full h-11 text-xs font-semibold gap-2 border-border/80 bg-background/50 hover:bg-secondary"
                    >
                      <Calendar className="w-4 h-4 text-primary" /> Schedule Site Visit
                    </Button>
                  </div>
                  
                  <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/60"></span></div>
                    <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold"><span className="bg-card px-2 text-muted-foreground">Or Send Details</span></div>
                  </div>

                  {/* Multi-Step Lead Capture Form connected to API */}
                  <LeadCaptureForm 
                    source={`Property: ${property.title} (ID: ${property.id})`} 
                    propertyId={property.id}
                    propertyTitle={property.title}
                  />
                </CardContent>
              </Card>

              {/* Agent Info */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-border/60 bg-secondary/30">
                <div className="w-11 h-11 rounded-full bg-border overflow-hidden relative shrink-0">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Rahul Sharma" fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">Rahul Sharma</p>
                  <p className="text-xs text-muted-foreground truncate">Senior Portfolio Manager, Jaipur</p>
                </div>
                <a href="tel:+919876543210" aria-label="Call Rahul Sharma" className="p-2 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                  <Phone className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / Gallery Dialog */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl bg-card/95 border-border/70 p-4 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-heading">{property.title} Photo Gallery</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mt-2">
            <Image 
              src={property.images[activeImageIndex] || property.images[0]} 
              alt={`${property.title} Photo ${activeImageIndex + 1}`} 
              fill 
              className="object-contain" 
            />
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  activeImageIndex === i ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Site Visit Modal */}
      <SiteVisitModal 
        isOpen={siteVisitOpen}
        onOpenChange={setSiteVisitOpen}
        propertyId={property.id}
        propertyTitle={property.title}
      />
    </div>
  );
}
