"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const reasons = [
  "General enquiry",
  "Bulk / party order",
  "Catering & events",
  "Feedback",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState<(typeof reasons)[number]>(reasons[0]);
  const [message, setMessage] = useState("");

  const canSend = name.trim().length > 1 && message.trim().length > 3;

  const buildUrl = () => {
    const text = [
      `Hi ${site.fullName}!`,
      "",
      `Name: ${name.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Reason: ${reason}`,
      "",
      message.trim(),
    ]
      .filter((part) => part !== null)
      .join("\n");

    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSend) return;
    window.open(buildUrl(), "_blank", "noopener,noreferrer");
  };

  const fieldClass =
    "w-full rounded-2xl border border-charcoal-900/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-chilli-500 focus:ring-2 focus:ring-chilli-500/20";

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
            Your name *
          </span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ramesh Kumar"
            className={fieldClass}
          />
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
            Phone
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="98765 43210"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
          What is this about?
        </span>
        <div className="flex flex-wrap gap-2">
          {reasons.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setReason(option)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                reason === option
                  ? "bg-chilli-600 text-white"
                  : "border border-charcoal-900/15 text-charcoal-900/65 hover:border-chilli-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
          Message *
        </span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="I need 100 momos and 40 rolls for a birthday on Saturday evening…"
          className={`${fieldClass} resize-none`}
        />
      </label>

      <button type="submit" disabled={!canSend} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
        Send on WhatsApp
      </button>

      <p className="text-center text-xs text-charcoal-900/50">
        This opens WhatsApp with your message ready to send — no data is stored on
        this website.
      </p>
    </form>
  );
}
