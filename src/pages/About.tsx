import { PageHeader } from '../components/layout/PageHeader'
import { Paper } from '../components/ui/Paper'
import { Content, Paragraph } from './About.styles'

export function About() {
  return (
    <div>
      <PageHeader title="About" subtitle="More than just numbers" />
      <Paper>
        <Content>
          <Paragraph>
            This application displays daily exchange rates from the Czech National Bank (CNB). Select a currency and enter an amount to convert from Czech Koruna (CZK).
            Built with React, TypeScript, and server-side rendering. Uses React Query for data fetching and styled-components for styling.
          </Paragraph>
          <Paragraph>
            Even though it seems it's all about converting currencies, the real thing being converted here is my code quality into a job offer. 😄
          </Paragraph>
        </Content>
      </Paper>
    </div>
  )
}

