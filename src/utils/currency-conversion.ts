import type { ExchangeRate } from '../../services/cnb-api'

/**
 * Converts CZK amount to foreign currency
 * @param czkAmount - Amount in CZK (as string to handle empty input)
 * @param currency - Exchange rate data containing rate and amount
 * @returns Converted amount, or 0 if invalid input or no currency selected
 */
export function convertCurrency(
  czkAmount: string,
  currency: ExchangeRate | null
): number {
  if (!currency) {
    return 0
  }

  const czkValue = parseFloat(czkAmount)
  if (!czkValue || czkValue <= 0) {
    return 0
  }

  // Formula: (czkAmount / rate) * amount
  return (czkValue / currency.rate) * currency.amount
}

/**
 * Formats converted amount for display
 * @param convertedAmount - The converted amount
 * @returns Formatted string with 4 decimal places, or '0.0000' if amount is 0
 */
export function formatConvertedAmount(convertedAmount: number): string {
  return convertedAmount > 0 ? convertedAmount.toFixed(4) : '0.0000'
}
