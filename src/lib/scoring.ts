/**
 * OfferOnly rule-based buyer-lane scoring (MVP).
 *
 * This is a deterministic, transparent first version of the routing algorithm
 * described in the spec (sections 8-10). It does NOT promise exact values — it
 * ranks the buyer lanes most likely to value a unit correctly, and answers the
 * core "Snap Before You Scrap" question: is this worth more than scrap?
 *
 * A later phase can replace these weights with learned values from real
 * close-rate data.
 */

export type TitleStatus =
  | "clean"
  | "salvage"
  | "rebuilt"
  | "flood"
  | "junk"
  | "parts_only"
  | "certificate_of_destruction"
  | "missing_title"
  | "unknown";

export type RunningStatus =
  | "runs_and_drives"
  | "runs_not_drivable"
  | "starts_no_drive"
  | "does_not_start"
  | "unknown";

export type DamageType =
  | "none"
  | "minor_body"
  | "collision"
  | "hail"
  | "flood"
  | "fire"
  | "theft_recovery"
  | "mechanical"
  | "frame"
  | "unknown";

export type LaneKey =
  | "clean_wholesale"
  | "export"
  | "salvage"
  | "parts"
  | "repair"
  | "scrap";

export type VehicleInput = {
  vin?: string;
  year?: number;
  make?: string;
  model?: string;
  mileage?: number;
  titleStatus: TitleStatus;
  running: RunningStatus;
  damage: DamageType;
  photoCount?: number;
};

export type LaneScore = {
  key: LaneKey;
  label: string;
  score: number;
};

export type ScoreResult = {
  lanes: LaneScore[];
  primary: LaneScore;
  secondary: LaneScore[];
  scrapScore: number;
  bestNonScrap: LaneScore;
  worthMoreThanScrap: boolean;
  verdict: string;
  missingInfo: string[];
};

export const LANE_LABELS: Record<LaneKey, string> = {
  clean_wholesale: "Wholesale buyers",
  export: "Export buyers",
  salvage: "Salvage buyers",
  parts: "Parts buyers",
  repair: "Repair / rebuilders",
  scrap: "Scrap buyers",
};

const CURRENT_YEAR = new Date().getFullYear();

// Makes that tend to carry strong export and/or used-parts demand.
const EXPORT_FRIENDLY = [
  "toyota",
  "lexus",
  "honda",
  "ford",
  "chevrolet",
  "chevy",
  "gmc",
  "nissan",
  "subaru",
  "jeep",
  "ram",
  "dodge",
];

const POPULAR_PARTS = [
  "toyota",
  "honda",
  "ford",
  "chevrolet",
  "chevy",
  "gmc",
  "nissan",
  "jeep",
  "ram",
  "dodge",
  "bmw",
  "mercedes",
];

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function age(year?: number): number | undefined {
  if (!year || year < 1950 || year > CURRENT_YEAR + 1) return undefined;
  return CURRENT_YEAR - year;
}

function makeMatches(make: string | undefined, list: string[]): boolean {
  if (!make) return false;
  const m = make.trim().toLowerCase();
  return list.some((x) => m.includes(x));
}

function scoreCleanWholesale(v: VehicleInput): number {
  let s = 20;
  switch (v.titleStatus) {
    case "clean":
      s += 35;
      break;
    case "rebuilt":
      s -= 10;
      break;
    case "salvage":
      s -= 25;
      break;
    case "flood":
    case "junk":
    case "parts_only":
    case "certificate_of_destruction":
      s -= 45;
      break;
    case "missing_title":
      s -= 25;
      break;
  }
  if (v.running === "runs_and_drives") s += 25;
  else if (v.running === "starts_no_drive") s -= 12;
  else if (v.running === "does_not_start") s -= 28;
  if (v.damage === "none") s += 15;
  else if (v.damage === "minor_body") s += 4;
  else if (v.damage === "collision") s -= 18;
  else if (v.damage === "frame") s -= 32;
  else if (v.damage === "flood") s -= 28;
  else if (v.damage === "fire") s -= 38;
  if (v.mileage != null) {
    if (v.mileage < 100_000) s += 10;
    else if (v.mileage > 180_000) s -= 15;
  }
  const a = age(v.year);
  if (a != null) {
    if (a <= 8) s += 10;
    else if (a >= 20) s -= 15;
  }
  return clamp(s);
}

