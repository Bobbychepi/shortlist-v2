"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { faqs } from "@/constants/faqs";
import { fadeUp } from "@/lib/animations/fadeUp";

export default function FAQ() {
  return (
    <section id="faq" className="bg-secondary/20 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-indigo-400">
            FAQ
          </p>

          <h2
            className="text-4xl font-bold text-white md:text-5xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Questions answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion.Root type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={faq.q}
                value={`item-${index}`}
                className="overflow-hidden rounded-xl border border-white/[0.07] bg-card"
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.03)",
                }}
              >
                <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-white transition-colors hover:text-white/90 [&[data-state=open]>svg]:rotate-180">
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {faq.q}
                  </span>

                  <ChevronDown className="ml-4 h-4 w-4 shrink-0 text-white/30 transition-transform duration-200" />
                </Accordion.Trigger>

                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[slideUp_200ms_ease-out] data-[state=open]:animate-[slideDown_200ms_ease-out]">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-white/50">
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}