import { useState } from "react";
import { useExchangeRates } from "../hooks/use-exchange-rates";
import { PageHeader } from "../components/layout/PageHeader";
import { ExchangeRates } from "../components/exchange-rates/ExchangeRates";
import { StateResolver } from "../components/utils/StateResolver";
import { Paper } from "../components/ui/Paper";
import { CurrencyConverter } from "../components/exchange-rates/CurrencyConverter";
import type { ExchangeRate } from "../../services/cnb-api";
import {
  HeaderContainer,
  HeaderSection,
  ConverterSection,
} from "./Home.styles";

export function Home() {
  const { data, isLoading, error } = useExchangeRates();
  const [czkAmount, setCzkAmount] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<ExchangeRate | null>(
    null
  );

  return (
    <div>
      <HeaderContainer>
        <HeaderSection>
          <PageHeader
            title="Czech National Bank Exchange Rates"
            subtitle={
              data
                ? `Date: ${data.date} (Sequence #${data.sequenceNumber})`
                : ""
            }
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
              onChangeCurrency={setSelectedCurrency}
              selectedCurrency={selectedCurrency}
            />
          )}
        </StateResolver>
      </Paper>
    </div>
  );
}
