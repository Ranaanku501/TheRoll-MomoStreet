"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { findItem, type MenuItem } from "@/lib/menu";
import { site } from "@/lib/site";

const STORAGE_KEY = "trm-cart-v1";

export type CartLine = {
  id: string;
  size: "regular" | "full";
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: MenuItem, size?: CartLine["size"]) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  whatsappUrl: (note?: string) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export const lineKey = (line: Pick<CartLine, "id" | "size">) =>
  `${line.id}__${line.size}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartLine[] = JSON.parse(stored);
        // Drop lines whose menu item no longer exists.
        setLines(parsed.filter((line) => findItem(line.id)));
      }
    } catch {
      // Corrupt storage — start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const add = useCallback((item: MenuItem, size: CartLine["size"] = "regular") => {
    const price = size === "full" ? (item.priceFull ?? item.price) : item.price;
    const next: CartLine = {
      id: item.id,
      size,
      name: size === "full" ? `${item.name} (Full)` : item.name,
      price,
      quantity: 1,
    };

    setLines((current) => {
      const key = lineKey(next);
      const existing = current.find((line) => lineKey(line) === key);
      if (existing) {
        return current.map((line) =>
          lineKey(line) === key
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }
      return [...current, next];
    });
    setIsOpen(true);
  }, []);

  const increment = useCallback((key: string) => {
    setLines((current) =>
      current.map((line) =>
        lineKey(line) === key ? { ...line, quantity: line.quantity + 1 } : line,
      ),
    );
  }, []);

  const decrement = useCallback((key: string) => {
    setLines((current) =>
      current.flatMap((line) => {
        if (lineKey(line) !== key) return [line];
        if (line.quantity <= 1) return [];
        return [{ ...line, quantity: line.quantity - 1 }];
      }),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((current) => current.filter((line) => lineKey(line) !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, total } = useMemo(
    () =>
      lines.reduce(
        (acc, line) => ({
          count: acc.count + line.quantity,
          total: acc.total + line.quantity * line.price,
        }),
        { count: 0, total: 0 },
      ),
    [lines],
  );

  const whatsappUrl = useCallback(
    (note?: string) => {
      const rows = lines.map(
        (line) =>
          `• ${line.name} x${line.quantity} — ${site.currency}${
            line.price * line.quantity
          }`,
      );
      const message = [
        `Hi ${site.fullName}, I'd like to place an order:`,
        "",
        ...rows,
        "",
        `Total: ${site.currency}${total}`,
        note?.trim() ? `Note: ${note.trim()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
    },
    [lines, total],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      total,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      increment,
      decrement,
      remove,
      clear,
      whatsappUrl,
    }),
    [lines, count, total, isOpen, add, increment, decrement, remove, clear, whatsappUrl],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}
