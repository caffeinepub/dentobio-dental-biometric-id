import { Brain, Camera, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "CAPTURE",
    icon: Camera,
    description:
      "High-resolution X-ray or CT scan input of the subject's dental and bone structure is ingested into the DentoBio pipeline for pre-processing and normalization.",
    detail: "Supports DICOM, JPEG, PNG formats",
  },
  {
    number: "02",
    title: "ANALYZE",
    icon: Brain,
    description:
      "Advanced AI pattern recognition extracts unique biometric markers — tooth morphology, root geometry, bone density gradients, and micro-structural anomalies.",
    detail: "47 distinct biometric markers extracted",
  },
  {
    number: "03",
    title: "IDENTIFY",
    icon: CheckCircle2,
    description:
      "Cross-references the extracted biometric signature against our global database to match identity with forensic-grade accuracy and full audit trail.",
    detail: "Sub-2 second identification time",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-teal-500 text-sm font-bold tracking-widest uppercase mb-3">
            The Process
          </p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-navy-900">
            HOW DENTOBIO WORKS
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            A three-step forensic identification pipeline powered by deep
            learning and neural biometric mapping.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative p-8 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-teal-400/50 transition-all group"
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors"
                  style={{ background: "#0B1F33" }}
                >
                  <step.icon className="w-6 h-6 text-teal-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="text-teal-500 text-xs font-black tracking-widest">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-navy-900">
                    {step.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="flex items-center gap-2 text-teal-600 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                {step.detail}
              </div>
              {/* Step connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-10 text-gray-300 text-xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
