import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledTop = styled.header`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.15),
    0px 4px 5px 0px rgba(0, 0, 0, 0.1),
    0px 1px 10px 0px rgba(0, 0, 0, 0.08);

  @media (prefers-color-scheme: dark) {
    background-color: rgba(26, 26, 26, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14),
      0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`

const StyledNav = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
`

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
`

const NavLink = styled(Link)`
  color: rgba(33, 53, 71, 0.87);
  text-decoration: inherit;
  font-weight: 500;
  font-family: inherit;
  transition: color 0.2s;
  padding: 0.5rem 0;

  &:hover {
    color: #646cff;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.87);

    &:hover {
      color: #646cff;
    }
  }
`

export function Top() {
  return (
    <StyledTop>
      <StyledNav>
        <NavList>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </NavList>
      </StyledNav>
    </StyledTop>
  )
}

