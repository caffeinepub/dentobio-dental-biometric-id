import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitDemoRequest } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function RequestAccess() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submit = useSubmitDemoRequest();

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit.mutateAsync(form);
    setSubmitted(true);
  }

  return (
    <section
      id="request-access"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #0B1F33 0%, #0F2A44 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-teal-400 text-sm font-bold tracking-widest uppercase mb-3">
            Get Started
          </p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
            REQUEST ACCESS
          </h2>
          <p className="text-[#C7D0DA] mt-4">
            Join law enforcement agencies, hospitals, and security teams using
            DentoBio.
          </p>
        </motion.div>

        <div
          className="rounded-xl border border-teal-400/30 p-8"
          style={{
            background: "rgba(21,59,89,0.4)",
            backdropFilter: "blur(10px)",
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                data-ocid="request.success_state"
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl font-bold">
                  Request Received!
                </h3>
                <p className="text-[#C7D0DA] text-sm">
                  Our team will review your application and contact you within 2
                  business days.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-[#C7D0DA] text-xs font-bold uppercase tracking-wider"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      data-ocid="request.input"
                      value={form.name}
                      onChange={update("name")}
                      required
                      placeholder="Dr. Sarah Chen"
                      className="bg-white/5 border-teal-400/30 text-white placeholder:text-gray-600 focus:border-teal-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-[#C7D0DA] text-xs font-bold uppercase tracking-wider"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      data-ocid="request.input"
                      value={form.email}
                      onChange={update("email")}
                      required
                      placeholder="sarah.chen@hospital.org"
                      className="bg-white/5 border-teal-400/30 text-white placeholder:text-gray-600 focus:border-teal-400"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="org"
                    className="text-[#C7D0DA] text-xs font-bold uppercase tracking-wider"
                  >
                    Organization
                  </Label>
                  <Input
                    id="org"
                    data-ocid="request.input"
                    value={form.organization}
                    onChange={update("organization")}
                    required
                    placeholder="Metropolitan Police Department"
                    className="bg-white/5 border-teal-400/30 text-white placeholder:text-gray-600 focus:border-teal-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-[#C7D0DA] text-xs font-bold uppercase tracking-wider"
                  >
                    Use Case / Message
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="request.textarea"
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    placeholder="Describe your intended use case and organization's needs..."
                    className="bg-white/5 border-teal-400/30 text-white placeholder:text-gray-600 focus:border-teal-400 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="request.submit_button"
                  disabled={submit.isPending}
                  className="w-full bg-cobalt-500 hover:bg-cobalt-600 text-white font-bold tracking-wide uppercase text-sm py-3"
                >
                  {submit.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Submit Request
                    </>
                  )}
                </Button>
                {submit.isError && (
                  <p
                    data-ocid="request.error_state"
                    className="text-red-400 text-sm text-center"
                  >
                    Submission failed. Please try again.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
