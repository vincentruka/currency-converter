import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ServerStyleSheet } from 'styled-components'
import App from './App.tsx'
import { routes } from './routes.ts'
// Import CSS so it's processed during SSR
import './index.css'

export async function render(url: string) {
  // Create styled-components sheet for SSR
  const sheet = new ServerStyleSheet()

  // Create a new QueryClient for each request
  const queryClient = new QueryClient()

  // Find matching route and prefetch data
  const normalizedUrl = url === '' ? '/' : url
  const matchingRoute = routes.find((route) => route.path === normalizedUrl)
  
  if (matchingRoute?.prefetch) {
    await matchingRoute.prefetch(queryClient)
  }

  // Dehydrate the query cache
  const dehydratedState = dehydrate(queryClient)

  // Render the app to string with StaticRouter for SSR
  const html = renderToString(
    sheet.collectStyles(
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HydrationBoundary>
      </QueryClientProvider>
    )
  )

  const styleTags = sheet.getStyleTags()
  sheet.seal()

  return {
    html,
    dehydratedState,
    styleTags,
  }
}