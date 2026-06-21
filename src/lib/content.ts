// Shared marketing content used across multiple pages.

export type UserGroup = {
  title: string;
  blurb: string;
};

export const sellerGroups: UserGroup[] = [
  { title: "Private vehicle owners", blurb: "Sell a single car, truck, or SUV without guessing where it belongs." },
  { title: "Dealers & wholesalers", blurb: "Move trade-ins, aged inventory, and wholesale units to the right lane." },
  { title: "Insurance companies", blurb: "Route total losses, theft recoveries, and claim vehicles to recovery buyers." },
  { title: "Finance & repossession", blurb: "Find the best recovery path for repos and voluntary surrenders." },
  { title: "Fleet & rental operators", blurb: "Liquidate fleet and rental units across multiple buyer networks." },
  { title: "Towing & storage yards", blurb: "Clear storage-lien and abandoned units before value decays." },
  { title: "Repair & body shops", blurb: "Disposition repairable, non-running, and mechanical-issue vehicles." },
  { title: "Businesses & estates", blurb: "Liquidate vehicles from closures, estates, and storage-lien holders." },
];

export const buyerGroups: UserGroup[] = [
  { title: "Dealers", blurb: "Retail-ready and clean wholesale opportunities." },
  { title: "Wholesalers", blurb: "Volume units matched to your lanes and regions." },
  { title: "Exporters", blurb: "Export-friendly models, drivetrains, and title statuses." },
  { title: "Salvage buyers", blurb: "Total losses, collision, hail, and theft recoveries." },
  { title: "Parts buyers", blurb: "High-value component vehicles and donor units." },
  { title: "Repair shops & rebuilders", blurb: "Economically repairable and rebuildable vehicles." },
  { title: "Collectors & specialty", blurb: "Specialty and collector-grade opportunities." },
  { title: "Scrap buyers", blurb: "Scrap-floor units after parts and export are ruled out." },
];

export type Step = {
  step: string;
  title: string;
  body: string;
};

export const howItWorksSteps: Step[] = [
  {
    step: "01",
    title: "Submit vehicle information",
    body: "Share VIN, title status, condition, mileage, and location. The more detail, the better the routing.",
  },
  {
    step: "02",
    title: "We review the opportunity",
    body: "OfferOnly evaluates the unit by title, damage, demand, and exit value — not a single generic price.",
  },
  {
    step: "03",
    title: "The vehicle is classified by lane",
    body: "Each unit is ranked across buyer lanes: wholesale, export, salvage, parts, repair, scrap, and more.",
  },
  {
    step: "04",
    title: "The right buyers review it",
    body: "Opportunities are routed to qualified buyers in the matching lanes and regions — not blasted to everyone.",
  },
  {
    step: "05",
    title: "You receive interest & next steps",
    body: "Get buyer interest, offers, or clear next-step options organized by VIN.",
  },
];

export type VehicleType = {
  slug: string;
  name: string;
  what: string;
  why: string;
  buyers: string[];
  group: string;
};

