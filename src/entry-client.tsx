import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider, HydrationBoundary, type DehydratedState } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { QUERY_CONFIG } from './config/query'

// Create a new QueryClient instance for the client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.staleTime,
    },
  },
})

// Get the dehydrated state from the HTML
const dehydratedState = (window as Window & { __REACT_QUERY_STATE__?: DehydratedState }).__REACT_QUERY_STATE__

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState || undefined}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HydrationBoundary>
    </QueryClientProvider>
  </StrictMode>
)