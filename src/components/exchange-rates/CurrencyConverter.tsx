import type { ExchangeRate } from '../../services/cnbApi'
import { PLACEHOLDERS } from '../../config/constants'
import {
  ConverterWrapper,
  ConverterInner,
  ConverterContainer,
  InputGroup,
  Label,
  Input,
  CurrencyCode,
  Arrow,
  ResultGroup,
  Result,
} from './CurrencyConverter.styles'

interface CurrencyConverterProps {
  czkAmount: string
  currency: ExchangeRate | null
  onCzkAmountChange: (value: string) => void
  disabled?: boolean
}

export function CurrencyConverter({ czkAmount, currency, onCzkAmountChange, disabled }: CurrencyConverterProps) {
  // Calculate conversion: (czkAmount / rate) * amount
  const czkValue = parseFloat(czkAmount) || 0
  const convertedAmount = currency && czkValue > 0 ? (czkValue / currency.rate) * currency.amount : 0
  const isPlaceholder = !currency

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string, numbers, and one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onCzkAmountChange(value)
    }
  }

  return (
    <ConverterWrapper>
      <ConverterInner>
        <ConverterContainer>
          <InputGroup>
            <Label>CZK:</Label>
            <Input
              type="text"
              value={czkAmount}
              onChange={handleInputChange}
              placeholder="0"
              disabled={disabled}
            />
          </InputGroup>
          <Arrow>→</Arrow>
          <ResultGroup>
            <Result $isPlaceholder={isPlaceholder}>
              {isPlaceholder 
                ? 'Pick a currency in a table'
                : (convertedAmount > 0 ? convertedAmount.toFixed(4) : '0.0000')
              }
            </Result>
            <CurrencyCode $visible={!!currency}>
              {currency ? currency.code : PLACEHOLDERS.currencyCode}
            </CurrencyCode>
          </ResultGroup>
        </ConverterContainer>
      </ConverterInner>
    </ConverterWrapper>
  )
}

