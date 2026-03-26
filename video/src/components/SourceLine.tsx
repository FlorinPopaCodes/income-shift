import React from "react";
import { SANS } from "./TitleBlock";
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
      left: 40,
      right: 40,
      fontSize: dim.sourceSize,
      color: "#9e9590",
      fontFamily: SANS,
      opacity,
    }}
  >
    Source: IPUMS CPS ASEC · Constant 2024 dollars (CPI-U-RS / C-CPI-U) · Adults
    18+ · Size-adjusted
  </div>
);
