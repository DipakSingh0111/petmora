"use client";

import Link from "next/link";
import Image from "next/image";
import type { ComponentType, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { HiOutlineClock } from "react-icons/hi2";
import petlioData from "@/data/petlio.json";
import {
  fadeUp,
  springSnappy,
  staggerRelaxed,
  viewportAbout,
} from "@/components/motion/presets";

const FOREST = "#214b3b";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
  Twitter: FaXTwitter,
};

function FooterBrandLogo() {
  return (
    <Link href="/" className="inline-flex items-center transition-transform hover:opacity-95">
      <Image
        src={petlioData.header.logo.src}
        alt={petlioData.header.logo.alt}
        width={240}
        height={70}
        className="h-11 w-auto object-contain sm:h-13 lg:h-14"
      />
    </Link>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-base font-bold text-[#182f2a]">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
              }}
              className="text-[15px] text-about-muted transition hover:text-forest"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { footer } = petlioData;
  const reduceMotion = useReducedMotion();

  function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="bg-cream text-forest border-t border-[#e2e7db]">
      <div className="site-container pt-8 pb-12 sm:pt-10 sm:pb-14">
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12"
          variants={staggerRelaxed}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={viewportAbout}
        >
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            <FooterBrandLogo />
            <p className="mt-5 max-w-[300px] text-[14px] leading-[1.75] text-about-muted">
              {footer.description}
            </p>
            <div className="mt-6 flex items-start gap-3">
              <motion.span
                className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-white"
                whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 5 }}
                transition={springSnappy}
              >
                <HiOutlineClock className="size-5" aria-hidden />
              </motion.span>
              <div className="pt-0.5 text-[14px] leading-snug text-about-muted">
                <p className="m-0 font-bold text-[#182f2a]">{footer.hours.daysLabel}</p>
                <p className="m-0 mt-0.5">{footer.hours.time}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FooterLinkColumn
              title={footer.categories.title}
              links={footer.categories.links}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <FooterLinkColumn
              title={footer.support.title}
              links={footer.support.links}
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-base font-bold text-[#182f2a]">
              {footer.newsletter.title}
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-about-muted">
              {footer.newsletter.description}
            </p>
            <form className="mt-5 space-y-3" onSubmit={onNewsletterSubmit}>
              <input
                type="text"
                name="name"
                placeholder={footer.newsletter.namePlaceholder}
                className="w-full rounded-full border border-[#d1d7cc] bg-white px-4 py-2.5 text-sm text-[#182f2a] outline-none transition-shadow placeholder:text-[#99a69d] focus:border-forest focus:shadow-[0_0_0_3px_rgba(33,75,59,0.15)]"
              />
              <input
                type="email"
                name="email"
                placeholder={footer.newsletter.emailPlaceholder}
                className="w-full rounded-full border border-[#d1d7cc] bg-white px-4 py-2.5 text-sm text-[#182f2a] outline-none transition-shadow placeholder:text-[#99a69d] focus:border-forest focus:shadow-[0_0_0_3px_rgba(33,75,59,0.15)]"
              />
            </form>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-t border-[#e2e7db]">
        <motion.div
          className="site-container flex flex-col items-center justify-between gap-4 py-5 sm:flex-row"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportAbout}
          transition={{ duration: 0.45 }}
        >
          <p className="m-0 text-sm font-medium text-forest">{footer.copyright}</p>
          <div className="flex gap-2">
            {footer.social.map((item) => {
              const Icon = socialIcons[item.label] ?? FaFacebookF;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={reduceMotion ? undefined : { scale: 1.1, y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  transition={springSnappy}
                  className="grid size-8 place-items-center rounded-full bg-forest text-white transition-colors hover:bg-forest-deep"
                  aria-label={item.label}
                >
                  <Icon className="size-3.5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
