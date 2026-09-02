"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import questyImage from "@/Questy Image.png";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, inViewOnce, staggerContainer } from "@/lib/motion";
import { testimonials } from "@/lib/home-content";

/** Scroll-snap testimonial carousel with Questy peeking in from the side. */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-16 sm:py-24">
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-10 top-1/2 hidden h-40 w-40 -translate-y-1/2 opacity-90 lg:block"
      >
        <Image src={questyImage} alt="" className="h-full w-auto object-contain" />
      </motion.div>

      <Container>
        <SectionHeading
          eyebrow="Loved by families"
          title="What Parents & Teachers Say"
          subtitle="Real feedback from the grown-ups behind our young detectives."
        />

        <motion.ul
          variants={staggerContainer}
          {...inViewOnce}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-1 pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <motion.li
              key={testimonial.id}
              variants={fadeUp}
              className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-[32%]"
            >
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex h-full flex-col rounded-3xl border-2 border-detective-blue-100 bg-white p-6 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-detective-blue-100 text-2xl"
                  >
                    {testimonial.avatarEmoji}
                  </span>
                  <div>
                    <p className="font-display font-bold text-detective-blue-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm font-semibold text-detective-orange-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-detective-yellow-400 text-detective-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="mt-4 grow text-detective-blue-700/85">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
