"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

/** Which set of instructions a visitor needs. */
export type Platform = "android" | "ios" | "desktop" | "in-app-browser";

type InstallContextValue = {
  /** True once Chrome has offered us an install prompt we can trigger. */
  canPrompt: boolean;
  /** Running from the home screen already. */
  isInstalled: boolean;
  platform: Platform;
  /** Null until the browser has been detected on the client. */
  ready: boolean;
  promptInstall: () => Promise<"accepted" | "dismissed" | "unavailable">;
};

const InstallContext = createContext<InstallContextValue | null>(null);

const detectPlatform = (): Platform => {
  const ua = window.navigator.userAgent;

  // Instagram / Facebook web views cannot install PWAs at all.
  if (/Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(ua)) return "in-app-browser";

  const iOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (window.navigator.platform === "MacIntel" &&
      window.navigator.maxTouchPoints > 1);
  if (iOS) return "ios";

  if (/android/i.test(ua)) return "android";
  return "desktop";
};

const detectInstalled = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

export function InstallProvider({ children }: { children: React.ReactNode }) {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    setIsInstalled(detectInstalled());
    setReady(true);

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Not fatal — the site works fine without offline support.
      });
    }

    const onBeforeInstall = (event: Event) => {
      // Suppress Chrome's own mini-infobar so our UI controls the timing.
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstallEvent(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!installEvent) return "unavailable" as const;

    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    // The event can only be used once.
    setInstallEvent(null);
    return outcome;
  }, [installEvent]);

  const value = useMemo<InstallContextValue>(
    () => ({
      canPrompt: installEvent !== null,
      isInstalled,
      platform,
      ready,
      promptInstall,
    }),
    [installEvent, isInstalled, platform, ready, promptInstall],
  );

  return (
    <InstallContext.Provider value={value}>{children}</InstallContext.Provider>
  );
}

export function useInstall() {
  const context = useContext(InstallContext);
  if (!context) {
    throw new Error("useInstall must be used inside an InstallProvider");
  }
  return context;
}
