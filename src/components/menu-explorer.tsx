"use client";

import { useMemo, useState } from "react";
import { MenuItemCard } from "@/components/menu-item-card";
import { categories, menu, type CategoryId } from "@/lib/menu";

type Filter = "all" | CategoryId;
type DietFilter = "all" | "veg" | "egg";

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [query, setQuery] = useState("");

  const visibleCategories = useMemo(
    () => (filter === "all" ? categories : categories.filter((c) => c.id === filter)),
    [filter],
  );

  const items = useMemo(() => {
    const search = query.trim().toLowerCase();
    return menu.filter((item) => {
      if (diet === "veg" && !item.veg) return false;
      if (diet === "egg" && item.veg) return false;
      if (!search) return true;
      return (
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    });
  }, [diet, query]);

  const groups = visibleCategories
    .map((category) => ({
      category,
      items: items.filter((item) => item.categoryId === category.id),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8">
      <div className="sticky top-[72px] z-20 -mx-4 space-y-4 bg-cream/95 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-900/40"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search momos, egg roll, noodles…"
              aria-label="Search the menu"
              className="w-full rounded-full border border-charcoal-900/15 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-chilli-500 focus:ring-2 focus:ring-chilli-500/20"
            />
          </div>

          <div className="flex gap-1 rounded-full border border-charcoal-900/15 bg-white p-1">
            {(
              [
                { id: "all", label: "All" },
                { id: "veg", label: "Veg" },
                { id: "egg", label: "Egg" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setDiet(option.id)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  diet === option.id
                    ? "bg-charcoal-900 text-white"
                    : "text-charcoal-900/60 hover:text-charcoal-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === "all"
                ? "bg-chilli-600 text-white"
                : "border border-charcoal-900/15 bg-white text-charcoal-900/70 hover:border-chilli-400"
            }`}
          >
            Everything
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setFilter(category.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === category.id
                  ? "bg-chilli-600 text-white"
                  : "border border-charcoal-900/15 bg-white text-charcoal-900/70 hover:border-chilli-400"
              }`}
            >
              <span className="mr-1.5" aria-hidden>
                {category.emoji}
              </span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-4xl" aria-hidden>
            🔍
          </p>
          <p className="mt-3 font-display text-xl font-bold">Nothing matched</p>
          <p className="mt-1 text-sm text-charcoal-900/60">
            Try a different spelling, or reset the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setDiet("all");
              setFilter("all");
            }}
            className="btn-secondary mt-5"
          >
            Reset filters
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.category.id} id={group.category.id} className="scroll-mt-44">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
                  <span className="mr-2" aria-hidden>
                    {group.category.emoji}
                  </span>
                  {group.category.name}
                </h2>
                <p className="mt-1 text-sm text-charcoal-900/60">
                  {group.category.blurb}
                </p>
              </div>
              <span className="chip bg-chilli-50 text-chilli-700">
                {group.items.length} items
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
