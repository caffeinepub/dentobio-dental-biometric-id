import { Heart, ScanLine } from "lucide-react";

const currentYear = new Date().getFullYear();

const footerLinks = [
  { label: "Technology", href: "#technology" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Demo", href: "#demo" },
  { label: "About", href: "#about" },
  { label: "Request Access", href: "#request-access" },
];

export default function Footer() {
  return (
    <footer
      id="about"
      className="py-12 border-t border-teal-400/20"
      style={{ background: "#0B1F33" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center border border-teal-400/60 rounded-full">
              <ScanLine className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <span className="text-white font-black text-lg">
                Dento<span className="text-teal-400">Bio</span>
              </span>
              <p className="text-[#C7D0DA] text-xs">
                Dental Biometric Identification
              </p>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-[#C7D0DA] hover:text-teal-400 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {currentYear} DentoBio. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-teal-400 transition-colors"
          >
            Built with <Heart className="w-3 h-3 text-teal-400 fill-teal-400" />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
