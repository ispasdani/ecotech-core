"use client";

import { useState } from "react";

const FIELD =
  "mt-3 w-full border-0 border-b border-black/15 bg-transparent px-0 pb-4 pt-1 text-[18px] text-[#111111] outline-none transition-colors duration-300 placeholder:text-[#b5b5b5] focus:border-[#111111]";
const LABEL = "block text-[13px] tracking-[0.04em] text-[#999999]";

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
      <div className="border-t border-black/10 pt-12">
        <span className="text-[18px] text-[#999999]">(Sent)</span>
        <h3 className="rx-section-title mt-6 !text-[clamp(34px,4vw,64px)]">
          Brief received, {name}.
        </h3>
        <p className="mt-6 max-w-xl text-[18px] leading-[1.6] text-[#555555]">
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
          className="rx-btn mt-10"
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
      className="w-full"
    >
      <div className="mb-12">
        <span className={LABEL}>(001) Topic or platform</span>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {PROJECT_SCOPES.map((scope) => {
            const active = selectedScope === scope;
            return (
              <button
                key={scope}
                type="button"
                onClick={() => setSelectedScope(scope)}
                aria-pressed={active}
                className={`rounded-full border px-5 py-2.5 text-[13px] tracking-[0.02em] transition-colors duration-300 ${
                  active
                    ? "border-[#111111] bg-[#111111] text-white"
                    : "border-black/15 bg-transparent text-[#111111] hover:border-[#111111]"
                }`}
              >
                {scope}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className={LABEL}
          >
            (002) Your name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alexandru Popescu"
            className={FIELD}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className={LABEL}
          >
            (003) Work email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-10">
        <label
          htmlFor="contact-company"
          className={LABEL}
        >
          (004) Organization
        </label>
        <input
          id="contact-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company or organization"
          className={FIELD}
        />
      </div>

      <div className="mt-10">
        <label
          htmlFor="contact-message"
          className={LABEL}
        >
          (005) Project details and goals *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your timeline, security requirements, team size, or platform goals..."
          className={FIELD}
        />
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="max-w-[360px] text-[14px] leading-[1.5] text-[#999999]">
          Direct engineering response. NDA available for defense &amp; closed-door
          inquiries.
        </p>
        <button type="submit" className="rx-btn shrink-0">
          <span className="btn-wrap">
            <span className="text-one">Send inquiry</span>
            <span className="text-two">Send inquiry</span>
          </span>
        </button>
      </div>
    </form>
  );
}
