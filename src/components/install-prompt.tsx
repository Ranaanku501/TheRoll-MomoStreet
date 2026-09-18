"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useInstall } from "@/components/install-provider";
import { IosInstallSheet } from "@/components/ios-install-sheet";
import { site } from "@/lib/site";

const DISMISS_KEY = "trm-install-dismissed";
const DISMISS_DAYS = 14;

const recentlyDismissed = () => {
  const stored = window.localStorage.getItem(DISMISS_KEY);
  if (!stored) return false;
  return (Date.now() - Number(stored)) / 86_400_000 < DISMISS_DAYS;
};

export function InstallPrompt() {
  const { canPrompt, isInstalled, platform, ready, promptInstall } = useInstall();
  const [allowed, setAllowed] = useState(false);
  const [showIosSheet, setShowIosSheet] = useState(false);

  useEffect(() => {
    if (!recentlyDismissed()) setAllowed(true);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setAllowed(false);
  };

  const showIosSteps = platform === "ios";
  // Show when Chrome offers a prompt, or on iOS where it never will.
  const shouldShow =
    allowed && ready && !isInstalled && (canPrompt || showIosSteps);

  if (!shouldShow) {
    return showIosSheet ? (
      <IosInstallSheet onClose={() => setShowIosSheet(false)} />
    ) : null;
  }

  const install = async () => {
    const outcome = await promptInstall();
    if (outcome === "dismissed") dismiss();
    else setAllowed(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[45] mx-auto max-w-md animate-fade-up sm:inset-x-auto sm:bottom-6 sm:right-6">
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
            <p className="mt-1 text-xs leading-relaxed text-charcoal-900/65">
              Tap <span className="font-bold">Share</span>, then{" "}
              <span className="font-bold">Add to Home Screen</span> for one-tap
              ordering.
            </p>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-charcoal-900/65">
              Add us to your home screen for one-tap ordering, even on slow
              internet.
            </p>
          )}

          <div className="mt-3 flex items-center gap-2">
            {showIosSteps ? (
              <button
                type="button"
                onClick={() => setShowIosSheet(true)}
                className="btn-primary px-4 py-2 text-xs"
              >
                Show me how
              </button>
            ) : (
              <button
                type="button"
                onClick={install}
                className="btn-primary px-4 py-2 text-xs"
              >
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
