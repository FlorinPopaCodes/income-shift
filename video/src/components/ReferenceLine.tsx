import React from "react";
import { SANS } from "./TitleBlock";
import { dollarToXFrac } from "../lib/scales";
import type { ChartDimensions } from "../types";

interface Props {
  dim: ChartDimensions;
  densities: number[];
  binEdges: number[];
  yMax: number;
  opacity: number;
  year: number;
  progress: number; // 0→1: line draws from left to right
}

export const ReferenceLine: React.FC<Props> = ({
  dim,
  densities,
  binEdges,
  yMax,
  opacity,
  year,
  progress,
}) => {
  const xPos = (d: number) => dim.margin.left + dollarToXFrac(d) * dim.innerW;
  const yPos = (v: number) => dim.margin.top + dim.innerH * (1 - v / yMax);

  const points = densities
    .map((v, i) => {
      const cx = (xPos(binEdges[i]) + xPos(binEdges[i + 1])) / 2;
      const cy = yPos(v);
      return `${cx.toFixed(1)},${cy.toFixed(1)}`;
    })
    .join(" ");

  // Clip rect width based on progress (draws line from left to right)
  const clipRight = dim.margin.left + progress * dim.innerW;

  // Label position: just past the right edge of the drawn line, at the curve height
  // Find the bin closest to the clip edge
  const lastVisibleBin = Math.min(
    Math.floor(progress * (densities.length - 1)),
    densities.length - 1,
  );
  const labelCx = (xPos(binEdges[lastVisibleBin]) + xPos(binEdges[lastVisibleBin + 1])) / 2;
  const labelCy = yPos(densities[lastVisibleBin]);

  // Once fully drawn, place label near the peak
  const peakIdx = densities.indexOf(Math.max(...densities));
  const peakX = (xPos(binEdges[peakIdx]) + xPos(binEdges[peakIdx + 1])) / 2;
  const peakY = yPos(densities[peakIdx]);

  const isComplete = progress >= 0.99;
  const finalLabelX = isComplete ? peakX : labelCx;
  const finalLabelY = isComplete ? peakY : labelCy;

  const labelW = 48;
  const labelH = 22;
  const badgeX = finalLabelX + 8;
  const badgeY = finalLabelY - labelH - 8;

  const clipId = "ref-line-clip";

  return (
    <g opacity={opacity}>
      <defs>
        <clipPath id={clipId}>
          <rect
            x={0}
            y={0}
            width={clipRight}
            height={dim.margin.top + dim.innerH + dim.margin.bottom}
          />
        </clipPath>
      </defs>

      {/* Animated line */}
      <polyline
        points={points}
        fill="none"
        stroke="#6b7b8d"
        strokeWidth={2.5}
        clipPath={`url(#${clipId})`}
      />

      {/* Label badge with connector line */}
      {progress > 0.05 && (
        <g>
          {/* Badge background */}
          <rect
            x={badgeX}
            y={badgeY}
            width={labelW}
            height={labelH}
            rx={3}
            fill="#fff1e5"
            stroke="#6b7b8d"
            strokeWidth={1.5}
          />
          {/* Badge text */}
          <text
            x={badgeX + labelW / 2}
            y={badgeY + labelH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#6b7b8d"
            fontSize={dim.axisSize - 4}
            fontFamily={SANS}
            fontWeight={600}
          >
            {year}
          </text>
        </g>
      )}
    </g>
  );
};
