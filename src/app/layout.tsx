import type { Metadata, Viewport } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { InstallPrompt } from "@/components/install-prompt";
import { Navbar } from "@/components/navbar";
import { site } from "@/lib/site";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — Momos, Rolls, Noodles & More`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "momos",
    "spring rolls",
    "egg roll",
    "paneer roll",
    "hakka noodles",
    "burgers",
    "street food",
    site.fullName,
  ],
  openGraph: {
    title: `${site.fullName} — Momos, Rolls, Noodles & More`,
    description: site.description,
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2a15",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans`}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <InstallPrompt />
        </CartProvider>
      </body>
    </html>
  );
}
