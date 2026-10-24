"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import petlioData from "@/data/petlio.json";
import { FadeIn } from "@/components/motion/FadeIn";
import { easeOut } from "@/components/motion/presets";

export function CtaSection() {
  const { cta, header } = petlioData;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8 lg:px-10">
        <FadeIn y={40}>
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-petlio-deep px-8 py-12 text-center sm:px-12 sm:py-16"
            whileInView={{ scale: [0.98, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 20% 50%, #4a90e2 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4a90e2 0%, transparent 45%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">
                {cta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-petlio-sky/90">{cta.subtitle}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={cta.primary.href}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-petlio-deep transition hover:bg-petlio-sky sm:text-base"
                  >
                    {cta.primary.label}
                    <FiArrowRight className="size-4" aria-hidden />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={cta.secondary.href}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:text-base"
                  >
                    {cta.secondary.label}
                  </Link>
                </motion.div>
              </div>
              <a
                href={header.contact.phoneHref}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-petlio-sky hover:text-white"
              >
                <FiPhone className="size-4" aria-hidden />
                {header.contact.phone}
              </a>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
