import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `How ${site.fullName} went from one steamer on a street corner to the neighbourhood's favourite momo and roll counter.`,
};

const timeline = [
  {
    year: "Day 1",
    title: "One steamer, one recipe",
    copy: "We opened with a single bamboo steamer, a hand-ground red chutney and a promise: nothing goes out unless it is hot.",
  },
  {
    year: "Year 1",
    title: "The roll counter arrives",
    copy: "Regulars kept asking for something to carry away. The egg roll and paneer roll joined the menu and never left.",
  },
  {
    year: "Year 2",
    title: "Wok, tandoor and grill",
    copy: "Hakka noodles, tandoori momos and burgers were added so a whole family could eat from one counter.",
  },
  {
    year: "Today",
    title: "60+ items, same standards",
    copy: "Bigger menu, same chutney, same rule — cooked after you order, served within minutes.",
  },
];

const values = [
  {
    emoji: "🧼",
    title: "Clean counter, always",
    copy: "Gloves, covered stuffing trays and oil changed on a schedule. Street taste without street worries.",
  },
  {
    emoji: "⚖️",
    title: "Honest portions",
    copy: "Eight momos in a plate means eight momos. Half plates are genuinely half, priced fairly.",
  },
  {
    emoji: "🫙",
    title: "Sauces made in-house",
    copy: "Red chutney, schezwan and mint mayo are all prepared here — no cheap packet substitutes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-chilli-700 to-charcoal-900 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-spice-grid [background-size:20px_20px] opacity-30" />
        <div className="container-page relative space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-300">
            Our story
          </p>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            A street corner, a steamer and a chutney worth queueing for
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85">
            {site.fullName} is a family-run street food counter. We cook the food
            we grew up eating — dumplings pleated by hand, parathas rolled fresh,
            noodles tossed on a screaming hot wok.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="How we got here"
          title="Built one plate at a time"
          align="left"
        />

        <ol className="mt-10 space-y-4">
          {timeline.map((entry) => (
            <li
              key={entry.year}
              className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:gap-8"
            >
              <span className="chip w-fit bg-chilli-50 text-chilli-700">
                {entry.year}
              </span>
              <div className="space-y-1.5">
                <h3 className="font-display text-xl font-bold">{entry.title}</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-charcoal-900/65">
                  {entry.copy}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we will not compromise on"
            title="Three rules behind the counter"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="card p-6">
                <span className="text-3xl" aria-hidden>
                  {value.emoji}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-900/65">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 text-center sm:py-20">
        <SectionHeading
          eyebrow="Come say hi"
          title="Your table is a paper plate, and that's the point"
          description="Walk in, order at the counter, and eat it while it steams. Or send the order ahead on WhatsApp."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/menu" className="btn-primary">
            Browse the menu
          </Link>
          <Link href="/contact" className="btn-secondary">
            Find the shop
          </Link>
        </div>
      </section>
    </>
  );
}
