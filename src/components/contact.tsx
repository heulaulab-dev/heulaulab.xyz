"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="px-6 md:px-10 py-24 md:py-40 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Left: copy */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-4">
                Contact
              </p>
              <h2
                className="font-display font-bold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Start something
<br />
                <span className="text-accent">worth remembering.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <p className="text-sm text-text-secondary leading-relaxed">
                We take on a limited number of projects each year. If you have
                something that needs to be built properly, we want to hear about
                it.
              </p>
              <div className="flex flex-col gap-2 pt-4">
                <a
                  href="mailto:hello@heulaulab.xyz"
                  className="text-sm text-text-primary hover:text-accent transition-colors"
                >
                  hello@heulaulab.xyz
                </a>
                <p className="text-sm text-text-muted">Jakarta, Indonesia</p>
              </div>
            </motion.div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <motion.form
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <FormField label="Name" name="name" type="text" required placeholder="Your name" />
              <FormField label="Email" name="email" type="email" required placeholder="you@company.com" />
              <FormField
                label="What are you building?"
                name="project"
                type="text"
                required
                placeholder="A digital product, a spatial experience, something else entirely..."
              />
              <FormField
                label="Tell us more"
                name="message"
                type="textarea"
                required
                placeholder="Budget, timeline, the problem you're trying to solve..."
              />

              <div className="pt-2">
                {status === "sent" ? (
                  <p className="text-sm text-accent">
                    Message received. We will be in touch.
                  </p>
                ) : (
                  <Button size="lg" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send message"}
                  </Button>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono text-[10px] text-text-muted tracking-widest uppercase"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className="bg-surface-raised border border-border text-text-primary text-sm px-4 py-3 resize-none focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className="bg-surface-raised border border-border text-text-primary text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-text-muted"
        />
      )}
    </div>
  );
}
