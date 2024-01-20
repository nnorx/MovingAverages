import { useEffect, useState } from "react";
import styled from "styled-components";

import { FngPoint } from "../types/apiResonse";
import { getColor } from "../utils/colors";
import { getClassification } from "../utils/classification";

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const SmaStat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  aspect-ratio: 1;
  outline: 1px solid #d3d3d3;
  border-radius: 4px;
  position: relative;
`;

type Props = {
  sma: number;
  data: FngPoint[];
};

export default function Print({ sma, data }: Props) {
  const [printData, setPrintData] = useState<number>();

  useEffect(() => {
    if (!data.length) return;

    const points = data
      .slice(data.length - sma, data.length)
      .map((point) => point.value);

    const printData = points.reduce((acc, cur) => acc + Number(cur), 0) / sma;

    setPrintData(+printData.toFixed(2));
  }, [sma, data, setPrintData]);

  return (
    <Container>
      <SmaStat>
        <div
          style={{
            position: "absolute",
            top: "4px",
            left: "6px",
            fontSize: "16px",
          }}
        >
          SMA
        </div>
        <div style={{ fontSize: "24px" }}>{sma}</div>
      </SmaStat>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              outline: "1px solid #d3d3d3",
              padding: "6px",
              borderRadius: "4px",
              minHeight: "34px",
            }}
          >
            Value: {printData}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: getColor(printData || 0),
          }}
        >
          <div
            style={{
              outline: printData ? "1px solid #d3d3d3" : undefined,
              padding: "6px",
              borderRadius: "4px",
              minHeight: "34px",
            }}
          >
            {printData && " " + getClassification(printData)}
          </div>
        </div>
      </div>
    </Container>
  );
}
