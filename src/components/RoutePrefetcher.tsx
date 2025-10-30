import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { routes } from '../routes'

/**
 * Component that prefetches data when navigating to routes.
 * Listens to route changes and calls the route's prefetch function if defined.
 */
export function RoutePrefetcher() {
  const location = useLocation()
  const queryClient = useQueryClient()

  useEffect(() => {
    const path = location.pathname
    const normalizedPath = path === '' ? '/' : path
    const matchingRoute = routes.find((route) => route.path === normalizedPath)

    if (matchingRoute?.prefetch) {
      matchingRoute.prefetch(queryClient)
    }
  }, [location.pathname, queryClient])

  return null
}

