"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-[#1F2937] font-[Inter] relative">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-[#FFF7ED]/70 shadow-sm" : "bg-transparent"
        }`}
      >
        {/* Animated Logo */}
        <motion.h1
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 10,
            delay: 0.2,
          }}
          className="text-2xl md:text-3xl font-[Archivo] font-bold"
        >
          <span className="text-[#F59E0B]">Pull</span>
          <span className="text-[#1F2937]">MeText</span>
        </motion.h1>

    

      </nav>

     <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-[#FDBA74] to-[#FBBF24]">
  <h1 className="text-5xl md:text-6xl font-bold font-[Poppins] leading-tight text-[#1F2937]">
    Transform AI Text & Ideas <br />
    <span className="text-[#FFF7ED] drop-shadow-md">
      into Real, Human Stories
    </span>
  </h1>

  <p className="mt-6 text-lg md:text-xl max-w-xl text-gray-800 font-[Inter]">
    Whether you want to <span className="font-semibold text-[#1F2937]">humanize AI-written text</span> or
    <span className="font-semibold text-[#1F2937]"> generate new posts, scripts, and captions</span> —
    PullMeText makes your words feel alive.
  </p>

  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
   

    <a
      href="/app"
      className="bg-[#1F2937] text-[#FFF7ED] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#111827] transition"
    >
      Humanize Text
    </a>
     <a
  href="/cleaner"
  className="inline-block bg-[#FDE68A] text-[#1F2937] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#FCD34D] transition shadow"
>
  Remove Hidden Unicode (Free)
</a>

    <a
      href="/content"
      className="bg-[#F59E0B] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#D97706] transition"
    >
      Create Content
    </a>
  </div>
</section>


      {/* How It Works */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-[Poppins] font-semibold mb-10">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { icon: "✍️", title: "Paste your AI text" },
            { icon: "🤖", title: "Choose your tone" },
            { icon: "💬", title: "Get your humanized version" },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </motion.div>
          ))}
        </div>
        <a
          href="/app"
          className="mt-12 inline-block bg-[#F59E0B] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#D97706] transition"
        >
          Start Humanizing
        </a>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-[#FFF3E0] text-center">
        <h2 className="text-3xl md:text-4xl font-[Poppins] font-semibold mb-10">
          Pricing
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-10 max-w-4xl mx-auto">
          <div className="p-8 bg-white rounded-2xl shadow-md w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-gray-600 mb-6">3 humanizations per day.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
  <a
    href="/app"
    className="bg-[#1F2937] text-[#FFF7ED] px-8 py-3 rounded-full text-lg font-medium hover:bg-[#111827] transition"
  >
    Humanize Text
  </a>

  <a
    href="/content"
    className="bg-[#F59E0B] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#D97706] transition"
  >
    Create Content
  </a>
</div>

          </div>
          <div className="p-8 bg-[#FDBA74] rounded-2xl shadow-md w-full md:w-1/2 border-2 border-[#F59E0B]">
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-gray-700 mb-6">
              Unlimited access, advanced tones, and watermark-free text.
            </p>
            <a
              href="#"
              className="inline-block bg-[#1F2937] text-[#FFF7ED] px-6 py-2 rounded-full hover:bg-[#111827] transition"
            >
              Coming Soon
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-600">
        Built with ❤️ by ZeroToBillion | © 2025 PullMeText
      </footer>
    </div>
  );
}

