import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative bg-[#0C2340] text-[#E4F0F5] mt-32">
      <div className="absolute inset-x-0 -top-12 h-12 bg-gradient-to-b from-transparent to-[#0C2340]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-[#D4AF37] text-[#0C2340] font-serif text-2xl">F</span>
            <div>
              <div className="font-serif text-2xl">Flowstar Asset Recovery</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C1D9E8]">Est. 2018</div>
            </div>
          </div>
          <p className="text-[#C1D9E8] max-w-md leading-relaxed">
            Recovering what rightfully belongs to you. A boutique asset recovery firm helping former owners,
            heirs, and lienholders claim surplus funds from foreclosure and tax sale proceedings.
          </p>
          <div className="mt-8 space-y-2 text-sm text-[#C1D9E8]">
            <div className="flex items-center gap-2"><Mail size={14} /> hello@flowstarrecovery.com</div>
            <div className="flex items-center gap-2"><Phone size={14} /> (800) 555-0188</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> Operating in all 50 states</div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">Services</div>
          <ul className="space-y-3 text-sm">
            <li><a href="/#checker" className="hover:text-[#D4AF37] transition-colors">Eligibility Check</a></li>
            <li><a href="/#process" className="hover:text-[#D4AF37] transition-colors">Recovery Process</a></li>
            <li><a href="/#about" className="hover:text-[#D4AF37] transition-colors">About</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">Learn</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/resources" className="hover:text-[#D4AF37] transition-colors">Resources</Link></li>
            <li><a href="/#faq" className="hover:text-[#D4AF37] transition-colors">FAQ</a></li>
            <li><a href="/#about" className="hover:text-[#D4AF37] transition-colors">About</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="uppercase tracking-[0.2em] text-xs text-[#D4AF37] mb-4">Legal</div>
          <p className="text-xs text-[#C1D9E8] leading-relaxed">
            Flowstar Asset Recovery LLC is an asset recovery firm. We are not attorneys and do not provide
            legal advice. Recovery is performed on a contingency basis; no fee is owed unless funds are
            successfully recovered on your behalf. Recovery percentage and timelines vary by state.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#C1D9E8]">
          <div>© {new Date().getFullYear()} Flowstar Asset Recovery LLC. All rights reserved.</div>
          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-[#D4AF37]">Privacy</a>
            <a href="#" className="hover:text-[#D4AF37]">Terms</a>
            <a href="#" className="hover:text-[#D4AF37]">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
