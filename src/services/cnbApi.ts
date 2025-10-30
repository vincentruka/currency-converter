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

  // First line contains date and sequence number
  // Format: "16.01.2025 #14"
  const firstLine = lines[0]
  const dateMatch = firstLine.match(/^(\d{2}\.\d{2}\.\d{4})/)
  const sequenceMatch = firstLine.match(/#(\d+)/)

  const date = dateMatch ? dateMatch[1] : ''
  const sequenceNumber = sequenceMatch ? parseInt(sequenceMatch[1], 10) : 0

  // Second line contains headers: "Country|Currency|Amount|Code|Rate"
  // Skip the first two lines and parse data
  const dataLines = lines.slice(2)

  const rates: ExchangeRate[] = dataLines
    .map((line) => {
      const parts = line.split('|')
      if (parts.length !== 5) {
        return null
      }

      return {
        country: parts[0].trim(),
        currency: parts[1].trim(),
        amount: parseInt(parts[2].trim(), 10),
        code: parts[3].trim(),
        rate: parseFloat(parts[4].trim().replace(',', '.')),
      }
    })
    .filter((rate): rate is ExchangeRate => rate !== null)

  return {
    date,
    sequenceNumber,
    rates,
  }
}

