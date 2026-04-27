import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onOpenChatbot: () => void;
}

export function Navbar({ onOpenChatbot }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const links = [
    { label: "Bestsellers", href: "#bestsellers" },
    { label: "Collection", href: "#collection" },
    { label: "Ritual", href: "#ritual" },
    { label: "Results", href: "#results" },
    { label: "Journal", href: "#journal" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top announcement bar */}
      <div className="bg-emerald-deep text-cream py-2 text-center text-xs tracking-[0.25em] uppercase">
        <span className="text-champagne">✦</span> Complimentary shipping on orders above ₹2,499 <span className="text-champagne">✦</span>
      </div>

      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-serif text-3xl tracking-wide text-emerald-deep">
                Verdané
              </span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-champagne-deep border-l border-champagne-deep pl-2 ml-1">
                Maison
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm tracking-wide text-foreground/80 hover:text-emerald-deep transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-champagne-deep transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenChatbot}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-deep text-cream text-xs tracking-[0.15em] uppercase hover:bg-emerald-rich transition-colors shadow-soft"
              >
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                Consult
              </button>
              <button className="p-2 text-foreground hover:text-emerald-deep transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <Link 
                to="/cart" 
                className="p-2 text-foreground hover:text-emerald-deep transition-colors relative" 
                aria-label="Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-champagne-deep text-[10px] font-bold text-emerald-deep">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button
                className="lg:hidden p-2"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="lg:hidden pb-6 animate-fade-up">
              <div className="flex flex-col gap-4 pt-2 border-t border-border">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm tracking-wide text-foreground/80 hover:text-emerald-deep py-1"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setOpen(false);
                    onOpenChatbot();
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-emerald-deep text-cream text-xs tracking-[0.15em] uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5 text-champagne" />
                  Begin Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
