"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, SlidersHorizontal, RotateCcw, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProperties, Property } from "@/lib/data";

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialLocation = searchParams.get("location") || "all";
  const initialType = searchParams.get("type") || "all";

  const [search, setSearch] = useState(initialSearch);
  const [propertyType, setPropertyType] = useState(initialType);
  const [budget, setBudget] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [location, setLocation] = useState(initialLocation);
  const [sort, setSort] = useState("relevance");

  // Fetch all properties
  const allProperties = useMemo(() => getProperties(), []);

  // Filter properties in real time
  const filteredProperties = useMemo(() => {
    let list = [...allProperties];

    // Search query filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
      );
    }

    // Location filter
    if (location !== "all") {
      list = list.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    }

    // Property Type filter
    if (propertyType !== "all") {
      list = list.filter(p => p.propertyType.toLowerCase() === propertyType.toLowerCase());
    }

    // Bedrooms filter
    if (bedrooms !== "all") {
      const bhk = parseInt(bedrooms);
      if (bhk === 4) {
        list = list.filter(p => p.bedrooms >= 4);
      } else {
        list = list.filter(p => p.bedrooms === bhk);
      }
    }

    // Budget filter
    if (budget !== "all") {
      if (budget === "under-50") {
        list = list.filter(p => p.price < 5000000);
      } else if (budget === "50-100") {
        list = list.filter(p => p.price >= 5000000 && p.price <= 10000000);
      } else if (budget === "1-3") {
        list = list.filter(p => p.price > 10000000 && p.price <= 30000000);
      } else if (budget === "above-3") {
        list = list.filter(p => p.price > 30000000);
      }
    }

    // Sort
    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === "area") {
      list.sort((a, b) => b.areaSqft - a.areaSqft);
    }

    return list;
  }, [allProperties, search, location, propertyType, budget, bedrooms, sort]);

  const hasActiveFilters = search || propertyType !== "all" || budget !== "all" || bedrooms !== "all" || location !== "all";

  const resetFilters = () => {
    setSearch("");
    setPropertyType("all");
    setBudget("all");
    setBedrooms("all");
    setLocation("all");
    setSort("relevance");
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
            <Building2 className="w-3.5 h-3.5" /> Jaipur Real Estate Portfolio
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-3">Discover Properties</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
            Find your ideal luxury villa, modern apartment, or high-yield commercial space across Jaipur's most sought-after neighborhoods.
          </p>
        </div>

        {/* Advanced Interactive Search Filters */}
        <Card className="bg-card border-border/70 shadow-xl mb-10 rounded-2xl overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              
              {/* Keyword Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search locality, project, specs..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-background/70 border-border/60 h-12 rounded-xl text-sm" 
                />
              </div>

              {/* Property Type */}
              <Select value={propertyType} onValueChange={(val) => setPropertyType(val || "all")}>
                <SelectTrigger className="h-12 bg-background/70 border-border/60 rounded-xl text-sm">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Property Types</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villa">Luxury Villa</SelectItem>
                  <SelectItem value="Commercial">Commercial Office / Retail</SelectItem>
                </SelectContent>
              </Select>

              {/* Budget Range */}
              <Select value={budget} onValueChange={(val) => setBudget(val || "all")}>
                <SelectTrigger className="h-12 bg-background/70 border-border/60 rounded-xl text-sm">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="under-50">Under ₹50 Lacs</SelectItem>
                  <SelectItem value="50-100">₹50 Lacs - ₹1 Cr</SelectItem>
                  <SelectItem value="1-3">₹1 Cr - ₹3 Cr</SelectItem>
                  <SelectItem value="above-3">Above ₹3 Cr</SelectItem>
                </SelectContent>
              </Select>

              {/* BHK Configuration */}
              <Select value={bedrooms} onValueChange={(val) => setBedrooms(val || "all")}>
                <SelectTrigger className="h-12 bg-background/70 border-border/60 rounded-xl text-sm">
                  <SelectValue placeholder="BHK Configuration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All BHK Configurations</SelectItem>
                  <SelectItem value="2">2 BHK</SelectItem>
                  <SelectItem value="3">3 BHK</SelectItem>
                  <SelectItem value="4">4+ BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick locality pills & reset */}
            <div className="flex flex-wrap justify-between items-center pt-4 border-t border-border/40 gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-muted-foreground font-medium">Locality:</span>
                {["all", "Vaishali Nagar", "C-Scheme", "Jagatpura", "Mansarovar", "Malviya Nagar"].map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      location.toLowerCase() === loc.toLowerCase()
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {loc === "all" ? "All Locations" : loc}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters} 
                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5 h-8"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <p className="text-muted-foreground font-medium text-sm">
            Showing <span className="text-foreground font-bold">{filteredProperties.length}</span> verified {filteredProperties.length === 1 ? "property" : "properties"}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Sort by:</span>
            <Select value={sort} onValueChange={(val) => setSort(val || "relevance")}>
              <SelectTrigger className="w-[170px] h-9 bg-card border-border/60 text-xs rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Featured & Relevance</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="area">Area: Largest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
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

                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium text-white">
                      {property.images.length} Photos
                    </div>
                  </div>

                  <CardContent className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{property.location}</span>
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
                        <p className="text-[11px] text-muted-foreground mb-0.5">Price</p>
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
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-card/40 border border-dashed border-border rounded-2xl p-8 max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">No Matching Properties</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
              We couldn't find any listings matching your specific search filters.
            </p>
            <Button onClick={resetFilters} variant="outline" className="rounded-xl">
              Reset Filters & View All
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-muted-foreground">Loading properties...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
