import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { ExchangeRates } from "../components/exchange-rates/ExchangeRates";
import { StateResolver } from "../components/utils/StateResolver";
import { Paper } from "../components/ui/Paper";
import { CurrencyConverter } from "../components/exchange-rates/CurrencyConverter";
import type { ExchangeRate } from "../../services/cnb-api";
import type { ExchangeRatesResponse } from "../../services/cnb-api";
import {
  HeaderContainer,
  HeaderSection,
  ConverterSection,
} from "./HomeView.styles";

interface HomeViewProps {
  data: ExchangeRatesResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function HomeView({
  data,
  isLoading,
  error,
}: HomeViewProps) {
  const [czkAmount, setCzkAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<ExchangeRate | null>(null);

  const subtitle = data
    ? `Date: ${data.date} (Sequence #${data.sequenceNumber})`
    : "";

  const handleCurrencyChange = (currency: ExchangeRate) => {
    setSelectedCurrency(currency);
  };
  return (
    <div>
      <HeaderContainer>
        <HeaderSection>
          <PageHeader
            title="Czech National Bank Exchange Rates"
            subtitle={subtitle}
          />
        </HeaderSection>
        <ConverterSection>
          <CurrencyConverter
            czkAmount={czkAmount}
            currency={selectedCurrency}
            onCzkAmountChange={setCzkAmount}
            disabled={isLoading || error !== null}
          />
        </ConverterSection>
      </HeaderContainer>

      <Paper>
        <StateResolver isLoading={isLoading} error={error} data={data}>
          {(data) => (
            <ExchangeRates
              rates={data.rates}
              onChangeCurrency={handleCurrencyChange}
              selectedCurrency={selectedCurrency}
            />
          )}
        </StateResolver>
      </Paper>
    </div>
  );
}