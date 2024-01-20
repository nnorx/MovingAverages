import { useContext } from "react";
import { viewContext } from "../App";
import nn from "./../assets/nn.ico";
import swap from "./../assets/swap.svg";

import styled from "styled-components";

const Container = styled.div`
  height: 42px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

const NLink = styled.a`
  height: 100%;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(256, 256, 256, 0.25);
  transition: all 0.25s ease-out;
  img {
    transition: all 0.15s ease-out;
  }
  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: rotate(180deg);
  }
`;

export default function Footer() {
  const { detailView, setDetailView } = useContext(viewContext);

  return (
    <Container>
      <NLink onClick={() => setDetailView(!detailView)}>
        <img
          src={swap}
          height="24px"
          width="24px"
          style={{
            color: "#fff",
            backgroundColor: "black",
            borderRadius: "50%",
            padding: 4,
          }}
        ></img>
      </NLink>

      <NLink
        href="https://nicknorcross.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={nn} height="24px" width="24px"></img>
      </NLink>
    </Container>
  );
}
