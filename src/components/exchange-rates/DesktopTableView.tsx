import type { ExchangeRate } from '../../../services/cnb-api'
import {
  StyledTable,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  CodeCell,
  RateCell,
} from './DesktopTableView.styles'

interface DesktopTableViewProps {
  rates: ExchangeRate[]
  onChangeCurrency: (currency: ExchangeRate) => void
  selectedCurrency: ExchangeRate | null
}

export function DesktopTableView({ rates, onChangeCurrency, selectedCurrency }: DesktopTableViewProps) {
  return (
          <StyledTable aria-label="Exchange rates table">
      <TableHead>
        <tr>
          <TableHeader>Country</TableHeader>
          <TableHeader>Currency</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Code</TableHeader>
          <TableHeader>Rate (CZK)</TableHeader>
        </tr>
      </TableHead>
      <tbody>
        {rates.map((rate) => {
          const isSelected = selectedCurrency?.code === rate.code
          return (
            <TableRow 
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
              <TableCell>{rate.country}</TableCell>
              <TableCell>{rate.currency}</TableCell>
              <TableCell>{rate.amount}</TableCell>
              <CodeCell>{rate.code}</CodeCell>
              <RateCell>{rate.rate.toFixed(3)}</RateCell>
            </TableRow>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

