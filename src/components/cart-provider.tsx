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

export type OrderDetails = {
  orderType: "delivery" | "takeaway";
  /** Typed village / area. Required for delivery, max 100 characters. */
  location?: string;
  note?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isOpen: boolean;
  lastAdded: string | null;
  openCart: () => void;
  closeCart: () => void;
  dismissAdded: () => void;
  add: (item: MenuItem, size?: CartLine["size"]) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  checkout: () => void;
  undoCheckout: () => void;
  dismissUndo: () => void;
  canUndoCheckout: boolean;
  whatsappUrl: (details: OrderDetails) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export const lineKey = (line: Pick<CartLine, "id" | "size">) =>
  `${line.id}__${line.size}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [undoLines, setUndoLines] = useState<CartLine[] | null>(null);
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
    setLastAdded(next.name);
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

  const clear = useCallback(() => {
    setUndoLines(null);
    setLines([]);
  }, []);

  const checkout = useCallback(() => {
    setUndoLines((currentUndo) => currentUndo ?? lines);
    setLines([]);
    setLastAdded(null);
    setIsOpen(false);
  }, [lines]);

  const undoCheckout = useCallback(() => {
    setUndoLines((snapshot) => {
      if (snapshot?.length) {
        setLines(snapshot);
        setIsOpen(true);
      }
      return null;
    });
  }, []);

  const dismissUndo = useCallback(() => setUndoLines(null), []);

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
    ({ orderType, location, note }: OrderDetails) => {
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
        `Order type: ${orderType === "delivery" ? "Home delivery" : "Takeaway / pickup"}`,
        orderType === "delivery" && location?.trim()
          ? `Delivery address: ${location.trim()}`
          : null,
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
      lastAdded,
      openCart: () => {
        setLastAdded(null);
        setIsOpen(true);
      },
      closeCart: () => setIsOpen(false),
      dismissAdded: () => setLastAdded(null),
      add,
      increment,
      decrement,
      remove,
      clear,
      checkout,
      undoCheckout,
      dismissUndo,
      canUndoCheckout: undoLines !== null,
      whatsappUrl,
    }),
    [
      lines,
      count,
      total,
      isOpen,
      lastAdded,
      undoLines,
      add,
      increment,
      decrement,
      remove,
      clear,
      checkout,
      undoCheckout,
      dismissUndo,
      whatsappUrl,
    ],
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
