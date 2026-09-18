"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Phone, ShieldCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SiteVisitModal } from "@/components/lead/SiteVisitModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-heading font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-heading font-bold tracking-tight text-foreground">
              Estate<span className="text-primary">Modern</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link href="/properties" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Properties
            </Link>
            <Link href="/sell" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sell / Rent
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>

            <Link href="/admin" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1.5 border border-primary/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              CRM Portal
            </Link>

            <div className="w-px h-4 bg-border"></div>

            <div className="flex items-center gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </a>

              <Button 
                onClick={() => setVisitModalOpen(true)}
                className="rounded-full px-5 h-9 font-semibold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Site Visit
              </Button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/admin" className="text-xs font-medium px-2 py-1 rounded-md bg-secondary text-primary border border-border">
              CRM
            </Link>

            <Sheet>
              <SheetTrigger className="p-2 border border-border rounded-md hover:bg-secondary transition-colors">
                <Menu className="w-5 h-5 text-foreground" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background border-l-border/50 p-6">
                <div className="flex flex-col gap-5 mt-8">
                  <Link href="/" className="text-lg font-medium border-b border-border/50 pb-3 hover:text-primary">
                    Home
                  </Link>
                  <Link href="/properties" className="text-lg font-medium border-b border-border/50 pb-3 hover:text-primary">
                    Explore Properties
                  </Link>
                  <Link href="/sell" className="text-lg font-medium border-b border-border/50 pb-3 hover:text-primary">
                    Sell or Rent
                  </Link>
                  <Link href="/about" className="text-lg font-medium border-b border-border/50 pb-3 hover:text-primary">
                    About EstateModern
                  </Link>
                  <Link href="/contact" className="text-lg font-medium border-b border-border/50 pb-3 hover:text-primary">
                    Contact Us
                  </Link>
                  <Link href="/admin" className="text-lg font-medium border-b border-border/50 pb-3 text-primary flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Admin CRM
                  </Link>

                  <div className="mt-4 flex flex-col gap-3">
                    <a 
                      href="tel:+919876543210" 
                      className="flex items-center justify-center gap-2 p-3 rounded-md bg-secondary text-secondary-foreground font-medium text-sm"
                    >
                      <Phone className="w-4 h-4 text-primary" />
                      +91 98765 43210
                    </a>
                    <Button 
                      onClick={() => setVisitModalOpen(true)}
                      className="w-full h-11 text-sm font-semibold"
                    >
                      Book Site Visit
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SiteVisitModal 
        isOpen={visitModalOpen} 
        onOpenChange={setVisitModalOpen} 
        propertyTitle="EstateModern Featured Property" 
      />
    </>
  );
}
