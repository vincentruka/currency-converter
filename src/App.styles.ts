import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.01);
  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3.5rem;
  text-align: center;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

