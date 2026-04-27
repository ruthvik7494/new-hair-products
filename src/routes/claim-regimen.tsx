import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, Mail, Send, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/claim-regimen")({
  component: ClaimRegimenPage,
});

function ClaimRegimenPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Load context from storage if available
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem("verdane_consultations") || "[]");
      if (history.length > 0) {
        const latest = history[history.length - 1];
        setFormData(prev => ({
          ...prev,
          name: latest.name || "",
          email: latest.email || "",
          phone: latest.phone || "",
          age: latest.age || "",
        }));
      }
    } catch (e) { /* ignore */ }
  }, []);

  const validate = () => {
    console.log("Validating form data:", formData);
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Your name is requested";
    if (!formData.email.includes("@")) e.email = "A valid email is required";
    if (!formData.phone) e.phone = "A contact number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit clicked");
    if (validate()) {
      console.log("Validation passed, submitting...");
      setSubmitted(true);
      
      // Update the latest consultation with the details
      try {
        const history = JSON.parse(localStorage.getItem("verdane_consultations") || "[]");
        console.log("History found:", history);
        if (history.length > 0) {
          history[history.length - 1] = { ...history[history.length - 1], ...formData };
          localStorage.setItem("verdane_consultations", JSON.stringify(history));
          console.log("History updated successfully");
        }
      } catch (err) { 
        console.error("Error updating history:", err);
      }

      // Redirect home after a short delay
      setTimeout(() => {
        console.log("Redirecting home...");
        navigate({ to: "/" });
      }, 3000);
    } else {
      console.warn("Validation failed:", errors);
    }
  };

  const inputClass = (f: string) => `w-full px-5 py-4 rounded-sm border ${
    errors[f] ? "border-destructive/50 bg-destructive/5" : "border-champagne-deep/20 bg-white"
  } focus:border-emerald-deep focus:ring-1 focus:ring-emerald-deep/20 outline-none transition-all text-lg placeholder:text-muted-foreground/30`;

  const labelClass = "text-xs tracking-[0.3em] uppercase text-emerald-deep/60 mb-3 block font-semibold";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar onOpenChatbot={() => {}} />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="max-w-xl w-full">
          <div className="bg-white border border-champagne-deep/10 shadow-royal rounded-sm p-8 sm:p-12 relative overflow-hidden">
            {/* Background Ornament */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-champagne-deep/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-deep/5 rounded-full blur-3xl" />

            {submitted ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-champagne-gradient mx-auto mb-8 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-deep" />
                </div>
                <h1 className="font-serif text-4xl text-emerald-deep mb-4">Your Ritual is Claimed</h1>
                <p className="text-muted-foreground italic mb-8">
                  Your personalized hair care regimen has been sent to <span className="text-emerald-deep font-semibold">{formData.email}</span>.
                </p>
                <div className="gold-divider w-16 mx-auto mb-8" />
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Redirecting to your atelier...</p>
              </div>
            ) : (
              <div className="relative z-10">
                <button 
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-muted-foreground hover:text-emerald-deep transition-all mb-12 relative z-20 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" /> Return to Selection
                </button>

                <div className="text-center mb-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-deep/5 mx-auto mb-6 flex items-center justify-center">
                    <Mail className="w-7 h-7 text-emerald-deep" />
                  </div>
                  <h1 className="font-serif text-4xl sm:text-5xl text-emerald-deep mb-4">Claim Your Regimen</h1>
                  <p className="text-muted-foreground italic max-w-sm mx-auto">
                    Allow us to preserve your results and send your bespoke hair care formula to your inbox.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-20">
                  <div className="space-y-6">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <label className={labelClass}>Full Name</label>
                      <input 
                        autoFocus 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        placeholder="e.g. Prince Aarav Mehta" 
                        className={inputClass("name")} 
                      />
                      {errors.name && <p className="text-[10px] text-destructive mt-2 uppercase tracking-wider font-medium">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <label className={labelClass}>Age</label>
                        <input 
                          type="number" 
                          value={formData.age} 
                          onChange={e => setFormData({...formData, age: e.target.value})} 
                          placeholder="32" 
                          className={`${inputClass("age")} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} 
                        />
                      </div>
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        <label className={labelClass}>Phone Number</label>
                        <input 
                          type="tel" 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})} 
                          placeholder="+91..." 
                          className={inputClass("phone")} 
                        />
                        {errors.phone && <p className="text-[10px] text-destructive mt-2 uppercase tracking-wider font-medium">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                      <label className={labelClass}>Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        placeholder="majesty@example.com" 
                        className={inputClass("email")} 
                      />
                      {errors.email && <p className="text-[10px] text-destructive mt-2 uppercase tracking-wider font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-5 bg-emerald-deep text-cream text-[14px] tracking-[0.3em] uppercase hover:bg-emerald-rich shadow-gold transition-all duration-500 font-bold flex items-center justify-center gap-3 group mt-10 cursor-pointer"
                  >
                    Receive My Regimen
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
