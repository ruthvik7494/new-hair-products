import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-emerald-deep text-cream pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-champagne-deep/20">
          <div className="col-span-2">
            <div className="font-serif text-3xl text-champagne mb-4">Verdané</div>
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              A modern apothecary devoted to the royal art of hair care. Botanically pure, clinically proven.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-champagne-deep/40 flex items-center justify-center hover:bg-champagne/10 transition-colors">
                <Instagram className="w-4 h-4 text-champagne" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-champagne-deep/40 flex items-center justify-center hover:bg-champagne/10 transition-colors">
                <Facebook className="w-4 h-4 text-champagne" />
              </a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 rounded-full border border-champagne-deep/40 flex items-center justify-center hover:bg-champagne/10 transition-colors">
                <Youtube className="w-4 h-4 text-champagne" />
              </a>
            </div>
          </div>

          {[
            { title: "Maison", links: ["Our Story", "Atelier", "Press", "Sustainability"] },
            { title: "Care", links: ["Shipping", "Returns", "FAQ", "Contact"] },
            { title: "Discover", links: ["Bestsellers", "Rituals", "Journal", "Loyalty"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs tracking-[0.3em] uppercase text-champagne mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-cream/70 hover:text-champagne transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <div>© 2024 Maison Verdané. All rights reserved.</div>
          <div className="tracking-[0.2em] uppercase">Crafted with reverence in India</div>
        </div>
      </div>
    </footer>
  );
}
