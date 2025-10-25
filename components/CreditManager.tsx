"use client";

import { useEffect, useState } from "react";

export default function CreditManager() {
  const [credits, setCredits] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // On first load, set starting credits (6 if new user)
  useEffect(() => {
    const stored = localStorage.getItem("credits");
    if (stored === null) {
      localStorage.setItem("credits", "6");
      setCredits(6);
    } else {
      setCredits(parseInt(stored, 10));
    }
  }, []);

  // helper: subtract 1 credit
  const handleUseCredit = () => {
    if (credits === null) return;

    const newCredits = Math.max(0, credits - 1);
    localStorage.setItem("credits", newCredits.toString());
    setCredits(newCredits);

    if (newCredits <= 0) {
      setShowModal(true);
    }
  };

  // helper: add credits (invite / watch ad / upgrade)
  const addCredits = (amount: number) => {
    const current = credits ?? 0;
    const newCredits = current + amount;
    localStorage.setItem("credits", newCredits.toString());
    setCredits(newCredits);
    setShowModal(false);
  };

  // We return two things:
  // 1. the floating badge
  // 2. the “out of credits” modal when needed
  return (
    <>
      {/* floating badge top-right */}
      <div className="fixed top-4 right-4 bg-[#F59E0B] text-white px-4 py-2 rounded-full text-sm font-semibold shadow z-50">
        Credits: {credits ?? "…"}
      </div>

      {/* locked state modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#1F2937]">
              You’re out of credits 😢
            </h2>

            <p className="text-gray-600 mb-6 text-sm">
              Get more credits instantly:
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => addCredits(6)}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2 rounded-full text-sm transition"
              >
                Invite a friend (+6)
              </button>

              <button
                onClick={() => addCredits(1)}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-2 rounded-full text-sm transition"
              >
                Watch an ad (+1)
              </button>

              <button
                onClick={() => {
                  // later this will take them to real pricing page
                  window.open("/pricing", "_blank");
                }}
                className="bg-[#1F2937] hover:bg-[#111827] text-white px-4 py-2 rounded-full text-sm transition"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * useCredit()
 * This hook is used by pages to spend a credit BEFORE doing work.
 * If user has 0 credits, it returns false.
 * If user has credits, it subtracts 1 and returns true.
 */
export function useCredit() {
  const deduct = () => {
    const stored = localStorage.getItem("credits");
    if (!stored) {
      // no credits stored yet, block
      return false;
    }

    const current = parseInt(stored, 10);
    if (current <= 0) {
      return false;
    }

    const newVal = current - 1;
    localStorage.setItem("credits", newVal.toString());
    return true;
  };

  return { deduct };
}
