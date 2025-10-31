import styled from 'styled-components'
import { COLORS } from '../../theme/colors'

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: inherit;
  @media (max-width: 768px) {
    display: none;
  }
`

export const TableHead = styled.thead`
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  @media (prefers-color-scheme: dark) {
    background-color: rgba(26, 26, 26, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`

export const TableHeader = styled.th`
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: ${COLORS.text.primary};
  font-family: inherit;
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`

export const TableRow = styled.tr<{ $isSelected?: boolean }>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-right: ${props => props.$isSelected ? `3px solid ${COLORS.accent.primary}` : 'none'};
  background-color: ${props => props.$isSelected ? COLORS.accent.selected : 'transparent'};
  transition: background-color 0.2s;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.$isSelected ? COLORS.accent.selectedHover : 'rgba(0, 0, 0, 0.02)'};
  }
  &:last-child {
    border-bottom: none;
  }
  @media (prefers-color-scheme: dark) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background-color: ${props => props.$isSelected ? COLORS.accent.selectedHover : 'transparent'};
    &:hover {
      background-color: ${props => props.$isSelected ? COLORS.accent.selectedHoverDark : 'rgba(255, 255, 255, 0.05)'};
    }
  }
`

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: ${COLORS.text.primary};
  font-family: inherit;
  @media (prefers-color-scheme: dark) {
    color: ${COLORS.text.primaryDark};
  }
`

export const CodeCell = styled(TableCell)`
  font-weight: 600;
  font-family: 'Courier New', monospace;
`

export const RateCell = styled(TableCell)`
  text-align: right;
  font-weight: 500;
`

