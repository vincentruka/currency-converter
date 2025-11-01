import { LoadingSpinner } from "../ui/LoadingSpinner";
import type { ExchangeRatesResponse } from "../../../services/cnb-api";
import styled from "styled-components";
import { COLORS } from "../../theme/colors";

const Message = styled.div`
  color: ${COLORS.text.primary};
  font-family: inherit;
  text-align: center;
  padding: 2rem;
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`;

interface StateResolverProps {
  isLoading: boolean;
  error: Error | null;
  data: ExchangeRatesResponse | undefined;
  children: (data: ExchangeRatesResponse) => React.ReactNode;
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

  return <>{children(data)}</>;
}
