"use client";

import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";
import { FiHeart, FiShield } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import type { IconType } from "react-icons";
import petlioData from "@/data/petlio.json";
import { fadeUp, staggerContainer, viewportOnce } from "@/components/motion/presets";

const iconMap: Record<string, IconType> = {
  shield: FiShield,
  heart: FiHeart,
  paw: FaPaw,
  leaf: LuLeaf,
};

const tintMap: Record<string, string> = {
  shield: "bg-[#e8f3ed] text-[#3d705f]",
  heart: "bg-[#faeee4] text-[#c4845a]",
  paw: "bg-[#e8f3ed] text-[#3d705f]",
  leaf: "bg-[#faeee4] text-[#c4845a]",
};

export function HeroFeatureBar() {
  const { heroFeatures } = petlioData;

  return (
    <section className="border-b border-[#ede8e1] bg-white pb-10 pt-2 sm:pb-14">
      <motion.div
        className="mx-auto grid max-w-[1320px] gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {heroFeatures.map((item) => {
          const Icon = iconMap[item.icon] ?? FaPaw;
          const tint = tintMap[item.icon] ?? tintMap.paw;

          return (
            <motion.div key={item.title} variants={fadeUp} className="flex gap-4">
              <motion.span
                className={`flex size-12 shrink-0 items-center justify-center rounded-full ${tint}`}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <Icon className="size-5" aria-hidden />
              </motion.span>
              <div>
                <h3 className="font-display text-sm font-bold text-[#1e3d34] sm:text-[15px]">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-[#657670] sm:text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
