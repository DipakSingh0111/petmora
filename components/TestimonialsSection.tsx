"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaPaw, FaStar } from "react-icons/fa6";
import petlioData from "@/data/petlio.json";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import {
  blurFadeUp,
  easeOut,
  fadeUp,
  springSnappy,
  staggerRelaxed,
  viewportAbout,
} from "@/components/motion/presets";

type TestimonialItem = {
  quote: string;
  name: string;
  petLabel: string;
  rating: number;
  personImage: string;
  petImage: string;
};

function BackgroundDoodles() {
  return (
    <>
      <FaPaw
        className="pointer-events-none absolute left-[6%] top-[18%] size-10 rotate-[-18deg] text-forest/10"
        aria-hidden
      />
      <FaPaw
        className="pointer-events-none absolute right-[10%] top-[22%] size-14 rotate-[12deg] text-sage/20"
        aria-hidden
      />
      <FaPaw
        className="pointer-events-none absolute bottom-[24%] left-[12%] size-12 rotate-[25deg] text-forest/10"
        aria-hidden
      />
    </>
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="40"
      viewBox="0 0 48 40"
      fill="#214b3b"
      aria-hidden
    >
      <path d="M8 28c0-8 4-14 12-18l2 4c-6 3-8 7-8 10h8V28H8zm24 0c0-8 4-14 12-18l2 4c-6 3-8 7-8 10h8V28H32z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="mt-5 flex gap-1.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={`size-[15px] ${i < count ? "text-[#e5a03d]" : "text-[#dce2d5]"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  reduceMotion,
}: {
  item: TestimonialItem;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.article
      className="flex items-center gap-5 min-[901px]:gap-7"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.22 }}
    >
      {/* Avatar cluster + quote (reference layout) */}
      <div className="relative shrink-0 pl-1 pt-1">
        <QuoteMark className="absolute -left-1 top-0 z-10 w-10 min-[901px]:w-12" />

        <div className="relative ml-3 mt-5">
          <div className="relative size-[130px] overflow-hidden rounded-full border border-[#e5e7eb] bg-[#f3f4f6] shadow-[0_6px_20px_rgba(0,0,0,0.08)] min-[901px]:size-[155px]">
            <Image
              src={item.personImage}
              alt=""
              fill
              sizes="155px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-0 size-[44px] overflow-hidden rounded-full border-[3px] border-white bg-[#f3f4f6] shadow-[0_4px_12px_rgba(0,0,0,0.12)] min-[901px]:bottom-2 min-[901px]:size-[50px]">
            <Image
              src={item.petImage}
              alt=""
              fill
              sizes="50px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="min-w-0 flex-1 pt-1">
        <h3 className="m-0 text-[1.35rem] font-bold leading-tight text-[#182f2a] min-[901px]:text-[1.55rem]">
          {item.name}
        </h3>
        <p className="mt-1.5 text-[11px] font-bold tracking-[0.14em] text-[#527d65] min-[901px]:text-xs">
          {item.petLabel}
        </p>
        <p className="mt-4 text-[14px] italic leading-[1.85] text-about-muted min-[901px]:text-[15px]">
          {item.quote}
        </p>
        <Stars count={item.rating} />
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  const { testimonials } = petlioData;
  const reduceMotion = useReducedMotion();
  const items = testimonials.items as TestimonialItem[];
  const [index, setIndex] = useState(0);

  const visiblePair = useMemo(() => {
    const first = items[index % items.length];
    const second = items[(index + 1) % items.length];
    return [first, second];
  }, [index, items]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-cream text-forest pt-2 pb-10 sm:pt-4 sm:pb-14"
    >
      <BackgroundDoodles />

      <div className="site-container relative z-[1]">
        <motion.div
          className="mx-auto max-w-[820px] text-center"
          variants={staggerRelaxed}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.div variants={blurFadeUp} className="mb-5 inline-flex">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-[#edf0e4] px-4 py-2 text-sm font-bold text-forest">
              <FaPaw size={16} aria-hidden />
              {testimonials.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            variants={blurFadeUp}
            className="m-0 font-display text-[clamp(2rem,4.8vw,3.25rem)] font-extrabold tracking-[-0.5px] text-[#182f2a]"
          >
            {testimonials.title}
          </motion.h2>


        </motion.div>

        <div className="relative mt-8 min-h-[340px] min-[901px]:min-h-[240px]">
          <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-2 min-[901px]:gap-x-8 min-[901px]:gap-y-8">
            {visiblePair.map((item, slot) => (
              <motion.div
                key={`${index}-${slot}-${item.name}`}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: easeOut }}
              >
                <TestimonialCard item={item} reduceMotion={reduceMotion} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-5"
          variants={fadeUp}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.button
            type="button"
            onClick={goPrev}
            whileHover={reduceMotion ? undefined : { scale: 1.08, x: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            transition={springSnappy}
            className="grid size-11 place-items-center rounded-full border border-forest/30 bg-white text-forest shadow-xs transition-colors hover:bg-[#edf0e4]"
            aria-label="Previous reviews"
          >
            <HiChevronLeft className="size-6" strokeWidth={2} />
          </motion.button>
          <motion.button
            type="button"
            onClick={goNext}
            whileHover={reduceMotion ? undefined : { scale: 1.08, x: 2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            transition={springSnappy}
            className="grid size-11 place-items-center rounded-full border border-forest/30 bg-white text-forest shadow-xs transition-colors hover:bg-[#edf0e4]"
            aria-label="Next reviews"
          >
            <HiChevronRight className="size-6" strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
