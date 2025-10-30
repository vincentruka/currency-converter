import type { QueryClient } from '@tanstack/react-query'
import { prefetchIfStale } from './utils/prefetchIfStale'

/**
 * Route prefetch function type.
 * Called during SSR to prefetch data for a specific route.
 */
export type RoutePrefetch = (queryClient: QueryClient) => Promise<void>

/**
 * Route configuration for SSR prefetching.
 * Each route can optionally define a prefetch function that runs before rendering.
 */
export interface RouteConfig {
  path: string
  prefetch?: RoutePrefetch
}

/**
 * Route configuration array.
 * Add new routes here with their prefetch functions when needed.
 * 
 * Using dynamic imports in prefetch functions ensures each route only loads
 * the dependencies it needs, avoiding unnecessary code execution for other routes.
 */
export const routes: RouteConfig[] = [
  {
    path: '/',
    prefetch: async (queryClient) => {
      // Dynamic imports: only load when this route's prefetch runs
      const { EXCHANGE_RATES_QUERY_KEY } = await import('./hooks/useExchangeRates')
      const { fetchExchangeRates } = await import('./services/cnbApi')
      
      await prefetchIfStale(queryClient, EXCHANGE_RATES_QUERY_KEY, fetchExchangeRates)
    },
  },
  {
    path: '/about',
    // No prefetch needed for about page
  },
]

