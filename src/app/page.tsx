"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, CheckCircle2, Phone, MessageCircle, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteVisitModal } from "@/components/lead/SiteVisitModal";
import { getProperties, Property } from "@/lib/data";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [selectedPropertyForTour, setSelectedPropertyForTour] = useState<string>("Modern Glass Villa");

  // Get real properties from data store
  const allProperties = getProperties();
  const featuredProperties = allProperties.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/properties");
    }
  };

  const handleOpenTour = (title: string) => {
    setSelectedPropertyForTour(title);
    setVisitModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center pt-28 pb-20 overflow-hidden">
        {/* Background Image with Ambient Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Modern Luxury Real Estate in Jaipur"
            fill
            className="object-cover opacity-25 scale-105 animate-in fade-in duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30"></div>
          <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jaipur's Premier Luxury Real Estate Firm</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold leading-[1.1] mb-6 text-foreground tracking-tight">
              Find a Property That <span className="text-primary italic">Fits Your Life.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Discover carefully selected residential, commercial and investment properties across Jaipur with dedicated advisory from search to possession.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/properties">
                <Button size="lg" className="h-13 px-8 text-base font-semibold shadow-lg shadow-primary/25 rounded-xl">
                  Explore Properties <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => handleOpenTour("Luxury Real Estate Advisory")}
                className="h-13 px-8 text-base border-border bg-card/60 backdrop-blur-md rounded-xl hover:bg-secondary"
              >
                Book Private Tour
              </Button>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/40 max-w-lg">
              <div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-primary">₹ 500Cr+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Properties Transacted</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">1,200+</p>
                <p className="text-xs text-muted-foreground mt-0.5">Happy Families</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Verified & RERA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div className="container mx-auto px-4 md:px-8 relative z-20 mt-12 md:mt-16">
          <Card className="bg-card/95 backdrop-blur-2xl border-border/70 shadow-2xl overflow-hidden rounded-2xl max-w-4xl mx-auto">
            <CardContent className="p-3 md:p-5">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center px-4 bg-background/70 rounded-xl border border-border/60 focus-within:border-primary transition-colors">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
                  <Input 
                    placeholder="Search by location (e.g. Vaishali Nagar, C-Scheme), keyword or project..." 
                    className="border-0 bg-transparent focus-visible:ring-0 text-sm md:text-base h-13 px-0 shadow-none placeholder:text-muted-foreground/70"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-13 px-8 shrink-0 text-sm font-semibold rounded-xl">
                  Search Properties
                </Button>
              </form>

              {/* Quick Location Filter Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/30 text-xs text-muted-foreground">
                <span className="font-medium text-foreground mr-1">Popular:</span>
                {["Vaishali Nagar", "C-Scheme", "Jagatpura", "Mansarovar", "Malviya Nagar"].map(loc => (
                  <Link 
                    key={loc} 
                    href={`/properties?location=${encodeURIComponent(loc)}`}
                    className="px-2.5 py-1 rounded-md bg-secondary/60 hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {loc}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase mb-2">
                <Building2 className="w-4 h-4" /> Curated Inventory
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">Featured Listings</h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mt-2">
                Explore our hand-picked selection of premium residences featuring modern architecture, world-class amenities and prime Jaipur addresses.
              </p>
            </div>
            <Link href="/properties">
              <Button variant="ghost" className="gap-2 text-primary hover:text-primary hover:bg-primary/10">
                View All {allProperties.length} Properties <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link key={property.id} href={`/properties/${property.id}`} className="group">
                <Card className="bg-card border-border/60 overflow-hidden hover:border-primary/60 transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image 
                      src={property.images[0]} 
                      alt={property.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-primary text-primary-foreground font-semibold shadow-md">
                        For {property.intent}
                      </Badge>
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-md border-border text-xs">
                        {property.propertyType}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {property.location}
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-6 leading-relaxed">
                        {property.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-end pt-4 border-t border-border/60">
                      <div>
                        <p className="text-[11px] text-muted-foreground mb-0.5">Asking Price</p>
                        <p className="text-2xl font-bold font-heading text-primary">{property.displayPrice}</p>
                      </div>
                      <div className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-md">
                        {property.bhkText}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/properties" className="w-full">
              <Button variant="outline" className="w-full h-12">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-card/40 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase mb-3">
                Why EstateModern
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground leading-tight">
                Integrity, Discretion & Local Mastery.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                With over a decade of hands-on advisory in Jaipur's micro-markets, we don't just broker transactions—we offer fiduciary counsel, verified legal title scrutiny, and strategic portfolio positioning.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "100% Verified & RERA Registered Properties",
                  "Zero Brokerage on Verified Developer Projects",
                  "End-to-End Legal Documentation & Title Search",
                  "Fiduciary Negotiation for the Best Value"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground text-sm md:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/about">
                  <Button size="lg" className="h-12 px-6">Know More About Us</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-6">Visit Our Office</Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="EstateModern Advisory Team in Jaipur" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-8">
                <div>
                  <p className="text-white font-heading font-bold text-2xl">Excellence in Advisory</p>
                  <p className="text-zinc-300 text-sm mt-1">Level 4, Modern Tower, C-Scheme, Jaipur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE CTAs */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <Phone className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
            Looking for an off-market or bespoke property?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
            Tell us your exact preferences and our senior property partners will curate a private list of off-market residences and commercial assets matching your criteria.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => handleOpenTour("Custom Property Search")} 
              className="h-14 px-8 text-base font-semibold shadow-lg shadow-primary/20 rounded-xl"
            >
              Let Us Find It For You
            </Button>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                "Hello EstateModern, I am looking for an off-market property in Jaipur. Can you assist me?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-card border-border/80 rounded-xl flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" /> Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SiteVisitModal 
        isOpen={visitModalOpen} 
        onOpenChange={setVisitModalOpen} 
        propertyTitle={selectedPropertyForTour} 
      />
    </div>
  );
}
