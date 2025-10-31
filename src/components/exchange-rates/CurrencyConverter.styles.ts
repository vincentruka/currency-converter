import styled from "styled-components";
import { COLORS } from "../../theme/colors";

export const ConverterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: stretch;
  }
`;

export const ConverterInner = styled.div`
  max-width: 600px;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ConverterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
    gap: 0.375rem;
  }
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.text.primary};
  white-space: nowrap;
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`;

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.2;
  font-family: inherit;
  background-color: rgba(255, 255, 255, 0.95);
  color: ${COLORS.text.primary};
  transition: border-color 0.2s;
  flex: 1;
  min-width: 120px;
  &:focus {
    outline: none;
    border-color: rgba(33, 53, 71, 0.5);
  }
  @media (max-width: 768px) {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    min-width: 0;
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${COLORS.text.primaryDark};
    border-color: rgba(255, 255, 255, 0.2);
    &:focus {
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const CurrencyCode = styled.span<{ $visible?: boolean }>`
  font-weight: 600;
  font-family: "Courier New", monospace;
  font-size: 0.875rem;
  color: ${COLORS.text.primary};
  white-space: nowrap;
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`;

export const Arrow = styled.span`
  font-size: 1.25rem;
  color: ${COLORS.text.secondary};
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.secondaryDark};
  }
`;

export const ResultGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
    gap: 0.375rem;
  }
`;

export const Result = styled.div<{ $isPlaceholder?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  flex: 0 0 200px;
  min-width: 200px;
  font-size: ${(props) => (props.$isPlaceholder ? "0.875rem" : "1rem")};
  font-weight: ${(props) => (props.$isPlaceholder ? "500" : "600")};
  background-color: ${(props) =>
    props.$isPlaceholder ? "rgba(238, 238, 238, 0.4)" : "rgba(100, 108, 255, 0.04)"};
  color: ${(props) => (props.$isPlaceholder ? COLORS.text.placeholder : COLORS.text.primary)};
  text-align: ${(props) => (props.$isPlaceholder ? "left" : "right")};
  justify-content: ${(props) => (props.$isPlaceholder ? "flex-start" : "flex-end")};
  font-family: ${(props) => (props.$isPlaceholder ? "inherit" : "'Courier New', monospace")};
  font-style: ${(props) => (props.$isPlaceholder ? "italic" : "normal")};
  @media (max-width: 768px) {
    padding: 0.375rem 0.5rem;
    font-size: ${(props) => (props.$isPlaceholder ? "0.75rem" : "0.875rem")};
    flex: 1;
    min-width: 0;
  }
  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.08);
    color: ${(props) => (props.$isPlaceholder ? COLORS.text.placeholderDark : COLORS.text.primaryDark)};
    border-color: rgba(255, 255, 255, 0.1);
  }
`;
