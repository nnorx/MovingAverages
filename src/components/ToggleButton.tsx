import React from "react";
import styled from "styled-components";
import { smaContext } from "../utils/context";

const Button = styled.button<{ $active: boolean }>`
  height: 100%;
  min-width: 48px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto, sans-serif;
  font-size: 0.875rem;
  padding: 11px;
  letter-spacing: 0.02857em;
  user-select: none;
  background-color: #8884d840;
  color: var(--secondary);
  border-style: none;
  line-height: 1.75;
  transition: all 0.15s ease-out;
  ${({ $active }) => $active && "background-color: rgb(90, 125, 124);"}

  &:hover {
    background-color: #8884d8;
    ${({ $active }) =>
      $active
        ? "background-color: rgba(90, 125, 124, 0.8);"
        : "background-color: rgba(43, 45, 66, 0.8);"}
  }

  &:active {
    background-color: #8884d840;
    ${({ $active }) =>
      $active
        ? "background-color: rgba(90, 125, 124, 0.6);"
        : "background-color: rgba(43, 45, 66, 0.6);"}
  }
`;

type Props = {
  value: number;
};

const ToggleButton = React.memo(function ToggleButton({ value }: Props) {
  const { sma, setSma } = React.useContext(smaContext);

  return (
    <Button
      $active={value === sma}
      onMouseDown={() => value !== sma && setSma(value)}
    >
      {value}
    </Button>
  );
});

export default ToggleButton;
