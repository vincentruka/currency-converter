/// <reference types="jest" />
import { convertCurrency, formatConvertedAmount } from './currency-conversion'
import type { ExchangeRate } from '../../services/cnb-api'

describe('currency-conversion', () => {
  const mockCurrency: ExchangeRate = {
    country: 'USA',
    currency: 'US dollar',
    amount: 1,
    code: 'USD',
    rate: 25.5,
  }

  const mockCurrencyWithAmount: ExchangeRate = {
    country: 'Japan',
    currency: 'Yen',
    amount: 100,
    code: 'JPY',
    rate: 18.5,
  }

  describe('convertCurrency', () => {
    it('should return 0 when currency is null', () => {
      expect(convertCurrency('100', null)).toBe(0)
    })

    it('should return 0 for invalid inputs', () => {
      expect(convertCurrency('', mockCurrency)).toBe(0)
      expect(convertCurrency('invalid', mockCurrency)).toBe(0)
      expect(convertCurrency('0', mockCurrency)).toBe(0)
      expect(convertCurrency('-100', mockCurrency)).toBe(0)
    })

    it('should convert correctly for currency with amount 1', () => {
      // 100 CZK / 25.5 (rate) * 1 (amount) = 3.921568627...
      const result = convertCurrency('100', mockCurrency)
      expect(result).toBeCloseTo(3.921568627, 5)
    })

    it('should convert correctly for currency with amount > 1', () => {
      // 100 CZK / 18.5 (rate) * 100 (amount) = 540.5405405...
      const result = convertCurrency('100', mockCurrencyWithAmount)
      expect(result).toBeCloseTo(540.5405405, 5)
    })

    it('should handle decimal input correctly', () => {
      // 50.5 CZK / 25.5 * 1 = 1.980392156...
      const result = convertCurrency('50.5', mockCurrency)
      expect(result).toBeCloseTo(1.980392156, 5)
    })
  })

  describe('formatConvertedAmount', () => {
    it('should format positive amounts with 4 decimal places and round correctly', () => {
      expect(formatConvertedAmount(123.456789)).toBe('123.4568')
      expect(formatConvertedAmount(0.123456)).toBe('0.1235')
    })

    it('should format zero as 0.0000', () => {
      expect(formatConvertedAmount(0)).toBe('0.0000')
    })
  })
})

