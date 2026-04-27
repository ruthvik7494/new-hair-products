import { useState, useEffect } from "react";
import { 
  MessageSquare, X, Sparkles, ArrowRight, ArrowLeft, 
  CheckCircle2, Mail, ShoppingBag, Send, User, User2 
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { recommendProducts, type Product } from "@/lib/products";
import { useCart } from "../context/CartContext";

// Assets
import hairHealthy from "@/assets/hair-healthy.jpg";
import hairThinning from "@/assets/hair-thinning.jpg";
import hairReceding from "@/assets/hair-receding.jpg";
import hairBald from "@/assets/hair-bald.jpg";
import hairHealthyFemale from "@/assets/hair-healthy-female.png";
import hairThinningFemale from "@/assets/hair-thinning-female.png";
import hairWideningFemale from "@/assets/hair-widening-female.png";
import hairSignificantFemale from "@/assets/hair-significant-female.png";

// Types
type Step = "welcome" | "gender" | "hair" | "details" | "results";

interface FormData {
  gender: string;
  hairCondition: string;
  hairLabel: string;
  name: string;
  age: string;
  phone: string;
  email: string;
}

const initialData: FormData = {
  gender: "",
  hairCondition: "",
  hairLabel: "",
  name: "",
  age: "",
  phone: "",
  email: "",
};

// Hair Options Data
const MALE_OPTIONS = [
  { id: "healthy", label: "Healthy & Full", desc: "Thick coverage, no thinning", img: hairHealthy },
  { id: "thinning", label: "Mild Thinning", desc: "Slight visibility at the crown", img: hairThinning },
  { id: "receding", label: "Receding Hairline", desc: "Visible loss at the temples", img: hairReceding },
  { id: "bald", label: "Significant Loss", desc: "Bald patches or large areas", img: hairBald },
];

const FEMALE_OPTIONS = [
  { id: "healthy", label: "Lustrous Volume", desc: "Thick coverage, vibrant health", img: hairHealthyFemale },
  { id: "thinning", label: "Mild Thinning", desc: "Slight widening of the part line", img: hairThinningFemale },
  { id: "receding", label: "Noticeable Loss", desc: "Widening part and crown thinning", img: hairWideningFemale },
  { id: "bald", label: "Significant Loss", desc: "Large areas of visible scalp", img: hairSignificantFemale },
];

export function ConsultationChatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("welcome");
  const [data, setData] = useState<FormData>(initialData);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [emailSent, setEmailSent] = useState(false);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("welcome");
        setData(initialData);
        setRecommendations([]);
        setEmailSent(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  // Navigation handlers
  const handleStart = () => setStep("gender");
  const handleGender = (gender: string) => {
    setData(prev => ({ ...prev, gender }));
    setStep("hair");
  };
  const handleHair = (id: string, label: string) => {
    const finalData = { ...data, hairCondition: id, hairLabel: label };
    const recs = recommendProducts(finalData.hairCondition);
    setData(finalData);
    setRecommendations(recs);
    setStep("results");
    
    // Save to local storage (minimal version)
    try {
      const history = JSON.parse(localStorage.getItem("verdane_consultations") || "[]");
      history.push({ ...finalData, consultedAt: new Date().toISOString() });
      localStorage.setItem("verdane_consultations", JSON.stringify(history));
    } catch (e) { /* ignore */ }
  };
  const handleDetailsComplete = (details: Partial<FormData>) => {
    const finalData = { ...data, ...details };
    const recs = recommendProducts(finalData.hairCondition);
    setData(finalData);
    setRecommendations(recs);
    setStep("results");
    
    // Save to local storage
    try {
      const history = JSON.parse(localStorage.getItem("verdane_consultations") || "[]");
      history.push({ ...finalData, consultedAt: new Date().toISOString() });
      localStorage.setItem("verdane_consultations", JSON.stringify(history));
    } catch (e) { /* ignore */ }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[calc(100vw-3rem)] sm:w-[420px] max-w-full">
      <div className="relative flex flex-col w-full h-[620px] max-h-[85vh] bg-background border border-champagne-deep/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="bg-emerald-deep px-5 py-4 flex items-center justify-between border-b border-champagne-deep/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-champagne-gradient flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5 text-emerald-deep" />
            </div>
            <div>
              <div className="font-serif text-cream text-lg leading-tight">Royal Assistant</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-champagne/80 mt-0.5">Online Atelier</div>
            </div>
          </div>
          <button onClick={onClose} className="text-cream/60 hover:text-champagne transition-colors p-1.5 hover:bg-white/5 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-card-gradient">
          {step === "welcome" && <WelcomeView onStart={handleStart} />}
          {step === "gender" && <GenderView onSelect={handleGender} onBack={() => setStep("welcome")} />}
          {step === "hair" && <HairView gender={data.gender} onSelect={handleHair} onBack={() => setStep("gender")} />}
          {step === "details" && <DetailsView data={data} onComplete={handleDetailsComplete} onBack={() => setStep("hair")} />}
          {step === "results" && (
            <ResultsView 
              data={data} 
              products={recommendations} 
              onClose={onClose} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

// --- Views ---

function WelcomeView({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 rounded-full bg-emerald-deep mx-auto mb-8 flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-champagne animate-ping opacity-10" />
        <MessageSquare className="w-8 h-8 text-champagne" />
      </div>
      <p className="text-[11px] tracking-[0.4em] uppercase text-champagne-deep mb-4 font-medium">Est. 2024</p>
      <h2 className="font-serif text-3xl text-emerald-deep mb-4 leading-snug">Discover Your Royal Regimen</h2>
      <div className="gold-divider w-16 mx-auto mb-8" />
      <p className="text-muted-foreground italic mb-10 leading-relaxed">
        "Allow our master apothecary to curate a formula as unique as your heritage."
      </p>
      <button 
        onClick={onStart}
        className="w-full py-4 bg-emerald-deep text-cream text-[13px] tracking-[0.2em] uppercase hover:bg-emerald-rich transition-all shadow-gold flex items-center justify-center gap-3 group"
      >
        Begin Consultation
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

function GenderView({ onSelect, onBack }: { onSelect: (g: string) => void; onBack: () => void }) {
  const options = [
    { id: "male", label: "Gentleman", icon: <User className="w-6 h-6" /> },
    { id: "female", label: "Lady", icon: <User2 className="w-6 h-6" /> },
    { id: "other", label: "Bespoke", icon: <Sparkles className="w-6 h-6" /> },
  ];
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-serif text-2xl text-emerald-deep mb-2">How shall we address you?</h2>
        <p className="text-sm text-muted-foreground italic">Select your profile to begin.</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {options.map(o => (
          <button 
            key={o.id}
            onClick={() => onSelect(o.id)}
            className="flex items-center gap-5 p-4 bg-white/50 border border-border hover:border-champagne-deep hover:shadow-soft transition-all rounded-lg group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-deep/5 flex items-center justify-center text-emerald-deep group-hover:bg-emerald-deep group-hover:text-champagne transition-all">
              {o.icon}
            </div>
            <span className="font-serif text-xl text-emerald-deep">{o.label}</span>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-colors">
        <ArrowLeft className="w-3 h-3" /> Back
      </button>
    </div>
  );
}

function HairView({ gender, onSelect, onBack }: { gender: string, onSelect: (id: string, label: string) => void, onBack: () => void }) {
  const options = gender === "female" ? FEMALE_OPTIONS : MALE_OPTIONS;
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl text-emerald-deep mb-2">Scalp Condition</h2>
        <p className="text-sm text-muted-foreground italic">Select the visual closest to your current density.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {options.map(o => (
          <button key={o.id} onClick={() => onSelect(o.id, o.label)} className="group bg-white border border-border hover:border-champagne-deep rounded-xl overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={o.img} alt={o.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-3 text-center">
              <div className="font-serif text-base text-emerald-deep mb-0.5">{o.label}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground line-clamp-1">{o.desc}</div>
            </div>
          </button>
        ))}
      </div>
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-colors">
        <ArrowLeft className="w-3 h-3" /> Back
      </button>
    </div>
  );
}

function DetailsView({ data, onComplete, onBack }: { data: FormData, onComplete: (d: Partial<FormData>) => void, onBack: () => void }) {
  const [local, setLocal] = useState({ name: data.name, age: data.age, phone: data.phone, email: data.email });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!local.name.trim()) e.name = "Your name is requested";
    if (!local.email.includes("@")) e.email = "A valid email is required";
    if (!local.phone) e.phone = "A contact number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onComplete(local);
  };

  const inputClass = (f: string) => `w-full px-4 py-3.5 rounded-sm border ${
    errors[f] ? "border-destructive/50 bg-destructive/5" : "border-champagne-deep/30 bg-white"
  } focus:border-emerald-deep focus:ring-1 focus:ring-emerald-deep/20 outline-none transition-all text-foreground placeholder:text-muted-foreground/40 font-sans text-sm`;

  const labelClass = "text-[10px] tracking-[0.25em] uppercase text-emerald-deep/70 mb-2 block font-medium";

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-emerald-deep mb-3">Final Details</h2>
        <div className="gold-divider w-12 mx-auto mb-4" />
        <p className="text-[13px] text-muted-foreground italic">Share your details to receive your bespoke ritual.</p>
      </div>
      
      <div className="space-y-5">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <label className={labelClass}>Full Name</label>
          <input 
            autoFocus 
            value={local.name} 
            onChange={e => setLocal({...local, name: e.target.value})} 
            placeholder="e.g. Aarav Mehta" 
            className={inputClass("name")} 
          />
          {errors.name && <p className="text-[10px] text-destructive mt-1.5 uppercase tracking-wider">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-75">
            <label className={labelClass}>Age</label>
            <input 
              type="number" 
              value={local.age} 
              onChange={e => setLocal({...local, age: e.target.value})} 
              placeholder="32" 
              className={`${inputClass("age")} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} 
            />
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100">
            <label className={labelClass}>Phone</label>
            <input 
              type="tel" 
              value={local.phone} 
              onChange={e => setLocal({...local, phone: e.target.value})} 
              placeholder="+91..." 
              className={inputClass("phone")} 
            />
            {errors.phone && <p className="text-[10px] text-destructive mt-1.5 uppercase tracking-wider">{errors.phone}</p>}
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-150">
          <label className={labelClass}>Email Address</label>
          <input 
            type="email" 
            value={local.email} 
            onChange={e => setLocal({...local, email: e.target.value})} 
            placeholder="you@example.com" 
            className={inputClass("email")} 
          />
          {errors.email && <p className="text-[10px] text-destructive mt-1.5 uppercase tracking-wider">{errors.email}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6">
        <button 
          type="button" 
          onClick={onBack} 
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-all font-semibold"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </button>
        <button 
          type="submit" 
          className="px-10 py-4 bg-emerald-deep text-cream text-[11px] tracking-[0.25em] uppercase hover:bg-emerald-rich shadow-gold transition-all duration-300 font-bold"
        >
          Reveal My Regimen
        </button>
      </div>
    </form>
  );
}

function ResultsView({ data, products, onClose }: { data: FormData, products: Product[], onClose: () => void }) {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  
  const isItemInCart = (id: string) => cart.some(item => item.id === id);
  const allInCart = products.every(p => isItemInCart(p.id));

  const handleAddAll = () => {
    products.forEach(p => {
      if (!isItemInCart(p.id)) addToCart(p);
    });
  };

  const handleEmailRequest = () => {
    onClose();
    navigate({ to: "/claim-regimen" });
  };

  return (
    <div className="space-y-6 py-2">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-champagne-gradient mx-auto mb-4 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-emerald-deep" />
        </div>
        <h2 className="font-serif text-2xl text-emerald-deep">For Your Majesty</h2>
        <p className="text-sm text-muted-foreground italic mt-2">Based on your {data.hairLabel.toLowerCase()} profile.</p>
      </div>

      <div className="space-y-3">
        {products.map(p => {
          const inCart = isItemInCart(p.id);
          return (
            <div key={p.id} className="flex gap-4 p-3 bg-white border border-border rounded-xl">
              <div className="w-16 h-16 rounded-lg bg-emerald-deep overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-lg text-emerald-deep truncate">{p.name}</div>
                <div className="text-[11px] text-muted-foreground mb-1">₹{p.price.toLocaleString("en-IN")}</div>
                <button 
                  onClick={() => !inCart && addToCart(p)} 
                  disabled={inCart}
                  className={`text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 ${
                    inCart ? "text-emerald-rich/60" : "text-emerald-soft hover:text-emerald-deep"
                  }`}
                >
                  {inCart ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Added to Bag
                    </>
                  ) : (
                    "Add to Bag +"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 space-y-3">
        <button 
          onClick={handleAddAll}
          disabled={allInCart}
          className={`w-full py-4 text-[12px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
            allInCart 
            ? "bg-emerald-deep/10 text-emerald-deep/50 border border-emerald-deep/10 cursor-default" 
            : "bg-emerald-deep text-cream hover:bg-emerald-rich shadow-gold"
          }`}
        >
          {allInCart ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> All Items Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add All to Bag
            </>
          )}
        </button>

        <button 
          onClick={handleEmailRequest} 
          className="w-full py-3.5 bg-white border border-champagne-deep/30 text-emerald-deep text-[11px] tracking-widest uppercase hover:bg-muted transition-all flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" /> Email My Regimen
        </button>
        
        <button onClick={onClose} className="w-full py-3 text-muted-foreground text-[10px] tracking-[0.2em] uppercase hover:text-emerald-deep transition-all">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