function scoreExport(v: VehicleInput): number {
  let s = 25;
  if (makeMatches(v.make, EXPORT_FRIENDLY)) s += 22;
  switch (v.titleStatus) {
    case "clean":
      s += 15;
      break;
    case "rebuilt":
    case "salvage":
      s += 6; // acceptable in some destination markets
      break;
    case "junk":
    case "certificate_of_destruction":
      s -= 30;
      break;
    case "missing_title":
      s -= 22;
      break;
  }
  if (v.running === "runs_and_drives") s += 15;
  else if (v.running === "does_not_start") s -= 10;
  if (v.damage === "fire") s -= 28;
  else if (v.damage === "flood") s -= 12;
  else if (v.damage === "frame") s -= 12;
  if (v.mileage != null && v.mileage > 180_000) s += 6; // strong overseas tolerance
  return clamp(s);
}

function scoreSalvage(v: VehicleInput): number {
  let s = 15;
  switch (v.titleStatus) {
    case "salvage":
      s += 30;
      break;
    case "rebuilt":
      s += 10;
      break;
    case "junk":
      s += 6;
      break;
    case "clean":
      s -= 6;
      break;
    case "certificate_of_destruction":
      s -= 18;
      break;
  }
  switch (v.damage) {
    case "collision":
      s += 25;
      break;
    case "hail":
      s += 20;
      break;
    case "theft_recovery":
      s += 20;
      break;
    case "flood":
      s += 8;
      break;
    case "frame":
      s += 4;
      break;
    case "fire":
      s -= 10;
      break;
    case "none":
      s -= 15;
      break;
  }
  if (v.running === "does_not_start") s += 5;
  else if (v.running === "runs_and_drives") s -= 4;
  const a = age(v.year);
  if (a != null) {
    if (a <= 10) s += 15;
    else if (a >= 20) s -= 15;
  }
  return clamp(s);
}

function scoreParts(v: VehicleInput): number {
  let s = 20;
  if (v.running === "does_not_start") s += 20;
  else if (v.running === "starts_no_drive") s += 15;
  else if (v.running === "runs_not_drivable") s += 10;
  switch (v.damage) {
    case "frame":
      s += 22;
      break;
    case "collision":
      s += 15;
      break;
    case "fire":
      s += 4;
      break;
    case "flood":
      s -= 8; // electronics often destroyed
      break;
    case "none":
      s -= 10;
      break;
  }
  switch (v.titleStatus) {
    case "parts_only":
      s += 25;
      break;
    case "salvage":
      s += 10;
      break;
    case "certificate_of_destruction":
      s += 6;
      break;
    case "clean":
      s -= 6;
      break;
  }
  if (makeMatches(v.make, POPULAR_PARTS)) s += 15;
  const a = age(v.year);
  if (a != null && a >= 4 && a <= 16) s += 6;
  return clamp(s);
}

function scoreRepair(v: VehicleInput): number {
  let s = 15;
  switch (v.damage) {
    case "minor_body":
      s += 25;
      break;
    case "collision":
      s += 20;
      break;
    case "hail":
      s += 15;
      break;
    case "mechanical":
      s += 12;
      break;
    case "none":
      s += 6;
      break;
    case "frame":
      s -= 25;
      break;
    case "flood":
      s -= 22;
      break;
    case "fire":
      s -= 32;
      break;
  }
  if (v.running === "runs_and_drives") s += 15;
  else if (v.running === "starts_no_drive") s += 5;
  else if (v.running === "does_not_start") s -= 10;
  switch (v.titleStatus) {
    case "clean":
      s += 15;
      break;
    case "rebuilt":
      s += 10;
      break;
    case "salvage":
      s += 5;
      break;
    case "junk":
      s -= 20;
      break;
    case "certificate_of_destruction":
      s -= 30;
      break;
  }
  const a = age(v.year);
  if (a != null) {
    if (a <= 10) s += 15;
    else if (a >= 20) s -= 20;
  }
  return clamp(s);
}

