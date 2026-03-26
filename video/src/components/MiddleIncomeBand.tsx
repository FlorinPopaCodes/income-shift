import React from "react";
import { SANS } from "./TitleBlock";
import { dollarToXFrac } from "../lib/scales";
import type { ChartDimensions } from "../types";

interface Props {
  dim: ChartDimensions;
  ml: number;
  mu: number;
  yMax: number;
  opacity: number;
}

export const MiddleIncomeBand: React.FC<Props> = ({
  dim,
  ml,
  mu,
  yMax: _yMax,
  opacity,
}) => {
  const mlX = dim.margin.left + dollarToXFrac(Math.max(0, ml)) * dim.innerW;
  const muX = dim.margin.left + dollarToXFrac(mu) * dim.innerW;

  return (
    <g opacity={opacity}>
      <rect
        x={mlX}
        y={dim.margin.top}
        width={muX - mlX}
        height={dim.innerH}
        fill="#d4c5a9"
        opacity={0.25}
      />
      <text
        x={(mlX + muX) / 2}
        y={dim.margin.top + 20}
        textAnchor="middle"
        fill="#9e9590"
        fontSize={dim.axisSize - 2}
        fontFamily={SANS}
      >
        middle income
      </text>
    </g>
  );
};
