import type { ExchangeRate } from "../../services/cnb-api";
import { DesktopTableView } from "./DesktopTableView";
import { MobileCardView } from "./MobileCardView";
import { Wrapper } from "./ExchangeRates.styles";

interface ExchangeRatesProps {
  rates: ExchangeRate[];
  onChangeCurrency: (currency: ExchangeRate) => void;
  selectedCurrency: ExchangeRate | null;
}

export function ExchangeRates({ rates, onChangeCurrency, selectedCurrency }: ExchangeRatesProps) {
  return (
    <Wrapper>
      {/* note: desktop view is hidden on mobile; using css only, could be improved with a more sophisticated approach */}
      <DesktopTableView 
        rates={rates} 
        onChangeCurrency={onChangeCurrency}
        selectedCurrency={selectedCurrency}
      />
      <MobileCardView 
        rates={rates} 
        onChangeCurrency={onChangeCurrency}
        selectedCurrency={selectedCurrency}
      />
    </Wrapper>
  );
}

