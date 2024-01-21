import { ChartSettings } from "./chart";

export type ChartSettingsContext = {
  chartSettings: ChartSettings;
  setChartSettings: React.Dispatch<React.SetStateAction<ChartSettings>>;
};

export type SmaContext = {
  sma: number;
  setSma: React.Dispatch<React.SetStateAction<number>>;
};

export type ViewContext = {
  detailView: boolean;
  setDetailView: React.Dispatch<React.SetStateAction<boolean>>;
};
