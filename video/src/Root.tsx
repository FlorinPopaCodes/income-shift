import React from "react";
import { Composition } from "remotion";
import { IncomeChart } from "./components/IncomeChart";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="landscape"
      component={IncomeChart}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ layout: "landscape" as const }}
    />
    <Composition
      id="square"
      component={IncomeChart}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{ layout: "square" as const }}
    />
    <Composition
      id="vertical"
      component={IncomeChart}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ layout: "vertical" as const }}
    />
  </>
);
