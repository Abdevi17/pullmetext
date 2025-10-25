"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreditManager, { useCredit } from "@/components/CreditManager";
 // 👈 Adjust path if needed

export default function ContentPage() {
  
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [tone, setTone] = useState("Natural");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { deduct } = useCredit(); // 👈 hook to subtract credit per generation
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


const handleGenerate = async () => {
  const cleanedIdea = cleanText(idea);
  if (!cleanedIdea.trim()) return;

  // deduct credit before generating
  const allowed = deduct();
  if (!allowed) {
    alert("You're out of credits. Invite friends or watch an ad to continue.");
    return;
  }

  setLoading(true);
  setOutput("");
  setPlatform(null);

  const res = await fetch("/api/contentgen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea: cleanedIdea, platform: "Auto", tone }),
  });

  const data = await res.json();
  const cleanedOutput = cleanText(data.output);
  setOutput(cleanedOutput);
  setPlatform(data.platform);
  setLoading(false);
};


  return (
  <div className="min-h-screen bg-[#FFF7ED] text-[#1F2937] flex flex-col items-center pt-24 px-4">
    <CreditManager />
    
    <h1 className="text-4xl font-bold font-[Poppins] mb-2 text-[#1F2937]">
      AI Content Creator
    </h1>
    <p className="text-lg mb-8 text-gray-700 text-center max-w-lg">
      Turn your ideas into viral scripts, captions, or posts — instantly.
    </p>

      <div className="w-full max-w-2xl">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Type your idea here... (e.g., a 30s TikTok about morning routines)"
          rows={6}
          className="w-full p-4 rounded-2xl bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#F59E0B] transition"
        />

        <div className="mt-4 flex items-center justify-between">
          <label className="font-medium text-gray-700">Tone:</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#F59E0B] outline-none"
          >
            <option>Natural</option>
            <option>Professional</option>
            <option>Motivational</option>
            <option>Funny</option>
            <option>Educational</option>
            <option>Emotional</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 w-full bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-3 rounded-full font-medium transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </div>

      <AnimatePresence>
        {platform && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 bg-[#FDE68A] text-[#1F2937] px-5 py-2 rounded-full text-sm font-semibold shadow"
          >
            Detected Platform: {platform}
          </motion.div>
        )}
      </AnimatePresence>

      {output && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md"
        >
          <h3 className="font-semibold mb-2 text-[#F59E0B]">Generated Script</h3>
          <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
            {output}
          </pre>
        </motion.div>
      )}
    </div>
  );
}
