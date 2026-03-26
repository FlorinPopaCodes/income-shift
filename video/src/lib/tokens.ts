import {
  loadFont as loadSerif,
  fontFamily as serifFontFamily,
} from "@remotion/google-fonts/SourceSerif4";
import {
  loadFont as loadSans,
  fontFamily as sansFontFamily,
} from "@remotion/google-fonts/SourceSans3";

loadSerif();
loadSans();

// Typography
export const SANS = `${sansFontFamily}, sans-serif`;
export const SERIF = `${serifFontFamily}, serif`;

// Colors
export const color = {
  bg: "#fff1e5",
  textPrimary: "#33302e",
  textSecondary: "#66605c",
  textTertiary: "#9e9590",
  watermark: "#b5aaa0",
  bar: "#c2786c",
  refLine: "#6b7b8d",
  band: "#d4c5a9",
  grid: "#e0d8d0",
  axis: "#ccc1b7",
} as const;

// Opacities
export const opacity = {
  bar: 0.75,
  band: 0.30,
  watermark: 0.55,
} as const;

// Chart element sizing
export const chart = {
  barGap: 0.84,       // fraction of bin width used by bar (16% gap)
  barRadius: 0.5,
  gridDash: "2,3",
  refLineWidth: 2.5,
  tickLength: 6,
  tickLabelOffset: 22,
} as const;
