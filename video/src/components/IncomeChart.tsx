import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { Layout, DataFile } from "../types";
import { buildBinEdges, computeYMax, computeYTicks } from "../lib/scales";
import { lerpYear } from "../lib/interpolation";
import { getAnimationState } from "../lib/timeline";
import { getDimensions } from "../layouts/dimensions";
import { TitleBlock, SANS } from "./TitleBlock";
import { YearWatermark } from "./YearWatermark";
import { ChartSVG } from "./ChartSVG";
import { SourceLine } from "./SourceLine";
import rawData from "../data.json";

const data = rawData as unknown as DataFile;

// Filter to 5-year intervals + 2024
const SHOW_YEARS = new Set([
  1971, 1976, 1981, 1986, 1991, 1996, 2001, 2006, 2011, 2016, 2021, 2024,
]);
const filteredYears = data.years.filter((y) => SHOW_YEARS.has(y.y));

const binEdges = buildBinEdges(data.bin_widths_k);
const yMax = computeYMax(data);
const yTicks = computeYTicks(yMax);
const refData = filteredYears[0]; // 1971

export const IncomeChart: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width: videoW, height: videoH } = useVideoConfig();

  const dim = getDimensions(layout, videoW, videoH);
  const state = getAnimationState(frame, fps, durationInFrames, filteredYears.length);
  const d = lerpYear(filteredYears, state.yearProgress);

  return (
    <div
      style={{
        width: videoW,
        height: videoH,
        background: "#fff1e5",
        fontFamily: SANS,
        color: "#33302e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TitleBlock dim={dim} layout={layout} opacity={state.setupOpacity.title} />
      <YearWatermark dim={dim} year={d.y} opacity={state.setupOpacity.data} />
      <ChartSVG
        dim={dim}
        densities={d.b}
        refDensities={refData.b}
        refYear={refData.y}
        binEdges={binEdges}
        yMax={yMax}
        yTicks={yTicks}
        ml={d.ml}
        mu={d.mu}
        setupOpacity={state.setupOpacity}
        refLineProgress={state.refLineProgress}
      />
      <SourceLine dim={dim} layout={layout} opacity={state.setupOpacity.axes} />
    </div>
  );
};
