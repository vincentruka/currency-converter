import styled from 'styled-components'
import { COLORS } from '../theme/colors'

export const Content = styled.div`
  color: ${COLORS.text.primary};
  line-height: 1.6;
  text-align: left;
  font-family: inherit;
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`

export const Paragraph = styled.p`
  margin: 0 0 1rem 0;
  font-family: inherit;
  &:last-child {
    margin-bottom: 0;
  }
`

