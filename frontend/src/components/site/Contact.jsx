import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thanks — we&apos;ll be in touch shortly.");
      setForm({ full_name: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Could not send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-testid="contact" id="contact" className="relative py-24 lg:py-32 bg-[#0C2340] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="uppercase tracking-[0.25em] text-xs text-[#D4AF37] mb-4">Speak With Us</div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-[1.05]">
            Have a case in mind? <em className="font-medium text-[#D4AF37]">Let&apos;s talk.</em>
          </h2>
          <p className="mt-6 text-lg text-[#C1D9E8] leading-relaxed max-w-md">
            Prefer to speak to a person? Send a note and a senior associate will respond personally
            within one business day.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-[#C1D9E8]"><Mail size={16} className="text-[#D4AF37]" /> hello@flowstarrecovery.com</div>
            <div className="flex items-center gap-3 text-[#C1D9E8]"><Phone size={16} className="text-[#D4AF37]" /> (800) 555-0188</div>
          </div>
        </div>

        <form onSubmit={submit} className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <Label className="text-xs uppercase tracking-[0.2em] text-[#C1D9E8]">Full Name *</Label>
              <Input
                data-testid="contact-full-name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-[0.2em] text-[#C1D9E8]">Email *</Label>
              <Input
                data-testid="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-[0.2em] text-[#C1D9E8]">Phone (optional)</Label>
            <Input
              data-testid="contact-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
              placeholder="(555) 555-5555"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-[0.2em] text-[#C1D9E8]">Message *</Label>
            <textarea
              data-testid="contact-message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
              placeholder="Briefly describe your situation..."
            />
          </div>
          <button
            data-testid="contact-submit"
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-7 h-12 rounded-full bg-[#D4AF37] hover:bg-[#B5952F] text-[#0C2340] font-semibold disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
