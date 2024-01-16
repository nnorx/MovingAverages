import styled from "styled-components";
import ToggleButton from "./ToggleButton";

const Container = styled.div`
  height: 64px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const ToggleButtonGroup = styled.div`
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
`;

const VALUES = [7, 14, 30, 90, 180, 365];

export default function Appbar() {
  return (
    <Container>
      <span style={{ paddingRight: "8px" }}>
        Fear and Greed Moving Averages
      </span>
      <ToggleButtonGroup>
        {VALUES.map((value) => (
          <ToggleButton key={value} value={value} />
        ))}
      </ToggleButtonGroup>
    </Container>
  );
}
