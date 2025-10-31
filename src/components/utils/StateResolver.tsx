import { LoadingSpinner } from "../ui/LoadingSpinner";
import type { ExchangeRatesResponse } from "../../services/cnbApi";
import styled from "styled-components";

const Message = styled.div`
  color: rgba(33, 53, 71, 0.87);
  font-family: inherit;
  text-align: center;
  padding: 2rem;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`;

interface StateResolverProps {
  isLoading: boolean;
  error: Error | null;
  data: ExchangeRatesResponse | undefined;
  children: React.ReactNode;
}

export function StateResolver({
  isLoading,
  error,
  data,
  children,
}: StateResolverProps) {
  if (isLoading) {
    return <LoadingSpinner message="Loading exchange rates..." />;
  }

  if (error) {
    return <Message>Error loading exchange rates: {error.message}</Message>;
  }

  if (!data) {
    return <Message>No data available</Message>;
  }

  return <>{children}</>;
}
