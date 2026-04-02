import { Activity, Globe, Layers, Zap } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Activity,
    title: "Neural Pattern Mapping",
    description:
      "Deep learning models trained on 2M+ dental X-ray datasets extract 47 unique biometric markers per scan.",
  },
  {
    icon: Layers,
    title: "Multi-Modal Fusion",
    description:
      "Combines dental morphology, bone density, root geometry, and mandibular structure for composite identity fingerprint.",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description:
      "Sub-2 second identification pipeline using distributed GPU inference and vector database lookup.",
  },
  {
    icon: Globe,
    title: "Global Database",
    description:
      "Cross-references against 50M+ indexed dental records with end-to-end encryption and zero-knowledge architecture.",
  },
];

export default function TechnologySection() {
  return (
    <section
      id="technology"
      className="py-24"
      style={{ background: "#2B3A45" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-teal-400 text-sm font-bold tracking-widest uppercase mb-3">
            Core Technology
          </p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
            FORENSIC-GRADE AI ENGINE
          </h2>
          <p className="text-[#C7D0DA] mt-4 max-w-xl mx-auto">
            Built on decades of forensic odontology research, DentoBio's AI
            engine sets the global standard for dental biometric accuracy.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg border border-teal-400/20 bg-white/5 hover:bg-white/10 hover:border-teal-400/40 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-400/15 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-2">
                {f.title}
              </h3>
              <p className="text-[#C7D0DA] text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
