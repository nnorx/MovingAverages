import styled from "styled-components";
import Chart from "./components/chart";
import Appbar from "./components/appbar";
import React from "react";
import Footer from "./components/Footer";

const ChartArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const smaContext = React.createContext<{
  sma: number;
  setSma: React.Dispatch<React.SetStateAction<number>>;
}>({ sma: 90, setSma: () => {} });

export default function App() {
  const [sma, setSma] = React.useState(90);
  const value = { sma, setSma };

  return (
    <smaContext.Provider value={value}>
      <Appbar />
      <ChartArea>
        <Chart />
      </ChartArea>
      <Footer />
    </smaContext.Provider>
  );
}
