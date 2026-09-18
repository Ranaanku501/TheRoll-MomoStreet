"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { lineKey, useCart } from "@/components/cart-provider";
import { ADDRESS_MAX, formatPrice, site } from "@/lib/site";

export function CartDrawer() {
  const {
    lines,
    total,
    count,
    isOpen,
    closeCart,
    increment,
    decrement,
    remove,
    clear,
    checkout,
    whatsappUrl,
  } = useCart();
  const [note, setNote] = useState("");
  const [orderType, setOrderType] = useState<"delivery" | "takeaway">("delivery");
  const [location, setLocation] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeCart]);

  const belowMinimum = orderType === "delivery" && total > 0 && total < site.minOrder;
  const trimmed = location.trim();
  const locationOk =
    orderType !== "delivery" || (trimmed.length > 0 && trimmed.length <= ADDRESS_MAX);
  const canOrder = lines.length > 0 && locationOk && !belowMinimum;

  const orderDetails = {
    orderType,
    location: trimmed || undefined,
    note,
  };

  const handleWhatsApp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canOrder) {
      event.preventDefault();
      setTriedSubmit(true);
      return;
    }
    checkout();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Your order"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-charcoal-900/10 px-6 py-5">
          <div>
            <p className="eyebrow">Your order</p>
            <h2 className="font-display text-2xl font-bold">
              {count > 0 ? `${count} item${count > 1 ? "s" : ""}` : "Cart is empty"}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full border border-charcoal-900/10 bg-white p-2 text-charcoal-900/70 transition hover:text-chilli-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="text-6xl" aria-hidden>
                🥟
              </span>
              <p className="text-sm text-charcoal-900/60">
                Nothing here yet. Add some momos, rolls or noodles and they will
                show up right here.
              </p>
              <Link href="/menu" onClick={closeCart} className="btn-primary">
                Browse the menu
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              <ul className="space-y-3">
                {lines.map((line) => {
                  const key = lineKey(line);
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-3 rounded-2xl border border-charcoal-900/10 bg-white p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold leading-tight">
                          {line.name}
                        </p>
                        <p className="text-xs text-charcoal-900/55">
                          {formatPrice(line.price)} each
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-charcoal-900/10 px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => decrement(key)}
                          aria-label={`Reduce ${line.name}`}
                          className="h-6 w-6 rounded-full text-charcoal-900/70 transition hover:bg-chilli-50 hover:text-chilli-700"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-bold">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increment(key)}
                          aria-label={`Add another ${line.name}`}
                          className="h-6 w-6 rounded-full text-charcoal-900/70 transition hover:bg-chilli-50 hover:text-chilli-700"
                        >
                          +
                        </button>
                      </div>

                      <div className="w-16 text-right">
                        <p className="text-sm font-bold text-chilli-700">
                          {formatPrice(line.price * line.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(key)}
                          className="text-[11px] text-charcoal-900/45 underline-offset-2 hover:text-chilli-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
                  How should we send this?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: "delivery", label: "Home delivery" },
                      { id: "takeaway", label: "Takeaway" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setOrderType(option.id);
                        setTriedSubmit(false);
                      }}
                      className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                        orderType === option.id
                          ? "border-chilli-500 bg-chilli-50 text-chilli-800"
                          : "border-charcoal-900/15 bg-white text-charcoal-900/70 hover:border-chilli-400"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {orderType === "delivery" ? (
                <label className="block space-y-1.5">
                  <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
                    Delivery location *
                    <span className="normal-case tracking-normal text-charcoal-900/40">
                      {location.length}/{ADDRESS_MAX}
                    </span>
                  </span>
                  <textarea
                    required
                    maxLength={ADDRESS_MAX}
                    value={location}
                    onChange={(event) => setLocation(event.target.value.slice(0, ADDRESS_MAX))}
                    rows={3}
                    placeholder="Village, area or landmark — e.g. Mohali, Jhungian…"
                    className={`w-full resize-none rounded-2xl border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-chilli-500 focus:ring-2 focus:ring-chilli-500/20 ${
                      triedSubmit && !locationOk
                        ? "border-chilli-500"
                        : "border-charcoal-900/15"
                    }`}
                  />
                  {triedSubmit && !locationOk ? (
                    <p className="text-xs font-semibold text-chilli-700">
                      Please type a village or area name (up to {ADDRESS_MAX} characters).
                    </p>
                  ) : null}
                </label>
              ) : (
                <p className="rounded-2xl bg-white px-4 py-3 text-xs leading-relaxed text-charcoal-900/60">
                  Pickup from {site.address.line1}, {site.address.line2}.
                </p>
              )}

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-900/60">
                  Cooking instructions (optional)
                </span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={2}
                  placeholder="Less spicy, extra chutney, no onion…"
                  className="w-full resize-none rounded-2xl border border-charcoal-900/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-chilli-500 focus:ring-2 focus:ring-chilli-500/20"
                />
              </label>
            </div>
          )}
        </div>

        {lines.length > 0 ? (
          <footer className="space-y-3 border-t border-charcoal-900/10 bg-white px-6 py-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-charcoal-900/60">Item total</span>
              <span className="font-display text-2xl font-bold">
                {formatPrice(total)}
              </span>
            </div>

            {belowMinimum ? (
              <p className="rounded-2xl bg-masala-50 px-4 py-2.5 text-xs font-semibold text-masala-700">
                Add {formatPrice(site.minOrder - total)} more to reach the{" "}
                {formatPrice(site.minOrder)} delivery minimum. Takeaway has no
                minimum.
              </p>
            ) : null}

            <a
              href={canOrder ? whatsappUrl(orderDetails) : undefined}
              onClick={handleWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary w-full bg-[#25D366] text-charcoal-900 hover:bg-[#1eb355] ${
                canOrder ? "" : "opacity-60"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.93 9.93 0 0 0 4.88 1.27c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.25.7-1.45 1.34-2 1.38-.55.05-1.07.24-3.6-.83s-4.1-3.72-4.23-3.9c-.13-.17-.86-1.2-.83-2.26.03-1.05.58-1.56.79-1.78.2-.22.44-.27.59-.27h.42c.14 0 .32-.02.5.38.17.4.6 1.47.65 1.58.05.1.08.23.01.36-.07.14-.4.55-.55.72-.11.13-.23.27-.09.52.14.25.6 1.01 1.29 1.63.88.8 1.62 1.05 1.87 1.17.25.13.4.11.55-.06.14-.17.63-.73.8-.98.16-.25.32-.2.54-.12.22.08 1.39.66 1.63.78.24.12.4.18.46.28.06.1.06.6-.19 1.3Z" />
              </svg>
              Send order on WhatsApp
            </a>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={clear}
                className="text-charcoal-900/50 underline-offset-2 hover:text-chilli-600 hover:underline"
              >
                Clear cart
              </button>
              <a href={site.phoneHref} className="font-semibold text-chilli-700">
                Or call {site.phoneDisplay}
              </a>
            </div>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
