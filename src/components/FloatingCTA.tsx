import { MessageSquare } from "lucide-react";

interface FloatingCTAProps {
  onClick: () => void;
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-30 group"
    >
      <span className="absolute inset-0 rounded-full bg-champagne animate-ping opacity-20" />
      <span className="relative flex items-center justify-center w-14 h-14 bg-emerald-deep border border-champagne-deep/60 rounded-full shadow-royal hover:shadow-gold transition-all">
        <MessageSquare className="w-6 h-6 text-champagne group-hover:scale-110 transition-transform" />
      </span>
    </button>
  );
}
