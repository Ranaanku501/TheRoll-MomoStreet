/**
 * Single place to edit every shop detail shown on the website.
 * Replace the placeholder values below with your real details.
 */
export const site = {
  name: "The Roll & Momos",
  tagline: "Street Food",
  fullName: "The Roll & Momos Street Food",
  description:
    "Steamed & fried momos, crispy spring rolls, egg and paneer rolls, hakka noodles, burgers and more — hot off the tawa, wrapped fresh for you.",
  // Digits only, with country code. Used for the WhatsApp order link.
  whatsapp: "919779332204",
  phoneDisplay: "+919779332204",
  phoneHref: "tel:+919779332204",
  email: "hello@therollandmomos.com",
  address: {
    line1: "Shop No. 12, Food Street Market",
    line2: "Near City Mall, Your City 000000",
    mapsUrl: "https://maps.google.com/?q=The+Roll+and+Momos+Street+Food",
  },
  hours: [
    { days: "Monday – Thursday", time: "11:00 AM – 10:30 PM" },
    { days: "Friday – Sunday", time: "11:00 AM – 11:30 PM" },
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
