import styled from 'styled-components'
import type { ExchangeRate } from '../../services/cnbApi'

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

const MobileCard = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 480px) {
    padding: 0.5rem;
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
`

const MobileCardLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.4;

  &:first-child {
    margin-bottom: 0.25rem;
  }
`

const MobileCardTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

const MobileCode = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  color: rgba(33, 53, 71, 0.87);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`

const MobileCurrency = styled.span`
  font-size: 0.75rem;
  color: rgba(33, 53, 71, 0.6);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
`

const MobileRate = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  text-align: right;
  color: rgba(33, 53, 71, 0.87);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`

const MobileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: rgba(33, 53, 71, 0.6);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
`

const MobileDetailItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &::after {
    content: '•';
    margin-left: 0.75rem;
    color: rgba(33, 53, 71, 0.3);
  }

  &:last-child::after {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    &::after {
      color: rgba(255, 255, 255, 0.3);
    }
  }
`

const MobileDetailValue = styled.span`
  font-weight: 500;
  color: rgba(33, 53, 71, 0.87);

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);
  }
`

interface MobileCardViewProps {
  rates: ExchangeRate[]
}

export function MobileCardView({ rates }: MobileCardViewProps) {
  return (
    <MobileContainer>
      {rates.map((rate) => (
        <MobileCard key={rate.code}>
          <MobileCardLine>
            <MobileCardTitle>
              <MobileCode>{rate.code}</MobileCode>
              <MobileCurrency>{rate.currency}</MobileCurrency>
            </MobileCardTitle>
            <MobileRate>{rate.rate.toFixed(3)}</MobileRate>
          </MobileCardLine>
          <MobileCardLine>
            <MobileDetails>
              <MobileDetailItem>
                <MobileDetailValue>{rate.country}</MobileDetailValue>
              </MobileDetailItem>
              <MobileDetailItem>
                <span>Amount:</span>
                <MobileDetailValue>{rate.amount}</MobileDetailValue>
              </MobileDetailItem>
            </MobileDetails>
          </MobileCardLine>
        </MobileCard>
      ))}
    </MobileContainer>
  )
}

