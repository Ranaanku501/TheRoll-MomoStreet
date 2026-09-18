/**
 * Single place to edit every shop detail shown on the website.
 * Replace the placeholder values below with your real details.
 */
export const site = {
  name: "The Roll & Momos",
  tagline: "Street Food",
  fullName: "The Roll & Momos Street Food",
  // Live site address. Used for the QR code and share links on /install.
  url: "https://the-roll-momo-street.vercel.app",
  description:
    "Steamed & fried momos, crispy spring rolls, egg and paneer rolls, hakka noodles, burgers and more — hot off the tawa, wrapped fresh for you.",
  // Digits only, with country code. Used for the WhatsApp order link.
  whatsapp: "919779332204",
  phoneDisplay: "+919779332204",
  phoneHref: "tel:+919779332204",
  email: "ranaanku501@gmail.com",
  address: {
    line1: "Jhungian, Teh. Garhshankar",
    line2: "Hoshiarpur, Punjab 144523",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Jhungian%2C+Garhshankar%2C+Hoshiarpur%2C+Punjab+144523",
    // Embedded on the contact page. Swap for a "Share → Embed a map" link once
    // the shop has its own Google Business listing.
    mapsEmbedUrl:
      "https://www.google.com/maps?q=Jhungian%2C+Garhshankar%2C+Hoshiarpur%2C+Punjab+144523&output=embed",
  },
  hours: [
    { days: "Monday – Thursday", time: "11:00 AM – 9:30 PM" },
    { days: "Friday – Sunday", time: "11:00 AM – 9:30 PM" },
  ],
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    zomato: "https://zomato.com/",
    swiggy: "https://swiggy.com/",
  },
  stats: [
    { value: "45+", label: "Street food items" },
    { value: "15 min", label: "Average serve time" },
    { value: "4.7★", label: "Customer rating" },
    { value: "100%", label: "Fresh daily prep" },
  ],
  currency: "₹",
  deliveryRadiusKm: 5,
  minOrder: 149,
} as const;

export const formatPrice = (amount: number) => `${site.currency}${amount}`;
