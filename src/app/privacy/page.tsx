import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-6 bg-card border border-border/70 p-8 md:p-12 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 text-primary">
            <Shield className="w-6 h-6" />
            <span className="text-xs font-semibold uppercase tracking-wider">EstateModern Legal</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Effective Date: January 1, 2024 • Last Updated: September 2026</p>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/60">
            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">1. Information We Collect</h2>
              <p>
                When you browse our website, request property details, schedule site visits, or contact our advisory team, we collect information you provide directly, including your name, telephone/WhatsApp number, email address, property preferences, and budget parameters.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">2. Purpose of Processing</h2>
              <p>
                We use your data solely to fulfill real estate advisory services, arrange property walkthroughs, present comparative valuation data, and communicate regarding relevant listings. We do not sell, rent, or lease your private personal information to third-party marketing brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">3. Confidentiality & Security</h2>
              <p>
                All inquiries regarding high-value acquisitions, seller details, and site visits are handled under strict confidentiality protocols by authorized EstateModern advisors.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-heading font-semibold text-foreground">4. Contacting Us</h2>
              <p>
                For questions regarding this policy or to request data removal, contact our data protection team at <a href="mailto:privacy@estatemodern.com" className="text-primary hover:underline">privacy@estatemodern.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
