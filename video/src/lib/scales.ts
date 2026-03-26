import type { DataFile } from "../types";

// Zone layout: 4 equal visual zones + small overflow
const ZONES = [
  { lo: 0, hi: 70_000 },
  { lo: 70_000, hi: 140_000 },
  { lo: 140_000, hi: 280_000 },
  { lo: 280_000, hi: 1_000_000 },
];
const ZONE_FRAC = 0.24;
const OVERFLOW_FRAC = 1 - ZONE_FRAC * 4; // 0.04

export function dollarToXFrac(d: number): number {
  for (let z = 0; z < ZONES.length; z++) {
    if (d <= ZONES[z].hi) {
      const t = (d - ZONES[z].lo) / (ZONES[z].hi - ZONES[z].lo);
      return z * ZONE_FRAC + t * ZONE_FRAC;
    }
  }
  // Overflow: $1M+, clamp to the overflow region
  return ZONE_FRAC * 4 + OVERFLOW_FRAC * 0.5;
}

// Build bin edges from data
export function buildBinEdges(binWidthsK: number[]): number[] {
  const edges: number[] = [0];
  for (const w of binWidthsK) {
    edges.push(edges[edges.length - 1] + w * 1000);
  }
  return edges;
}

// X-axis tick marks
export const X_TICKS = [
  { v: 0, label: "$0" },
  { v: 35_000, label: "$35k" },
  { v: 70_000, label: "$70k" },
  { v: 105_000, label: "$105k" },
  { v: 140_000, label: "$140k" },
  { v: 210_000, label: "$210k" },
  { v: 280_000, label: "$280k" },
  { v: 500_000, label: "$500k" },
  { v: 1_000_000, label: "$1M+" },
];

// Compute max density across all years (bars + KDE) for y-axis scaling
export function computeYMax(data: DataFile): number {
  let max = 0;
  for (const year of data.years) {
    for (const d of year.b) {
      if (d > max) max = d;
    }
    for (const d of year.k) {
      if (d > max) max = d;
    }
  }
  return Math.ceil(max * 10) / 10 + 0.05;
}

// Y-axis tick marks (count-based to avoid float accumulation)
export function computeYTicks(yMax: number): number[] {
  const step = 0.2;
  const nTicks = Math.floor(yMax / step) + 1;
  const ticks: number[] = [];
  for (let i = 0; i < nTicks; i++) {
    ticks.push(Math.round(i * step * 10) / 10);
  }
  return ticks;
}
