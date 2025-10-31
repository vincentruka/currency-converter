import type { QueryClient, QueryKey, QueryFunction } from '@tanstack/react-query'

/**
 * Prefetch a query only if it's missing from cache or stale.
 * This prevents unnecessary network requests when data is already fresh.
 *
 * @param queryClient - The QueryClient instance
 * @param queryKey - The query key to check/prefetch
 * @param queryFn - The function to fetch the data
 */
export async function prefetchIfStale<TData = unknown>(
  queryClient: QueryClient,
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>
): Promise<void> {
  // Check cache first - only prefetch if data is missing or stale
  const query = queryClient.getQueryCache().find({
    queryKey,
  })

  if (!query || query.isStale()) {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
    })
  }
}

