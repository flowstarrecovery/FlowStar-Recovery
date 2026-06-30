import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Process", href: "/#process" },
  { label: "Eligibility", href: "/#checker" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="header-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#0C2340] text-[#D4AF37] font-serif text-xl">
            F
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
          </span>
          <div className="leading-tight">
            <div className="font-serif text-xl text-[#0C2340]">Flowstar</div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#526477]">Asset Recovery</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className="text-sm tracking-wide text-[#0C2340]/80 hover:text-[#0C2340] transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-[#D4AF37] after:w-0 hover:after:w-full after:transition-all"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="/#checker">
            <Button
              data-testid="header-cta"
              className="bg-[#D4AF37] hover:bg-[#B5952F] text-[#0C2340] font-semibold rounded-full px-6 h-11 shadow-none"
            >
              Check Eligibility
            </Button>
          </a>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md text-[#0C2340]"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-black/5" data-testid="mobile-menu">
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                className="text-[#0C2340] text-base"
              >
                {n.label}
              </a>
            ))}
            <a href="/#checker">
              <Button
                data-testid="mobile-header-cta"
                className="w-full bg-[#D4AF37] hover:bg-[#B5952F] text-[#0C2340] font-semibold rounded-full"
              >
                Check Eligibility
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
