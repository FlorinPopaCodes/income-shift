import React from "react";
import { color, opacity as op, chart } from "../lib/tokens";
import { dollarToXFrac } from "../lib/scales";
import type { ChartDimensions } from "../types";

interface Props {
  dim: ChartDimensions;
  densities: number[];
  binEdges: number[];
  yMax: number;
  opacity: number;
}

export const Bars: React.FC<Props> = ({
  dim,
  densities,
  binEdges,
  yMax,
  opacity,
}) => {
  const xPos = (d: number) => dim.margin.left + dollarToXFrac(d) * dim.innerW;

  return (
    <g opacity={opacity}>
      {densities.map((density, i) => {
        const bx = xPos(binEdges[i]);
        const bw = (xPos(binEdges[i + 1]) - xPos(binEdges[i])) * chart.barGap;
        const barH = (density / yMax) * dim.innerH;

        return (
          <rect
            key={i}
            x={bx}
            y={dim.margin.top + dim.innerH - barH}
            width={Math.max(0, bw)}
            height={barH}
            fill={color.bar}
            opacity={op.bar}
            rx={chart.barRadius}
          />
        );
      })}
    </g>
  );
};
