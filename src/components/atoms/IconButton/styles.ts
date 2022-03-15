import styled from 'styled-components'

export const Container = styled.button`
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2));
  background: transparent;
  border: none;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.5;
  }
`
