import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      data-testid="hero"
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#F8FBFC]"
    >
      {/* Decorative powder-blue blob */}
      <div className="pointer-events-none absolute -top-32 -right-40 w-[640px] h-[640px] rounded-full bg-[#C1D9E8] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-32 w-[420px] h-[420px] rounded-full bg-[#E4F0F5] opacity-80 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0C2340]/10 bg-white/70 backdrop-blur-md text-xs tracking-[0.25em] uppercase text-[#0C2340]">
            <Sparkles size={12} className="text-[#D4AF37]" /> Surplus Funds Recovery Specialists
          </div>

          <h1 className="mt-8 font-serif font-light tracking-tight text-[#0C2340] text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            Recovering what
            <br />
            <span className="italic font-medium">rightfully</span> belongs
            <br />
            to you.
          </h1>

          <p className="mt-8 max-w-xl text-lg text-[#526477] leading-relaxed">
            If your property was sold at foreclosure or tax auction for more than what was owed, the
            overage may be legally yours. We locate it, file it, and return it — on contingency.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#checker"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center justify-center gap-2 px-7 h-14 rounded-full bg-[#D4AF37] hover:bg-[#B5952F] text-[#0C2340] font-semibold transition-all"
            >
              Check My Eligibility
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#process"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center justify-center gap-2 px-7 h-14 rounded-full border border-[#0C2340]/20 text-[#0C2340] hover:bg-[#0C2340] hover:text-white transition-all"
            >
              How It Works
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-[#526477]">
            <ShieldCheck size={18} className="text-[#0C2340]" />
            <span><span className="font-semibold text-[#0C2340]">No upfront cost.</span> You pay only if we recover funds.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="lg:col-span-5"
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-[#C1D9E8] to-transparent rounded-[28px] -z-10" />
            <img
              src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=85&w=1200"
              alt="Modern architecture"
              className="rounded-[24px] shadow-2xl object-cover w-full h-[520px]"
              data-testid="hero-image"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-black/5 max-w-[260px]">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#526477]">Avg Recovery</div>
              <div className="font-serif text-4xl text-[#0C2340] mt-1">$47,200</div>
              <div className="text-xs text-[#526477] mt-1">per successful claim, 2024</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#0C2340] text-white rounded-2xl px-5 py-4 shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">Funds Returned</div>
              <div className="font-serif text-3xl mt-1">$12.4M+</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
