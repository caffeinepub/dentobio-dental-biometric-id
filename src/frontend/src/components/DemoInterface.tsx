import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useAddIdentificationRecord,
  useGetIdentificationRecords,
} from "@/hooks/useQueries";
import { CheckCircle2, Clock, Database, Loader2, ScanLine } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type ScanState = "idle" | "scanning" | "complete";

function randomHex(length: number) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleString();
}

export default function DemoInterface() {
  const [subjectId, setSubjectId] = useState("");
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    matchScore: number;
    hash: string;
  } | null>(null);

  const { data: records = [], isLoading: recordsLoading } =
    useGetIdentificationRecords();
  const addRecord = useAddIdentificationRecord();

  async function runScan() {
    if (!subjectId.trim()) return;
    setScanState("scanning");
    setProgress(0);
    setResult(null);

    const steps = [15, 35, 55, 72, 88, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 400));
      setProgress(step);
    }

    const matchScore = Math.floor(Math.random() * 15) + 85;
    const hash = randomHex(40);

    await addRecord
      .mutateAsync({
        subjectId,
        matchScore: BigInt(matchScore),
        dentalPatternHash: hash,
        status: "MATCHED",
      })
      .catch(() => null);

    setResult({ matchScore, hash });
    setScanState("complete");
  }

  function resetScan() {
    setScanState("idle");
    setProgress(0);
    setResult(null);
    setSubjectId("");
  }

  return (
    <section
      id="demo"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #0B1F33 0%, #153B59 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-teal-400 text-sm font-bold tracking-widest uppercase mb-3">
            Live System
          </p>
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
            DEMO IDENTIFICATION INTERFACE
          </h2>
          <p className="text-[#C7D0DA] mt-4 max-w-xl mx-auto">
            Experience the DentoBio identification pipeline. Enter a subject ID
            and run a simulated biometric scan.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-xl border border-teal-400/30 overflow-hidden"
            style={{
              background: "rgba(11,31,51,0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-teal-400/20 bg-teal-400/5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <span className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-teal-400 text-xs font-mono ml-2 tracking-widest">
                DENTOBIO_SCAN_v2.1
              </span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-[10px] font-mono">
                  SYSTEM ONLINE
                </span>
              </div>
            </div>

            {/* Input area */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="subject-id"
                  className="text-[#C7D0DA] text-xs font-bold uppercase tracking-wider"
                >
                  Subject ID
                </label>
                <div className="flex gap-3">
                  <Input
                    id="subject-id"
                    data-ocid="demo.input"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && scanState === "idle" && runScan()
                    }
                    placeholder="e.g. SUBJ-2026-00142"
                    disabled={scanState === "scanning"}
                    className="bg-white/5 border-teal-400/30 text-white placeholder:text-gray-500 focus:border-teal-400 font-mono"
                  />
                  {scanState === "idle" && (
                    <Button
                      data-ocid="demo.primary_button"
                      onClick={runScan}
                      disabled={!subjectId.trim()}
                      className="bg-cobalt-500 hover:bg-cobalt-600 text-white font-bold whitespace-nowrap px-6"
                    >
                      <ScanLine className="w-4 h-4 mr-2" />
                      Run Scan
                    </Button>
                  )}
                  {scanState === "complete" && (
                    <Button
                      data-ocid="demo.secondary_button"
                      onClick={resetScan}
                      variant="outline"
                      className="border-teal-400/40 text-teal-400 hover:bg-teal-400/10 whitespace-nowrap px-6 bg-transparent"
                    >
                      New Scan
                    </Button>
                  )}
                </div>
              </div>

              {/* Scanning animation */}
              <AnimatePresence>
                {scanState === "scanning" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-teal-400 text-sm font-mono">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing dental biometric markers...</span>
                    </div>
                    <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300"
                        style={{ boxShadow: "0 0 10px rgba(46,212,215,0.6)" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-gray-500">
                      {[
                        "TOOTH MORPHOLOGY",
                        "BONE DENSITY",
                        "ROOT GEOMETRY",
                      ].map((label, i) => (
                        <div
                          key={label}
                          className={`text-center ${progress >= (i + 1) * 33 ? "text-teal-400" : ""}`}
                        >
                          {progress >= (i + 1) * 33 ? "✓" : "◻"} {label}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result */}
              <AnimatePresence>
                {scanState === "complete" && result && (
                  <motion.div
                    data-ocid="demo.success_state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-green-400/40 bg-green-400/5 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-white font-bold text-sm">
                          IDENTIFICATION COMPLETE
                        </span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-400/40 font-bold tracking-wider">
                        MATCHED
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <p className="text-gray-500 mb-0.5">MATCH SCORE</p>
                        <p className="text-teal-400 text-2xl font-black">
                          {result.matchScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-0.5">SUBJECT ID</p>
                        <p className="text-white font-semibold">{subjectId}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500 mb-0.5">
                          DENTAL PATTERN HASH
                        </p>
                        <p className="text-teal-400/80 break-all">
                          {result.hash}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Recent records */}
          <div className="mt-8">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              Recent Identification Records
            </h3>

            {recordsLoading ? (
              <div data-ocid="demo.loading_state" className="text-center py-8">
                <Loader2 className="w-6 h-6 text-teal-400 animate-spin mx-auto" />
              </div>
            ) : records.length === 0 ? (
              <div
                data-ocid="demo.empty_state"
                className="text-center py-8 border border-teal-400/20 rounded-lg"
              >
                <p className="text-gray-500 text-sm">
                  No identification records yet. Run a scan above.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {records.slice(0, 5).map((record, i) => (
                  <div
                    key={`${record.subjectId}-${record.dentalPatternHash}`}
                    data-ocid={`demo.item.${i + 1}`}
                    className="flex items-center gap-4 px-4 py-3 rounded-lg border border-teal-400/15 text-xs font-mono"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <Badge
                      className={`text-[10px] font-bold ${
                        record.status === "MATCHED"
                          ? "bg-green-500/20 text-green-400 border-green-400/40"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-400/40"
                      }`}
                    >
                      {record.status}
                    </Badge>
                    <span className="text-white flex-1 truncate">
                      {record.subjectId}
                    </span>
                    <span className="text-teal-400">
                      {record.matchScore.toString()}%
                    </span>
                    <span className="text-gray-500 hidden sm:block">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {formatTimestamp(record.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
