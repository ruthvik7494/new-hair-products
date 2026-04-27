import maleImg from "@/assets/results-male.jpg";
import femaleImg from "@/assets/results-female.jpg";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Mehta",
    location: "Mumbai · 6 months",
    image: maleImg,
    text: "I tried every clinical brand for two years. Verdané's Imperial Ampoules brought my hair back in three months. Worth every rupee.",
  },
  {
    name: "Sanaya Kapoor",
    location: "Delhi · 4 months",
    image: femaleImg,
    text: "My hair has never felt this thick and lustrous. The Regalia Serum is pure liquid gold — I feel like royalty after every wash.",
  },
];

export function Results() {
  return (
    <section id="results" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-champagne-deep mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-emerald-deep">
            Stories from Our Court
          </h2>
          <div className="gold-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="group relative bg-card-gradient border border-border hover:border-champagne-deep/50 rounded-sm overflow-hidden transition-all hover:shadow-royal"
            >
              <div className="grid grid-cols-5">
                <div className="col-span-2 aspect-[3/4] overflow-hidden bg-emerald-deep">
                  <img
                    src={t.image}
                    alt={t.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="col-span-3 p-8 flex flex-col justify-center">
                  <Quote className="w-8 h-8 text-champagne-deep mb-4" />
                  <p className="font-serif text-xl italic text-foreground/90 leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-champagne text-champagne" />
                    ))}
                  </div>
                  <div>
                    <div className="font-serif text-lg text-emerald-deep">{t.name}</div>
                    <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
