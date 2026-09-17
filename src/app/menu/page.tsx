import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu-explorer";
import { categories, menu } from "@/lib/menu";
import { formatPrice, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description: `Full menu of ${site.fullName} — momos, rolls, spring rolls, noodles, burgers, sides and shakes.`,
};

export default function MenuPage() {
  const cheapest = Math.min(...menu.map((item) => item.price));

  return (
    <>
      <section className="bg-charcoal-900 pb-14 pt-12 text-cream">
        <div className="container-page space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-400">
            The full menu
          </p>
          <h1 className="text-balance font-display text-4xl font-extrabold sm:text-5xl">
            {menu.length} street food items, all made to order
          </h1>
          <p className="max-w-2xl leading-relaxed text-cream/75">
            Starting at just {formatPrice(cheapest)}. Tap a category to jump
            straight to it, filter veg or non-veg, then send your cart over on
            WhatsApp.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold transition hover:border-masala-400 hover:text-white"
              >
                <span className="mr-1.5" aria-hidden>
                  {category.emoji}
                </span>
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <MenuExplorer />
      </section>
    </>
  );
}
