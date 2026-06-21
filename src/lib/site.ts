export const site = {
  name: "OfferOnly",
  domain: "offeronly.com",
  url: "https://offeronly.com",
  tagline: "Vehicle Opportunities Matched to the Right Buyers",
  description:
    "OfferOnly is a vehicle opportunity platform that routes each unit to the buyer network most likely to understand its real value — from clean wholesale vehicles to total losses, salvage, export, parts, repair, and scrap.",
  email: "hello@offeronly.com",
  phone: "(555) 010-7900",
};

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Sell", href: "/sell" },
  { label: "Buyer Network", href: "/buyers" },
  { label: "Insurance", href: "/insurance" },
  { label: "Vehicle Types", href: "/vehicle-types" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Platform",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Vehicle Types", href: "/vehicle-types" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Sellers",
    links: [
      { label: "Sell a Vehicle", href: "/sell" },
      { label: "Snap Before You Scrap", href: "/snap" },
      { label: "Insurance / Total Loss", href: "/insurance" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Buyers",
    links: [
      { label: "Join the Buyer Network", href: "/buyers" },
      { label: "Vehicle Types", href: "/vehicle-types" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const buyerLanes = [
  "Clean wholesale",
  "Dealer resale",
  "Export",
  "Salvage",
  "Parts",
  "Repair / rebuild",
  "Scrap",
  "Fleet",
  "Insurance recovery",
  "Repo liquidation",
  "Collector / specialty",
];
