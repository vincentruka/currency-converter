import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: auto;

  @media (max-width: 768px) {
    max-height: 70vh;
  }
`;

