import styled from 'styled-components'
import sizes from '@/utils/sizes'

interface NavProps {
  open: boolean
}

export const Nav = styled.nav<NavProps>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: var(--spacing-xs) 0;

  background-color: var(--white);

  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  border-radius: var(--border-radius-gg);

  ${[sizes.down('md')]} {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 90px;
    flex-direction: row;
    padding: var(--spacing-xxxs) var(--spacing-nano);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    z-index: 1;
  }
`

export const ToggleButton = styled.button`
  ${[sizes.down('md')]} {
    display: none;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  width: 35px;
  height: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-top-left-radius: 100%;
  border-bottom-left-radius: 100%;

  background-color: var(--color-primary);

  border: none;
  margin-left: auto;

  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    opacity: 0.5;
  }
`

interface IconProps {
  color?: string
  showText?: boolean
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-nano);

  cursor: pointer;

  border-radius: 100%;

  padding: var(--spacing-xxxs);

  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    text-decoration: underline;
    ${(props) => !props.showText && 'background-color: var(--gray-150);'}
  }

  ${(props) =>
    props.showText
      ? 'margin-right: auto;margin-left: var(--spacing-quarck);'
      : 'margin: 0 var(--spacing-nano);'}

  ${[sizes.down('md')]} {
    flex-direction: column;
    gap: 0;
  }

  span {
    display: none;

    ${(props) => props.showText && 'display: block !important;'}

    ${(props) => props.color && `color: ${props.color};`}
  }
`
