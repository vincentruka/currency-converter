/// <reference types="jest" />
import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Home'
import * as cnbApi from '../../services/cnb-api'
import type { ExchangeRatesResponse } from '../../services/cnb-api'

// Helper to create a test wrapper with providers
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    )
  }
}

describe('Home Integration - Currency Conversion Flow', () => {
  const mockExchangeRatesData: ExchangeRatesResponse = {
    date: '30 Oct 2025',
    sequenceNumber: 14,
    rates: [
      {
        country: 'USA',
        currency: 'US dollar',
        amount: 1,
        code: 'USD',
        rate: 25.5,
      },
    ],
  }

  beforeEach(() => {
    jest.spyOn(cnbApi, 'fetchExchangeRates').mockResolvedValue(mockExchangeRatesData)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should fetch exchange rates, display them, and convert currency', async () => {
    const user = userEvent.setup()

    render(<Home />, { wrapper: createWrapper() })

    // Wait for data to load
    await waitFor(() => {
      const usdElements = screen.getAllByText('USD')
      expect(usdElements.length).toBeGreaterThan(0)
    })

    // Step 1: Enter CZK amount
    const czkInput = screen.getByLabelText(/amount in czech crowns/i)
    await user.clear(czkInput)
    await user.type(czkInput, '100')

    // Step 2: Click on USD currency
    const usdCurrencies = screen.getAllByRole('button', { name: /select USD/i })
    await user.click(usdCurrencies[0])

    // Step 3: Verify conversion result is displayed
    // 100 CZK / 25.5 (USD rate) * 1 (amount) = 3.921568627...
    const result = screen.getByRole('status')
    expect(result.textContent).toContain('3.9216')
  })
})

