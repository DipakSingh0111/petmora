"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import petlioData from "@/data/petlio.json";

const galleryImages = petlioData.galleryPage.images;

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <main className="flex-1 overflow-hidden bg-cream pb-8">
      <div className="site-container mx-auto max-w-[1440px] px-6 pt-8 pb-4 lg:px-10">
        
        {/* Pure image grid without any text or filters */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {galleryImages.map((src, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-[20px] bg-slate-200 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <Image
                src={src}
                alt="Pet photo"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox Modal on Image Click with Slider Navigation */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md transition-all select-none"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Previous Slide Button */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 z-30 flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md shadow-lg transition-all hover:bg-white hover:text-[#1e3d34] hover:scale-110 active:scale-95 cursor-pointer"
          >
            <FiChevronLeft className="size-7 stroke-[2.5]" />
          </button>

          {/* Next Slide Button */}
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 z-30 flex size-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md shadow-lg transition-all hover:bg-white hover:text-[#1e3d34] hover:scale-110 active:scale-95 cursor-pointer"
          >
            <FiChevronRight className="size-7 stroke-[2.5]" />
          </button>

          {/* Center Image Container */}
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/60 text-white shadow-md transition-all hover:bg-black hover:scale-105 cursor-pointer"
            >
              <FiX className="size-5" />
            </button>

            {/* Natural aspect ratio image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={galleryImages[selectedIndex]}
              src={galleryImages[selectedIndex]}
              alt={`Pet photo ${selectedIndex + 1}`}
              className="max-h-[82vh] max-w-[85vw] rounded-xl object-contain transition-opacity duration-300"
            />

            {/* Image counter indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
