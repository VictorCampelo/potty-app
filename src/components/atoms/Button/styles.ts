import styled from 'styled-components'

export interface ContainerProps {
  skin?: 'primary' | 'secondary'
}

export const Container = styled.button<ContainerProps>`
  height: 3.375rem;
  width: 100%;
  min-width: max-content;
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  color: var(--white);
  font-weight: 700;
  font-size: 1.125rem;
  background-color: var(--color-primary);
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  ${(props) =>
    props.skin === 'secondary' && 'border: 2px solid var(--color-primary);'}
  ${(props) => props.skin === 'secondary' && 'color: var(--color-primary);'}
  ${(props) => props.skin === 'secondary' && 'font-weight: normal;'}
  ${(props) => props.skin === 'secondary' && 'background-color: var(--white);'}

  :hover {
    background-color: var(--color-primary-darker);
    ${(props) => props.skin === 'secondary' && 'background-color: #eeeeee;'}
  }

  :disabled {
    background-color: var(--gray-300);
    cursor: not-allowed;
  }
`
