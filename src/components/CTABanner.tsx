import { Sparkles } from "lucide-react";

interface CTABannerProps {
  onOpenChatbot: () => void;
}

export function CTABanner({ onOpenChatbot }: CTABannerProps) {
  return (
    <section className="py-20 bg-royal relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-champagne blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-champagne blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-champagne mb-4">
          Personal Consultation
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream leading-tight">
          Crafted for <span className="italic text-gold-gradient">Your Crown</span>
        </h2>
        <p className="mt-6 text-cream/70 max-w-xl mx-auto text-lg">
          Take our 60-second royal consultation. Receive a personalized regimen built around your unique hair signature.
        </p>
        <button
          onClick={onOpenChatbot}
          className="mt-10 group inline-flex items-center justify-center gap-3 px-10 py-4 bg-champagne-gradient text-emerald-deep font-medium tracking-[0.2em] text-sm uppercase rounded-sm shadow-gold hover:shadow-royal transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Begin Consultation
        </button>
      </div>
    </section>
  );
}
