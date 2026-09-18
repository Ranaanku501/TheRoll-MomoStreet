"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

/** The iOS share glyph: a square with an arrow coming out of the top. */
function ShareIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3v11m0-11 3.5 3.5M12 3 8.5 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 10H5.5A1.5 1.5 0 0 0 4 11.5v7A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 18.5 10H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusSquareIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IosInstallSheet({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-charcoal-950/65 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md animate-fade-up rounded-t-[2rem] bg-cream p-6 shadow-2xl sm:rounded-[2rem] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full border border-charcoal-900/10 bg-white p-2 text-charcoal-900/50"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <p className="eyebrow">iPhone &amp; iPad</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight">
          Add {site.name} in 3 taps
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-900/65">
          Apple does not allow websites to show an install button, so you add it
          yourself from Safari&apos;s menu. It takes about ten seconds.
        </p>

        <ol className="mt-6 space-y-4">
          <li className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chilli-600 font-display text-sm font-bold text-white">
              1
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold">Tap the Share button</p>
              <p className="mt-0.5 text-xs leading-relaxed text-charcoal-900/60">
                It sits in the bar at the bottom of Safari (or top-right on iPad).
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-xl border border-charcoal-900/10 bg-white px-3 py-2">
                <ShareIcon className="h-5 w-5 text-[#007aff]" />
                <span className="text-xs font-semibold text-charcoal-900/70">
                  this icon
                </span>
              </span>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chilli-600 font-display text-sm font-bold text-white">
              2
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold">
                Scroll and tap &ldquo;Add to Home Screen&rdquo;
              </p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-xl border border-charcoal-900/10 bg-white px-3 py-2">
                <PlusSquareIcon className="h-5 w-5 text-charcoal-900/70" />
                <span className="text-xs font-semibold text-charcoal-900/70">
                  Add to Home Screen
                </span>
              </span>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-chilli-600 font-display text-sm font-bold text-white">
              3
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold">Tap &ldquo;Add&rdquo;</p>
              <p className="mt-0.5 text-xs leading-relaxed text-charcoal-900/60">
                Our logo appears on your home screen like any other app.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-6 rounded-2xl bg-masala-50 px-4 py-3 text-xs leading-relaxed text-masala-800">
          <span className="font-bold">Opened this from WhatsApp or Instagram?</span>{" "}
          Those apps use their own browser, which cannot install anything. Tap the
          compass or <span className="font-bold">⋯</span> icon and choose{" "}
          <span className="font-bold">Open in Safari</span> first.
        </div>

        <button type="button" onClick={onClose} className="btn-primary mt-5 w-full">
          Got it
        </button>
      </div>
    </div>
  );
}
