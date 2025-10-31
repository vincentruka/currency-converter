import type { ExchangeRate } from '../../services/cnbApi'
import { DesktopTableView } from './DesktopTableView'
import { MobileCardView } from './MobileCardView'

interface ExchangeRatesTableProps {
  rates: ExchangeRate[]
}

export function ExchangeRatesTable({ rates }: ExchangeRatesTableProps) {
  return (
    <>
      {/* note: desktop view is hidden on mobile; using css only, could be improved with a more sophisticated approach */}
      <DesktopTableView rates={rates} />
      <MobileCardView rates={rates} />
    </>
  )
}

