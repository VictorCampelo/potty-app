import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Nav = styled.nav`
  width: 70px;
  height: 90vh;
  max-height: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: var(--spacing-xs) var(--spacing-xxxs);
  margin: auto 0;

  background-color: var(--white);

  border-radius: var(--border-radius-gg);

  ${[sizes.down('md')]} {
    width: 100%;
    height: 90px;
    flex-direction: row;
    padding: var(--spacing-xxxs) var(--spacing-nano);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

interface IconProps {
  color?: string
}

export const Icon = styled.div<IconProps>`
  svg {
    width: 24px;
    height: 24px;

    ${[sizes.down('xl')]} {
      width: 28px;
      height: 28px;
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  border-radius: 100%;

  padding: var(--spacing-xxxs);

  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    background-color: var(--gray-150);
  }

  span {
    display: none;

    ${(props) => props.color && `color: ${props.color};`}
    ${[sizes.down('md')]} {
      display: block;
    }
  }
`