function scoreScrap(v: VehicleInput): number {
  let s = 10;
  if (v.running === "does_not_start") s += 15;
  switch (v.damage) {
    case "fire":
      s += 25;
      break;
    case "flood":
      s += 20;
      break;
    case "frame":
      s += 15;
      break;
    case "none":
      s -= 12;
      break;
  }
  switch (v.titleStatus) {
    case "junk":
      s += 25;
      break;
    case "certificate_of_destruction":
      s += 30;
      break;
    case "parts_only":
      s += 10;
      break;
    case "missing_title":
      s += 10;
      break;
    case "clean":
      s -= 18;
      break;
  }
  const a = age(v.year);
  if (a != null) {
    if (a >= 20) s += 20;
    else if (a <= 8) s -= 18;
  }
  if (v.mileage != null && v.mileage > 220_000) s += 8;
  return clamp(s);
}

export function scoreVehicle(v: VehicleInput): ScoreResult {
  const raw: Record<LaneKey, number> = {
    clean_wholesale: scoreCleanWholesale(v),
    export: scoreExport(v),
    salvage: scoreSalvage(v),
    parts: scoreParts(v),
    repair: scoreRepair(v),
    scrap: scoreScrap(v),
  };

  const lanes: LaneScore[] = (Object.keys(raw) as LaneKey[])
    .map((key) => ({ key, label: LANE_LABELS[key], score: raw[key] }))
    .sort((a, b) => b.score - a.score);

  const scrapScore = raw.scrap;
  const nonScrap = lanes.filter((l) => l.key !== "scrap");
  const bestNonScrap = nonScrap[0];
  const worthMoreThanScrap = bestNonScrap.score >= scrapScore;

  const verdict = worthMoreThanScrap
    ? `Don't scrap it yet — this looks worth more to ${bestNonScrap.label.toLowerCase()}.`
    : `Scrap is currently the strongest exit, but it's worth confirming parts and export interest first.`;

  const missingInfo: string[] = [];
  if (!v.vin) missingInfo.push("VIN");
  if (v.mileage == null) missingInfo.push("Mileage");
  if (v.titleStatus === "unknown") missingInfo.push("Title status");
  if (v.running === "unknown") missingInfo.push("Running condition");
  if (!v.photoCount) missingInfo.push("Photos");

  return {
    lanes,
    primary: lanes[0],
    secondary: lanes.slice(1, 4),
    scrapScore,
    bestNonScrap,
    worthMoreThanScrap,
    verdict,
    missingInfo,
  };
}

// UI option lists (value + human label) shared by the Snap flow.
export const TITLE_OPTIONS: { value: TitleStatus; label: string }[] = [
  { value: "clean", label: "Clean" },
  { value: "salvage", label: "Salvage" },
  { value: "rebuilt", label: "Rebuilt" },
  { value: "flood", label: "Flood" },
  { value: "junk", label: "Junk" },
  { value: "parts_only", label: "Parts only" },
  { value: "certificate_of_destruction", label: "Certificate of destruction" },
  { value: "missing_title", label: "Missing title" },
  { value: "unknown", label: "Not sure" },
];

export const RUNNING_OPTIONS: { value: RunningStatus; label: string }[] = [
  { value: "runs_and_drives", label: "Runs and drives" },
  { value: "runs_not_drivable", label: "Runs, not drivable" },
  { value: "starts_no_drive", label: "Starts, won't drive" },
  { value: "does_not_start", label: "Does not start" },
  { value: "unknown", label: "Not sure" },
];

export const DAMAGE_OPTIONS: { value: DamageType; label: string }[] = [
  { value: "none", label: "None" },
  { value: "minor_body", label: "Minor body" },
  { value: "collision", label: "Collision" },
  { value: "hail", label: "Hail" },
  { value: "flood", label: "Flood" },
  { value: "fire", label: "Fire" },
  { value: "theft_recovery", label: "Theft recovery" },
  { value: "mechanical", label: "Mechanical" },
  { value: "frame", label: "Frame" },
  { value: "unknown", label: "Not sure" },
];