export const vehicleTypes: VehicleType[] = [
  {
    slug: "clean-title-wholesale",
    name: "Clean Title Wholesale Vehicles",
    group: "Wholesale & Retail",
    what: "Late-model, clean-title cars and trucks that run and drive.",
    why: "Most channels treat them generically and leave wholesale margin on the table.",
    buyers: ["Dealers", "Wholesalers", "Exporters"],
  },
  {
    slug: "dealer-trade-ins",
    name: "Dealer Trade-Ins",
    group: "Wholesale & Retail",
    what: "Trade-ins that don't fit a dealer's retail lot.",
    why: "Off-brand or aged trades often sell below their best lane value.",
    buyers: ["Wholesalers", "Dealers", "Exporters"],
  },
  {
    slug: "aged-inventory",
    name: "Aged Inventory",
    group: "Wholesale & Retail",
    what: "Units sitting too long on a lot or in stock.",
    why: "Holding cost erodes value while the right buyer is elsewhere.",
    buyers: ["Wholesalers", "Exporters", "Dealers"],
  },
  {
    slug: "insurance-total-loss",
    name: "Insurance Total-Loss Vehicles",
    group: "Insurance & Claims",
    what: "Vehicles declared a total loss after a claim.",
    why: "Recovery value varies widely by lane — salvage, rebuild, parts, or export.",
    buyers: ["Salvage buyers", "Rebuilders", "Parts buyers", "Exporters"],
  },
  {
    slug: "theft-recoveries",
    name: "Theft Recoveries",
    group: "Insurance & Claims",
    what: "Recovered stolen vehicles, often stripped or damaged.",
    why: "Condition is inconsistent; the best buyer depends on what remains.",
    buyers: ["Salvage buyers", "Parts buyers", "Rebuilders"],
  },
  {
    slug: "flood-vehicles",
    name: "Flood Vehicles",
    group: "Insurance & Claims",
    what: "Water-damaged vehicles with title brands in many states.",
    why: "Electrical risk scares off generic buyers; specialists value them correctly.",
    buyers: ["Parts buyers", "Exporters", "Salvage buyers"],
  },
  {
    slug: "hail-vehicles",
    name: "Hail Vehicles",
    group: "Insurance & Claims",
    what: "Cosmetically hail-damaged but often mechanically sound.",
    why: "PDR specialists and exporters often pay far more than scrap.",
    buyers: ["Repair shops", "Exporters", "Dealers"],
  },
  {
    slug: "collision-vehicles",
    name: "Collision Vehicles",
    group: "Insurance & Claims",
    what: "Front, rear, or side collision-damaged units.",
    why: "Rebuildability and parts value determine the right lane.",
    buyers: ["Rebuilders", "Salvage buyers", "Parts buyers"],
  },
  {
    slug: "fire-damage-vehicles",
    name: "Fire-Damage Vehicles",
    group: "Insurance & Claims",
    what: "Vehicles with partial or full fire damage.",
    why: "Surviving components and metal value drive the exit path.",
    buyers: ["Parts buyers", "Scrap buyers", "Salvage buyers"],
  },
  {
    slug: "salvage-title-vehicles",
    name: "Salvage Title Vehicles",
    group: "Salvage & Rebuild",
    what: "Title-branded vehicles from prior total losses.",
    why: "Title brands limit retail but open salvage, rebuild, and export lanes.",
    buyers: ["Salvage buyers", "Rebuilders", "Exporters"],
  },
  {
    slug: "rebuilt-title-vehicles",
    name: "Rebuilt Title Vehicles",
    group: "Salvage & Rebuild",
    what: "Previously salvaged vehicles repaired and re-titled.",
    why: "Need buyers comfortable with branded titles and inspections.",
    buyers: ["Dealers", "Exporters", "Wholesalers"],
  },
  {
    slug: "repo-vehicles",
    name: "Repo Vehicles",
    group: "Finance & Repo",
    what: "Repossessed units recovered by finance companies.",
    why: "Blanket auction routing often misses the strongest recovery lane.",
    buyers: ["Wholesalers", "Dealers", "Exporters"],
  },
  {
    slug: "voluntary-surrender",
    name: "Voluntary Surrender Vehicles",
    group: "Finance & Repo",
    what: "Units surrendered by borrowers to lenders.",
    why: "Condition and lien clarity drive the right disposition path.",
    buyers: ["Wholesalers", "Salvage buyers", "Exporters"],
  },
  {
    slug: "fleet-vehicles",
    name: "Fleet Vehicles",
    group: "Fleet & Rental",
    what: "Commercial and corporate fleet units coming out of service.",
    why: "Volume and uniformity make them ideal for matched lanes.",
    buyers: ["Wholesalers", "Dealers", "Fleet buyers"],
  },
  {
    slug: "rental-fleet-vehicles",
    name: "Rental Fleet Vehicles",
    group: "Fleet & Rental",
    what: "Decommissioned rental cars and trucks.",
    why: "High volume requires efficient routing to wholesale and export.",
    buyers: ["Wholesalers", "Exporters", "Dealers"],
  },
  {
    slug: "export-units",
    name: "Export Units",
    group: "Export & Specialty",
    what: "Models with strong overseas demand.",
    why: "Domestic value understates what export markets will pay.",
    buyers: ["Exporters", "Export brokers", "Wholesalers"],
  },
  {
    slug: "parts-vehicles",
    name: "Parts Vehicles",
    group: "Parts & Mechanical",
    what: "Donor units worth more disassembled than whole.",
    why: "Component demand can exceed any whole-vehicle offer.",
    buyers: ["Parts buyers", "Repair shops", "Rebuilders"],
  },
  {
    slug: "non-running-vehicles",
    name: "Non-Running Vehicles",
    group: "Parts & Mechanical",
    what: "Vehicles that do not start or are not drivable.",
    why: "Generic buyers discount heavily; specialists see parts and export value.",
    buyers: ["Parts buyers", "Salvage buyers", "Scrap buyers"],
  },
  {
    slug: "mechanical-issue-vehicles",
    name: "Mechanical Issue Vehicles",
    group: "Parts & Mechanical",
    what: "Running but with engine, transmission, or system faults.",
    why: "Repair economics determine repair, parts, or wholesale lanes.",
    buyers: ["Repair shops", "Rebuilders", "Wholesalers"],
  },
  {
    slug: "storage-lien-vehicles",
    name: "Storage-Lien Vehicles",
    group: "Towing & Storage",
    what: "Abandoned or lien-held units at tow and storage yards.",
    why: "Speed matters — value decays while units occupy the lot.",
    buyers: ["Salvage buyers", "Parts buyers", "Scrap buyers"],
  },
  {
    slug: "scrap-vehicles",
    name: "Scrap Vehicles",
    group: "Scrap",
    what: "End-of-life units headed for scrap.",
    why: "Some still carry parts or export value worth checking first.",
    buyers: ["Scrap buyers", "Parts buyers"],
  },
  {
    slug: "specialty-vehicles",
    name: "Specialty Vehicles",
    group: "Export & Specialty",
    what: "Collector, exotic, commercial, and unusual units.",
    why: "Niche demand requires matching to specialty and collector buyers.",
    buyers: ["Collectors", "Specialty buyers", "Exporters"],
  },
];
