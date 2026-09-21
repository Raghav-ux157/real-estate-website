import { Phone, MessageCircle } from "lucide-react";

export function MobileCTAs() {
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello EstateModern, I am looking for property advisory in Jaipur. Could you please assist me?"
  )}`;

  return (
    <>
      {/* Fixed WhatsApp floating button (Visible on Desktop) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group hidden md:flex"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-full mr-3 bg-card border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Sticky Bottom Bar for Mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-background/95 backdrop-blur-xl border-t border-border/70 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] grid grid-cols-2 gap-2.5 shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
        <a
          href="tel:+919876543210"
          className="flex items-center justify-center gap-2 h-12 bg-secondary/90 hover:bg-secondary border border-border/80 rounded-xl text-xs font-semibold text-foreground active:scale-95 transition-all shadow-sm"
        >
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Call Advisor</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
          </div>
          <span>WhatsApp Us</span>
        </a>
      </div>
    </>
  );
}
