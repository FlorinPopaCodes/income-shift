import React from "react";
import { SANS } from "./TitleBlock";
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
          stroke="#e0d8d0"
          strokeDasharray="2,3"
        />
      ))}

      {/* X-axis line */}
      <line
        x1={dim.margin.left}
        x2={dim.margin.left + dim.innerW}
        y1={yPos(0)}
        y2={yPos(0)}
        stroke="#ccc1b7"
      />

      {/* X-axis ticks and labels */}
      {X_TICKS.map(({ v, label }) => (
        <g key={v}>
          <line
            x1={xPos(v)}
            x2={xPos(v)}
            y1={yPos(0)}
            y2={yPos(0) + 6}
            stroke="#ccc1b7"
          />
          <text
            x={xPos(v)}
            y={yPos(0) + 22}
            textAnchor="middle"
            fill="#66605c"
            fontSize={v >= 300_000 ? dim.axisSize - 4 : dim.axisSize}
            fontFamily={SANS}
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
          fill="#66605c"
          fontSize={dim.axisSize}
          fontFamily={SANS}
        >
          {v}%
        </text>
      ))}
    </g>
  );
};
