import { Menu, ScanLine, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Technology", href: "#technology" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Demo", href: "#demo" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md border-b border-teal-500/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/#"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-teal-400/60 group-hover:border-teal-400 transition-colors" />
              <ScanLine className="w-5 h-5 text-teal-400" />
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Dento<span className="text-teal-400">Bio</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-[#C7D0DA] hover:text-teal-400 transition-colors text-sm font-medium px-4 py-2 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#request-access"
              data-ocid="nav.primary_button"
              className="inline-block bg-cobalt-500 hover:bg-cobalt-600 text-white font-semibold tracking-wide text-sm px-5 py-2 rounded-md transition-colors"
            >
              Request Access
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900/98 border-t border-teal-500/20 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid="nav.link"
              onClick={() => setMobileOpen(false)}
              className="block text-[#C7D0DA] hover:text-teal-400 transition-colors text-sm font-medium py-2"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            data-ocid="nav.primary_button"
            onClick={() => {
              setMobileOpen(false);
              document
                .getElementById("request-access")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="block w-full text-center bg-cobalt-500 hover:bg-cobalt-600 text-white font-semibold mt-2 py-2 px-4 rounded-md text-sm transition-colors"
          >
            Request Access
          </button>
        </div>
      )}
    </nav>
  );
}
