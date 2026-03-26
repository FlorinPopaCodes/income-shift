import React from "react";
import { SERIF, color, opacity as op } from "../lib/tokens";
import type { ChartDimensions } from "../types";

interface Props {
  dim: ChartDimensions;
  year: number;
  opacity: number;
}

export const YearWatermark: React.FC<Props> = ({ dim, year, opacity }) => (
  <div
    style={{
      position: "absolute",
      top: dim.chartOffsetY + dim.margin.top + 8,
      left: dim.margin.left + 10,
      fontFamily: SERIF,
      fontSize: dim.yearSize,
      fontWeight: 700,
      color: color.watermark,
      opacity: opacity * op.watermark,
      lineHeight: 1,
      zIndex: 1,
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {Math.round(year)}
  </div>
);
