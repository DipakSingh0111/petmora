"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { HeaderNav } from "@/components/HeaderNav";
import { easeOut } from "@/components/motion/presets";
import petlioData from "@/data/petlio.json";

export function Header() {
  const { header } = petlioData;
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-about-line bg-cream/95 backdrop-blur-sm"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div className="site-container flex items-center justify-between py-1.5 sm:py-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: easeOut }}
        >
          <Link href="/" className="group flex items-center transition-transform hover:opacity-95">
            <Image
              src={header.logo.src}
              alt={header.logo.alt}
              width={240}
              height={70}
              priority
              className="h-11 w-auto object-contain sm:h-13 lg:h-14"
            />
          </Link>
        </motion.div>

        <motion.div
          className="hidden items-center lg:flex"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: easeOut }}
        >
          <HeaderNav links={header.navLinks} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeOut }}
        >
          <Link
            href={header.actions.appointment.href}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }
            }}
            className="inline-flex items-center gap-2.5 rounded-full bg-forest px-5 py-2.5 text-[14px] font-semibold text-white shadow-xs transition-all hover:bg-forest-deep hover:shadow-md"
          >
            <Calendar className="size-4 shrink-0 text-[#c8ded6]" aria-hidden />
            <span>{header.actions.appointment.label}</span>
          </Link>
        </motion.div>
      </div>

      <div className="site-container overflow-x-auto border-t border-about-line py-2.5 lg:hidden">
        <HeaderNav links={header.navLinks} />
      </div>
    </motion.header>
  );
}
