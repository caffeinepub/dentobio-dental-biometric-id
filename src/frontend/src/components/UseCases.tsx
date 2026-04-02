import { CreditCard, Lock, Search } from "lucide-react";
import { motion } from "motion/react";

const useCases = [
  {
    icon: Search,
    title: "Forensic Identification",
    description:
      "Identify unknown remains using dental records in criminal investigations and disaster victim identification. Used by law enforcement and forensic odontologists globally.",
    tag: "Law Enforcement",
  },
  {
    icon: CreditCard,
    title: "Medical Records",
    description:
      "Link patients to their complete medical history without passwords or ID cards. Eliminate mix-ups and enable instant record retrieval across hospitals and clinics.",
    tag: "Healthcare",
  },
  {
    icon: Lock,
    title: "Security & Access Control",
    description:
      "Biometric authentication using dental and bone structure for high-security environments where traditional biometrics can be spoofed or compromised.",
    tag: "Defense & Security",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-teal-500 text-sm font-bold tracking-widest uppercase mb-3">
            Applications
          </p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-navy-900">
            USE CASES
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            DentoBio's forensic-grade biometrics serve critical applications
            across law enforcement, healthcare, and security sectors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{
                  background: "linear-gradient(135deg, #0B1F33, #153B59)",
                }}
              >
                <uc.icon className="w-7 h-7 text-teal-400" />
              </div>
              <div className="mb-3">
                <span className="text-xs font-bold tracking-widest text-teal-500 uppercase">
                  {uc.tag}
                </span>
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-navy-900 mb-3">
                {uc.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {uc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
