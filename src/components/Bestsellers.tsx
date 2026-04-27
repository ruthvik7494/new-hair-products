import { products, type Product } from "@/lib/products";
import { ShoppingBag, Star, CheckCircle2, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = cart.some((p) => p.id === product.id);

  const handleAdd = () => {
    if (!isInCart) {
      addToCart(product);
    }
  };

  return (
    <article className="group relative bg-card-gradient border border-border hover:border-champagne-deep/50 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-royal">
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 bg-emerald-deep text-champagne text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-sm">
          {product.badge}
        </div>
      )}
      <div className="relative aspect-square overflow-hidden bg-emerald-deep">
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-champagne-deep mb-2">
          {product.tagline}
        </p>
        <h3 className="font-serif text-xl text-foreground mb-3">
          {product.name}
        </h3>
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3 h-3 fill-champagne text-champagne" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(4.9)</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="font-serif text-2xl text-emerald-deep">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        {isInCart ? (
          <div className="flex flex-col gap-2">
            <button
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] uppercase bg-champagne-deep text-emerald-deep cursor-default rounded-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              In Bag
            </button>
            <button
              onClick={() => removeFromCart(product.id)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-destructive transition-colors border border-border rounded-sm bg-background/50"
            >
              <Trash2 className="w-3 h-3" />
              Remove from Bag
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] uppercase bg-emerald-deep text-cream hover:bg-emerald-rich group-hover:bg-champagne-gradient  transition-all duration-300 rounded-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        )}
      </div>
    </article>
  );
}

export function Bestsellers() {
  return (
    <section id="bestsellers" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-champagne-deep mb-4">
            The Crown Collection
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-emerald-deep">
            Our Bestsellers
          </h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Six rituals, perfected over generations. Each formula is hand-crafted in small batches by our master botanists.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
