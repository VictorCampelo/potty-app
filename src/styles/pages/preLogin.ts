import styled from 'styled-components'
import sizes from '../../utils/sizes'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  ${[sizes.down('lgMob')]} {
    img {
      display: none;
    }
  }
`

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: var(--spacing-xxxs);

  .confirmationAuth {
    text-align: left;

    input {
      letter-spacing: 1rem;
    }
    .inputContainer {
      margin-bottom: var(--spacing-xs);
    }
    span {
      text-decoration: underline;
      cursor: pointer;
    }

    .subtitle {
      margin-bottom: var(--spacing-md);
    }
  }

  .container {
    width: 90%;
    padding: 2rem 2rem 0 2rem;

    .title {
      width: 50%;
      margin-bottom: var(--spacing-xxxs);
      h2 {
        color: var(--color-secondary-darker);
        font-weight: 600;
        margin-bottom: 1.5rem;
        font-size: var(--font-size-lg);
      }

      p {
        color: var(--black);
        font-size: var(--font-size-sm);
        font-weight: 500;
        span {
          color: var(--color-secondary-darker);
        }
      }
      .information {
        margin-top: var(--spacing-nano);
      }
    }

    .buttonImage {
      display: flex;
      /* border: 1px solid red; */
      overflow: hidden;
      justify-content: space-between;
      .buttonContainer {
        align-self: center;
      }

      .imgContainer {
        /* border: 1px solid red; */
        margin-bottom: -30px;
        margin-right: var(--spacing-xxxs);
      }
    }
  }

  form,
  .container {
    background: var(--white);
    border-radius: 30px;
    box-shadow: 0px 0px 18px -4px #cccccc;
    display: flex;
    flex-direction: column;

    overflow-x: hidden;
  }
  form {
    align-items: center;
    width: 530px;
    padding: 1rem 3rem 2rem 3rem;
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
      //flex-direction: column;
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
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: var(--spacing-xxxs);
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

    .inputContainer {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: var(--spacing-xxxs);
    }

    .buttonContainer {
      min-width: 10vw;
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;

      ${[sizes.down('lgMob')]} {
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

    .inputRow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      /* border: 1px solid blue; */
    }
  }

  ${[sizes.down('mdMob')]} {
    form {
      .title {
        flex-direction: column;
        align-items: flex-start;
        background-color: #999;
      }

      .logo {
        flex-direction: row;
        align-items: center;
      }
    }
  }

  ${[sizes.down('lgMob')]} {
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

export const ContainerLojist = styled(Container)`
  form {
    width: 1100px;
    .inputContainer {
      flex-direction: row;

      .inputCol {
        margin-bottom: 1rem;
      }

      .inputRow {
        width: 100%;
        margin-bottom: 1rem;
      }
    }

    .inputContainer > div {
      width: 100%;
    }
  }
`

export const TermsModalContainer = styled.div`
  max-width: 800px;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xxxs);
    h2 {
      font-weight: 400;
    }
  }

  .buttonContainer {
    width: 25%;
    margin: auto;
  }
`
