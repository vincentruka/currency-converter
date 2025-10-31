import { PageHeader } from '../components/layout/PageHeader'
import { Paper } from '../components/ui/Paper'
import { Content, Paragraph } from './About.styles'

export function About() {
  return (
    <div>
      <PageHeader title="About" />
      <Paper>
        <Content>
          <Paragraph>
            This application displays daily exchange rates from the Czech National Bank (CNB). It fetches current rates from the CNB API and presents them in a table showing country, currency, amount, currency code, and the exchange rate against the Czech Koruna (CZK).
          </Paragraph>
          <Paragraph>
            Built with React, TypeScript, and Vite, using React Query for data fetching and caching. Styled with styled-components and includes server-side rendering (SSR) with Express for performance and SEO. The UI adapts to light and dark color schemes.
          </Paragraph>
          <Paragraph>
            This application was created as part of a technical test for a job interview.
          </Paragraph>
        </Content>
      </Paper>
    </div>
  )
}

