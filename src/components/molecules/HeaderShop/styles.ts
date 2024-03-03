import styled from 'styled-components'
import sizes from '../../../utils/sizes'

interface ContainerProps {
  isMain: boolean
}

export const Container = styled.header<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: var(--spacing-nano) var(--spacing-xxxs);

  ${(props) => props.isMain === false && 'background: rgba(0,0,0,0.4);'}
  ${(props) => props.isMain === false && 'color: var(--white);'}

  z-index: 5;

  .logo {
    display: flex;
    align-content: center;
    margin-right: 400px;
    ${(props) => props.isMain == false && 'display: none;'}
    img {
      max-width: 100%;
    }
  }

  nav {
    max-width: 1000px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${(props) => props.isMain === false && 'width: 100%;'}
    list-style-type: none;

    .userContainer {
      display: flex;
      gap: var(--spacing-xxxs);
      align-items: center;

      div {
        display: flex;
        align-items: center;
        span {
          margin-left: var(--spacing-xxxs);
          color: var(--color-secondary-darker);
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-medium);
        }
      }
    }

    .authContainer {
      display: flex;
      align-items: center;
      gap: var(--spacing-xxxs);
      margin-left: auto;

      .register {
        color: var(--color-primary);
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        background: var(--color-primary);

        padding: var(--spacing-nano) var(--spacing-xs);

        border-radius: var(--border-radius-gg);
        border: none;
        cursor: pointer;

        font-family: var(--font-family-primary);
        font-style: var(--font-style-normal);
        font-weight: var(--font-style-normal);
        font-size: var(--font-size-xs);
        transition: 0.2s background;

        color: var(--white);

        :hover {
          background: var(--color-primary-darker);
        }
      }
    }
    a {
      text-decoration: none;
      cursor: pointer;
      padding: var(--spacing-nano);
      margin: var(--spacing-nano);
      font-size: var(--font-size-xxs);
      transition: 0.2s background;
      padding: var(--spacing-nano);
      border-radius: var(--border-radius-lg);
      border: none;

      :hover {
        background: var(--gray-200);
      }
    }
  }

  ${[sizes.down('lgMob')]} {
    display: none;
  }
`
