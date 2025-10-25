"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cleanText = (text: string) => {
  const before = text.length;
  const cleaned = text
    .replace(/[\u200B-\u200F\uFEFF\u2060\u00A0]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\r?\n\s*\r?\n/g, "\n")
    .replace(/\t+/g, " ")
    .trim();
  const removed = before - cleaned.length;
  return { cleaned, removed };
};

export default function UnicodeCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removed, setRemoved] = useState(0);
  const [cleaned, setCleaned] = useState(false);

  const handleClean = () => {
    const { cleaned, removed } = cleanText(input);
    setOutput(cleaned);
    setRemoved(removed);
    setCleaned(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    alert("Cleaned text copied!");
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center relative overflow-hidden"
      >
        <h1 className="text-4xl font-bold font-[Poppins] text-[#1F2937] mb-3">
          Unicode Cleaner
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Instantly remove invisible characters, zero-width spaces, and messy
          formatting — make your text clean and detector-ready.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here..."
          rows={6}
          className="w-full p-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-[#F59E0B] outline-none resize-none text-gray-800 bg-[#FFFDF9]"
        />

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handleClean}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-2 rounded-full font-medium transition"
          >
            Clean Text
          </button>
          {cleaned && (
            <button
              onClick={handleCopy}
              className="bg-[#1F2937] hover:bg-[#111827] text-[#FFF7ED] px-6 py-2 rounded-full font-medium transition"
            >
              Copy Cleaned
            </button>
          )}
        </div>

        <AnimatePresence>
          {cleaned && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-lg font-medium text-[#1F2937]">
                ✅ Cleaned successfully!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Removed{" "}
                <span className="text-[#F59E0B] font-semibold">
                  {removed} hidden {removed === 1 ? "character" : "characters"}
                </span>{" "}
                for a smoother, human-friendly result.
              </p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(removed * 2, 100)}%` }}
                className="h-2 bg-[#F59E0B] rounded-full mt-3 mx-auto max-w-xs"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-10 text-gray-500 text-sm text-center">
        Free forever · Built by <span className="text-[#F59E0B]">PullMeText</span>
      </footer>
    </div>
  );
}
