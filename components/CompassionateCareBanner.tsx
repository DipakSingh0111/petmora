"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import petlioData from "@/data/petlio.json";
import {
  blurFadeUp,
  fadeUp,
  staggerRelaxed,
  viewportAbout,
} from "@/components/motion/presets";

// Custom Cute Hand-Drawn Bunny Illustration matching the reference design
function BunnyDoodle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Left Ear */}
      <path
        d="M38 34 C33 22 30 10 38 4 C45 -1 48 10 46 25"
        stroke="#214b3b"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 12 C39 8 42 6 43 12 C44 17 43 24 43 24"
        stroke="#77967f"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Right Ear */}
      <path
        d="M48 27 C50 14 54 3 61 4 C68 5 65 17 58 29"
        stroke="#214b3b"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56 12 C58 8 61 8 60 14 C59 19 56 25 56 25"
        stroke="#77967f"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Bunny Body / Head Contour */}
      <path
        d="M32 37 C22 43 16 54 18 67 C20 81 33 89 54 89 C76 89 88 80 87 64 C86 51 76 43 62 39 C54 37 40 34 32 37 Z"
        stroke="#214b3b"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Fluffy Tail */}
      <path
        d="M87 62 C93 60 97 64 96 69 C95 74 90 75 86 73"
        stroke="#214b3b"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Cute Eyes (winking/happy dots) */}
      <circle cx="34" cy="53" r="2.8" fill="#214b3b" />
      <circle cx="47" cy="53" r="2.8" fill="#214b3b" />

      {/* Heart / Tiny Nose */}
      <path
        d="M40 58 L41.5 60 L38.5 60 Z"
        fill="#e5a880"
      />

      {/* Whiskers / Cheeky freckles */}
      <circle cx="26" cy="57" r="1.3" fill="#214b3b" opacity="0.6" />
      <circle cx="28" cy="61" r="1.3" fill="#214b3b" opacity="0.6" />
      <circle cx="53" cy="57" r="1.3" fill="#214b3b" opacity="0.6" />
      <circle cx="55" cy="61" r="1.3" fill="#214b3b" opacity="0.6" />

      {/* Gentle smile */}
      <path
        d="M38 62 C39 64 41 64 42 62"
        stroke="#214b3b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CompassionateCareBanner() {
  const reduceMotion = useReducedMotion();
  const appointmentHref = petlioData.header.actions.appointment.href;

  return (
    <section className="relative w-full overflow-hidden bg-cream border-y border-about-line">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[460px] lg:min-h-[520px]">
        {/* Left Column: High Quality Veterinarian Clinic Photo */}
        <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden order-2 lg:order-1">
          <Image
            src="/images/clinic-care.jpg"
            alt="Veterinarian gently examining a calm ginger cat in a bright, modern clinic room"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle inner shadow / border blend */}
          <div
            className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none lg:border-r lg:border-about-line"
            aria-hidden
          />
        </div>

        {/* Right Column: Warm Cream Content Area */}
        <div className="flex flex-col items-center justify-center px-6 py-14 sm:px-12 sm:py-20 lg:px-16 text-center order-1 lg:order-2">
          <motion.div
            className="flex flex-col items-center max-w-md"
            variants={staggerRelaxed}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={viewportAbout}
          >
            {/* Cute Bunny Doodle Icon */}
            <motion.div
              variants={fadeUp}
              className="mb-4 inline-flex items-center justify-center"
              whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
            >
              <BunnyDoodle className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-xs" />
            </motion.div>

            {/* Editorial Heading matching reference style */}
            <motion.h2
              variants={blurFadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-forest leading-[1.08]"
            >
              Compassionate Care <br />
              for Every Friend
            </motion.h2>

            {/* Pill CTA Button (Theme Forest Pill) */}
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href={appointmentHref}
                className="group inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-[15px] font-bold text-white shadow-md transition-all duration-300 hover:bg-forest hover:shadow-lg hover:scale-105"
              >
                <span>Book Appointment</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
