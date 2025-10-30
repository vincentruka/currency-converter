import { useQuery } from '@tanstack/react-query'
import { fetchExchangeRates, type ExchangeRatesResponse } from '../services/cnbApi'

export const EXCHANGE_RATES_QUERY_KEY = ['exchangeRates'] as const

export function useExchangeRates() {
  return useQuery<ExchangeRatesResponse, Error>({
    queryKey: EXCHANGE_RATES_QUERY_KEY,
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

