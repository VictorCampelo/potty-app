import styled from 'styled-components'
import sizes from '@/utils/sizes'

interface ContainerProps {
  size?: 'md' | 'lg' | 'xl'
}

export const Container = styled.main<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 var(--spacing-md);

  .card {
    display: flex;
    flex-direction: column;
    width: 100%;
    ${(props) => props.size === 'md' && 'max-width: 512px;'}
    ${(props) => props.size === 'lg' && 'max-width: 640px;'}
    ${(props) => props.size === 'xl' && 'max-width: 1024px;'}

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

    .container-divisor {
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
    }

    .footer {
      font-size: var(--font-size-xxs);
      margin-top: var(--spacing-xxs);
      text-align: center;

      a {
        font-weight: 600;
      }
    }
  }

  ${[sizes.down('md')]} {
    min-height: 100vh;
    justify-content: start;
    background: var(--white);
    padding: 0 var(--spacing-md);
    padding-bottom: var(--spacing-xs);

    .logo {
      display: none !important;
    }

    .card {
      box-shadow: none;
      border-radius: 0;
      margin: 0;
      padding: 0;
      max-width: none;

      .title {
        margin-bottom: var(--spacing-xs);
      }
    }
  }
`
