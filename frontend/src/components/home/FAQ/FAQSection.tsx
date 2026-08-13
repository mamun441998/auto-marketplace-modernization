"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { fetchFaqs } from "@/lib/content";

const HEADING =
  "font-extrabold tracking-[-0.04em] leading-[1.1] text-white text-[22px] sm:text-[25px] md:text-[28px] lg:text-[34px] xl:text-[38px] 2xl:text-[42px]";

// Fallback shown only if the admin has not published any FAQs yet.
const DEALER_FAQS = [
  {
    q: "How quickly can we migrate our existing car inventory into MotoHave?",
    a: "Most car dealerships and showroom owners are fully set up within 24 to 48 hours. Our automated migration tools and dedicated technical support team handle the bulk import of your vehicle data, photos, and specs from CSV, Excel, or legacy dealer management systems (DMS) seamlessly.",
  },
  {
    q: "Can we sync our car listings automatically to Facebook Marketplace and Instagram?",
    a: "Yes! MotoHave features a powerful multi-channel syndication engine. Once you add or update a car in your showroom inventory, it instantly syncs and publishes across Facebook Marketplace, Instagram, your custom dealer website, and top local automotive classified portals.",
  },
  {
    q: "Do you offer staff training for our showroom sales team?",
    a: "Absolutely. Every dealer subscription includes white-glove onboarding and live interactive training sessions tailored specifically for your sales representatives, floor managers, and digital marketing personnel.",
  },
  {
    q: "How does MotoHave help us track and manage customer test drive leads?",
    a: "Our built-in automotive CRM captures leads from every touchpoint (website forms, WhatsApp, live chat, and phone calls). It automatically assigns leads to specific sales reps, sends automated WhatsApp follow-ups, and tracks test-drive booking statuses in real-time.",
  },
  {
    q: "Is there a limit on how many vehicle photos and listings we can upload?",
    a: "No! Depending on your chosen tier, MotoHave offers high-speed cloud storage optimized for high-resolution vehicle galleries, 360-degree walkarounds, and high-definition video walkthroughs with zero bandwidth throttling.",
  },
];

type FaqItem = { q: string; a: string };

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [items, setItems] = useState<FaqItem[]>(DEALER_FAQS);

  useEffect(() => {
    let active = true;
    fetchFaqs().then((data) => {
      if (!active) return;
      if (data.length > 0) {
        setItems(data.map((f) => ({ q: f.question, a: f.answer })));
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#171617] py-24 lg:py-32 text-white selection:bg-[#FC5E01] selection:text-white">
      
      {/* Top Fade Gradient Layer */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#171617] via-[#171617]/60 to-transparent pointer-events-none z-20" />

      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        <Container>
          
          {/* Header Component */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#FC5E01]" />
              <span className="text-sm font-medium text-white">
                Got Questions About MotoHave?
              </span>
            </div>
            
            <h2 className={HEADING}>
              Frequently Asked Questions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC5E01] to-orange-400">Dealership Owners</span>
            </h2>
            
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Everything you need to know about scaling your car showroom, automating vehicle inventory, and closing more deals faster.
            </p>
          </div>

          {/* FAQ List Component */}
          <div className="max-w-4xl mx-auto space-y-4">
            {items.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 backdrop-blur-xl ${
                    isOpen 
                      ? "border-[#FC5E01]/60 bg-white/[0.04] shadow-xl shadow-[#FC5E01]/5" 
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center shrink-0 justify-center transition-colors ${
                        isOpen ? "bg-[#FC5E01] text-white" : "bg-white/5 text-[#FC5E01]"
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="text-base sm:text-lg">{faq.q}</span>
                    </div>

                    <div 
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#FC5E01]/20 text-[#FC5E01]" : "rotate-0 bg-white/5 text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-300 border-t border-white/5 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Help Banner */}
          <div className="mt-16 max-w-3xl mx-auto rounded-3xl bg-white/[0.02] border border-white/10 p-8 text-center backdrop-blur-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#FC5E01]/10 flex items-center justify-center text-[#FC5E01] mx-auto mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Still have questions about your showroom software?</h3>
            <p className="mt-2 text-sm text-slate-400 max-w-lg mx-auto">
              Our automotive enterprise advisors are ready to walk you through a customized demonstration for your car dealership.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FC5E01] hover:bg-[#E55A00] text-white font-bold text-sm transition-all shadow-lg shadow-[#FC5E01]/30 group"
              >
                Start Free Trial <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm transition-all"
              >
                Contact
              </a>
            </div>
          </div>

        </Container>
      </div>
    </section>
  );
}