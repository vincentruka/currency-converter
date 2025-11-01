import { useState } from 'react'
import type { ExchangeRate } from '../../services/cnb-api'

export interface UseCurrencyConverterReturn {
  czkAmount: string
  selectedCurrency: ExchangeRate | null
  setCzkAmount: (value: string) => void
  setSelectedCurrency: (currency: ExchangeRate | null) => void
}

/**
 * Custom hook to manage currency converter state
 * Handles CZK amount input and selected currency
 */
export function useCurrencyConverter(): UseCurrencyConverterReturn {
  const [czkAmount, setCzkAmount] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<ExchangeRate | null>(null)

  return {
    czkAmount,
    selectedCurrency,
    setCzkAmount,
    setSelectedCurrency,
  }
}
