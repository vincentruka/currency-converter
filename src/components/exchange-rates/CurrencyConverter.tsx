import type { ExchangeRate } from '../../../services/cnb-api'
import { PLACEHOLDERS } from '../../config/constants'
import { convertCurrency, formatConvertedAmount } from '../../utils/currency-conversion'
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
  const convertedAmount = convertCurrency(czkAmount, currency)
  const formattedAmount = formatConvertedAmount(convertedAmount)
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
            <Label htmlFor="czk-amount-input">CZK:</Label>
            <Input
              id="czk-amount-input"
              type="text"
              value={czkAmount}
              onChange={handleInputChange}
              placeholder="0"
              disabled={disabled}
              aria-label="Amount in Czech crowns"
            />
          </InputGroup>
          <Arrow aria-hidden="true">→</Arrow>
          <ResultGroup>
            <Result 
              $isPlaceholder={isPlaceholder}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {isPlaceholder ? 'Pick a currency in a table' : formattedAmount}
            </Result>
            <CurrencyCode $visible={!!currency} aria-label="Currency code">
              {currency ? currency.code : PLACEHOLDERS.currencyCode}
            </CurrencyCode>
          </ResultGroup>
        </ConverterContainer>
      </ConverterInner>
    </ConverterWrapper>
  )
}

