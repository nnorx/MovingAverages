import React from "react";
import {
  SmaContext,
  ViewContext,
  ChartSettingsContext,
} from "../types/context";

export const smaContext = React.createContext<SmaContext>({
  sma: 90,
  setSma: () => {},
});

export const viewContext = React.createContext<ViewContext>({
  detailView: true,
  setDetailView: () => {},
});

export const chartSettingsContext = React.createContext<ChartSettingsContext>({
  chartSettings: {
    scaleToFit: false,
  },
  setChartSettings: () => {},
});
