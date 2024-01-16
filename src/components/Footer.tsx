import React from "react";
import nn from "./../assets/nn.ico";
import styled from "styled-components";

const Container = styled.div`
  height: 42px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 8px;
`;

const NLink = styled.a`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  background-color: rgba(256, 256, 256, 0.25);
`;

export default function Footer() {
  return (
    <Container>
      <NLink
        href="https://nicknorcross.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={nn} height="24px"></img>
      </NLink>
    </Container>
  );
}
