import styled from 'styled-components'

const Box = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: inherit;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
  }

  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const Title = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2em;
  line-height: 1.2;
  font-weight: 600;
  font-family: inherit;

  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-bottom: 0.375rem;
  }
`

const Subtitle = styled.p`
  margin: 0;
  color: rgba(33, 53, 71, 0.7);
  font-size: 1.1em;
  font-family: inherit;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.7);
  }
`

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Box>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Box>
  )
}

