import React from "react";
import { SANS, color, chart } from "../lib/tokens";
import { dollarToXFrac, X_TICKS } from "../lib/scales";
import type { ChartDimensions } from "../types";

interface Props {
  dim: ChartDimensions;
  yMax: number;
  yTicks: number[];
  opacity: number;
}

export const Axes: React.FC<Props> = ({ dim, yMax, yTicks, opacity }) => {
  const xPos = (d: number) => dim.margin.left + dollarToXFrac(d) * dim.innerW;
  const yPos = (v: number) => dim.margin.top + dim.innerH * (1 - v / yMax);

  return (
    <g opacity={opacity}>
      {/* Horizontal grid lines */}
      {yTicks.map((v) => (
        <line
          key={v}
          x1={dim.margin.left}
          x2={dim.margin.left + dim.innerW}
          y1={yPos(v)}
          y2={yPos(v)}
          stroke={color.grid}
          strokeDasharray={chart.gridDash}
        />
      ))}

      {/* X-axis line */}
      <line
        x1={dim.margin.left}
        x2={dim.margin.left + dim.innerW}
        y1={yPos(0)}
        y2={yPos(0)}
        stroke={color.axis}
      />

      {/* X-axis ticks and labels */}
      {X_TICKS.map(({ v, label }) => (
        <g key={v}>
          <line
            x1={xPos(v)}
            x2={xPos(v)}
            y1={yPos(0)}
            y2={yPos(0) + chart.tickLength}
            stroke={color.axis}
          />
          <text
            x={xPos(v)}
            y={yPos(0) + chart.tickLabelOffset}
            textAnchor="middle"
            fill={color.textSecondary}
            fontSize={dim.axisSize}
            fontWeight={400}
            fontFamily={SANS}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {label}
          </text>
        </g>
      ))}

      {/* Y-axis labels */}
      {yTicks.map((v) => (
        <text
          key={v}
          x={dim.margin.left - 8}
          y={yPos(v) + 4}
          textAnchor="end"
          fill={color.textSecondary}
          fontSize={dim.axisSize}
          fontWeight={400}
          fontFamily={SANS}
          fontVariantNumeric="tabular-nums"
        >
          {v}%
        </text>
      ))}
    </g>
  );
};
