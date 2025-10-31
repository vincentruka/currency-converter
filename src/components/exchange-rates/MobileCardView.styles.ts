import styled from 'styled-components'
import { COLORS } from '../../theme/colors'

export const MobileContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`

export const MobileCard = styled.div<{ $isSelected?: boolean }>`
  background-color: ${props => props.$isSelected 
    ? COLORS.accent.selected 
    : 'rgba(255, 255, 255, 0.95)'};
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-right: ${props => props.$isSelected ? `3px solid ${COLORS.accent.primary}` : '1px solid rgba(0, 0, 0, 0.08)'};
  cursor: pointer;
  transition: background-color 0.2s;
  &:active {
    background-color: ${props => props.$isSelected 
      ? COLORS.accent.selectedHover 
      : 'rgba(0, 0, 0, 0.05)'};
  }
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${props => props.$isSelected 
      ? COLORS.accent.selectedHover 
      : 'rgba(26, 26, 26, 0.9)'};
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-right: ${props => props.$isSelected ? `3px solid ${COLORS.accent.primary}` : '1px solid rgba(255, 255, 255, 0.08)'};
    &:active {
      background-color: ${props => props.$isSelected 
        ? COLORS.accent.selectedHoverDark 
        : 'rgba(255, 255, 255, 0.1)'};
    }
  }
`

export const MobileCardLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1.4;
  &:first-child {
    margin-bottom: 0.25rem;
  }
`

export const MobileCardTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

export const MobileCode = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  color: ${COLORS.text.primary};
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`

export const MobileCurrency = styled.span`
  font-size: 0.75rem;
  color: ${COLORS.text.muted};
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.mutedDark};
  }
`

export const MobileRate = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  text-align: right;
  color: ${COLORS.text.primary};
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`

export const MobileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: ${COLORS.text.muted};
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.mutedDark};
  }
`

export const MobileDetailItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  &::after {
    content: '•';
    margin-left: 0.75rem;
    color: ${COLORS.text.subtle};
  }
  &:last-child::after {
    display: none;
  }
  @media (prefers-color-scheme: dark) {
    &::after {
      color: ${COLORS.text.subtleDark};
    }
  }
`

export const MobileDetailValue = styled.span`
  font-weight: 500;
  color: ${COLORS.text.primary};
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`

