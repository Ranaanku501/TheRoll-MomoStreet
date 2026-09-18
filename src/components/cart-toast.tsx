"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-provider";

export function CartToast() {
  const { lastAdded, count, isOpen, openCart, dismissAdded } = useCart();

  useEffect(() => {
    if (!lastAdded || isOpen) return;
    const timer = window.setTimeout(dismissAdded, 3500);
    return () => window.clearTimeout(timer);
  }, [lastAdded, isOpen, dismissAdded]);

  if (!lastAdded || isOpen) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-[46] mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-charcoal-900/10 bg-charcoal-900 px-4 py-3 text-white shadow-card animate-fade-up sm:inset-x-auto sm:bottom-6 sm:right-6">
      <p className="min-w-0 flex-1 text-sm">
        <span className="font-bold">Added</span>{" "}
        <span className="text-white/80">{lastAdded}</span>
      </p>
      <button
        type="button"
        onClick={openCart}
        className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-charcoal-900"
      >
        Cart ({count})
      </button>
    </div>
  );
}
