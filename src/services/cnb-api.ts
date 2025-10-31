export interface ExchangeRate {
  country: string
  currency: string
  amount: number
  code: string
  rate: number
}

export interface ExchangeRatesResponse {
  date: string
  sequenceNumber: number
  rates: ExchangeRate[]
}

const CNB_API_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'

export async function fetchExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(CNB_API_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.statusText}`)
  }

  const text = await response.text()
  return parseCNBData(text)
}

function parseCNBData(text: string): ExchangeRatesResponse {
  const lines = text.split('\n').filter((line) => line.trim())

  if (lines.length < 3) {
    throw new Error('Invalid CNB data format: insufficient lines')
  }

  // First line contains date and sequence number
  // Format: "30 Oct 2025 #14"
  const firstLine = lines[0]
  const dateMatch = firstLine.match(/^(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})/)
  const sequenceMatch = firstLine.match(/#(\d+)/)

  if (!dateMatch || !sequenceMatch) {
    throw new Error('Invalid CNB data format: missing date or sequence number')
  }

  const date = dateMatch[1]
  const sequenceNumber = parseInt(sequenceMatch[1], 10)

  if (isNaN(sequenceNumber)) {
    throw new Error('Invalid CNB data format: invalid sequence number')
  }

  // Second line contains headers: "Country|Currency|Amount|Code|Rate"
  // Skip the first two lines and parse data
  const dataLines = lines.slice(2)

  const rates: ExchangeRate[] = dataLines
    .map((line) => {
      const parts = line.split('|')
      if (parts.length !== 5) {
        return null
      }

      const amount = parseInt(parts[2].trim(), 10)
      const rate = parseFloat(parts[4].trim().replace(',', '.'))

      if (isNaN(amount) || isNaN(rate)) {
        return null
      }

      return {
        country: parts[0].trim(),
        currency: parts[1].trim(),
        amount,
        code: parts[3].trim(),
        rate,
      }
    })
    .filter((rate): rate is ExchangeRate => rate !== null)

  if (rates.length === 0) {
    throw new Error('Invalid CNB data format: no valid rates found')
  }

  return {
    date,
    sequenceNumber,
    rates,
  }
}

