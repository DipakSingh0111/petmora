"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiCalendar,
} from "react-icons/fi";
import petlioData from "@/data/petlio.json";

const iconMap = {
  phone: FiPhone,
  mail: FiMail,
  mapPin: FiMapPin,
  clock: FiClock,
};

export default function ContactPage() {
  const { contactPage } = petlioData;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "Dog",
    service: "General Checkup",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="flex-1 overflow-hidden bg-cream pb-20">
      
      {/* 1. Quick Info Cards */}
      <section className="site-container mx-auto max-w-[1440px] px-6 pt-12 lg:px-10">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
        >
          {contactPage.cards.map((card, idx) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] || FiPhone;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative flex flex-col justify-between rounded-[24px] border border-warm-border bg-white p-6 shadow-xs transition-shadow duration-300 hover:shadow-lg"
              >
                <div>
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-2xl ${card.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold text-forest">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted leading-relaxed">
                    {card.subtext}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#f0eae1]">
                  <a
                    href={card.href}
                    className="inline-flex items-center text-sm font-bold text-forest transition-colors hover:text-sage"
                  >
                    <span>{card.actionText}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 2. Main Form & Location / Story Section */}
      <section className="site-container mx-auto max-w-[1440px] px-6 pt-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column — Interactive Message Form (7 cols) */}
          <div className="lg:col-span-7 rounded-[32px] border border-warm-border bg-white p-7 sm:p-10 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e5df] bg-[#eef5f1] px-3.5 py-1 text-xs font-semibold text-forest mb-4">
              <FaPaw className="size-3 text-sage" />
              <span>{contactPage.form.badge}</span>
            </div>

            <h2 className="font-display text-[30px] sm:text-[36px] font-extrabold text-forest tracking-tight">
              {contactPage.form.title}
            </h2>
            <p className="mt-2 text-[15px] text-muted">
              {contactPage.form.description}
            </p>

            {submitted ? (
              <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-[#eef5f1] p-10 text-center border border-[#d2e3dc]">
                <div className="flex size-14 items-center justify-center rounded-full bg-forest text-white">
                  <FiCheckCircle className="size-8 text-[#98dfbe]" />
                </div>
                <h3 className="font-display mt-4 text-2xl font-bold text-forest">
                  Thank You, {formData.name || "Friend"}!
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted">
                  Your message has been sent successfully. One of our compassionate pet experts will reach out to you within a few hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      petType: "Dog",
                      service: "General Checkup",
                      message: "",
                    });
                  }}
                  className="mt-6 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-deep cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  {/* Pet Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Pet Type
                    </label>
                    <select
                      value={formData.petType}
                      onChange={(e) =>
                        setFormData({ ...formData, petType: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest focus:border-forest focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="Dog">Dog 🐕</option>
                      <option value="Cat">Cat 🐈</option>
                      <option value="Bird">Bird 🦜</option>
                      <option value="Rabbit">Rabbit 🐇</option>
                      <option value="Other">Other Pet</option>
                    </select>
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest focus:border-forest focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="General Checkup">General Checkup</option>
                      <option value="Grooming & Spa">Grooming & Spa</option>
                      <option value="Pet Boarding">Pet Boarding</option>
                      <option value="Vaccination">Vaccination</option>
                      <option value="Other Query">Other Query</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us a little bit about your pet and how we can assist you..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-forest-deep hover:shadow-md cursor-pointer disabled:opacity-70"
                >
                  <FiSend className="size-4" />
                  <span>{loading ? "Sending Message..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column — Map Card & Direct Appointment Banner (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Appointment Box */}
            <div className="relative overflow-hidden rounded-[32px] bg-forest p-8 text-white shadow-md">
              <FaPaw
                className="pointer-events-none absolute -right-6 -bottom-6 size-44 rotate-12 text-white/5 select-none"
                aria-hidden
              />
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-cream">
                {contactPage.quickAppointment.badge}
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold text-white">
                {contactPage.quickAppointment.title}
              </h3>
              <p className="mt-2 text-sm text-cream/80 leading-relaxed">
                {contactPage.quickAppointment.description}
              </p>

              <Link
                href={contactPage.quickAppointment.buttonHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-forest shadow-xs transition-all hover:bg-cream hover:scale-105"
              >
                <FiCalendar className="size-4 text-forest" />
                <span>{contactPage.quickAppointment.buttonLabel}</span>
              </Link>
            </div>

            {/* Embedded Interactive Map Preview */}
            <div className="relative overflow-hidden rounded-[32px] border border-warm-border bg-white p-3 shadow-sm">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px]">
                <iframe
                  title="Paw & Co. Clinic Location"
                  src={contactPage.clinicLocation.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="h-full w-full grayscale-[25%] contrast-[1.05]"
                />
              </div>

              <div className="flex items-center justify-between p-3">
                <div>
                  <h4 className="font-display text-sm font-bold text-forest">
                    {contactPage.clinicLocation.name}
                  </h4>
                  <p className="text-xs text-muted">{contactPage.clinicLocation.address}</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-forest/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-forest hover:bg-forest hover:text-white transition"
                >
                  Directions
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
