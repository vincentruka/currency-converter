import styled from 'styled-components'
import type { ExchangeRate } from '../services/cnbApi'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: inherit;
`

const TableHead = styled.thead`
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: rgba(33, 53, 71, 0.87);
  font-family: inherit;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
`

const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: rgba(33, 53, 71, 0.87);
  font-family: inherit;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`

const CodeCell = styled(TableCell)`
  font-weight: 600;
  font-family: 'Courier New', monospace;
`

const RateCell = styled(TableCell)`
  text-align: right;
  font-weight: 500;
`

interface ExchangeRatesTableProps {
  rates: ExchangeRate[]
}

export function ExchangeRatesTable({ rates }: ExchangeRatesTableProps) {
  return (
      <StyledTable>
        <TableHead>
          <tr>
            <TableHeader>Country</TableHeader>
            <TableHeader>Currency</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Code</TableHeader>
            <TableHeader>Rate (CZK)</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {rates.map((rate) => (
            <TableRow key={rate.code}>
              <TableCell>{rate.country}</TableCell>
              <TableCell>{rate.currency}</TableCell>
              <TableCell>{rate.amount}</TableCell>
              <CodeCell>{rate.code}</CodeCell>
              <RateCell>{rate.rate.toFixed(3)}</RateCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
  )
}

