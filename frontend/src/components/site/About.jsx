import { Award, Users, Shield, TrendingUp } from "lucide-react";

const TRUST = [
  { icon: Award, label: "Boutique focus", body: "We work fewer cases at a time so every claim gets senior attention." },
  { icon: Shield, label: "Contingency only", body: "Nothing is owed unless and until we recover funds in your name." },
  { icon: Users, label: "Hands-on team", body: "Licensed paralegals and recovery specialists — not call-center reps." },
  { icon: TrendingUp, label: "Documented results", body: "Over $12.4M returned to former owners and heirs since 2018." },
];

export default function About() {
  return (
    <section data-testid="about" id="about" className="relative py-24 lg:py-32 bg-[#F8FBFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-[#C1D9E8] rounded-3xl -z-10" />
          <img
            src="https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Flowstar recovery team"
            className="rounded-2xl object-cover w-full h-[540px] shadow-xl"
          />
        </div>

        <div className="lg:col-span-7">
          <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">About Flowstar</div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] font-light leading-[1.05]">
            A quieter, more <em className="font-medium">careful</em> way to recover what&apos;s yours.
          </h2>
          <p className="mt-6 text-lg text-[#526477] leading-relaxed">
            Flowstar was founded in 2018 by a small team of paralegals and title researchers who kept seeing the same
            story: rightful owners losing access to surplus proceeds simply because no one walked them through the
            paperwork. We built Flowstar to close that gap — with discipline, integrity, and a contingency-only model.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.label} className="bg-white border border-black/5 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
                  <Icon size={22} className="text-[#D4AF37] mb-4" />
                  <div className="font-serif text-xl text-[#0C2340] mb-1">{t.label}</div>
                  <div className="text-sm text-[#526477] leading-relaxed">{t.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
