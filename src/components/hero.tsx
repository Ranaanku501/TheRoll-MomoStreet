import Link from "next/link";
import { site } from "@/lib/site";

const floatingItems = [
  { emoji: "🥟", className: "left-2 top-6 animate-float" },
  { emoji: "🌯", className: "right-4 top-16 animate-float [animation-delay:1.2s]" },
  { emoji: "🍜", className: "bottom-10 left-10 animate-float [animation-delay:2.1s]" },
  { emoji: "🍔", className: "bottom-4 right-12 animate-float [animation-delay:0.6s]" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-chilli-600 via-chilli-700 to-charcoal-900" />
      <div className="absolute inset-0 -z-10 bg-spice-grid [background-size:22px_22px] opacity-40" />
      <div className="absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-masala-400/25 blur-3xl" />
      <div className="absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-chilli-400/30 blur-3xl" />

      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="animate-fade-up space-y-7 text-white">
          <span className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-masala-300" />
            Fresh off the tawa · Open today
          </span>

          <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Momos, Rolls &amp; Noodles that taste like{" "}
            <span className="text-masala-300">the real street</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/85">
            {site.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/menu" className="btn-primary bg-white text-chilli-700 hover:bg-masala-200">
              See the full menu
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              Order on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn-ghost text-white/80 hover:bg-white/10 hover:text-white">
              {site.phoneDisplay}
            </a>
          </div>

          <dl className="grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-extrabold text-masala-300">
                  {stat.value}
                </dt>
                <dd className="text-xs font-medium uppercase tracking-wide text-white/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-6 rounded-full border border-white/20" />
          <div className="absolute inset-14 rounded-full border border-white/10" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-white/10 backdrop-blur-md sm:h-64 sm:w-64">
              <span className="absolute -top-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-white/30 blur-md animate-steam" />
              <span className="absolute -top-2 left-1/3 h-6 w-6 rounded-full bg-white/25 blur-md animate-steam [animation-delay:0.9s]" />
              <span className="text-[7rem] leading-none drop-shadow-2xl sm:text-[8rem]" aria-hidden>
                🥟
              </span>
            </div>
          </div>

          {floatingItems.map((item) => (
            <span
              key={item.emoji}
              aria-hidden
              className={`absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-white/95 text-3xl shadow-card ${item.className}`}
            >
              {item.emoji}
            </span>
          ))}
        </div>
      </div>

      <div className="border-y border-white/10 bg-charcoal-950/40 py-3">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-[0.3em] text-white/60">
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index} className="flex gap-8">
              <span>Steamed Momos</span>
              <span aria-hidden>•</span>
              <span>Egg Roll</span>
              <span aria-hidden>•</span>
              <span>Paneer Roll</span>
              <span aria-hidden>•</span>
              <span>Spring Rolls</span>
              <span aria-hidden>•</span>
              <span>Hakka Noodles</span>
              <span aria-hidden>•</span>
              <span>Tandoori Momos</span>
              <span aria-hidden>•</span>
              <span>Burgers</span>
              <span aria-hidden>•</span>
              <span>Honey Chilli Potato</span>
              <span aria-hidden>•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
