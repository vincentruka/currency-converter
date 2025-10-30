import { useExchangeRates } from '../hooks/useExchangeRates'

export function Home() {
  const { data, isLoading, error } = useExchangeRates()

  if (isLoading) {
    return <div>Loading exchange rates...</div>
  }

  if (error) {
    return <div>Error loading exchange rates: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div>
      <h1>Czech National Bank Exchange Rates</h1>
      <p>Date: {data.date} (Sequence #{data.sequenceNumber})</p>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Code</th>
            <th>Rate (CZK)</th>
          </tr>
        </thead>
        <tbody>
          {data.rates.map((rate) => (
            <tr key={rate.code}>
              <td>{rate.country}</td>
              <td>{rate.currency}</td>
              <td>{rate.amount}</td>
              <td>{rate.code}</td>
              <td>{rate.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

