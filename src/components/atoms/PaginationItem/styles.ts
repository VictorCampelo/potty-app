import styled from 'styled-components'

interface ButtonProp {
  isCurrent: boolean
}

export const Button = styled.button<ButtonProp>`
  border: 0;
  background: transparent;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  color: ${(props) => (!props.isCurrent ? 'var(--gray-700)' : 'white')};
  margin-left: 8px;
  background: ${(props) =>
    !props.isCurrent ? 'transparent' : 'var(--color-secondary)'};

  :hover {
    background: ${(props) =>
      !props.isCurrent
        ? 'var(--color-primary)'
        : 'var(--color-secondary-darker)'};
  }
`
