"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const PROJECT_SCOPES = [
  "IT Consulting & CORE Engineering",
  "Closed-Door Sovereign Multilingual Chat",
  "TITAN117 Local-First AI Deployment",
  "Defense & Autonomous Drone Swarm R&D",
  "Technical SEO & AI-Search (GEO)",
  "DBLuna / Ninjathons Inquiry",
] as const;

export function ContactForm() {
  const [selectedScope, setSelectedScope] = useState<string>(PROJECT_SCOPES[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-black/12 bg-[#FCF7F3] p-8 sm:p-12">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-heading mt-6 text-3xl font-medium tracking-[-0.03em] text-[#111111]">
          Brief received, {name}.
        </h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-neutral-600">
          Thank you for reaching out about{" "}
          <strong className="text-[#111111]">{selectedScope}</strong>. Our
          engineering team will review your inquiry and follow up directly at{" "}
          <strong className="text-[#111111]">{email}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setCompany("");
            setMessage("");
          }}
          className="rr-btn rr-btn-dark mt-8"
        >
          <span className="btn-wrap">
            <span className="text-one">Send another inquiry</span>
            <span className="text-two">Send another inquiry</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-black/12 bg-[#FCF7F3] p-7 sm:p-10 lg:p-12"
    >
      <div className="mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
          1. Select Topic or Platform
        </span>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {PROJECT_SCOPES.map((scope) => {
            const active = selectedScope === scope;
            return (
              <button
                key={scope}
                type="button"
                onClick={() => setSelectedScope(scope)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  active
                    ? "border-[#111111] bg-[#111111] text-white"
                    : "border-black/15 bg-white text-[#111111] hover:border-black/40"
                }`}
              >
                {scope}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block font-mono text-xs uppercase tracking-wider text-neutral-600"
          >
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alexandru Popescu"
            className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block font-mono text-xs uppercase tracking-wider text-neutral-600"
          >
            Work Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="contact-company"
          className="block font-mono text-xs uppercase tracking-wider text-neutral-600"
        >
          Organization / Company
        </label>
        <input
          id="contact-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company or Organization Name"
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-wider text-neutral-600"
        >
          Project Details &amp; Goals *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your timeline, security requirements, team size, or platform goals..."
          className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-sm text-[#111111] outline-none transition-colors focus:border-[#111111]"
        />
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-neutral-500">
          Direct engineering response. NDA available for defense &amp; closed-door
          inquiries.
        </p>
        <button type="submit" className="rr-btn rr-btn-dark shrink-0">
          <span className="btn-wrap">
            <span className="text-one">Send Inquiry</span>
            <span className="text-two">Send Inquiry</span>
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
