"use client";

import Image from "next/image";
import { useCart } from "@/components/cart-provider";
import { getCategory, tagLabels, type MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/site";

function VegBadge({ veg }: { veg: boolean }) {
  return (
    <span
      title={veg ? "Pure vegetarian" : "Contains egg"}
      className={`flex h-4 w-4 items-center justify-center rounded-sm border-2 ${
        veg ? "border-green-600" : "border-amber-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          veg ? "bg-green-600" : "bg-amber-500"
        }`}
      />
    </span>
  );
}

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const category = getCategory(item.categoryId);

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${
          category?.accent ?? "from-chilli-500 to-masala-400"
        }`}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-spice-grid [background-size:14px_14px] opacity-70" />
            <span className="relative text-6xl drop-shadow-lg" aria-hidden>
              {item.emoji}
            </span>
          </>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="chip bg-white/95 text-[10px] text-chilli-700"
            >
              {tagLabels[tag]}
            </span>
          ))}
        </div>

        <span className="absolute right-3 top-3 rounded-md bg-white/95 p-1">
          <VegBadge veg={item.veg} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="space-y-1.5">
          <h3 className="font-display text-lg font-bold leading-tight">
            {item.name}
          </h3>
          <p className="text-sm leading-relaxed text-charcoal-900/65">
            {item.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="font-display text-xl font-bold text-chilli-700">
              {formatPrice(item.price)}
              {item.priceFull ? (
                <span className="ml-1 text-xs font-semibold text-charcoal-900/50">
                  half
                </span>
              ) : null}
            </p>
            {item.priceFull ? (
              <p className="text-xs font-semibold text-charcoal-900/50">
                {formatPrice(item.priceFull)} full plate
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => add(item)}
              className="btn-primary px-4 py-2 text-xs"
            >
              Add{item.priceFull ? " half" : ""}
            </button>
            {item.priceFull ? (
              <button
                type="button"
                onClick={() => add(item, "full")}
                className="btn-secondary px-4 py-2 text-xs"
              >
                Add full
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
