import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { formatPrice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit Us",
  description: `Address, timings and phone number for ${site.fullName}. Order ahead on WhatsApp or call us directly.`,
};

export default function ContactPage() {
  const details = [
    {
      label: "Address",
      value: `${site.address.line1}, ${site.address.line2}`,
      href: site.address.mapsUrl,
      cta: "Open in Google Maps",
    },
    {
      label: "Phone",
      value: site.phoneDisplay,
      href: site.phoneHref,
      cta: "Call now",
    },
    {
      label: "WhatsApp",
      value: "Order or enquire in a message",
      href: `https://wa.me/${site.whatsapp}`,
      cta: "Chat with us",
    },
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      cta: "Send an email",
    },
  ];

  return (
    <>
      <section className="bg-charcoal-900 py-14 text-cream">
        <div className="container-page space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-400">
            Visit us
          </p>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-extrabold sm:text-5xl">
            Find the counter, or send your order ahead
          </h1>
          <p className="max-w-2xl leading-relaxed text-cream/75">
            Takeaway and dine-in all day. Free delivery within{" "}
            {site.deliveryRadiusKm} km on orders above {formatPrice(site.minOrder)}.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="card p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-chilli-600">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-900/75">
                  {detail.value}
                </p>
                <a
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-3 inline-block text-xs font-bold text-charcoal-900 underline decoration-chilli-400 decoration-2 underline-offset-4 transition hover:text-chilli-700"
                >
                  {detail.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="card p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-chilli-600">
              Opening hours
            </p>
            <div className="mt-3 space-y-2.5">
              {site.hours.map((slot) => (
                <div
                  key={slot.days}
                  className="flex items-center justify-between gap-4 border-b border-charcoal-900/10 pb-2 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-charcoal-900/60">{slot.days}</span>
                  <span className="font-bold">{slot.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-charcoal-900/10 bg-white shadow-card">
            <div className="flex h-52 flex-col items-center justify-center gap-2 bg-gradient-to-br from-masala-100 to-chilli-100 text-center">
              <span className="text-4xl" aria-hidden>
                📍
              </span>
              <p className="px-6 text-sm font-semibold text-charcoal-900/70">
                Replace this block with a Google Maps embed of your shop
              </p>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-4 py-2 text-xs"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
