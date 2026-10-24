"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa6";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";
import petlioData from "@/data/petlio.json";

export default function BookAppointmentPage() {
  const { appointmentPage } = petlioData;

  const [minDate, setMinDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    petName: "",
    petType: "Dog",
    service: appointmentPage?.services?.[0]?.name || "Veterinary Consultation",
    date: "",
    time: appointmentPage?.timeSlots?.[0] || "10:30 AM",
    notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <main className="flex-1 bg-cream py-12 sm:py-16">
      <div className="site-container mx-auto max-w-[840px] px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[32px] border border-warm-border bg-white p-7 sm:p-12 shadow-sm"
        >
          
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div className="flex size-16 items-center justify-center rounded-full bg-forest text-white shadow-md">
                <FiCheckCircle className="size-9 text-[#8be2b6]" />
              </div>
              <h2 className="font-display mt-5 text-2xl sm:text-3xl font-extrabold text-forest">
                Appointment Requested!
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted">
                Thank you, <strong className="text-forest">{formData.ownerName}</strong>. Your appointment for <strong className="text-forest">{formData.petName}</strong> on <strong className="text-forest">{formData.date} at {formData.time}</strong> has been received. We’ll confirm your slot shortly via SMS/Email.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    ownerName: "",
                    email: "",
                    phone: "",
                    petName: "",
                    petType: "Dog",
                    service: appointmentPage?.services?.[0]?.name || "Veterinary Consultation",
                    date: "",
                    time: appointmentPage?.timeSlots?.[0] || "10:30 AM",
                    notes: "",
                  });
                }}
                className="mt-8 rounded-full bg-forest px-8 py-3 text-sm font-bold text-white transition hover:bg-forest-deep cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <>
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e5df] bg-[#eef5f1] px-3.5 py-1 text-xs font-semibold text-forest mb-3">
                  <FaPaw className="size-3 text-sage" />
                  <span>Quick Booking</span>
                </div>
                <h1 className="font-display text-[28px] sm:text-[34px] font-extrabold text-forest tracking-tight">
                  Book an Appointment
                </h1>
                <p className="mt-1.5 text-sm text-muted">
                  Fill in the details below to schedule a visit for your pet.
                </p>
              </div>

              {/* Simple Clean Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Pet Name & Pet Category */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Pet's Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Max"
                      value={formData.petName}
                      onChange={(e) =>
                        setFormData({ ...formData, petName: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Pet Type *
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
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                    Service Required *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest focus:border-forest focus:bg-white focus:outline-none transition-all"
                  >
                    {appointmentPage?.services?.map((svc) => (
                      <option key={svc.id} value={svc.name}>
                        {svc.name} ({svc.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={minDate || undefined}
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest focus:border-forest focus:bg-white focus:outline-none transition-all"
                    >
                      {appointmentPage?.timeSlots?.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Owner Name, Email, Phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.ownerName}
                      onChange={(e) =>
                        setFormData({ ...formData, ownerName: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Notes (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-forest mb-2">
                    Special Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific symptoms, allergies, or questions..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full rounded-2xl border border-warm-border bg-cream/40 px-4 py-3 text-sm text-forest placeholder:text-muted/60 focus:border-forest focus:bg-white focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-forest py-4 text-base font-bold text-white shadow-sm transition hover:bg-forest-deep hover:shadow-md cursor-pointer disabled:opacity-75"
                  >
                    <FiCalendar className="size-4" />
                    <span>{loading ? "Submitting Request..." : "Confirm Appointment"}</span>
                  </button>
                </div>

              </form>
            </>
          )}

        </motion.div>

      </div>
    </main>
  );
}
