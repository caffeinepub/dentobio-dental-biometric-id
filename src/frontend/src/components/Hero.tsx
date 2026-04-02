import { Button } from "@/components/ui/button";
import { ChevronRight, Cpu, Database, Shield } from "lucide-react";
import { motion } from "motion/react";

const hudCorners = [
  {
    pos: "top-2 left-2",
    borderTop: "2px",
    borderBottom: "0",
    borderLeft: "2px",
    borderRight: "0",
  },
  {
    pos: "top-2 right-2",
    borderTop: "2px",
    borderBottom: "0",
    borderLeft: "0",
    borderRight: "2px",
  },
  {
    pos: "bottom-2 left-2",
    borderTop: "0",
    borderBottom: "2px",
    borderLeft: "2px",
    borderRight: "0",
  },
  {
    pos: "bottom-2 right-2",
    borderTop: "0",
    borderBottom: "2px",
    borderLeft: "0",
    borderRight: "2px",
  },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B1F33 0%, #153B59 60%, #0F2A44 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(46,212,215,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(46,212,215,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-teal-400/40 rounded-full px-3 py-1 text-teal-400 text-xs font-semibold tracking-widest uppercase bg-teal-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              AI-Powered Biometric System
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight tracking-tight text-white">
              DENTAL
              <br />
              <span className="text-teal-400 teal-text-glow">BIOMETRIC</span>
              <br />
              IDENTIFICATION
            </h1>

            <p className="text-[#C7D0DA] text-lg leading-relaxed max-w-lg">
              Identify individuals through the unique patterns of their dental
              and bone structure. Forensic-grade accuracy meets real-time AI
              analysis for unparalleled biometric authentication.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-cobalt-500 hover:bg-cobalt-600 text-white font-bold tracking-wide uppercase text-sm px-8"
              >
                <a href="#demo">
                  Schedule Demo <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="border-[#4A6A80] text-white hover:bg-white/5 hover:border-teal-400 font-semibold tracking-wide uppercase text-sm px-8 bg-transparent"
              >
                <a href="#how-it-works">How It Works</a>
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-4 border-t border-white/10">
              {[
                { value: "99.7%", label: "Match Accuracy" },
                { value: "<2s", label: "Scan Time" },
                { value: "50M+", label: "Records Indexed" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-teal-400">
                    {stat.value}
                  </p>
                  <p className="text-[#C7D0DA] text-xs uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — HUD image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden border border-teal-400/30 teal-glow">
              {/* HUD overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Corner brackets */}
                {hudCorners.map((corner) => (
                  <div
                    key={corner.pos}
                    className={`absolute ${corner.pos} w-6 h-6 border-teal-400 hud-flicker`}
                    style={{
                      borderTopWidth: corner.borderTop,
                      borderBottomWidth: corner.borderBottom,
                      borderLeftWidth: corner.borderLeft,
                      borderRightWidth: corner.borderRight,
                    }}
                  />
                ))}

                {/* Scan line animation */}
                <div className="scan-line" />

                {/* HUD labels */}
                <div className="absolute top-3 left-8 text-teal-400 text-[10px] font-mono tracking-widest hud-flicker">
                  SYS:ACTIVE
                </div>
                <div className="absolute top-3 right-8 text-teal-400 text-[10px] font-mono tracking-widest hud-flicker">
                  RES:800x500
                </div>
                <div className="absolute bottom-10 left-3 right-3">
                  <div className="bg-navy-900/80 border border-teal-400/40 rounded px-3 py-1.5 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-teal-400" />
                      <span className="text-teal-400 text-[10px] font-mono tracking-widest">
                        DENTAL PATTERN RECOGNITION | BIO-ANALYSIS
                      </span>
                    </div>
                    <div className="flex gap-4 mt-1">
                      {[
                        { icon: Shield, label: "VERIFIED" },
                        { icon: Database, label: "MATCHED" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1">
                          <Icon className="w-2.5 h-2.5 text-teal-400" />
                          <span className="text-[9px] text-teal-400/80 font-mono">
                            {label}
                          </span>
                        </div>
                      ))}
                      <div className="ml-auto">
                        <span className="text-[9px] text-green-400 font-mono">
                          ● MATCH: 98.4%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <img
                src="/assets/generated/dental-xray-hud.dim_800x500.jpg"
                alt="Dental X-ray with biometric HUD overlay"
                className="w-full object-cover"
                style={{
                  filter: "brightness(0.85) contrast(1.1) hue-rotate(10deg)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
