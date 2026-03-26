import React from "react";
import type { ChartDimensions } from "../types";
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
      <Axes dim={dim} yMax={yMax} yTicks={yTicks} />
      <MiddleIncomeBand dim={dim} ml={ml} mu={mu} />
      <Bars
        dim={dim}
        densities={densities}
        binEdges={binEdges}
        yMax={yMax}
      />
      <ReferenceLine
        dim={dim}
        densities={refDensities}
        binEdges={binEdges}
        yMax={yMax}
        year={refYear}
        progress={refLineProgress}
      />
    </svg>
  );
};
