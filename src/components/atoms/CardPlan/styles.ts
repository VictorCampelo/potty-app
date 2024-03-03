/* eslint-disable prettier/prettier */
import styled from 'styled-components'

interface ContainerProps {
  crown: boolean
  colors: {
    primary: string
    secondary: string
  }
}

export const Container = styled.div<ContainerProps>`
  width: 250px;
  height: max-content;
  position: relative;
  background-color: white;

  padding: var(--spacing-xxxs) var(--spacing-xxs);

  border-radius: 30px;

  text-align: center;

  h2 {
    color: ${(props) => props.colors.primary};
    ${(props) => props.crown && ';font-size: var(--font-size-lg);'}
  }

  .crown {
    position: absolute;
    top: -30px;
    left: -40px;
    width: 60px;
    height: 55px;
    color: #FF7A00;
    transform: rotate(-20deg);
  }

  .benefits {
    margin: var(--spacing-xxxs) 0;
  }

  .benefit {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xxxs);
  }

  .quota {
    font-size: var(--font-size-xxxxs);
  }

  .price {
    font-size: var(--font-size-md);
    ${(props) =>
    props.crown
    && `color: ${props.colors.secondary};font-size: var(--font-size-lg);`}
  }

  button {
    width: 85%;
    height: 36px;
    margin: var(--spacing-nano) auto;
    font-size: var(--font-size-xxs);
    font-weight: normal;
  }
`
