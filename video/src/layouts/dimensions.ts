import type { Layout, ChartDimensions } from "../types";

export function getDimensions(
  layout: Layout,
  videoW: number,
  videoH: number,
): ChartDimensions {
  switch (layout) {
    case "landscape": {
      const margin = { top: 110, right: 50, bottom: 70, left: 70 };
      return {
        width: videoW,
        height: videoH,
        margin,
        innerW: videoW - margin.left - margin.right,
        innerH: videoH - margin.top - margin.bottom - 40,
        chartOffsetY: 0,
        titleSize: 42,
        subtitleSize: 24,
        yearSize: 130,
        axisSize: 22,
        statSize: 24,
        sourceSize: 18,
      };
    }
    case "square": {
      const margin = { top: 100, right: 40, bottom: 60, left: 60 };
      return {
        width: videoW,
        height: videoH,
        margin,
        innerW: videoW - margin.left - margin.right,
        innerH: videoH - margin.top - margin.bottom - 50,
        chartOffsetY: 0,
        titleSize: 38,
        subtitleSize: 22,
        yearSize: 110,
        axisSize: 20,
        statSize: 22,
        sourceSize: 16,
      };
    }
    case "vertical": {
      const margin = { top: 90, right: 40, bottom: 60, left: 60 };
      const chartH = videoH * 0.55;
      return {
        width: videoW,
        height: videoH,
        margin,
        innerW: videoW - margin.left - margin.right,
        innerH: chartH - margin.top - margin.bottom,
        chartOffsetY: videoH * 0.18,
        titleSize: 44,
        subtitleSize: 26,
        yearSize: 110,
        axisSize: 20,
        statSize: 26,
        sourceSize: 18,
      };
    }
  }
}
