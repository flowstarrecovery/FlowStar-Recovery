import { Search, FileSignature, Gavel, Wallet } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "We Research",
    body: "Our team pulls the case file, confirms the surplus exists, and traces the claim chain back to you — at no cost.",
  },
  {
    n: "02",
    icon: FileSignature,
    title: "You Engage",
    body: "We send a clear, contingency-based agreement. No retainer. No filing fees out of pocket. You only pay if we recover.",
  },
  {
    n: "03",
    icon: Gavel,
    title: "We File",
    body: "Our paralegals prepare and submit the claim packet — affidavits, ID chain, court motions — and represent the matter through approval.",
  },
  {
    n: "04",
    icon: Wallet,
    title: "You Get Paid",
    body: "Funds are released directly to you via certified check or wire, less our agreed contingency fee. Most cases resolve in 30 – 90 days.",
  },
];

export default function Process() {
  return (
    <section data-testid="process-section" id="process" className="relative py-24 lg:py-32 bg-[#F8FBFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">The Flowstar Process</div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] font-light tracking-tight leading-[1.05]">
              Four steps from <em className="font-medium">overlooked</em><br />to <em className="font-medium">disbursed</em>.
            </h2>
          </div>
          <div className="lg:col-span-5 text-[#526477] text-lg leading-relaxed">
            Most claimants never see a dollar of their surplus simply because the notice never reached them.
            We close that gap — quietly, professionally, on contingency.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                data-testid={`process-step-${s.n}`}
                className="group relative bg-white border border-black/5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-serif text-2xl text-[#0C2340]/30">{s.n}</span>
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-[#E4F0F5] text-[#0C2340] group-hover:bg-[#D4AF37] transition-colors">
                    <Icon size={20} />
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#0C2340] mb-3">{s.title}</h3>
                <p className="text-sm text-[#526477] leading-relaxed">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
