import type { Transition, Variants } from "framer-motion";

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 130,
  damping: 22,
  mass: 0.85,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 24,
  mass: 1,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

/** Slower, more readable stagger for long copy blocks */
export const staggerRelaxed: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeOut },
  },
};

export const lineGrow: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const aboutTitlePrimary: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const aboutTitleAccent: Variants = {
  hidden: { opacity: 0, y: 32, x: -12 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { ...springSoft, delay: 0.12 },
  },
};

export const aboutFeature: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSnappy,
  },
};

export const aboutImageReveal: Variants = {
  hidden: { opacity: 0, x: 56, scale: 0.96, rotate: 1.5 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const aboutPhotoNote: Variants = {
  hidden: { opacity: 0, scale: 0.82, rotate: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 5,
    transition: { ...springSnappy, delay: 0.35 },
  },
};

export const aboutGalleryCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSoft,
  },
};

export const viewportOnce = { once: true, margin: "-80px" as const };

export const viewportAbout = { once: true, margin: "-12% 0px -10% 0px" as const };
