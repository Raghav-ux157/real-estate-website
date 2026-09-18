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
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-background/95 backdrop-blur-lg border-t border-border/70 p-2.5 grid grid-cols-2 gap-2 shadow-[0_-4px_25px_rgba(0,0,0,0.4)]">
        <a
          href="tel:+919876543210"
          className="flex items-center justify-center gap-2 h-11 bg-secondary border border-border/60 rounded-lg text-xs font-semibold text-foreground active:scale-98 transition-transform"
        >
          <Phone className="w-4 h-4 text-primary" />
          Call Advisor
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-11 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-semibold shadow-md active:scale-98 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
