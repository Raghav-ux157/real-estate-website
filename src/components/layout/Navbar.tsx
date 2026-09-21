"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, Phone, ShieldCheck, Calendar, Home, Building2, Tag, Info, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SiteVisitModal } from "@/components/lead/SiteVisitModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link
              href="/admin"
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3" />
              CRM
            </Link>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open mobile navigation"
                  className="p-2 border border-border/80 rounded-xl bg-card/80 backdrop-blur-md hover:bg-secondary active:scale-95 transition-all text-foreground"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[340px] bg-card border-l-border/60 p-0 flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Drawer Header */}
                  <div className="p-6 border-b border-border/50 bg-secondary/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
                        <span className="text-primary-foreground font-heading font-bold text-xl">E</span>
                      </div>
                      <div>
                        <span className="text-lg font-heading font-bold tracking-tight text-foreground block leading-tight">
                          Estate<span className="text-primary">Modern</span>
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">
                          Luxury Real Estate Advisory
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-4 flex flex-col gap-1">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1">
                      Explore
                    </p>
                    {[
                      { href: "/", label: "Home", icon: Home },
                      { href: "/properties", label: "Explore Properties", icon: Building2 },
                      { href: "/sell", label: "Sell / Rent Property", icon: Tag },
                      { href: "/about", label: "About EstateModern", icon: Info },
                      { href: "/contact", label: "Contact Advisors", icon: Mail },
                      { href: "/admin", label: "Admin CRM Portal", icon: ShieldCheck, badge: "Advisor" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary/60 active:bg-secondary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center text-primary shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span>{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Quick Actions */}
                <div className="p-5 border-t border-border/50 bg-secondary/10 space-y-2.5">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setVisitModalOpen(true);
                    }}
                    className="w-full h-11 text-xs font-semibold rounded-xl shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Private Tour
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="tel:+919876543210"
                      className="flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl bg-secondary border border-border/60 text-xs font-semibold text-foreground hover:bg-secondary/80"
                    >
                      <Phone className="w-3.5 h-3.5 text-primary" /> Call Us
                    </a>
                    <a
                      href="https://wa.me/919876543210?text=Hello%20EstateModern"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/25"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" /> WhatsApp
                    </a>
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
