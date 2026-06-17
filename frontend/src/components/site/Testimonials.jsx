import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    location: "Atlanta, GA",
    amount: "$58,400",
    quote:
      "After my home went to auction, I assumed the bank kept everything. Flowstar found a surplus I had no idea existed. The whole process took less than two months.",
  },
  {
    name: "Rosa Linda H.",
    location: "Houston, TX",
    amount: "$112,900",
    quote:
      "They handled my late father's tax sale claim with so much grace. I never paid a dime out of pocket. Communication was steady from day one to disbursement.",
  },
  {
    name: "Devon W.",
    location: "Phoenix, AZ",
    amount: "$31,750",
    quote:
      "Three other recovery firms wanted retainers. Flowstar didn't ask for a penny up front and got my claim approved faster than I thought possible.",
  },
  {
    name: "Patricia O.",
    location: "Cleveland, OH",
    amount: "$42,200",
    quote:
      "Honest, calm, and persistent. They explained every form before I signed it and answered every question — even the obvious ones. Truly grateful.",
  },
];

export default function Testimonials() {
  return (
    <section data-testid="testimonials" id="testimonials" className="relative py-24 lg:py-32 bg-[#F8FBFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">Client Stories</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] font-light leading-[1.05]">
              Real claims. <em className="font-medium">Real outcomes.</em>
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#D4AF37]">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#D4AF37" stroke="none" />)}
            <span className="ml-3 text-sm text-[#526477]">4.9 average from 280+ verified clients</span>
          </div>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {TESTIMONIALS.map((t) => (
              <CarouselItem key={t.name} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div
                  data-testid={`testimonial-${t.name}`}
                  className="h-full bg-white border border-black/5 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <Quote size={28} className="text-[#D4AF37] mb-6" />
                  <p className="text-[#0C2340] leading-relaxed font-serif text-xl">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#0C2340]">{t.name}</div>
                      <div className="text-xs text-[#526477]">{t.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#526477]">Recovered</div>
                      <div className="font-serif text-2xl text-[#D4AF37]">{t.amount}</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious data-testid="testimonials-prev" className="left-0 -translate-x-1/2 bg-white border-[#0C2340]/15" />
            <CarouselNext data-testid="testimonials-next" className="right-0 translate-x-1/2 bg-white border-[#0C2340]/15" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
