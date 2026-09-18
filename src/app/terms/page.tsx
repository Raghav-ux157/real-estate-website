import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-6 bg-card border border-border/70 p-8 md:p-12 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 text-primary">
            <Scale className="w-6 h-6" />
            <span className="text-xs font-semibold uppercase tracking-wider">EstateModern Legal</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Terms of Service</h1>
          <p className="text-xs text-muted-foreground">Effective Date: January 1, 2024</p>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/60">
            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">1. Property Listings & Accuracy</h2>
              <p>
                Property descriptions, prices, floor plans, and amenities displayed on EstateModern are compiled with reasonable care from developer disclosures and property title records. Prices and availability are subject to change without prior notice based on owner discretion.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">2. Fiduciary Advisory Role</h2>
              <p>
                EstateModern acts as a real estate consultancy and facilitator. Final purchase transactions are formalized via statutory sale deeds, agreement for sale, and RERA compliance documentation between the buyer and seller.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">3. Governing Law & Jurisdiction</h2>
              <p>
                Any dispute arising out of or related to our website or consultancy services shall be subject to the exclusive jurisdiction of the competent courts in Jaipur, Rajasthan, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
