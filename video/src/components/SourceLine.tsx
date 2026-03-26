import React from "react";
import { SANS, color } from "../lib/tokens";
import type { ChartDimensions, Layout } from "../types";

interface Props {
  dim: ChartDimensions;
  layout: Layout;
  opacity: number;
}

export const SourceLine: React.FC<Props> = ({ dim, layout, opacity }) => (
  <div
    style={{
      position: "absolute",
      bottom: layout === "vertical" ? 140 : layout === "square" ? 40 : 24,
      left: dim.margin.left,
      right: dim.margin.right,
      fontSize: dim.sourceSize,
      color: color.textTertiary,
      fontFamily: SANS,
      fontWeight: 400,
      opacity,
    }}
  >
    Source: IPUMS CPS · 2024 dollars · Adults 18+
  </div>
);
