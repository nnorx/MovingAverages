import { useContext, useState } from "react";
import styled from "styled-components";

import nn from "./../assets/nn.ico";
import swap from "./../assets/swap.svg";
import Switch from "./switch";
import { viewContext, chartSettingsContext } from "../utils/context";

const Container = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const Controls = styled.div`
  height: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
`;

const Retractable = styled.div<{ $retracted: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all var(--spring-duration) var(--spring-easing);

  ${({ $retracted }) => $retracted && "transform: translateY(100%);"}
`;

const NLink = styled.a<{ $active?: boolean }>`
  height: 100%;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(256, 256, 256, 0.25);
  transition: all var(--spring-duration) var(--spring-easing);
  img {
    transition: all 0.25s var(--spring-easing);
    @keyframes spin {
      0% {
        transform: rotateY(0deg);
      }
      25% {
        transform: rotateY(180deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }
    ${({ $active }) => $active && "animation: spin 0.25s ease-out alternate;"}
  }
`;

export default function Footer() {
  const { detailView, setDetailView } = useContext(viewContext);
  const [animate, setAnimate] = useState<boolean>(false);

  const { chartSettings, setChartSettings } = useContext(chartSettingsContext);

  return (
    <Container>
      <Controls>
        <NLink
          $active={animate}
          onMouseDown={() => {
            setAnimate(true);
            setDetailView(!detailView);
            setTimeout(() => setAnimate(false), 500);
          }}
        >
          <img
            src={swap}
            height="28px"
            width="28px"
            alt="swap view"
            style={{
              color: "#fff",
              backgroundColor: "black",
              borderRadius: "50%",
              padding: 4,
            }}
          ></img>
        </NLink>

        <Retractable $retracted={detailView}>
          <Switch
            label="Scale to fit"
            checked={chartSettings.scaleToFit}
            onChange={() =>
              setChartSettings({ scaleToFit: !chartSettings.scaleToFit })
            }
          />
        </Retractable>
      </Controls>

      <NLink
        href="https://nicknorcross.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={nn} height="26px" width="26px" alt="nicknorcross.com"></img>
      </NLink>
    </Container>
  );
}
