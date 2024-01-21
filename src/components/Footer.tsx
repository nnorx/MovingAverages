import { useContext, useState } from "react";
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

const NLink = styled.a<{ $active?: boolean }>`
  height: 100%;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(256, 256, 256, 0.25);
  transition: all 0.25s ease-out;
  img {
    transition: all 0.25s ease-out;
    @keyframes spin {
      0% {
        transform: rotateY(0deg);
      }
      50% {
        transform: rotateY(180deg) scale(0.9);
      }
      100% {
        transform: rotateY(0deg);
      }
    }
    ${({ $active }) => $active && "animation: spin 0.25s ease-out alternate;"}
  }
`;

export default function Footer() {
  const { detailView, setDetailView } = useContext(viewContext);
  const [animate, setAnimate] = useState<boolean>(false);

  return (
    <Container>
      <NLink
        $active={animate}
        onClick={() => {
          setAnimate(true);
          setDetailView(!detailView);
          setTimeout(() => setAnimate(false), 500);
        }}
      >
        <img
          src={swap}
          height="24px"
          width="24px"
          alt="swap view"
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
        <img src={nn} height="24px" width="24px" alt="nicknorcross.com"></img>
      </NLink>
    </Container>
  );
}
