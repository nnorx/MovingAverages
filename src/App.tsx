import React from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Appbar from "./components/appbar";
import Chart from "./components/chart";
import Footer from "./components/Footer";
import Prints from "./components/prints";
import { chartSettingsContext, smaContext, viewContext } from "./utils/context";

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
  align-items: center;
  transform: translateX(100%);
  transform-origin: right;
  padding: 16px 24px;
  gap: 16px;
  overflow-y: auto;

  ${({ $rotate }) => $rotate && "transform: translateX(0);"}
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [sma, setSma] = React.useState(90);
  const smaCtx = { sma, setSma };

  const [detailView, setDetailView] = React.useState(false);
  const viewCtx = { detailView, setDetailView };

  const [chartSettings, setChartSettings] = React.useState({
    scaleToFit: false,
  });
  const chartSettingsCtx = { chartSettings, setChartSettings };

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
