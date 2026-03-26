import React from "react";
import {
  loadFont as loadSerif,
  fontFamily as serifFontFamily,
} from "@remotion/google-fonts/SourceSerif4";
import {
  loadFont as loadSans,
  fontFamily as sansFontFamily,
} from "@remotion/google-fonts/SourceSans3";
import type { ChartDimensions, Layout } from "../types";

loadSerif();
loadSans();

export const SANS = `${sansFontFamily}, sans-serif`;
export const SERIF = `${serifFontFamily}, serif`;

interface Props {
  dim: ChartDimensions;
  layout: Layout;
  opacity: number;
}

export const TitleBlock: React.FC<Props> = ({ dim, layout, opacity }) => (
  <div
    style={{
      position: "absolute",
      top: layout === "vertical" ? 60 : 24,
      left: 40,
      right: 40,
      opacity,
    }}
  >
    <div
      style={{
        fontFamily: SERIF,
        fontWeight: 600,
        fontSize: dim.titleSize,
        lineHeight: 1.3,
        color: "#33302e",
      }}
    >
      Household income in 2024 dollars
    </div>
    <div
      style={{
        fontFamily: SANS,
        fontSize: dim.subtitleSize,
        color: "#66605c",
        fontWeight: 400,
        marginTop: 4,
      }}
    >
      % of adults · US income distribution 1971–2024
    </div>
  </div>
);
