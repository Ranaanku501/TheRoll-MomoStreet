"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInstall } from "@/components/install-provider";
import { site } from "@/lib/site";

const steps: Record<string, { title: string; items: string[] }> = {
  ios: {
    title: "On iPhone & iPad (Safari)",
    items: [
      "Tap the Share button at the bottom of Safari.",
      "Scroll down and tap “Add to Home Screen”.",
      "Tap “Add” — our logo appears on your home screen.",
    ],
  },
  android: {
    title: "On Android (Chrome)",
    items: [
      "Tap the “Install app” button above.",
      "Confirm “Install” in the Chrome pop-up.",
      "Find our logo on your home screen or app drawer.",
    ],
  },
  desktop: {
    title: "On a computer (Chrome or Edge)",
    items: [
      "Click “Install app” above, or the install icon in the address bar.",
      "Confirm “Install”.",
      "The app opens in its own window, without browser tabs.",
    ],
  },
  "in-app-browser": {
    title: "You are inside another app",
    items: [
      "Instagram and Facebook browsers cannot install apps.",
      "Tap the ⋯ menu and choose “Open in browser” (Chrome or Safari).",
      "Come back to this page and the Install button will work.",
    ],
  },
};

const perks = [
  { emoji: "⚡", text: "Opens instantly from your home screen" },
  { emoji: "📴", text: "Menu works even on slow or no internet" },
  { emoji: "🛒", text: "Your cart is remembered between visits" },
  { emoji: "🪶", text: "Under 1 MB — nothing like a heavy app download" },
];

export function InstallPanel() {
  const { canPrompt, isInstalled, platform, ready, promptInstall } = useInstall();
  const [status, setStatus] = useState<"idle" | "dismissed" | "installed">("idle");
  const [copied, setCopied] = useState(false);

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === "accepted") setStatus("installed");
    if (outcome === "dismissed") setStatus("dismissed");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(site.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const guide = steps[ready ? platform : "android"];

  return (
    <div className="space-y-5">
      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-3xl border border-charcoal-900/10 bg-white shadow-card">
            <Image
              src="/icons/icon-192.png"
              alt={`${site.fullName} app icon`}
              fill
              sizes="80px"
              className="object-contain p-1.5"
            />
          </span>
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-tight">
              {site.name}
            </h2>
            <p className="text-sm text-charcoal-900/60">
              Street food · Free · No sign-up
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {isInstalled || status === "installed" ? (
            <div className="rounded-2xl bg-green-50 px-5 py-4 text-sm font-semibold text-green-800">
              🎉 The app is installed. Look for our logo on your home screen — or
              just{" "}
              <Link href="/menu" className="underline">
                start ordering
              </Link>
              .
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleInstall}
                disabled={!canPrompt}
                className="btn-primary w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-45"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
                </svg>
                Install app
              </button>

              {!canPrompt && ready ? (
                <p className="text-center text-xs leading-relaxed text-charcoal-900/55">
                  {platform === "ios"
                    ? "On iPhone, Apple requires you to add it manually — follow the two steps below."
                    : platform === "in-app-browser"
                      ? "Open this page in Chrome or Safari to enable the install button."
                      : "Your browser has not offered the install option yet. Follow the steps below, or try Chrome."}
                </p>
              ) : null}

              {status === "dismissed" ? (
                <p className="text-center text-xs font-semibold text-chilli-700">
                  Install was cancelled. Tap the button again whenever you are ready.
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold">{guide.title}</h3>
        <ol className="mt-4 space-y-3">
          {guide.items.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chilli-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="text-charcoal-900/70">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold">Why install it</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {perks.map((perk) => (
            <li key={perk.text} className="flex items-start gap-3 text-sm">
              <span className="text-xl" aria-hidden>
                {perk.emoji}
              </span>
              <span className="text-charcoal-900/70">{perk.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-charcoal-900/10 pt-5">
          <button type="button" onClick={copyLink} className="btn-secondary px-5 py-2.5 text-xs">
            {copied ? "Link copied ✓" : "Copy link to share"}
          </button>
          <Link href="/menu" className="btn-ghost px-4 py-2.5 text-xs">
            Skip, just show me the menu
          </Link>
        </div>
      </div>
    </div>
  );
}
