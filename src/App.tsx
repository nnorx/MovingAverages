import React, { useState } from "react";
import ResponsiveAppBar from "./components/appbar";
import Chart from "./components/chart";

export const smaContext = React.createContext({
  sma: 99,
  setSma: (sma: number) => {},
});

export default function App() {
  const [sma, setSma] = useState(90);
  const value = { sma, setSma };

  console.log("rendering app", sma);

  return (
    <smaContext.Provider value={value}>
      <ResponsiveAppBar />
      <div
        id="container"
        style={{ height: "100%", background: "#2B2D42", overflow: "hidden" }}
      >
        <Chart />
      </div>
    </smaContext.Provider>
  );
}
