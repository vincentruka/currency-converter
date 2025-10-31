import type { ExchangeRate } from '../../services/cnbApi'
import {
  MobileContainer,
  MobileCard,
  MobileCardLine,
  MobileCardTitle,
  MobileCode,
  MobileCurrency,
  MobileRate,
  MobileDetails,
  MobileDetailItem,
  MobileDetailValue,
} from './MobileCardView.styles'

interface MobileCardViewProps {
  rates: ExchangeRate[]
  onChangeCurrency: (currency: ExchangeRate) => void
  selectedCurrency: ExchangeRate | null
}

export function MobileCardView({ rates, onChangeCurrency, selectedCurrency }: MobileCardViewProps) {
  return (
    <MobileContainer>
      {rates.map((rate) => (
        <MobileCard 
          key={rate.code} 
          onClick={() => onChangeCurrency(rate)}
          $isSelected={selectedCurrency?.code === rate.code}
        >
          <MobileCardLine>
            <MobileCardTitle>
              <MobileCode>{rate.code}</MobileCode>
              <MobileCurrency>{rate.currency}</MobileCurrency>
            </MobileCardTitle>
            <MobileRate>{rate.rate.toFixed(3)}</MobileRate>
          </MobileCardLine>
          <MobileCardLine>
            <MobileDetails>
              <MobileDetailItem>
                <MobileDetailValue>{rate.country}</MobileDetailValue>
              </MobileDetailItem>
              <MobileDetailItem>
                <span>Amount:</span>
                <MobileDetailValue>{rate.amount}</MobileDetailValue>
              </MobileDetailItem>
            </MobileDetails>
          </MobileCardLine>
        </MobileCard>
      ))}
    </MobileContainer>
  )
}

