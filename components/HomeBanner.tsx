"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";
import petlioData from "@/data/petlio.json";
import {
  blurFadeUp,
  easeOut,
  fadeUp,
  lineGrow,
  staggerRelaxed,
} from "@/components/motion/presets";

const { hero } = petlioData;

export function HomeBanner() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: easeOut }}
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest/60 to-forest/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-forest-deep/15"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100svh] items-center py-16 sm:py-20">
        <div className="site-container w-full">
          <motion.div
            className="max-w-xl"
            variants={staggerRelaxed}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={blurFadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#edf0e4]/95 px-4 py-2 text-sm font-bold text-forest backdrop-blur-sm"
            >
              <PawPrint size={16} fill="currentColor" aria-hidden />
              {hero.badge}
            </motion.div>

            <motion.h1
              variants={staggerRelaxed}
              className="font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-extrabold leading-[1.06] tracking-tight text-white"
            >
              <motion.span variants={blurFadeUp} className="block">
                {hero.headline.line1}
              </motion.span>
              <motion.span variants={fadeUp} className="block text-[#b8cfc0]">
                {hero.headline.line2}
              </motion.span>
            </motion.h1>

            <motion.div
              variants={lineGrow}
              className="mt-5 h-0.5 w-12 origin-left rounded-full bg-white/35"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
      {/* Cream wave → About section */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 text-cream"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: easeOut }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-14 w-full sm:h-16 lg:h-20"
          aria-hidden
        >
          <path
            d="M0,32 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
    </section>
  );
}
