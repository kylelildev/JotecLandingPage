import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-screen w-full overflow-hidden grain">
      {/* Background mesh orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="mesh-orb animate-orb" style={{ background: "#004CB6", width: 520, height: 520, top: "-10%", left: "-10%" }} />
        <div className="mesh-orb animate-orb" style={{ background: "#FFC108", width: 420, height: 420, top: "30%", right: "-8%", animationDelay: "3s" }} />
        <div className="mesh-orb animate-orb" style={{ background: "#D92822", width: 360, height: 360, bottom: "-5%", left: "35%", animationDelay: "6s" }} />
        <div className="mesh-orb animate-orb" style={{ background: "#07A6E6", width: 300, height: 300, top: "50%", left: "10%", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 pt-40 md:pt-48 pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          data-testid="hero-overline"
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold mb-8"
        >
          JOTEC × Blackmagic Design — Authorized Showcase
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          data-testid="hero-title"
          className="font-display font-black text-[14vw] md:text-[9vw] leading-[0.9] tracking-tighter text-white"
        >
          Edit at the <br />
          <span className="brand-gradient-text">speed of light.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          data-testid="hero-sub"
          className="mt-10 max-w-2xl text-lg md:text-xl text-zinc-400 leading-relaxed"
        >
          Five precision instruments engineered by Blackmagic Design for the cut page,
          the grading suite, and the live broadcast booth. Distributed by {BRAND.name}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#showcase"
            data-testid="hero-cta-showcase"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-semibold hover:scale-105 transition-transform"
          >
            Explore the lineup
            <ArrowDownRight size={18} className="group-hover:rotate-45 transition-transform" />
          </a>
          <a
            href="#contact"
            data-testid="hero-cta-contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-3 font-medium hover:border-white/60 hover:bg-white/5 transition"
          >
            Talk to a specialist
          </a>
        </motion.div>
      </div>

      {/* Gradient bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] brand-gradient-bg" />
    </section>
  );
};

export default Hero;
