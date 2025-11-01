import { useQuery } from '@tanstack/react-query'
import { fetchExchangeRates, type ExchangeRatesResponse } from '../../services/cnb-api'
import { QUERY_CONFIG } from '../config/query'

export const EXCHANGE_RATES_QUERY_KEY = ['exchangeRates'] as const

export function useExchangeRates() {
  return useQuery<ExchangeRatesResponse, Error>({
    queryKey: EXCHANGE_RATES_QUERY_KEY,
    queryFn: fetchExchangeRates,
    staleTime: QUERY_CONFIG.staleTime,
  })
}

