import styled from 'styled-components'
import { PageHeader } from '../components/layout/PageHeader'
import { Paper } from '../components/ui/Paper'

const Content = styled.div`
  color: rgba(33, 53, 71, 0.87);
  line-height: 1.6;
  text-align: left;
  font-family: inherit;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`

const Paragraph = styled.p`
  margin: 0 0 1rem 0;
  font-family: inherit;

  &:last-child {
    margin-bottom: 0;
  }
`

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

