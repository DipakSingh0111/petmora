"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, PawPrint } from "lucide-react";
import { FaPaw } from "react-icons/fa6";
import { FiActivity, FiHeart, FiShield } from "react-icons/fi";
import type { IconType } from "react-icons";
import petlioData from "@/data/petlio.json";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  aboutFeature,
  aboutGalleryCard,
  aboutImageReveal,
  aboutPhotoNote,
  aboutTitleAccent,
  aboutTitlePrimary,
  blurFadeUp,
  lineGrow,
  springSnappy,
  staggerRelaxed,
  viewportAbout,
} from "@/components/motion/presets";

const featureIcons: Record<string, IconType> = {
  heart: FiHeart,
  stethoscope: FiActivity,
  shield: FiShield,
  paw: FaPaw,
};

type AboutSectionProps = {
  showStory?: boolean;
  showCta?: boolean;
};

export function AboutSection({ showStory = false, showCta = true }: AboutSectionProps) {
  const { about } = petlioData;
  const ctaHref = about.cta.href;
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });

  const imageParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["6%", "-6%"],
  );
  const galleryParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["4%", "-4%"],
  );

  const copyVariants = reduceMotion ? undefined : staggerRelaxed;
  const itemBlur = reduceMotion ? aboutTitlePrimary : blurFadeUp;

  return (
    <>
      <section className="relative -mt-px w-full bg-cream pt-4 pb-2 sm:pt-6 sm:pb-3 lg:pb-4">
        <div className="site-container grid min-h-0 grid-cols-1 items-center gap-6 max-[760px]:gap-[26px] min-[761px]:gap-11 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Copy */}
        <motion.div
          className="relative z-[2] py-1 pb-2 max-[760px]:p-0"
          variants={copyVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.div
            variants={itemBlur}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#edf0e4] px-[15px] py-2.5 text-sm font-bold text-forest"
          >
            <motion.span
              aria-hidden
              initial={reduceMotion ? false : { rotate: -20, scale: 0 }}
              whileInView={reduceMotion ? undefined : { rotate: 0, scale: 1 }}
              viewport={viewportAbout}
              transition={springSnappy}
            >
              <PawPrint size={17} fill="currentColor" />
            </motion.span>
            {about.badge}
          </motion.div>

          <motion.div
            variants={lineGrow}
            className="my-[23px] mt-[34px] h-[3px] w-9 origin-left rounded-[9px] bg-sage max-[760px]:my-[18px] max-[760px]:mt-[25px]"
            aria-hidden
          />

          <motion.h2
            variants={staggerRelaxed}
            className="m-0 max-w-[650px] font-display text-[clamp(38px,4.1vw,66px)] font-extrabold leading-[1.09] tracking-[-2.8px] text-[#182f2a] max-[760px]:text-[clamp(38px,10vw,54px)] max-[760px]:tracking-[-1.8px]"
          >
            <motion.span variants={aboutTitlePrimary} className="block sm:inline">
              {about.titlePrefix}{" "}
            </motion.span>
            <motion.span
              variants={aboutTitleAccent}
              className="block text-[#527d65]"
            >
              {about.titleHighlight}
            </motion.span>
          </motion.h2>

          <motion.p
            variants={itemBlur}
            className="mb-[30px] mt-[23px] max-w-[460px] text-lg leading-[1.75] text-about-muted max-[760px]:mb-6 max-[760px]:mt-[18px] max-[760px]:text-base"
          >
            {about.description}
          </motion.p>

          <motion.div
            variants={staggerRelaxed}
            className="mb-[34px] grid max-w-[560px] grid-cols-1 gap-x-5 gap-y-6 min-[391px]:grid-cols-2 max-[760px]:mb-[26px] max-[760px]:gap-x-2.5 max-[760px]:gap-y-[18px] min-[1051px]:gap-x-5 min-[1051px]:gap-y-6"
          >
            {about.features.map(({ icon, title, text }) => {
              const Icon = featureIcons[icon] ?? FaPaw;
              return (
                <motion.div
                  key={title}
                  variants={aboutFeature}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -3, transition: { duration: 0.22 } }
                  }
                  className="flex items-start gap-3 max-[760px]:gap-2"
                >
                  <motion.div
                    className="grid size-[52px] shrink-0 place-items-center rounded-full bg-[#e4ead9] text-forest max-[760px]:size-[42px]"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { scale: 1.06, backgroundColor: "#d8e3cc" }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <Icon size={25} className="max-[760px]:size-5" aria-hidden />
                  </motion.div>
                  <div>
                    <h3 className="mb-1.5 mt-[5px] text-[15px] text-forest max-[760px]:text-[13px]">
                      {title}
                    </h3>
                    <p className="m-0 text-[13px] leading-normal text-about-muted max-[760px]:text-xs">
                      {text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {showCta && (
            <motion.div variants={itemBlur}>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={springSnappy}
                className="inline-block"
              >
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2.5 rounded-full bg-forest px-5 py-2.5 sm:px-6 sm:py-2.5 text-[15px] sm:text-base font-bold text-white transition-colors hover:bg-forest-deep"
                >
                  {about.cta.label}
                  <motion.span
                    aria-hidden
                    className="inline-flex"
                    initial={false}
                    whileHover={reduceMotion ? undefined : { x: 5 }}
                    transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Visual */}
        <motion.div
          ref={visualRef}
          className="relative min-h-[430px] max-[760px]:min-h-[430px] max-[390px]:min-h-[370px] min-[761px]:min-h-[490px] min-[1051px]:min-h-[560px]"
          aria-label={about.mainImage.alt}
          variants={staggerRelaxed}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.div
            variants={aboutImageReveal}
            className="absolute right-0 top-0 h-[350px] w-full overflow-hidden rounded-[34%_18%_22%_18%/16%_16%_20%_20%] bg-[#e4e5d9] min-[761px]:h-[430px] min-[761px]:w-[96%] min-[1051px]:h-[500px] min-[1051px]:w-[92%] min-[1051px]:rounded-[45%_20%_28%_22%/19%_19%_22%_23%] max-[390px]:h-[310px]"
          >
            <motion.div
              className="relative h-full w-full"
              style={{ y: imageParallaxY }}
            >
              <motion.div
                className="relative h-[115%] w-full -translate-y-[7%]"
                initial={reduceMotion ? false : { scale: 1.12 }}
                whileInView={reduceMotion ? undefined : { scale: 1 }}
                viewport={viewportAbout}
                transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={about.mainImage.src}
                  alt={about.mainImage.alt}
                  fill
                  priority={showStory}
                  sizes="(max-width: 800px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={aboutPhotoNote}
            className="absolute right-0 top-[15px] flex rotate-[5deg] flex-col gap-1 rounded-[22px_22px_5px_22px] bg-[rgba(250,247,239,0.93)] px-3 py-3 font-display text-xs font-extrabold text-forest shadow-[0_10px_28px_#243d2c12] backdrop-blur-[2px] min-[761px]:top-[55px] min-[761px]:-right-1 min-[761px]:gap-1 min-[761px]:px-5 min-[761px]:py-[18px] min-[761px]:text-base"
          >
            {about.photoNote.lines.map((line, i) => (
              <motion.span
                key={line}
                initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={viewportAbout}
                transition={{ delay: 0.45 + i * 0.08, duration: 0.45 }}
              >
                {line}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            style={{ y: galleryParallaxY }}
            variants={staggerRelaxed}
            className="absolute bottom-0 left-0 grid w-[86%] -rotate-2 grid-cols-3 gap-[7px] min-[761px]:w-[76%] min-[761px]:-left-[3%] min-[761px]:gap-3"
          >
            {about.gallery.map((item, index) => (
              <motion.div
                key={item.src}
                variants={aboutGalleryCard}
                transition={{ ...springSnappy, delay: 0.1 * index }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.05,
                        rotate: index === 1 ? 6 : index === 2 ? 10 : 2,
                        transition: { duration: 0.28 },
                      }
                }
                className={`relative h-[85px] overflow-hidden rounded-[13px] border-4 border-white bg-[#e9e7da] shadow-[0_10px_24px_#263a3415] max-[390px]:h-[85px] min-[761px]:h-[105px] min-[761px]:rounded-[20px] min-[761px]:border-[7px] min-[1051px]:h-[142px] ${
                  index === 1
                    ? "translate-y-[13px] rotate-[4deg]"
                    : index === 2
                      ? "translate-y-[5px] rotate-[8deg]"
                      : ""
                }`}
              >
                <Image src={item.src} alt={item.alt} fill sizes="30vw" className="object-cover" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            whileInView={reduceMotion ? undefined : { opacity: 0.7, scale: 1 }}
            viewport={viewportAbout}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-7 -left-1.5 -z-10 h-[100px] w-[23px] rotate-[35deg] rounded-[100%_0_100%_0] bg-[#9bb49a] max-[760px]:hidden"
            aria-hidden
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            whileInView={reduceMotion ? undefined : { opacity: 0.7, scale: 1 }}
            viewport={viewportAbout}
            transition={{ delay: 0.62, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-2.5 right-1 -z-10 h-[100px] w-[23px] -rotate-[40deg] rounded-[100%_0_100%_0] bg-[#6e9276] max-[760px]:hidden"
            aria-hidden
          />
        </motion.div>
        </div>
      </section>
    </>
  );
}
