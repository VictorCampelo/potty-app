import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  .confirmationAuth {
    text-align: left;

    span {
      text-decoration: underline;
      cursor: pointer;
    }

    .subtitle {
      margin-bottom: var(--spacing-md);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 530px;
    padding: 1rem 3rem 2rem 3rem;
    align-items: center;
    background: var(--white);
    border-radius: 30px;
    box-shadow: 0px 0px 18px -4px #cccccc;

    .confirmImg {
      width: 180px;
      height: 180px;
      margin-bottom: 1.5rem;
    }

    .title {
      width: 100%;
      height: 80px;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-size: 1.875rem;
        font-weight: 500;
        margin-right: var(--spacing-xs);
      }

      p {
        font-size: 0.875rem;
        text-align: justify;
        color: var(--gray-300);
        margin-top: 0.5rem;
      }

      a {
        font-size: 0.8rem;
        color: var(--gray-300);
      }

      .logo {
        display: block;
      }
    }

    .inputContainerLogin {
      width: 100%;
    }

    .recoverTitle {
      width: 100%;
      margin-bottom: 1rem;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      h1 {
        font-size: 1.875rem;
        font-weight: 400;
      }

      p {
        font-size: 0.875rem;
        text-align: justify;
        color: var(--gray-300);
        margin-top: 0.5rem;
      }

      a {
        font-size: 0.8rem;
        color: var(--gray-300);
        margin-top: 0.7rem;
      }
    }

    .buttonContainer {
      min-width: 10vw;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;

      ${[sizes.down('sm')]} {
        flex-direction: column;
      }
    }

    .divisorContainer {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-top: 1.5rem;
    }

    .divisor {
      width: 25%;
      height: 1px;
      border-bottom: 1px solid black;
      margin: 0 0.5rem;
    }

    .social {
      width: 45%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;

      svg {
        filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.25));
      }
    }

    .register {
      font-size: 1rem;
      margin-top: 1.5rem;

      a {
        font-weight: 600;
      }
    }
  }

  ${[sizes.down('sm')]} {
    height: 100vh;
    padding-top: 0;
    background: var(--white);
    form {
      box-shadow: none;
      border-radius: 0;
      .title {
        margin-bottom: 2rem;
      }
    }
  }
`
