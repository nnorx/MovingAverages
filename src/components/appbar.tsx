import dayjs from "dayjs";
import styled from "styled-components";
import ToggleButton from "./ToggleButton";
import { viewContext } from "../App";
import { useContext } from "react";

const Container = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const Interchangable = styled.div`
  height: 100%;
  min-width: 55%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const ToggleButtonGroup = styled.div<{ $rotate: boolean }>`
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d3d3d3;
  height: 35px;
  border-radius: 4px;
  overflow: auto;

  button:not(:first-of-type) {
    border-left: 1px solid #d3d3d3;
  }

  transition: all 0.25s ease-out;

  ${({ $rotate }) =>
    $rotate && "transform: translateY(-200%); user-select: none;"}
`;

const Prints = styled.div<{ $rotate: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  padding: 0 8px;
  transition: all 0.25s ease-out;
  transform: translateY(200%);

  ${({ $rotate }) => $rotate && "transform: translateY(0); user-select: none; "}
`;

const VALUES = [7, 14, 30, 90, 180, 365];

export default function Appbar() {
  const { detailView } = useContext(viewContext);

  return (
    <Container>
      <span
        style={{
          flex: "1 0 auto",
          textWrap: "balance",
          minWidth: "150px",
          maxWidth: "45%",
          paddingRight: "8px",
        }}
      >
        Fear and Greed Moving Averages
      </span>
      <Interchangable>
        <ToggleButtonGroup $rotate={detailView}>
          {VALUES.map((value) => (
            <ToggleButton key={value} value={value} />
          ))}
        </ToggleButtonGroup>

        <Prints $rotate={detailView}>
          Prints {dayjs().format("MM/DD/YYYY")}
        </Prints>
      </Interchangable>
    </Container>
  );
}
