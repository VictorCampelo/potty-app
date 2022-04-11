import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const CardsContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1.5rem;

  .top-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    height: 80%;
    gap: 2rem;
    min-height: 350px;
  }
`

export const AddressCard = styled.section`
  grid-column: span 2 / span 3;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 30px;
  padding: var(--spacing-xs);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .paymentContainer {
    display: flex;
    gap: 16px;
  }

  ${[sizes.down('sm')]} {
    box-shadow: none;
    max-width: 100vw;

    .paymentContainer {
      flex-wrap: wrap;
    }

    h1 {
      display: none;
    }
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h2 {
    font-size: 30px;
    line-height: 45px;
    font-weight: 600;
    color: var(--color-secondary-darker);
  }

  h3 {
    font-size: 24px;
    line-height: 60px;
    font-weight: 600;
  }
`
export const DeliveryMethod = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0;

  div {
    margin: 0.1rem 0 !important;
  }
`
export const AddressInfo = styled.div`
  width: 100%;
  height: 128px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff6ed;
  border: 1px solid var(--color-primary);
  padding: 1.2rem 1rem;
  border-radius: 30px;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  ${[sizes.down('sm')]} {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xxxs);
    strong {
      display: none;
    }
  }
  span {
    display: block;
  }
`

export const UpdateAddressButton = styled.button`
  display: flex;
  align-items: center;
  color: var(--color-primary);
  background: transparent;
  border: none;
  font-weight: bold;
  margin-bottom: 1rem;
  transition: color 0.2s;

  ${[sizes.down('sm')]} {
    margin-bottom: var(--spacing-md);
  }
  svg {
    color: var(--color-primary);
    margin-right: 0.5rem;
    transition: color 0.2s;
  }

  :hover {
    color: var(--color-primary-darker);

    svg {
      color: var(--color-primary-darker);
    }
  }
`

export const ProductsContainer = styled.section`
  width: 100%;
  max-height: 580px;
  background: white;
  border-radius: 30px;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;

  ${[sizes.down('sm')]} {
    display: none;
  }
  h1 {
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0.6rem;
    padding-left: 1.2rem;
  }

  .products-container {
    height: 100%;
    width: 100%;
    overflow: hidden auto;
    padding: 0 0.75rem;
  }
`

export const CartContainer = styled.section`
  background: white;
  width: 100%;
  border-radius: 30px;
  height: 20%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;

  .subTotal {
    padding-left: 1rem;
  }

  h1 {
    padding: 1.5rem;
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

      &.goback {
        border: 1px solid var(--color-primary);
        background: white;
        color: var(--color-primary);
      }

      &:disabled {
        opacity: 0.5;
      }
    }
  }
`

export const CartContainerFooter = styled(CartContainer)`
  flex-direction: row;
  align-items: center;
  padding: 1rem 1.5rem;
  justify-content: space-between;
`

export const ProductItem = styled.div<{ active: boolean }>`
  height: 96px;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  padding-left: 1.5rem;

  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    background: var(--gray-150);
  }

  ${(props) =>
    props.active &&
    `
  background: #FFF6ED;
  border: 1px solid #FF7A00;`}

  .img-container {
    display: flex;
    width: 81px;
    height: 81px;
    border-radius: 8px;
    background: #f3f3f3;
    object-fit: contain;

    img {
      border-radius: 8px;
    }
  }

  .info-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.25rem 1rem;

    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1rem;
      font-weight: 500;
    }

    span {
      font-weight: 600;
    }
  }
`

export const ModalContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${[sizes.down('sm')]} {
    width: 100%;
  }
  span {
    font-size: var(--font-size-md);
  }
  .exit-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;

    h1 {
      font-family: 'Poppins';
      font-style: normal;
      font-size: 24px;

      color: var(--gray-700);
    }

    svg {
      cursor: pointer;
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    ${[sizes.down('sm')]} {
      .row {
        flex-direction: column;
      }

      .mid {
        flex-direction: row;
      }
    }
    .row {
      display: flex;
      gap: 1rem;
    }
  }

  .buttons-container {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
    padding: 0 12.5%;
    justify-content: center;

    button {
      margin: 0;
    }
  }
`
