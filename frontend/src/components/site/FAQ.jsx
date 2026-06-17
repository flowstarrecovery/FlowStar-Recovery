import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What exactly are surplus funds?",
    a: "When a property is sold at foreclosure or tax sale for more than what was owed, the leftover proceeds — after debts and fees — are surplus funds. Those dollars belong to the former owner, heirs, or junior lien-holders depending on state law.",
  },
  {
    q: "How much does Flowstar charge?",
    a: "We work strictly on contingency. There are no upfront fees, no retainers, and no out-of-pocket filing costs. Our fee is a pre-agreed percentage of the recovered funds and is only collected if we succeed.",
  },
  {
    q: "How long does the recovery process take?",
    a: "Most cases resolve in 30 to 90 days from engagement. Complex matters involving probate, multiple lien-holders, or contested ownership can take longer. We'll give you a realistic timeline after our initial review.",
  },
  {
    q: "Do I need to live in the same state as the property?",
    a: "No. We operate in all 50 states and handle claims regardless of where you currently live. Documents can be signed and notarized remotely in most jurisdictions.",
  },
  {
    q: "What if the former owner has passed away?",
    a: "Surplus funds can typically be recovered by heirs through probate or affidavit procedures. We routinely handle estate-based claims and coordinate with executors and family members.",
  },
  {
    q: "Are you attorneys?",
    a: "Flowstar Asset Recovery is an asset recovery firm, not a law firm. We do not provide legal advice. For complex matters that require litigation, we partner with licensed attorneys in the relevant jurisdiction.",
  },
];

export default function FAQ() {
  return (
    <section data-testid="faq" id="faq" className="relative py-24 lg:py-32 bg-[#E4F0F5]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">Common Questions</div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] font-light leading-[1.05]">
            Answers, <em className="font-medium">without the legalese</em>.
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-testid={`faq-item-${i}`}
              className="bg-white border border-black/5 rounded-2xl px-6 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left font-serif text-xl text-[#0C2340] hover:no-underline py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#526477] leading-relaxed pb-6 text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
