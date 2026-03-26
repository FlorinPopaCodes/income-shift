import type { YearData } from "../types";

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function lerpYear(years: YearData[], t: number): YearData {
  const idx = t * (years.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, years.length - 1);
  const frac = idx - lo;

  const a = years[lo];
  const b = years[hi];

  return {
    y: lerp(a.y, b.y, frac),
    b: a.b.map((v, i) => lerp(v, b.b[i], frac)),
    m: lerp(a.m, b.m, frac),
    n: lerp(a.n, b.n, frac),
    h: lerp(a.h, b.h, frac),
    ml: lerp(a.ml, b.ml, frac),
    mu: lerp(a.mu, b.mu, frac),
    hs: lerp(a.hs, b.hs, frac),
  };
}
