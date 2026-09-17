import Link from "next/link";
import { Hero } from "@/components/hero";
import { MenuItemCard } from "@/components/menu-item-card";
import { SectionHeading } from "@/components/section-heading";
import { bestsellers, categories, getItemsByCategory, menu } from "@/lib/menu";
import { formatPrice, site } from "@/lib/site";

const promises = [
  {
    emoji: "🔥",
    title: "Cooked after you order",
    copy: "Nothing sits under a lamp. Every momo is steamed and every roll is wrapped only once your order is in.",
  },
  {
    emoji: "🌿",
    title: "Fresh stuffing daily",
    copy: "Vegetables chopped every morning, paneer and chicken sourced fresh — never frozen leftovers.",
  },
  {
    emoji: "🌶️",
    title: "Our famous red chutney",
    copy: "Ground in-house from dry red chillies and garlic. Ask for extra, we will not judge you.",
  },
  {
    emoji: "🛵",
    title: "Quick local delivery",
    copy: `Free delivery within ${site.deliveryRadiusKm} km on orders above ${formatPrice(site.minOrder)}.`,
  },
];

const reviews = [
  {
    name: "Ankit S.",
    quote:
      "The kurkure momos are unreal. Crunchy outside, hot and juicy inside. I order here twice a week now.",
  },
  {
    name: "Priya M.",
    quote:
      "Best egg roll in the area, easily. Perfectly flaky paratha and they get the spice level right every time.",
  },
  {
    name: "Rahul K.",
    quote:
      "Ordered the momos platter for friends — all four styles were hot on arrival. Great value for the price.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we serve"
          title="Pick your craving"
          description="Seven counters of street food under one roof — from steamed momos to wok-tossed noodles."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu#${category.id}`}
              className="group relative overflow-hidden rounded-3xl border border-charcoal-900/10 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-chilli-300"
            >
              <div
                className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${category.accent} opacity-15 transition-transform duration-500 group-hover:scale-150`}
              />
              <span className="relative text-4xl" aria-hidden>
                {category.emoji}
              </span>
              <h3 className="relative mt-4 font-display text-xl font-bold">
                {category.name}
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-charcoal-900/60">
                {category.blurb}
              </p>
              <p className="relative mt-4 text-xs font-bold uppercase tracking-wider text-chilli-600">
                {getItemsByCategory(category.id).length} items
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Most loved"
            title="Our bestsellers"
            description="The plates that keep the queue long. Add them straight to your cart."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bestsellers.slice(0, 6).map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/menu" className="btn-primary">
              Explore all {menu.length} items
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Why people come back"
            title="Street food standards, kitchen-level hygiene"
            description="We started as a single stall with one steamer. The recipes have not changed — only the queue got longer."
            align="left"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {promises.map((promise) => (
              <div
                key={promise.title}
                className="rounded-3xl border border-charcoal-900/10 bg-white p-5 shadow-card"
              >
                <span className="text-3xl" aria-hidden>
                  {promise.emoji}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">
                  {promise.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-900/60">
                  {promise.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-900 py-16 text-cream sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-400">
              Straight from our customers
            </p>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              4.7★ across 900+ orders
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <p className="text-masala-300" aria-hidden>
                  ★★★★★
                </p>
                <blockquote className="mt-3 text-sm leading-relaxed text-cream/85">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-wider text-cream/50">
                  {review.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-chilli-600 to-masala-500 p-8 text-white sm:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">
                Hungry already?
              </p>
              <h2 className="text-balance font-display text-3xl font-extrabold sm:text-4xl">
                Send your order on WhatsApp and pick it up in 15 minutes
              </h2>
              <p className="text-white/85">
                Build your cart on the menu page, hit checkout, and the order lands
                directly in our WhatsApp. No app, no sign-up.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href="/menu" className="btn bg-white text-chilli-700 hover:bg-masala-100">
                  Start my order
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-white/40 text-white hover:bg-white/15"
                >
                  Get directions
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">
                Today&apos;s timings
              </p>
              <div className="mt-4 space-y-3">
                {site.hours.map((slot) => (
                  <div
                    key={slot.days}
                    className="flex items-center justify-between gap-4 border-b border-white/15 pb-2 text-sm last:border-0"
                  >
                    <span className="text-white/75">{slot.days}</span>
                    <span className="font-bold">{slot.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/80">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
