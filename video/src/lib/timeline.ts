import { interpolate } from "remotion";
import type { AnimationState } from "../types";
import { easeInOutCubic } from "./interpolation";

// Timeline: 450 frames @ 30fps = 15s
// Setup: 0-89 (3.0s) - everything visible, reference line draws in
// Sweep: 90-359 (9.0s) - year-by-year animation
// Hold:  360-449 (3.0s) - static final state

const SETUP_END = 89;
const SWEEP_START = 90;
const SWEEP_END = 359;

const ALL_VISIBLE: AnimationState["setupOpacity"] = {
  title: 1,
  axes: 1,
  middleBand: 1,
  data: 1,
};

export function getAnimationState(
  frame: number,
  _fps: number,
  _durationInFrames: number,
  numYears: number,
): AnimationState {
  // Reference line draws from x=0 to x=1M over the setup phase
  const refLineProgress = interpolate(frame, [0, SETUP_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame <= SETUP_END) {
    return {
      phase: "setup",
      yearProgress: 0,
      setupOpacity: ALL_VISIBLE,
      refLineProgress,
    };
  }

  if (frame <= SWEEP_END) {
    const sweepFrame = frame - SWEEP_START;
    const sweepTotal = SWEEP_END - SWEEP_START;
    const rawT = sweepFrame / sweepTotal;

    const rawYear = rawT * (numYears - 1);
    const yearFloor = Math.floor(rawYear);
    const yearFrac = rawYear - yearFloor;
    const easedFrac = easeInOutCubic(yearFrac);
    const yearProgress = (yearFloor + easedFrac) / (numYears - 1);

    return {
      phase: "sweep",
      yearProgress,
      setupOpacity: ALL_VISIBLE,
      refLineProgress: 1,
    };
  }

  return {
    phase: "hold",
    yearProgress: 1,
    setupOpacity: ALL_VISIBLE,
    refLineProgress: 1,
  };
}
