import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia",
  "Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
  "South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const PROPERTY_TYPES = [
  "Single-Family Home",
  "Multi-Family Home",
  "Condo / Townhouse",
  "Vacant Land",
  "Commercial Property",
  "Other / Not Sure",
];

const SALE_TYPES = [
  { value: "Mortgage Foreclosure", label: "Mortgage Foreclosure" },
  { value: "Tax Sale / Tax Deed", label: "Tax Sale / Tax Deed" },
  { value: "HOA / Lien Foreclosure", label: "HOA / Lien Foreclosure" },
  { value: "Not Sure", label: "I'm not sure" },
];

const initial = {
  state: "",
  property_type: "",
  sale_type: "",
  foreclosure_date: "",
  estimated_amount: "",
  full_name: "",
  email: "",
  phone: "",
  message: "",
};

const STEPS = ["Property", "Sale Details", "Estimated Amount", "Your Info"];

export default function ClaimChecker() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const canNext = () => {
    if (step === 0) return data.state && data.property_type;
    if (step === 1) return data.sale_type && data.foreclosure_date;
    if (step === 2) return data.estimated_amount;
    return true;
  };

  const handleSubmit = async () => {
    if (!data.full_name || !data.email) {
      toast.error("Please provide your name and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        state: data.state,
        property_type: data.property_type,
        foreclosure_date: data.foreclosure_date,
        estimated_amount: data.estimated_amount,
        message: data.message
          ? `Sale type: ${data.sale_type}. Note: ${data.message}`
          : `Sale type: ${data.sale_type}`,
        source: "eligibility_checker",
      });
      setSubmitted(true);
      toast.success("Thank you — we'll reach out within one business day.");
    } catch (e) {
      console.error(e);
      toast.error("Could not submit. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-testid="claim-checker" id="checker" className="relative py-24 lg:py-32 bg-[#E4F0F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">Free Eligibility Check</div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#0C2340] font-light leading-[1.05]">
            Find out if there are funds <em className="font-medium">waiting</em> for you.
          </h2>
          <p className="mt-6 text-lg text-[#526477] leading-relaxed max-w-md">
            Answer four short questions. If we identify a recoverable surplus, a senior associate will
            personally walk you through next steps — no obligation.
          </p>

          <ul className="mt-10 space-y-3 text-sm text-[#0C2340]">
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#D4AF37]" /> No upfront fees, ever</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#D4AF37]" /> Confidential & secure</li>
            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-[#D4AF37]" /> Response within 1 business day</li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-8 lg:p-10">
            {submitted ? (
              <div data-testid="checker-success" className="py-10 text-center">
                <div className="inline-flex w-16 h-16 rounded-full bg-[#D4AF37]/20 items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-serif text-3xl text-[#0C2340] mb-3">Submission received.</h3>
                <p className="text-[#526477] max-w-md mx-auto">
                  A senior associate will personally review your case and contact you within one business day at
                  <span className="text-[#0C2340] font-medium"> {data.email}</span>.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-8" data-testid="checker-stepper">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex-1">
                      <div className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-[#D4AF37]" : "bg-[#0C2340]/10"}`} />
                      <div className={`mt-2 text-[10px] tracking-[0.2em] uppercase ${i === step ? "text-[#0C2340]" : "text-[#0C2340]/40"}`}>
                        {String(i + 1).padStart(2, "0")} · {s}
                      </div>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    className="min-h-[280px]"
                  >
                    {step === 0 && (
                      <div className="space-y-6">
                        <h3 className="font-serif text-2xl text-[#0C2340]">Where is the property located?</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">State</Label>
                            <Select value={data.state} onValueChange={(v) => update("state", v)}>
                              <SelectTrigger data-testid="checker-state" className="mt-2 h-12 rounded-xl border-[#0C2340]/15">
                                <SelectValue placeholder="Choose state" />
                              </SelectTrigger>
                              <SelectContent className="max-h-72">
                                {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Property Type</Label>
                            <Select value={data.property_type} onValueChange={(v) => update("property_type", v)}>
                              <SelectTrigger data-testid="checker-property-type" className="mt-2 h-12 rounded-xl border-[#0C2340]/15">
                                <SelectValue placeholder="Choose type" />
                              </SelectTrigger>
                              <SelectContent>
                                {PROPERTY_TYPES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-6">
                        <h3 className="font-serif text-2xl text-[#0C2340]">Tell us about the sale.</h3>
                        <div>
                          <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Type of Sale</Label>
                          <RadioGroup
                            value={data.sale_type}
                            onValueChange={(v) => update("sale_type", v)}
                            className="grid sm:grid-cols-2 gap-3 mt-3"
                            data-testid="checker-sale-type"
                          >
                            {SALE_TYPES.map((s) => (
                              <label
                                key={s.value}
                                className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${
                                  data.sale_type === s.value
                                    ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                    : "border-[#0C2340]/10 hover:border-[#0C2340]/30"
                                }`}
                              >
                                <RadioGroupItem value={s.value} />
                                <span className="text-sm text-[#0C2340]">{s.label}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </div>
                        <div className="max-w-xs">
                          <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Approx. Sale Date</Label>
                          <Input
                            data-testid="checker-foreclosure-date"
                            type="month"
                            className="mt-2 h-12 rounded-xl border-[#0C2340]/15"
                            value={data.foreclosure_date}
                            onChange={(e) => update("foreclosure_date", e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <h3 className="font-serif text-2xl text-[#0C2340]">Estimated outstanding balance at sale?</h3>
                        <p className="text-sm text-[#526477]">
                          A rough figure helps us estimate the potential surplus. If unsure, pick the closest range.
                        </p>
                        <RadioGroup
                          value={data.estimated_amount}
                          onValueChange={(v) => update("estimated_amount", v)}
                          className="grid sm:grid-cols-2 gap-3"
                          data-testid="checker-estimated-amount"
                        >
                          {["Under $50,000", "$50,000 – $150,000", "$150,000 – $300,000", "Over $300,000", "I'm not sure"].map((opt) => (
                            <label
                              key={opt}
                              className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${
                                data.estimated_amount === opt
                                  ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                  : "border-[#0C2340]/10 hover:border-[#0C2340]/30"
                              }`}
                            >
                              <RadioGroupItem value={opt} />
                              <span className="text-sm text-[#0C2340]">{opt}</span>
                            </label>
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-5">
                        <h3 className="font-serif text-2xl text-[#0C2340]">How can we reach you?</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Full Name</Label>
                            <Input
                              data-testid="checker-full-name"
                              value={data.full_name}
                              onChange={(e) => update("full_name", e.target.value)}
                              className="mt-2 h-12 rounded-xl border-[#0C2340]/15"
                              placeholder="Jane Doe"
                            />
                          </div>
                          <div>
                            <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Email</Label>
                            <Input
                              data-testid="checker-email"
                              type="email"
                              value={data.email}
                              onChange={(e) => update("email", e.target.value)}
                              className="mt-2 h-12 rounded-xl border-[#0C2340]/15"
                              placeholder="jane@example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Phone (optional)</Label>
                          <Input
                            data-testid="checker-phone"
                            value={data.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className="mt-2 h-12 rounded-xl border-[#0C2340]/15"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        <div>
                          <Label className="text-xs uppercase tracking-[0.2em] text-[#0C2340]">Anything else (optional)</Label>
                          <textarea
                            data-testid="checker-message"
                            value={data.message}
                            onChange={(e) => update("message", e.target.value)}
                            rows={3}
                            className="mt-2 w-full rounded-xl border border-[#0C2340]/15 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                            placeholder="Share any details about your case..."
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
                  <button
                    data-testid="checker-back"
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm text-[#0C2340] disabled:opacity-30 hover:underline"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>

                  {step < STEPS.length - 1 ? (
                    <button
                      data-testid="checker-next"
                      onClick={() => canNext() && setStep(step + 1)}
                      disabled={!canNext()}
                      className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[#0C2340] text-white disabled:opacity-40 hover:bg-[#1a3556] transition-all"
                    >
                      Continue <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      data-testid="checker-submit"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-7 h-12 rounded-full bg-[#D4AF37] hover:bg-[#B5952F] text-[#0C2340] font-semibold disabled:opacity-60"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                      Submit Eligibility Check
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
