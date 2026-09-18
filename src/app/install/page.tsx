import type { Metadata } from "next";
import QRCode from "qrcode";
import { InstallPanel } from "@/components/install-panel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download App",
  description: `Install the ${site.fullName} app on your phone in two taps. Order momos, rolls and noodles from your home screen.`,
};

export default async function InstallPage() {
  // Rendered once at build time so the QR can be printed on posters too.
  const qrSvg = await QRCode.toString(`${site.url}/install`, {
    type: "svg",
    margin: 1,
    color: { dark: "#17100e", light: "#00000000" },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-chilli-600 to-charcoal-900 py-14 text-white">
        <div className="absolute inset-0 bg-spice-grid [background-size:20px_20px] opacity-30" />
        <div className="container-page relative space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-masala-300">
            Download our app
          </p>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Put {site.name} on your home screen
          </h1>
          <p className="max-w-2xl leading-relaxed text-white/85">
            No Play Store, no App Store, no waiting for a download. Tap install and
            our app sits with the rest of your apps — ready for one-tap ordering.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <InstallPanel />

        <aside className="card space-y-4 p-6 text-center sm:p-8">
          <div>
            <p className="eyebrow">Scan to install</p>
            <h2 className="mt-1 font-display text-xl font-bold">
              Point your camera here
            </h2>
          </div>

          <div
            className="mx-auto w-full max-w-[220px] [&>svg]:h-auto [&>svg]:w-full"
            aria-label={`QR code linking to ${site.url}`}
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />

          <p className="text-sm leading-relaxed text-charcoal-900/60">
            Print this and stick it on the counter — customers scan it and land
            straight on this install page.
          </p>

          <p className="break-all rounded-2xl bg-charcoal-900/5 px-4 py-3 text-xs font-semibold text-charcoal-900/70">
            {site.url}
          </p>
        </aside>
      </section>
    </>
  );
}
