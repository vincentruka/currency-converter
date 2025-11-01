import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const HeaderSection = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ConverterSection = styled.div`
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

