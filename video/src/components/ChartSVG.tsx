import React from "react";
import type { ChartDimensions, SetupOpacity } from "../types";
import { Axes } from "./Axes";
import { MiddleIncomeBand } from "./MiddleIncomeBand";
import { Bars } from "./Bars";
import { ReferenceLine } from "./ReferenceLine";

interface Props {
  dim: ChartDimensions;
  densities: number[];
  refDensities: number[];
  refYear: number;
  binEdges: number[];
  yMax: number;
  yTicks: number[];
  ml: number;
  mu: number;
  setupOpacity: SetupOpacity;
  refLineProgress: number;
}

export const ChartSVG: React.FC<Props> = ({
  dim,
  densities,
  refDensities,
  refYear,
  binEdges,
  yMax,
  yTicks,
  ml,
  mu,
  setupOpacity,
  refLineProgress,
}) => {
  const svgH = dim.margin.top + dim.innerH + dim.margin.bottom;

  return (
    <svg
      width={dim.width}
      height={svgH}
      style={{
        position: "absolute",
        top: dim.chartOffsetY,
        left: 0,
      }}
    >
      <Axes
        dim={dim}
        yMax={yMax}
        yTicks={yTicks}
        opacity={setupOpacity.axes}
      />
      <MiddleIncomeBand
        dim={dim}
        ml={ml}
        mu={mu}
        yMax={yMax}
        opacity={setupOpacity.middleBand}
      />
      <Bars
        dim={dim}
        densities={densities}
        binEdges={binEdges}
        yMax={yMax}
        opacity={setupOpacity.data}
      />
      <ReferenceLine
        dim={dim}
        densities={refDensities}
        binEdges={binEdges}
        yMax={yMax}
        opacity={setupOpacity.data}
        year={refYear}
        progress={refLineProgress}
      />
    </svg>
  );
};
