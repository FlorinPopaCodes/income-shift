import React from "react";
import { SANS, SERIF, color } from "../lib/tokens";
import type { ChartDimensions, Layout } from "../types";

interface Props {
  dim: ChartDimensions;
  layout: Layout;
}

export const TitleBlock: React.FC<Props> = ({ dim, layout }) => (
  <div
    style={{
      position: "absolute",
      top: layout === "vertical" ? 60 : 24,
      left: dim.margin.left,
      right: dim.margin.right,
    }}
  >
    <div
      style={{
        fontFamily: SERIF,
        fontWeight: 600,
        fontSize: dim.titleSize,
        lineHeight: 1.3,
        color: color.textPrimary,
      }}
    >
      Household income in 2024 dollars
    </div>
    <div
      style={{
        fontFamily: SANS,
        fontSize: dim.subtitleSize,
        color: color.textSecondary,
        fontWeight: 400,
        marginTop: 4,
      }}
    >
      % of adults · US income distribution 1971–2024
    </div>
  </div>
);
