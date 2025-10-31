import styled from 'styled-components'

export const Paper = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.15),
    0px 4px 5px 0px rgba(0, 0, 0, 0.1),
    0px 1px 10px 0px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0px 4px 5px -1px rgba(0, 0, 0, 0.15),
      0px 6px 10px 0px rgba(0, 0, 0, 0.1),
      0px 1px 18px 0px rgba(0, 0, 0, 0.08);
  }

  @media (prefers-color-scheme: dark) {
    background-color: rgba(26, 26, 26, 0.9);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);

    &:hover {
      box-shadow: 0px 4px 5px -1px rgba(0, 0, 0, 0.2),
        0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    }
  }
`

