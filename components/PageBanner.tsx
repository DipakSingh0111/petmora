"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";
import { FiChevronRight, FiHome } from "react-icons/fi";

const routeTitleMap: Record<string, string> = {
  about: "About Us",
  services: "Our Services",
  pets: "Our Pets",
  gallery: "Photo Gallery",
  blog: "Blog & Articles",
  contact: "Contact Us",
  "book-appointment": "Book an Appointment",
  appointment: "Book an Appointment",
  favorites: "My Favorites",
  faq: "Frequently Asked Questions",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
};

function formatSegment(seg: string): string {
  if (routeTitleMap[seg.toLowerCase()]) {
    return routeTitleMap[seg.toLowerCase()];
  }
  return seg
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function PageBanner() {
  const pathname = usePathname();

  // Home page par breadcrumb banner nahi dikhana
  if (!pathname || pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const currentTitle =
    segments.length > 0
      ? formatSegment(segments[segments.length - 1])
      : "Page";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f1e8] via-[#faf8f4] to-[#faf8f5] py-14 sm:py-16 lg:py-20 border-b border-[#ece5da]">
      {/* Subtle organic decorative background paw accents */}
      <FaPaw
        className="pointer-events-none absolute -bottom-10 -left-10 size-[200px] -rotate-12 text-[#214b3b]/[0.035] select-none sm:size-[240px]"
        aria-hidden
      />
      <FaPaw
        className="pointer-events-none absolute -top-10 -right-10 size-[200px] rotate-[25deg] text-[#214b3b]/[0.035] select-none sm:size-[240px]"
        aria-hidden
      />

      {/* Subtle leaf/botanical flourish */}
      <div
        className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 opacity-20 hidden md:block"
        aria-hidden
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="3" fill="#77967f" />
          <circle cx="12" cy="20" r="2" fill="#77967f" />
          <circle cx="36" cy="28" r="2" fill="#77967f" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 text-center lg:px-10">
        {/* Page Title */}
        <motion.h1
          key={currentTitle}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[38px] font-[800] tracking-[-0.03em] text-forest sm:text-[46px] lg:text-[54px] leading-tight"
        >
          {currentTitle}
        </motion.h1>

        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Breadcrumb"
          className="mt-4 flex items-center justify-center"
        >
          <ol className="inline-flex items-center gap-2 rounded-full border border-[#e3dbce] bg-white/80 px-4 py-1.5 text-[13px] sm:text-[14px] font-medium shadow-xs backdrop-blur-xs">
            {/* Home link */}
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-forest"
              >
                <FiHome className="size-3.5 text-sage" aria-hidden />
                <span>Home</span>
              </Link>
            </li>

            {/* Path segments */}
            {segments.map((seg, index) => {
              const isLast = index === segments.length - 1;
              const href = "/" + segments.slice(0, index + 1).join("/");
              const label = formatSegment(seg);

              return (
                <li key={href} className="inline-flex items-center gap-2">
                  <FiChevronRight
                    className="size-3.5 text-[#b0bcaf] stroke-[2.5]"
                    aria-hidden
                  />
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="font-semibold text-forest"
                    >
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="text-muted transition-colors hover:text-forest"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>
      </div>
    </section>
  );
}
