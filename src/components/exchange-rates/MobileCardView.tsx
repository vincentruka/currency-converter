import type { ExchangeRate } from '../../../services/cnb-api'
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
      {rates.map((rate) => {
        const isSelected = selectedCurrency?.code === rate.code
        return (
          <MobileCard 
            key={rate.code} 
            onClick={() => onChangeCurrency(rate)}
            $isSelected={isSelected}
            role="button"
            tabIndex={0}
            aria-selected={isSelected}
            aria-label={`Select ${rate.code} - ${rate.currency}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onChangeCurrency(rate)
              }
            }}
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
        )
      })}
    </MobileContainer>
  )
}

