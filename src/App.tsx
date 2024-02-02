import React from "react";
import styled from "styled-components";

import Appbar from "./components/appbar";
import Chart from "./components/chart";
import Footer from "./components/Footer";
import Prints from "./components/prints";
import { ChartSettingsContext, SmaContext, ViewContext } from "./types/context";

const MainArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
`;

const ChartArea = styled.div<{ $rotate: boolean }>`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all var(--spring-duration) var(--spring-easing);
  user-select: none;

  ${({ $rotate }) => $rotate && "transform: translateX(-100%);"}
`;

const StatArea = styled.div<{ $rotate: boolean }>`
  transition: all var(--spring-duration) var(--spring-easing);
  position: absolute;
  inset: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: translateX(100%);
  transform-origin: right;
  padding: 16px 24px;
  gap: 8px;
  overflow-y: auto;

  ${({ $rotate }) => $rotate && "transform: translateX(0);"}
`;

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

export default function App() {
  const [sma, setSma] = React.useState(90);
  const smaCtx = { sma, setSma };

  const [detailView, setDetailView] = React.useState(false);
  const viewCtx = { detailView, setDetailView };

  const [chartSettings, setChartSettings] = React.useState({
    scaleToFit: true,
  });
  const chartSettingsCtx = { chartSettings, setChartSettings };

  return (
    <smaContext.Provider value={smaCtx}>
      <viewContext.Provider value={viewCtx}>
        <chartSettingsContext.Provider value={chartSettingsCtx}>
          <Appbar />
          <MainArea>
            <ChartArea $rotate={detailView}>
              <Chart />
            </ChartArea>

            <StatArea $rotate={detailView}>
              <Prints />
            </StatArea>
          </MainArea>
          <Footer />
        </chartSettingsContext.Provider>
      </viewContext.Provider>
    </smaContext.Provider>
  );
}
