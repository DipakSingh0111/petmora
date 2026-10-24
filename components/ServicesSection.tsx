"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import petlioData from "@/data/petlio.json";
import {
  blurFadeUp,
  easeOut,
  fadeUp,
  springSnappy,
  staggerRelaxed,
  viewportAbout,
} from "@/components/motion/presets";


export function ServicesSection() {
  const { services } = petlioData;
  const reduceMotion = useReducedMotion();
  const columns = services.listColumns ?? [[], []];

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-cream text-forest pt-6 pb-3 sm:pt-10 sm:pb-4 lg:pb-6"
    >
      <div className="site-container relative z-[1] grid grid-cols-1 items-center gap-8 min-[901px]:grid-cols-2 min-[901px]:gap-8 lg:gap-10">
        {/* Left — copy & list */}
        <motion.div
          className="max-[900px]:text-center min-[901px]:pr-4"
          variants={staggerRelaxed}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.div variants={blurFadeUp} className="mb-5 inline-flex">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[#edf0e4] px-4 py-2 text-sm font-bold text-forest">
              <FaPaw size={16} aria-hidden />
              {services.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={blurFadeUp}
            className="m-0 font-display text-[clamp(2.25rem,5.2vw,3.65rem)] font-extrabold leading-[1.1] tracking-[-1.2px] text-[#182f2a]"
          >
            {services.title}
          </motion.h2>

          <motion.p
            variants={blurFadeUp}
            className="mt-5 max-w-[580px] text-[17px] leading-[1.75] text-about-muted min-[901px]:text-xl max-[900px]:mx-auto"
          >
            {services.subtitle}
          </motion.p>

          <motion.div
            variants={staggerRelaxed}
            className="mt-9 grid max-w-[560px] grid-cols-1 gap-x-12 gap-y-4 min-[480px]:grid-cols-2 max-[900px]:mx-auto"
          >
            {columns.map((col, colIndex) => (
              <ul key={colIndex} className="m-0 list-none space-y-4 p-0">
                {col.map((label) => (
                  <motion.li
                    key={label}
                    variants={fadeUp}
                    className="flex items-center gap-3 text-[17px] font-semibold text-[#263a34] min-[901px]:text-xl"
                  >
                    <FaPaw
                      className="size-5 shrink-0 text-forest sm:size-[22px]"
                      aria-hidden
                    />
                    {label}
                  </motion.li>
                ))}
              </ul>
            ))}
          </motion.div>

          {services.cta ? (
            <motion.div variants={fadeUp} className="mt-6 sm:mt-7 max-[900px]:flex max-[900px]:justify-center">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={springSnappy}
              >
                <Link
                  href={services.cta.href}
                  className="inline-flex items-center gap-2.5 rounded-full bg-forest px-5 py-2.5 sm:px-6 sm:py-2.5 text-[15px] sm:text-base font-bold text-white shadow-[0_6px_20px_rgba(33,75,59,0.22)] transition-colors hover:bg-forest-deep"
                >
                  {services.cta.label}
                  <HiArrowUpRight className="size-5" aria-hidden />
                </Link>
              </motion.div>
            </motion.div>
          ) : null}
        </motion.div>

        {/* Right — pets + paw watermark */}
        <motion.div
          className="relative mx-auto flex w-full max-w-[680px] items-end justify-center min-[901px]:max-w-none min-[901px]:justify-end"
          initial={reduceMotion ? false : { opacity: 1, x: 36, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
          viewport={viewportAbout}
          transition={{ duration: 0.75, ease: easeOut }}
        >
          <motion.div
            className="relative z-[1] aspect-[4/3] w-full max-w-[640px] min-[901px]:max-w-[760px] lg:max-w-[820px]"
            initial={reduceMotion ? false : { scale: 0.94 }}
            whileInView={reduceMotion ? undefined : { scale: 1 }}
            viewport={viewportAbout}
            transition={{ duration: 0.85, ease: easeOut, delay: 0.08 }}
          >
            <Image
              src={services.heroImage.src}
              alt={services.heroImage.alt}
              fill
              sizes="(max-width: 900px) 95vw, 820px"
              className="object-contain object-bottom drop-shadow-sm rounded-2xl"
              priority={false}
              unoptimized
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
