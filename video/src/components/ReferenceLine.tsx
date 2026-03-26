import React from "react";
import { SANS, color, chart } from "../lib/tokens";
import { dollarToXFrac } from "../lib/scales";
import type { ChartDimensions } from "../types";
import { lerp } from "../lib/interpolation";

interface Props {
  dim: ChartDimensions;
  densities: number[];
  binEdges: number[];
  yMax: number;
  opacity: number;
  year: number;
  progress: number;
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

  const clipRight = dim.margin.left + progress * dim.innerW;

  // Badge position: lerp from drawing edge to peak as progress increases
  const peakIdx = densities.indexOf(Math.max(...densities));
  const peakX = (xPos(binEdges[peakIdx]) + xPos(binEdges[peakIdx + 1])) / 2;
  const peakY = yPos(densities[peakIdx]);

  const lastVisibleBin = Math.min(
    Math.floor(progress * (densities.length - 1)),
    densities.length - 1,
  );
  const edgeX = (xPos(binEdges[lastVisibleBin]) + xPos(binEdges[lastVisibleBin + 1])) / 2;
  const edgeY = yPos(densities[lastVisibleBin]);

  // Smooth transition: once peak is drawn (~40%), start blending toward peak position
  const peakDrawn = Math.min(1, Math.max(0, (progress - 0.4) / 0.4));
  const badgeCenterX = lerp(edgeX, peakX, peakDrawn);
  const badgeCenterY = lerp(edgeY, peakY, peakDrawn);

  const labelW = 52;
  const labelH = 24;
  const badgeX = badgeCenterX + 8;
  const badgeY = badgeCenterY - labelH - 8;

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

      <polyline
        points={points}
        fill="none"
        stroke={color.refLine}
        strokeWidth={chart.refLineWidth}
        clipPath={`url(#${clipId})`}
      />

      {progress > 0.05 && (
        <g>
          <rect
            x={badgeX}
            y={badgeY}
            width={labelW}
            height={labelH}
            rx={3}
            fill={color.bg}
            stroke={color.refLine}
            strokeWidth={1.5}
          />
          <text
            x={badgeX + labelW / 2}
            y={badgeY + labelH / 2 + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color.refLine}
            fontSize={dim.axisSize - 2}
            fontFamily={SANS}
            fontWeight={600}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {year}
          </text>
        </g>
      )}
    </g>
  );
};
