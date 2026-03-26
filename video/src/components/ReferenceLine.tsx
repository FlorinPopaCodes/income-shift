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
  year: number;
  progress: number;
}

export const ReferenceLine: React.FC<Props> = ({
  dim,
  densities,
  binEdges,
  yMax,
  year,
  progress,
}) => {
  const xPos = (d: number) => dim.margin.left + dollarToXFrac(d) * dim.innerW;
  const yPos = (v: number) => dim.margin.top + dim.innerH * (1 - v / yMax);

  // Keep the overflow bar visually separate from the 1971 reference line.
  const lineBinCount = Math.max(1, densities.length - 1);
  const lineDensities = densities.slice(0, lineBinCount);
  const points = lineDensities
    .map((v, i) => {
      const cx = (xPos(binEdges[i]) + xPos(binEdges[i + 1])) / 2;
      const cy = yPos(v);
      return `${cx.toFixed(1)},${cy.toFixed(1)}`;
    })
    .concat(
      `${xPos(binEdges[lineBinCount]).toFixed(1)},${yPos(lineDensities[lineBinCount - 1]).toFixed(1)}`,
    )
    .join(" ");

  const clipRight = dim.margin.left + progress * dim.innerW;

  // Badge position: right shoulder of the curve (where density drops to ~50% of peak
  // on the descending side) — clears the year watermark in the upper-left.
  const peakIdx = lineDensities.indexOf(Math.max(...lineDensities));
  const peakDensity = lineDensities[peakIdx];
  let shoulderIdx = peakIdx;
  for (let i = peakIdx + 1; i < lineDensities.length; i++) {
    if (lineDensities[i] < peakDensity * 0.5) {
      shoulderIdx = i;
      break;
    }
  }
  const shoulderX =
    (xPos(binEdges[shoulderIdx]) + xPos(binEdges[shoulderIdx + 1])) / 2;
  const shoulderY = yPos(lineDensities[shoulderIdx]);

  const lastVisibleBin = Math.min(
    Math.floor(progress * (lineDensities.length - 1)),
    lineDensities.length - 1,
  );
  const edgeX = (xPos(binEdges[lastVisibleBin]) + xPos(binEdges[lastVisibleBin + 1])) / 2;
  const edgeY = yPos(lineDensities[lastVisibleBin]);

  // Smooth transition: once shoulder bin is drawn, start blending toward shoulder
  const shoulderDrawn = Math.min(
    1,
    Math.max(0, (progress - 0.4) / 0.4),
  );
  const badgeCenterX = lerp(edgeX, shoulderX, shoulderDrawn);
  const badgeCenterY = lerp(edgeY, shoulderY, shoulderDrawn);

  const labelW = 52;
  const labelH = 24;
  const badgeX = badgeCenterX + 8;
  const badgeY = badgeCenterY - labelH - 8;

  const clipId = "ref-line-clip";

  return (
    <g>
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
