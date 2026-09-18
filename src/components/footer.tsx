import Link from "next/link";
import { categories } from "@/lib/menu";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-charcoal-900 text-cream/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <p className="font-display text-2xl font-extrabold text-white">
            {site.name}
            <span className="ml-2 text-sm font-bold uppercase tracking-[0.3em] text-masala-400">
              {site.tagline}
            </span>
          </p>
          <p className="max-w-sm text-sm leading-relaxed">{site.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:border-masala-400 hover:text-white"
            >
              Instagram
            </a>
            {/* <a
              href={site.socials.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:border-masala-400 hover:text-white"
            >
              Zomato
            </a>
            <a
              href={site.socials.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:border-masala-400 hover:text-white"
            >
              Swiggy
            </a> */}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-400">
            Menu
          </p>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/menu#${category.id}`}
                  className="transition hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/menu" className="font-semibold text-white">
                Full menu →
              </Link>
            </li>
            <li>
              <Link href="/install" className="font-semibold text-masala-400">
                Download app ↓
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-400">
            Find us
          </p>
          <address className="space-y-1 text-sm not-italic leading-relaxed">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>
              <a href={site.phoneHref} className="transition hover:text-white">
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-white"
              >
                {site.email}
              </a>
            </p>
          </address>
          <div className="space-y-1 pt-1 text-sm">
            {site.hours.map((slot) => (
              <p key={slot.days}>
                <span className="block text-xs text-cream/50">{slot.days}</span>
                {slot.time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p className="text-cream/50">
            Fresh momos, rolls & noodles served all day.
          </p>
        </div>
      </div>
    </footer>
  );
}
