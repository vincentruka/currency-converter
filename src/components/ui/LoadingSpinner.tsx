import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(33, 53, 71, 0.8);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.1);
    border-top-color: rgba(255, 255, 255, 0.8);
  }
`;

const Message = styled.div`
  color: rgba(33, 53, 71, 0.7);
  font-family: inherit;
  font-size: 1rem;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export function LoadingSpinner({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <SpinnerContainer>
      <Spinner />
      <Message>{message}</Message>
    </SpinnerContainer>
  );
}
