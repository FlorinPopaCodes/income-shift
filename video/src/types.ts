export type Layout = "landscape" | "square" | "vertical";

export interface YearData {
  y: number;
  b: number[];
  m: number;
  n: number;
  h: number;
  ml: number;
  mu: number;
  hs: number;
}

export interface DataFile {
  bin_widths_k: number[];
  years: YearData[];
}

export interface ChartDimensions {
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  innerW: number;
  innerH: number;
  chartOffsetY: number;
  titleSize: number;
  subtitleSize: number;
  yearSize: number;
  axisSize: number;
  statSize: number;
  sourceSize: number;
}

export type AnimationPhase = "setup" | "sweep" | "hold";

export interface AnimationState {
  phase: AnimationPhase;
  yearProgress: number;
  refLineProgress: number; // 0→1: reference line draws from left to right
}
