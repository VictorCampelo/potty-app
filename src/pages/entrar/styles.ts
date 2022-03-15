import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 var(--spacing-md);

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 530px;
    padding: var(--spacing-xxxs) var(--spacing-md) var(--spacing-xs)
      var(--spacing-md);
    align-items: center;
    background: var(--white);
    border-radius: 30px;
    box-shadow: 0px 0px 18px -4px #cccccc;
    z-index: 1;
    margin: var(--spacing-sm) auto;

    .title {
      width: 100%;
      height: 80px;
      margin-bottom: var(--spacing-xs);
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-size: var(--font-size-lg);
        font-weight: 500;
        margin-right: var(--spacing-xs);
      }

      a {
        font-size: var(--font-size-xxxxs);
        color: var(--gray-300);
      }
    }

    .inputContainerLogin {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xxxs);
    }

    .divisorContainer {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-top: var(--spacing-xxs);
    }

    .divisor {
      width: 25%;
      height: 1px;
      border-bottom: 1px solid black;
      margin: 0 var(--spacing-nano);
    }

    .social {
      width: 45%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--spacing-nano);

      svg {
        transition-property: opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        cursor: pointer;
        filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));

        &:hover {
          opacity: 0.5;
        }
      }
    }

    .register {
      font-size: var(--font-size-xxs);
      margin-top: var(--spacing-xxs);

      a {
        font-weight: 600;
      }
    }
  }

  ${[sizes.down('md')]} {
    height: 100vh;
    padding-top: 0;
    justify-content: start;
    background: var(--white);

    .logo {
      display: none !important;
    }

    form {
      box-shadow: none;
      border-radius: 0;
      margin: 0;
      padding: 0;

      .title {
        margin-bottom: var(--spacing-xs);
      }
    }
  }
`
