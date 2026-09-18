"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "trm-install-dismissed";
const DISMISS_DAYS = 14;

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  // Safari on iOS exposes its own flag instead of display-mode.
  (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIos = () =>
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
  // iPads report as Mac, so check for touch support too.
  (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);

const recentlyDismissed = () => {
  const stored = window.localStorage.getItem(DISMISS_KEY);
  if (!stored) return false;
  const days = (Date.now() - Number(stored)) / 86_400_000;
  return days < DISMISS_DAYS;
};

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(
    null,
  );
  const [showIosSteps, setShowIosSteps] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures are not fatal — the site still works.
      });
    }
  }, []);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = () => {
      setVisible(false);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    // iOS never fires beforeinstallprompt, so offer manual steps instead.
    let iosTimer: number | undefined;
    if (isIos()) {
      iosTimer = window.setTimeout(() => {
        setShowIosSteps(true);
        setVisible(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      if (iosTimer) window.clearTimeout(iosTimer);
    };
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === "dismissed") dismiss();
    setInstallEvent(null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[45] mx-auto max-w-md animate-fade-up sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="card flex items-start gap-3 p-4">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-charcoal-900/10 bg-white">
          <Image
            src="/icons/icon-192.png"
            alt=""
            fill
            sizes="48px"
            className="object-contain p-1"
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold leading-tight">
            Install {site.name}
          </p>

          {showIosSteps ? (
            <ol className="mt-1.5 space-y-1 text-xs leading-relaxed text-charcoal-900/65">
              <li>
                1. Tap the <span className="font-bold">Share</span> button in
                Safari&apos;s toolbar.
              </li>
              <li>
                2. Choose <span className="font-bold">Add to Home Screen</span>.
              </li>
            </ol>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-charcoal-900/65">
              Add us to your home screen for one-tap ordering, even on slow
              internet.
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            {showIosSteps ? (
              <button type="button" onClick={dismiss} className="btn-primary px-4 py-2 text-xs">
                Got it
              </button>
            ) : (
              <button type="button" onClick={install} className="btn-primary px-4 py-2 text-xs">
                Install app
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="text-xs font-semibold text-charcoal-900/50 hover:text-chilli-600"
            >
              Not now
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install banner"
          className="-mr-1 -mt-1 rounded-full p-1.5 text-charcoal-900/40 transition hover:text-chilli-600"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
