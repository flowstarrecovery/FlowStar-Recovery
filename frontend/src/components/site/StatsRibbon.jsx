const STATS = [
  { label: "Funds Recovered", value: "$12.4M+" },
  { label: "Successful Claims", value: "640+" },
  { label: "States Covered", value: "50" },
  { label: "Avg Disbursement", value: "47 days" },
  { label: "Client Rating", value: "4.9 / 5" },
  { label: "Contingency Only", value: "$0 upfront" },
];

export default function StatsRibbon() {
  const items = [...STATS, ...STATS];
  return (
    <section data-testid="stats-ribbon" className="bg-[#0C2340] py-6 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-10 whitespace-nowrap">
            <span className="font-serif text-3xl text-[#D4AF37]">{s.value}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C1D9E8]">{s.label}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 ml-6" />
          </div>
        ))}
      </div>
    </section>
  );
}
