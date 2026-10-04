"use client";

import { useState } from "react";
import { CircleCheck, Send } from "lucide-react";
import { programmes } from "@/content/programmes";
import { deliveryFormats } from "@/content/delivery";

const field =
  "w-full rounded-xl border-0 bg-ice/70 px-4 py-3 text-ink ring-1 ring-navy-900/10 transition placeholder:text-slate/60 focus:bg-white focus:ring-2 focus:ring-brand focus:outline-none";

// Mockup only: no submission backend yet. Wire this to a Server Action + email provider for production.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-ice text-brand">
          <CircleCheck className="size-8" aria-hidden />
        </span>
        <h3 className="mt-6 text-2xl font-semibold text-navy-900">Thank you!</h3>
        <p className="mt-2 max-w-sm text-slate">
          Your enquiry has been received. Our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-sm font-semibold text-brand hover:text-royal"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Full name
        <input required name="name" autoComplete="name" placeholder="Jane Tan" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Work email
        <input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Company / Organization
        <input name="company" autoComplete="organization" placeholder="Company name" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Phone
        <input type="tel" name="phone" autoComplete="tel" placeholder="Contact number" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Programme of interest
        <select name="programme" defaultValue="" className={field}>
          <option value="" disabled>
            Select a programme
          </option>
          {programmes.map((p) => (
            <option key={p.slug}>{p.short}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Preferred format
        <select name="format" defaultValue="" className={field}>
          <option value="" disabled>
            Select a format
          </option>
          {deliveryFormats.map((d) => (
            <option key={d.title}>{d.title}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900 sm:col-span-2">
        Tell us about your training needs
        <textarea
          name="message"
          rows={5}
          placeholder="Number of participants, objectives, timeline…"
          className={field}
        />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate">We&apos;ll only use your details to respond to this enquiry.</p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:bg-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
        >
          Send enquiry <Send className="size-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}
