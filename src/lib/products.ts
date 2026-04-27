import serum from "@/assets/product-serum.jpg";
import oil from "@/assets/product-oil.jpg";
import shampoo from "@/assets/product-shampoo.jpg";
import conditioner from "@/assets/product-conditioner.jpg";
import vitamins from "@/assets/product-vitamins.jpg";
import treatment from "@/assets/product-treatment.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "serum" | "oil" | "shampoo" | "conditioner" | "supplement" | "treatment";
  badge?: string;
  benefits: string[];
};

export const products: Product[] = [
  {
    id: "regal-serum",
    name: "Regalia Hair Serum",
    tagline: "The Crown Jewel",
    description: "A weightless emerald-infused serum that restores shine and seals split ends with botanical precision.",
    price: 2499,
    originalPrice: 2999,
    image: serum,
    category: "serum",
    badge: "Bestseller",
    benefits: ["Deep nourishment", "Frizz control", "Adds royal shine"],
  },
  {
    id: "amber-growth-oil",
    name: "Ambrosia Growth Oil",
    tagline: "Awaken the Roots",
    description: "Rare amber-pressed botanicals revive dormant follicles and accelerate visible regrowth in 90 days.",
    price: 1899,
    originalPrice: 2399,
    image: oil,
    category: "oil",
    badge: "Most Loved",
    benefits: ["Stimulates regrowth", "Strengthens roots", "Cold-pressed"],
  },
  {
    id: "verdant-shampoo",
    name: "Verdant Sulfate-Free Shampoo",
    tagline: "Cleanse with Reverence",
    description: "A gentle emerald cleanser that purifies the scalp without stripping its natural crown of oils.",
    price: 1299,
    image: shampoo,
    category: "shampoo",
    benefits: ["Sulfate-free", "Scalp balancing", "Color safe"],
  },
  {
    id: "noble-conditioner",
    name: "Noble Silk Conditioner",
    tagline: "Liquid Velvet",
    description: "An indulgent jar of botanical butter that wraps every strand in a satin glow.",
    price: 1499,
    image: conditioner,
    category: "conditioner",
    benefits: ["Silky finish", "Tames frizz", "Repairs damage"],
  },
  {
    id: "crown-vitamins",
    name: "Crown Vitamin Complex",
    tagline: "Beauty from Within",
    description: "Daily capsules with biotin, zinc, and saw palmetto — the apothecary's secret to a fuller crown.",
    price: 2199,
    originalPrice: 2599,
    image: vitamins,
    category: "supplement",
    badge: "New",
    benefits: ["Biotin + Zinc", "30-day supply", "Clinically tested"],
  },
  {
    id: "imperial-ampoules",
    name: "Imperial Scalp Ampoules",
    tagline: "Concentrated Luxury",
    description: "A 5-day intensive ritual of concentrated peptides delivered in single-dose emerald vials.",
    price: 3499,
    originalPrice: 3999,
    image: treatment,
    category: "treatment",
    badge: "Limited",
    benefits: ["Peptide complex", "5-day ritual", "Visible in 30 days"],
  },
];

// Recommendation logic based on quiz responses
export function recommendProducts(hairCondition: string): Product[] {
  switch (hairCondition) {
    case "healthy":
      return products.filter((p) =>
        ["verdant-shampoo", "noble-conditioner", "regal-serum"].includes(p.id),
      );
    case "thinning":
      return products.filter((p) =>
        ["amber-growth-oil", "crown-vitamins", "verdant-shampoo"].includes(p.id),
      );
    case "receding":
      return products.filter((p) =>
        ["amber-growth-oil", "imperial-ampoules", "crown-vitamins"].includes(p.id),
      );
    case "bald":
      return products.filter((p) =>
        ["imperial-ampoules", "amber-growth-oil", "crown-vitamins"].includes(p.id),
      );
    default:
      return products.slice(0, 3);
  }
}
