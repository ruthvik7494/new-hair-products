import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 2499 ? 0 : 250;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenChatbot={() => {}} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="p-2 hover:bg-emerald-deep/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-emerald-deep" />
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl text-emerald-deep">Your Bag</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-card-gradient border border-border rounded-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-deep/5 mb-6">
              <ShoppingBag className="w-8 h-8 text-emerald-deep/40" />
            </div>
            <h2 className="font-serif text-2xl text-emerald-deep mb-4">Your bag is currently empty</h2>
            <p className="text-muted-foreground mb-8">Discover our collection of botanical hair care essentials.</p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-emerald-deep text-cream tracking-[0.25em] text-xs uppercase hover:bg-emerald-rich transition-colors shadow-soft"
            >
              Shop the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-card-gradient border border-border rounded-sm hover:border-champagne-deep/30 transition-all duration-500 group"
                  >
                    <div className="w-full sm:w-32 h-32 bg-emerald-deep rounded-sm overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne-deep mb-1">{item.tagline}</p>
                          <h3 className="font-serif text-xl text-emerald-deep mb-1">{item.name}</h3>
                        </div>
                        <p className="font-serif text-xl text-emerald-deep">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-sm overflow-hidden bg-background">
                          <button 
                            onClick={() => {
                              if (item.quantity <= 1) {
                                setItemToRemove(item);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-1 text-sm font-medium min-w-[32px] text-center">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => setItemToRemove(item)}
                          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={clearCart}
                className="mt-8 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8 bg-emerald-deep text-cream rounded-sm shadow-royal">
                <h3 className="font-serif text-2xl mb-8">Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-champagne/80">Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-champagne/80">Shipping</span>
                    <span>{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
                  </div>
                  <div className="gold-divider opacity-20" />
                  <div className="flex justify-between text-xl font-serif">
                    <span className="text-champagne">Total</span>
                    <span className="text-champagne">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsCheckingOut(true)}
                  disabled={isCheckingOut}
                  className="w-full inline-flex items-center justify-center gap-3 py-4 bg-champagne-gradient text-emerald-deep tracking-[0.25em] text-xs uppercase hover:opacity-90 transition-all shadow-gold disabled:opacity-50"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="mt-6 text-[10px] text-center text-champagne/60 leading-relaxed uppercase tracking-wider">
                  Secure checkout powered by Verdané maison.<br/>All taxes included.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Removal Confirmation Modal */}
      {itemToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-deep/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-background max-w-sm w-full p-8 rounded-sm shadow-royal animate-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
                <Trash2 className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="font-serif text-2xl text-emerald-deep mb-2">Remove from Bag?</h3>
              <p className="text-muted-foreground text-sm mb-8">
                Are you sure you want to remove <span className="font-medium text-emerald-deep">{itemToRemove.name}</span> from your selections?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    removeFromCart(itemToRemove.id);
                    setItemToRemove(null);
                  }}
                  className="w-full py-4 bg-destructive text-destructive-foreground tracking-[0.2em] text-[10px] uppercase hover:opacity-90 transition-colors font-bold"
                >
                  Yes, Remove Item
                </button>
                <button
                  onClick={() => setItemToRemove(null)}
                  className="w-full py-4 border border-border text-foreground tracking-[0.2em] text-[10px] uppercase hover:bg-muted transition-colors"
                >
                  No, Keep Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
