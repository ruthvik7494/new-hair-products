import { useState, useEffect } from "react";
import { MessageSquare, X, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Mail, ShoppingBag, Send, User, User2 } from "lucide-react";
import hairHealthy from "@/assets/hair-healthy.jpg";
import hairThinning from "@/assets/hair-thinning.jpg";
import hairReceding from "@/assets/hair-receding.jpg";
import hairBald from "@/assets/hair-bald.jpg";
import { recommendProducts, type Product } from "@/lib/products";
import { useCart } from "../context/CartContext";

interface ConsultationChatbotProps {
  open: boolean;
  onClose: () => void;
}

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

const HAIR_OPTIONS = [
  { id: "healthy", label: "Healthy & Full", description: "Thick coverage, no thinning", image: hairHealthy },
  { id: "thinning", label: "Mild Thinning", description: "Slight visibility at the crown", image: hairThinning },
  { id: "receding", label: "Receding Hairline", description: "Visible loss at the temples", image: hairReceding },
  { id: "bald", label: "Significant Loss", description: "Bald patches or large areas", image: hairBald },
];

const initialData: FormData = {
  gender: "",
  hairCondition: "",
  hairLabel: "",
  name: "",
  age: "",
  phone: "",
  email: "",
};

export function ConsultationChatbot({ open, onClose }: ConsultationChatbotProps) {
  const [step, setStep] = useState<Step>("welcome");
  const [data, setData] = useState<FormData>(initialData);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (!open) {
      // reset after close animation
      const t = setTimeout(() => {
        setStep("welcome");
        setData(initialData);
        setRecommendations([]);
        setEmailSent(false);
        setErrors({});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // We don't want to lock scroll for a small chat widget
  useEffect(() => {
    if (open && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleGender = (gender: string) => {
    setData((d) => ({ ...d, gender }));
    setStep("hair");
  };

  const handleHair = (option: typeof HAIR_OPTIONS[number]) => {
    setData((d) => ({ ...d, hairCondition: option.id, hairLabel: option.label }));
    setStep("details");
  };

  const validateDetails = () => {
    const e: Partial<FormData> = {};
    if (!data.name.trim() || data.name.trim().length < 2) e.name = "Please enter your name";
    const age = Number(data.age);
    if (!data.age || isNaN(age) || age < 13 || age > 100) e.age = "Enter a valid age (13–100)";
    if (!/^\+?[0-9\s-]{7,15}$/.test(data.phone)) e.phone = "Enter a valid phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitDetails = () => {
    if (!validateDetails()) return;
    const recs = recommendProducts(data.hairCondition);
    setRecommendations(recs);

    // Persist to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("verdane_consultations") || "[]");
      existing.push({
        ...data,
        recommendedProducts: recs.map((r) => r.id),
        consultedAt: new Date().toISOString(),
      });
      localStorage.setItem("verdane_consultations", JSON.stringify(existing));
    } catch {
      // ignore
    }

    setStep("results");
  };

  const sendEmail = () => {
    // Simulated — store the "sent" record
    try {
      const sent = JSON.parse(localStorage.getItem("verdane_emails_sent") || "[]");
      sent.push({
        to: data.email,
        name: data.name,
        products: recommendations.map((r) => ({ id: r.id, name: r.name, price: r.price })),
        sentAt: new Date().toISOString(),
      });
      localStorage.setItem("verdane_emails_sent", JSON.stringify(sent));
    } catch {
      // ignore
    }
    setEmailSent(true);
  };

  if (!open) return null;

  const totalSteps = 4;
  const stepNumber = { welcome: 0, gender: 1, hair: 2, details: 3, results: 4 }[step];

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col w-[calc(100vw-3rem)] sm:w-[440px] animate-fade-up pointer-events-none" style={{ animationDuration: "0.3s" }}>
      {/* Background Overlay for mobile only */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm sm:hidden pointer-events-auto"
        onClick={onClose}
      />

      <div className="relative flex flex-col w-full h-[600px] max-h-[80vh] bg-background border border-champagne-deep/40 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-emerald-deep border-b border-champagne-deep/30 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-champagne-gradient flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-emerald-deep" />
            </div>
            <div>
              <div className="font-serif text-cream text-lg leading-none">Royal Assistant</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-champagne mt-1">
                {step !== "welcome" && step !== "results" ? `Step ${stepNumber} of ${totalSteps - 1}` : "Online"}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-cream/70 hover:text-champagne transition-colors p-1 hover:bg-white/5 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {step !== "welcome" && step !== "results" && (
          <div className="h-1 bg-muted">
            <div
              className="h-full bg-champagne-gradient transition-all duration-500"
              style={{ width: `${(stepNumber / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        )}        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {step === "welcome" && (
            <WelcomeStep onStart={() => setStep("gender")} />
          )}

          {step === "gender" && (
            <GenderStep
              onSelect={handleGender}
              onBack={() => setStep("welcome")}
            />
          )}

          {step === "hair" && (
            <HairStep
              onSelect={handleHair}
              onBack={() => setStep("gender")}
            />
          )}

          {step === "details" && (
            <DetailsStep
              data={data}
              errors={errors}
              onChange={(field, value) => {
                setData((d) => ({ ...d, [field]: value }));
                if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
              }}
              onSubmit={submitDetails}
              onBack={() => setStep("hair")}
            />
          )}

          {step === "results" && (
            <ResultsStep
              data={data}
              products={recommendations}
              emailSent={emailSent}
              onSendEmail={sendEmail}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ----- Sub-steps ----- */

function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center py-6 animate-fade-up">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-deep mb-8 relative group">
        <div className="absolute inset-0 rounded-full bg-champagne-gradient animate-pulse opacity-20" />
        <Sparkles className="w-10 h-10 text-champagne relative z-10 transition-transform duration-700 group-hover:rotate-12" />
      </div>
      <p className="text-[10px] tracking-[0.5em] uppercase text-champagne-deep mb-4 font-medium">
        Royal Hair Atelier
      </p>
      <h2 className="font-serif text-3xl text-emerald-deep mb-4 leading-tight">
        Discover Your Bespoke Regimen
      </h2>
      <div className="gold-divider w-20 mx-auto mb-8" />
      <p className="text-muted-foreground text-lg max-w-xs mx-auto mb-10 leading-relaxed italic">
        "Allow our master apothecary to curate a formula as unique as your heritage."
      </p>
      <button
        onClick={onStart}
        className="w-full inline-flex items-center justify-center gap-3 px-10 py-4 bg-emerald-deep text-cream tracking-[0.25em] text-[12px] uppercase hover:bg-emerald-rich transition-all duration-500 shadow-gold group"
      >
        Begin Consultation
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function GenderStep({ onSelect, onBack }: { onSelect: (g: string) => void; onBack: () => void }) {
  const options = [
    { id: "male", label: "Gentleman", icon: <User className="w-7 h-7" /> },
    { id: "female", label: "Lady", icon: <User2 className="w-7 h-7" /> },
    { id: "other", label: "Bespoke", icon: <Sparkles className="w-7 h-7" /> },
  ];
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-10">
        <h2 className="font-serif text-2xl text-emerald-deep mb-2">
          How shall we address you?
        </h2>
        <p className="text-muted-foreground text-[15px] italic">
          Select your profile to begin the personalization process.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-10">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onSelect(o.id)}
            className="group flex flex-col items-center gap-4 p-4 bg-card-gradient border border-border hover:border-champagne-deep/60 rounded-sm transition-all duration-500 hover:shadow-gold"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-deep/5 text-champagne-deep group-hover:bg-emerald-deep group-hover:text-champagne transition-all duration-500">
              {o.icon}
            </div>
            <div className="font-serif text-[16px] text-emerald-deep">{o.label}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Back
      </button>
    </div>
  );
}

function HairStep({ onSelect, onBack }: { onSelect: (o: typeof HAIR_OPTIONS[number]) => void; onBack: () => void }) {
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-emerald-deep mb-2">
          Scalp Condition
        </h2>
        <p className="text-muted-foreground text-[15px] italic">
          Select the visual closest to your current hair density.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-10">
        {HAIR_OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => onSelect(o)}
            className="group text-center border border-border hover:border-champagne-deep rounded-sm overflow-hidden hover:shadow-gold transition-all bg-card-gradient"
          >
            <div className="aspect-[4/3] overflow-hidden bg-emerald-deep">
              <img
                src={o.image}
                alt={o.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-3">
              <div className="font-serif text-[17px] text-emerald-deep mb-1">{o.label}</div>
              <div className="text-[13px] tracking-wider uppercase text-muted-foreground leading-tight line-clamp-2">
                {o.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        Back
      </button>
    </div>
  );
}

function DetailsStep({
  data,
  errors,
  onChange,
  onSubmit,
  onBack,
}: {
  data: FormData;
  errors: Partial<FormData>;
  onChange: (field: keyof FormData, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 bg-background border ${errors[field] ? "border-destructive" : "border-border"
    } rounded-sm focus:outline-none focus:border-champagne-deep transition-colors text-foreground placeholder:text-muted-foreground/60`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="animate-fade-up"
    >
      <h2 className="font-serif text-2xl text-emerald-deep text-center mb-2">
        Almost there
      </h2>
      <p className="text-center text-muted-foreground mb-8 text-lg italic">
        Share a few details to receive your personalized regimen.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="sm:col-span-2">
          <label className="block text-[15px] tracking-[0.2em] uppercase text-champagne-deep mb-2">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Aarav Mehta"
            maxLength={80}
            className={inputClass("name")}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[15px] tracking-[0.2em] uppercase text-champagne-deep mb-2">Age</label>
          <input
            type="number"
            value={data.age}
            onChange={(e) => onChange("age", e.target.value)}
            placeholder="e.g. 32"
            min={13}
            max={100}
            className={inputClass("age")}
          />
          {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-[15px] tracking-[0.2em] uppercase text-champagne-deep mb-2">Phone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+91 98765 43210"
            maxLength={20}
            className={inputClass("phone")}
          />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[15px] tracking-[0.2em] uppercase text-champagne-deep mb-2">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@example.com"
            maxLength={120}
            className={inputClass("email")}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-deep text-cream tracking-[0.2em] text-[13px] uppercase hover:bg-emerald-rich transition-colors shadow-gold"
        >
          Reveal My Regimen
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

function ResultsStep({
  data,
  products,
  emailSent,
  onSendEmail,
  onClose,
}: {
  data: FormData;
  products: Product[];
  emailSent: boolean;
  onSendEmail: () => void;
  onClose: () => void;
}) {
  const { cart, addToCart } = useCart();
  const allInCart = products.every(p => cart.some(cp => cp.id === p.id));
  const total = products.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    if (!allInCart) {
      products.forEach(p => addToCart(p));
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-champagne-gradient mb-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-deep" />
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-champagne-deep mb-2">
          Your Royal Regimen
        </p>
        <h2 className="font-serif text-2xl text-emerald-deep">
          Crafted for {data.name.split(" ")[0]}
        </h2>
        <div className="gold-divider w-20 mx-auto mt-3 mb-3" />
        <p className="text-muted-foreground text-[15px] leading-relaxed italic">
          Based on your <span className="text-emerald-deep font-medium">{data.hairLabel.toLowerCase()}</span> assessment, our master apothecary recommends:
        </p>
      </div>

      <div className="space-y-2 mb-6">
        {products.map((p) => (
          <div key={p.id} className="flex gap-3 p-3 bg-card-gradient border border-border rounded-sm hover:border-champagne-deep/40 transition-colors">
            <div className="w-14 h-14 flex-shrink-0 bg-emerald-deep rounded-sm overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[17px] text-emerald-deep mb-0.5 truncate">{p.name}</div>
              <div className="text-[13px] text-muted-foreground line-clamp-1">{p.tagline}</div>
              <div className="font-serif text-[17px] text-emerald-deep mt-1">₹{p.price.toLocaleString("en-IN")}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-emerald-deep text-cream rounded-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-champagne">Regimen Total</div>
          <div className="font-serif text-xl text-champagne">₹{total.toLocaleString("en-IN")}</div>
        </div>
        <button
          onClick={handleAddAll}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] tracking-[0.2em] uppercase transition-all duration-300 rounded-sm ${allInCart
            ? "bg-champagne-gradient text-emerald-deep"
            : "bg-champagne-gradient text-emerald-deep hover:opacity-90 shadow-gold"
            }`}
        >
          {allInCart ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              In Your Bag
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              Add All to Bag
            </>
          )}
        </button>
      </div>

      {/* Email CTA */}
      {!emailSent ? (
        <div className="p-5 border border-champagne-deep/40 bg-champagne/5 rounded-sm text-center">
          <Mail className="w-6 h-6 text-champagne-deep mx-auto mb-2" />
          <p className="font-serif text-base text-emerald-deep mb-1">
            Email this regimen?
          </p>
          <p className="text-[14px] text-muted-foreground mb-4">
            We'll send these recommendations to <span className="text-emerald-deep">{data.email}</span>
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={onSendEmail}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-deep text-cream text-[14px] tracking-[0.2em] uppercase hover:bg-emerald-rich transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Yes, Email Me
            </button>
            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-border text-foreground text-[14px] tracking-[0.2em] uppercase hover:bg-muted transition-colors"
            >
              No, Thank You
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 border border-emerald-rich/30 bg-emerald-deep/5 rounded-sm text-center">
          <CheckCircle2 className="w-6 h-6 text-emerald-rich mx-auto mb-2" />
          <p className="font-serif text-base text-emerald-deep mb-1">
            Sent to your inbox
          </p>
          <p className="text-[14px] text-muted-foreground mb-4">
            Your royal regimen is on its way.
          </p>
          <button
            onClick={onClose}
            className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-emerald-deep text-cream text-[14px] tracking-[0.2em] uppercase hover:bg-emerald-rich transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
