import React from "react";
import { SERIF } from "./TitleBlock";
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
      color: "#ccc1b7",
      opacity: opacity * 0.5,
      lineHeight: 1,
      zIndex: 1,
    }}
  >
    {Math.round(year)}
  </div>
);
