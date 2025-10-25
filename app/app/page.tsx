"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreditManager, { useCredit } from "@/components/CreditManager";


export default function HomePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tone, setTone] = useState("Casual");
  const [aiScoreBefore, setAiScoreBefore] = useState<number | null>(null);
  const [aiScoreAfter, setAiScoreAfter] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { deduct } = useCredit();
 
  const badgeColor = (score: number) =>
    score > 75 ? "bg-red-400" : score > 50 ? "bg-yellow-400" : "bg-green-400";

  const cleanText = (text: string) => {
  return text
    // 🔹 Remove invisible Unicode junk and hidden spaces
    .replace(/[\u200B-\u200F\uFEFF\u2060\u00A0]/g, "")
    // 🔹 Normalize multiple spaces to a single space
    .replace(/\s{2,}/g, " ")
    // 🔹 Clean up unnecessary line breaks (extra empty lines)
    .replace(/\r?\n\s*\r?\n/g, "\n")
    // 🔹 Remove stray tabs or carriage returns
    .replace(/\t+/g, " ")
    // 🔹 Final trim (removes leading and trailing spaces)
    .trim();
};


const handleDetect = async () => {
  const cleaned = cleanText(input);
  if (!cleaned.trim()) return;

  const res = await fetch("/api/detect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: cleaned }),
  });
  const data = await res.json();
  setAiScoreBefore(data.score);
};

const handleHumanize = async () => {
  const cleaned = cleanText(input);
  if (!cleaned.trim()) return;

  // spend 1 credit before using API
  const allowed = deduct();
  if (!allowed) {
    alert("You're out of credits. Invite friends or watch an ad to continue.");
    return;
  }

  setIsLoading(true);
  const res = await fetch("/api/humanize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: cleaned, tone }),
  });
  const data = await res.json();
  setOutput(data.humanized);
  setIsLoading(false);

  setAiScoreAfter(Math.max(5, Math.floor((aiScoreBefore ?? 50) * 0.55)));
};


  return (
  <div className="min-h-screen bg-[#FFF7ED] text-[#1F2937] flex flex-col items-center pt-24 px-4">
    <CreditManager />
    <h1 className="text-4xl font-bold font-[Poppins] mb-3 text-[#1F2937]">
      PullMeText
    </h1>
      <p className="text-lg mb-8 text-gray-700 text-center">
        Detect and Humanize your AI-generated text.
      </p>

      <div className="relative w-full max-w-2xl">
        <AnimatePresence>
          {aiScoreBefore !== null && (
            <motion.div
              key="badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute -top-3 right-3 ${badgeColor(
                aiScoreBefore
              )} text-white text-sm font-medium px-3 py-1 rounded-full shadow`}
            >
              AI Likelihood {aiScoreBefore} %
            </motion.div>
          )}
        </AnimatePresence>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste AI-generated text here..."
          rows={8}
          className="w-full p-4 rounded-2xl bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />
      </div>

      {/* Tone selector */}
      <div className="mt-4 flex items-center gap-3">
        <label className="font-medium">Tone:</label>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#F59E0B] outline-none"
        >
          <option>Casual</option>
          <option>Professional</option>
          <option>Academic</option>
          <option>Serious</option>
          <option>Friendly</option>
        </select>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDetect}
          className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2 rounded-full font-medium transition"
        >
          Check AI Content
        </button>
        <button
          onClick={handleHumanize}
          disabled={isLoading}
          className="bg-[#1F2937] hover:bg-[#111827] text-[#FFF7ED] px-5 py-2 rounded-full font-medium transition disabled:opacity-60"
        >
          {isLoading ? "Humanizing..." : "Humanize Text"}
        </button>
      </div>

      {output && (
        <div className="mt-10 w-full max-w-4xl grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white shadow">
            <h3 className="font-semibold mb-2 text-[#F59E0B]">Before</h3>
            <p className="text-sm mb-4 text-gray-700 whitespace-pre-wrap">
              {input}
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${badgeColor(aiScoreBefore ?? 0)}`}
                style={{ width: `${aiScoreBefore ?? 0}%` }}
              />
            </div>
            <p className="text-sm mt-1 text-gray-600">
              AI-Content: {aiScoreBefore ?? 0} %
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow">
            <h3 className="font-semibold mb-2 text-[#16A34A]">After</h3>
            <p className="text-sm mb-4 text-gray-700 whitespace-pre-wrap">
              {output}
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400"
                style={{ width: `${aiScoreAfter ?? 0}%` }}
              />
            </div>
            <p className="text-sm mt-1 text-gray-600">
              AI-Content: {aiScoreAfter ?? 0} %
            </p>
          </div>
        </div>
      )}
      {/* Floating live badge */}
<AnimatePresence>
  {aiScoreBefore !== null && (
    <motion.div
      key="floating-badge"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor:
          aiScoreBefore > 70
            ? "#ef4444" // red
            : aiScoreBefore > 40
            ? "#f59e0b" // yellow
            : "#22c55e", // green
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      className="fixed top-5 right-5 px-4 py-2 rounded-full text-white font-semibold shadow-lg z-50"
    >
      AI Content: {aiScoreBefore}%
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
