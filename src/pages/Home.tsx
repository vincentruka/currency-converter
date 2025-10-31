import { useExchangeRates } from "../hooks/useExchangeRates";
import { PageHeader } from "../components/layout/PageHeader";
import { ExchangeRatesTable } from "../components/ExchangeRatesTable";
import { StateResolver } from "../components/utils/StateResolver";
import { Paper } from "../components/ui/Paper";

export function Home() {
  const { data, isLoading, error } = useExchangeRates();

  return (
    <div>
      <PageHeader
        title="Czech National Bank Exchange Rates"
        subtitle={
          data ? `Date: ${data.date} (Sequence #${data.sequenceNumber})` : ""
        }
      />
      <Paper>
        <StateResolver isLoading={isLoading} error={error} data={data}>
          <ExchangeRatesTable rates={data!.rates} />
        </StateResolver>
      </Paper>
    </div>
  );
}
