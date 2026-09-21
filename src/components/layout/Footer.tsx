import Link from "next/link";
import { Instagram, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-12 md:pt-16 pb-32 md:pb-12 mt-12 md:mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/20">
                <span className="text-primary-foreground font-heading font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-heading font-bold tracking-tight">
                Estate<span className="text-primary">Modern</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm leading-relaxed">
              Discover carefully selected residential, commercial and luxury investment properties across Jaipur with dedicated advisory from search to possession.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center hover:text-primary hover:bg-secondary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center hover:text-primary hover:bg-secondary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center hover:text-primary hover:bg-secondary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/properties" className="hover:text-primary transition-colors">Explore All Properties</Link></li>
              <li><Link href="/sell" className="hover:text-primary transition-colors">Sell or Rent Property</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About EstateModern</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Our Advisors</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin CRM Portal</Link></li>
            </ul>
          </div>

          {/* Localities */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Prime Localities</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/properties?location=Vaishali+Nagar" className="hover:text-primary transition-colors">Vaishali Nagar</Link></li>
              <li><Link href="/properties?location=C-Scheme" className="hover:text-primary transition-colors">C-Scheme</Link></li>
              <li><Link href="/properties?location=Jagatpura" className="hover:text-primary transition-colors">Jagatpura</Link></li>
              <li><Link href="/properties?location=Civil+Lines" className="hover:text-primary transition-colors">Civil Lines</Link></li>
              <li><Link href="/properties?location=Mansarovar" className="hover:text-primary transition-colors">Mansarovar</Link></li>
              <li><Link href="/properties?location=Malviya+Nagar" className="hover:text-primary transition-colors">Malviya Nagar</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Level 4, Modern Tower, C-Scheme<br/>Jaipur, Rajasthan 302001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:contact@estatemodern.com" className="hover:text-primary transition-colors">contact@estatemodern.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EstateModern Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
