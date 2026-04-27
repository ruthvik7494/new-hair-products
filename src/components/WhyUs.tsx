import { Leaf, FlaskConical, Crown, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Botanical Purity",
    text: "Wild-harvested emeralds and rare botanicals, never synthetics or sulfates.",
  },
  {
    icon: FlaskConical,
    title: "Master Apothecary",
    text: "Hand-blended in small batches by our trichologists with 20+ years of expertise.",
  },
  {
    icon: Crown,
    title: "Royal Heritage",
    text: "Inspired by ancient palace rituals, refined for the modern crown.",
  },
  {
    icon: Award,
    title: "Clinically Proven",
    text: "94% of patrons report visible regrowth and shine within 90 days.",
  },
];

export function WhyUs() {
  return (
    <section id="ritual" className="py-24 lg:py-32 bg-emerald-deep relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full border border-champagne" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full border border-champagne" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-champagne mb-4">
            The Verdané Standard
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-cream">
            Why a Royal Choice?
          </h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="text-center p-6 border border-champagne-deep/20 rounded-sm hover:border-champagne-deep/60 hover:bg-champagne/5 transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-champagne-deep/40 bg-champagne/10 mb-6">
                <f.icon className="w-7 h-7 text-champagne" />
              </div>
              <h3 className="font-serif text-xl text-cream mb-3">{f.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
