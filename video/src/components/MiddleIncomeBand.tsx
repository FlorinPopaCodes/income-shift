import React from "react";
import { SANS, color, opacity as op } from "../lib/tokens";
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
        fill={color.band}
        opacity={op.band}
      />
      <text
        x={(mlX + muX) / 2}
        y={dim.margin.top + 20}
        textAnchor="middle"
        fill={color.textTertiary}
        fontSize={dim.axisSize}
        fontWeight={400}
        fontFamily={SANS}
      >
        middle income
      </text>
    </g>
  );
};
