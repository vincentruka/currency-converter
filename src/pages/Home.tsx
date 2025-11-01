import { useExchangeRates } from "../hooks/use-exchange-rates";
import { HomeView } from "./HomeView";

export function Home() {
  const { data, isLoading, error } = useExchangeRates();

  return (
    <HomeView
      data={data}
      isLoading={isLoading}
      error={error}
    />
  );
}