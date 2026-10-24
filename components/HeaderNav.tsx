"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type NavLink = {
  label: string;
  href: string;
};

export function HeaderNav({ links, className = "" }: { links: NavLink[]; className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={`flex items-center gap-6 sm:gap-8 ${className}`}>
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }
            }}
            className={`relative py-1 text-[15px] font-medium transition-colors ${
              isActive
                ? "font-semibold text-forest"
                : "text-about-muted hover:text-forest"
            }`}
          >
            {link.label}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-sage"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
