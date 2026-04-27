import heroImg from "@/assets/hero-collection.jpg";
import { Sparkles } from "lucide-react";

interface HeroProps {
  onOpenChatbot: () => void;
}

export function Hero({ onOpenChatbot }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Decorative gold ornaments */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border border-champagne" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-champagne" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-champagne-deep/40 bg-champagne/5 mb-8">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span className="text-xs tracking-[0.25em] uppercase text-champagne">
                Maison Verdané · Est. 2024
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-cream leading-[1.05] tracking-tight">
              The Royal Ritual<br />
              <span className="italic text-gold-gradient">for Crown-Worthy</span>
              <br />
              Hair.
            </h1>

            <p className="mt-8 text-lg text-cream/70 max-w-md leading-relaxed">
              Botanical apothecary blends, infused with rare emerald extracts and pressed champagne oils. Restore. Revive. Reign.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenChatbot}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-champagne-gradient text-emerald-deep font-medium tracking-[0.15em] text-sm uppercase rounded-sm shadow-gold hover:shadow-royal transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Begin Your Consultation
              </button>
              <a
                href="#bestsellers"
                className="inline-flex items-center justify-center px-8 py-4 border border-champagne-deep/50 text-champagne tracking-[0.15em] text-sm uppercase rounded-sm hover:bg-champagne/10 transition-colors"
              >
                Explore Collection
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 text-cream/60">
              <div>
                <div className="font-serif text-3xl text-champagne">50K+</div>
                <div className="text-xs tracking-[0.2em] uppercase mt-1">Happy Patrons</div>
              </div>
              <div className="w-px h-10 bg-champagne-deep/30" />
              <div>
                <div className="font-serif text-3xl text-champagne">94%</div>
                <div className="text-xs tracking-[0.2em] uppercase mt-1">See Results</div>
              </div>
              <div className="w-px h-10 bg-champagne-deep/30" />
              <div>
                <div className="font-serif text-3xl text-champagne">4.9</div>
                <div className="text-xs tracking-[0.2em] uppercase mt-1">Rating</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-champagne/10 blur-3xl rounded-full" />
            <div className="relative rounded-sm overflow-hidden border border-champagne-deep/30 shadow-royal">
              <img
                src={heroImg}
                alt="Verdané luxury hair care collection"
                width={1600}
                height={1200}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block bg-emerald-deep border border-champagne-deep/50 px-6 py-4 rounded-sm shadow-royal animate-float">
              <div className="text-[10px] tracking-[0.3em] uppercase text-champagne mb-1">Featured Ritual</div>
              <div className="font-serif text-xl text-cream">Imperial Renewal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
