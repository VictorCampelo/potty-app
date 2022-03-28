import styled from 'styled-components'
import sizes from '@/utils/sizes'

import Button from '@/components/atoms/Button'

export const SeeProductsButton = styled(Button)`
  width: 20%;
  padding: 0 2rem;
`

export const EmptyCartContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1,
  p {
    margin-bottom: 1rem;
  }
`

export const Container = styled.main`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 3rem;
  ${[sizes.down('sm')]} {
    background: white;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
`

export const Content = styled.section`
  max-width: 1420px;
  height: 100vh;
  width: 100%;
  padding-top: 1.5rem;

  h1 {
    font-size: var(--font-size-lg);
  }

  ${[sizes.up('sm')]} {
    .checkbox {
      display: none;
    }
  }

  ${[sizes.down('sm')]} {
    padding-top: 1rem;

    h1 {
      font-size: var(--font-size-md);
    }
    .header {
      margin-left: 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .checkbox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0 1rem 1rem;

      .cupomContainer {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .btn {
        width: 20px;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 5px;
        border: 1px solid black;
        background: var(--white);

        margin-right: 10px;
        padding: 4px;
      }

      .check {
        display: flex;

        label {
          font-weight: 500;
        }
      }

      a {
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: underline;
      }
    }
  }
`

export const CartContainer = styled.section`
  background: white;
  width: 100%;
  border-radius: 30px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  margin-top: 1.5rem;
  flex-direction: column;

  .subTotal {
    padding-left: 1rem;
  }

  ${[sizes.down('sm')]} {
    border-radius: 0;
    padding: 0;
    box-shadow: none;
  }
  h1 {
    padding: 2rem 1.5rem;
  }

  .info {
    span,
    strong {
      font-size: 1.25rem;
    }

    strong {
      color: var(--color-primary);
    }
  }

  .buttonContainer {
    display: flex;

    button {
      padding: 0 1rem;
      display: flex;
      align-items: center;
      margin-left: 1rem;
      border: none;
      background: white;
      border-radius: 50px;
      height: 48px;
      font-weight: bold;

      svg {
        margin-right: 0.5rem;
      }

      &.empty {
        border: 1px solid var(--red);
        color: var(--red);
      }

      &.finish {
        background: var(--color-primary);
        color: white;
      }
    }
  }
`

type CartContainerFooterProp = {
  disabled: boolean
}

export const CartContainerFooter = styled(
  CartContainer
)<CartContainerFooterProp>`
  flex-direction: row;
  align-items: center;
  padding: 2rem;
  justify-content: space-between;

  ${[sizes.down('sm')]} {
    bottom: 0;
    position: fixed;
    border-radius: 30px 30px 0 0;
    box-shadow: 0 0 1rem rgba(99, 99, 99, 0.2);
    padding: 0 0 0 1rem;
    .info {
      display: flex;
      flex-direction: column;

      .spanBottom {
        font-size: 1rem;
        a {
          color: var(--red);
          text-decoration: underline;
        }
      }
    }
    .buttonContainerMob {
      display: flex;
      height: 80px;
      .finish {
        border-radius: 0 30px 0 0;
        background-color: var(--color-primary);
        border: 1px solid var(--color-primary);
        height: 100%;
        padding: 0 1rem 0 1rem;
        p {
          color: white;
        }
        ${(props) =>
          props.disabled && 'background-color: gray; border-color: gray'}
      }
    }
  }
`

export const CartHead = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 2rem;

  ${[sizes.down('sm')]} {
    display: none;
  }
  section {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  span {
    color: var(--blue-primary);
    font-weight: 700;
    font-size: 1.25rem;
  }
`

export const CartProduct = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 2rem;
  align-items: center;
  border-top: 2px solid var(--gray-100);

  ${[sizes.down('sm')]} {
    border-radius: 0;
    justify-content: center;
    padding: 1rem 0;

    .sectionImg {
      padding-right: 0;
      .imgContainer {
        height: 110px;
        margin-right: 0;
        img {
          width: 110px;
        }
      }
    }
    .spanProductInformation {
      flex-direction: column;
      gap: 1rem;
    }
  }

  section {
    flex: 1;
    display: flex;
    justify-content: center;

    span {
      font-size: 1.5rem;
    }

    .exclude {
      display: flex;
      border: none;
      background: white;
      border-radius: 30px;
      padding: 1rem;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      strong {
        margin-left: 0.5rem;
        color: var(--red);
      }
    }

    :first-child {
      flex: 5;
      justify-content: flex-start;
    }

    :last-child {
      display: flex;
      justify-content: flex-end;
    }

    .imgContainer {
      display: flex;
      width: 90px;
      height: 90px;
      border-radius: 5px;
      background: var(--gray-300);
      margin-right: 1rem;
      justify-content: center;
      align-items: center;
      img {
        width: 90px;
        border-radius: 10px;
      }
    }
  }
`
