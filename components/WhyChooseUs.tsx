"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";
import {
  HiOutlineHeart,
  HiOutlineSparkles,
  HiOutlineStar,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import petlioData from "@/data/petlio.json";
import {
  blurFadeUp,
  easeOut,
  fadeUp,
  springSnappy,
  staggerRelaxed,
  viewportAbout,
} from "@/components/motion/presets";

const decoFade = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const iconMap: Record<string, IconType> = {
  paw: FaPaw,
  sparkles: HiOutlineSparkles,
  heart: HiOutlineHeart,
  star: HiOutlineStar,
};

const toneStyles: Record<
  string,
  { card: string; icon: string; line: string }
> = {
  sage: {
    card: "bg-[#f1f5ec]",
    icon: "bg-[#dce9d6] text-[#315f4c]",
    line: "bg-[#4c9b87]",
  },
  cream: {
    card: "bg-[#f8f4e8]",
    icon: "bg-[#e2eadb] text-[#315f4c]",
    line: "bg-[#4c9b87]",
  },
  blue: {
    card: "bg-[#edf5f8]",
    icon: "bg-[#d5eaf2] text-[#347c8d]",
    line: "bg-[#4c9b87]",
  },
  peach: {
    card: "bg-[#f8f0e5]",
    icon: "bg-[#f8e1c3] text-[#a66a24]",
    line: "bg-[#4c9b87]",
  },
};

function BranchLarge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 280"
      fill="none"
      aria-hidden
    >
      <path
        d="M110 20c-8 42-28 78-58 108 32-18 58-44 78-76-14 38-36 72-66 98 28-8 52-24 70-46-6 28-20 52-42 70 24-2 46-12 62-28"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <ellipse cx="48" cy="92" rx="18" ry="10" fill="currentColor" opacity="0.2" transform="rotate(-35 48 92)" />
      <ellipse cx="88" cy="58" rx="16" ry="9" fill="currentColor" opacity="0.18" transform="rotate(25 88 58)" />
      <ellipse cx="152" cy="118" rx="20" ry="11" fill="currentColor" opacity="0.2" transform="rotate(-15 152 118)" />
      <ellipse cx="72" cy="168" rx="17" ry="10" fill="currentColor" opacity="0.18" transform="rotate(40 72 168)" />
      <ellipse cx="128" cy="198" rx="19" ry="10" fill="currentColor" opacity="0.2" transform="rotate(-28 128 198)" />
    </svg>
  );
}

function PawWatermark({ className }: { className?: string }) {
  return <FaPaw className={className} aria-hidden />;
}

export function WhyChooseUs() {
  const { whyChooseUs } = petlioData;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-choose-us"
      className="relative w-full overflow-hidden bg-[#faf8f0] text-[#214b3b] pt-2 pb-10 sm:pt-3 sm:pb-14"
    >
      <motion.div
        className="pointer-events-none absolute left-[4%] top-8 sm:left-[6%] sm:top-10"
        initial={reduceMotion ? false : { opacity: 0, rotate: -8 }}
        whileInView={reduceMotion ? undefined : { opacity: 0.9, rotate: 0 }}
        viewport={viewportAbout}
        transition={{ duration: 0.7, ease: easeOut }}
      >
        <PawWatermark className="size-[120px] text-[#dce9d6] sm:size-[150px]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -right-4 top-0 sm:-right-2 sm:top-2"
        variants={decoFade}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={viewportAbout}
      >
        <BranchLarge className="h-[min(42vw,320px)] w-auto text-[#9bb49a] sm:h-[360px]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-6 -left-8 sm:-left-4"
        variants={decoFade}
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={viewportAbout}
        transition={{ delay: 0.12, duration: 0.8, ease: easeOut }}
      >
        <BranchLarge className="h-[280px] w-auto rotate-[165deg] scale-x-[-1] text-[#8fad93] sm:h-[340px]" />
      </motion.div>

      <div className="site-container relative z-[1]">
        <motion.div
          className="mx-auto mb-6 max-w-[790px] text-center min-[901px]:mb-8"
          variants={staggerRelaxed}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.span
            variants={blurFadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-[#edf0e4] px-[15px] py-2.5 text-sm font-bold text-[#456d56]"
          >
            <FaPaw size={17} aria-hidden />
            {whyChooseUs.eyebrow}
          </motion.span>

          <motion.div variants={blurFadeUp} className="relative mx-auto mt-5 max-w-[680px]">
            <h2 className="m-0 font-display text-[clamp(34px,4.2vw,58px)] font-extrabold leading-[1.08] tracking-[-2px] text-[#203d36] max-[600px]:tracking-[-1.2px]">
              {whyChooseUs.title}{" "}
              <span className="text-[#789477]">{whyChooseUs.titleHighlight}</span>
            </h2>

          </motion.div>

          <motion.p
            variants={blurFadeUp}
            className="mx-auto mt-4 max-w-[760px] text-[clamp(15px,1.45vw,18px)] leading-[1.7] text-[#7b8c8d]"
          >
            {whyChooseUs.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-3 min-[381px]:grid-cols-2 min-[381px]:gap-[18px] min-[1001px]:grid-cols-4"
          variants={staggerRelaxed}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          {whyChooseUs.cards.map((card, index) => {
            const Icon = iconMap[card.icon] ?? FaPaw;
            const tone = toneStyles[card.tone] ?? toneStyles.sage;

            return (
              <motion.article
                key={card.title}
                variants={fadeUp}
                transition={{ delay: reduceMotion ? 0 : 0.07 * index, ease: easeOut }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -5, transition: { duration: 0.22 } }
                }
                className={`flex min-w-0 flex-col items-center rounded-[19px] border border-white/90 p-[15px_13px_16px] text-center shadow-[0_12px_34px_rgba(39,66,51,0.045)] min-[601px]:rounded-[25px] min-[601px]:p-[22px_22px_24px] ${tone.card}`}
              >
                <motion.div
                  className={`mb-[11px] grid size-11 shrink-0 place-items-center rounded-full min-[601px]:mb-[13px] min-[601px]:size-[58px] ${tone.icon}`}
                  whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                  transition={springSnappy}
                >
                  <Icon className="size-[21px] min-[601px]:size-[25px]" aria-hidden />
                </motion.div>
                <h3 className="mb-2 mt-0 text-base font-bold leading-snug tracking-[-0.4px] text-[#244b40] min-[601px]:mb-[9px] min-[601px]:text-[clamp(17px,1.35vw,22px)]">
                  {card.title}
                </h3>
                <p className="mb-0 text-[13px] leading-[1.55] text-[#7b8c8d] min-[601px]:text-[15px]">
                  {card.description}
                </p>
                <span
                  className={`mt-[18px] block h-1 w-11 rounded-[9px] min-[601px]:mt-[22px] ${tone.line}`}
                  aria-hidden
                />
              </motion.article>
            );
          })}
        </motion.div>


      </div>
    </section>
  );
}
