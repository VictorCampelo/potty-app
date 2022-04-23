import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  .cards-area {
    width: 100%;
    height: 100%;

    padding: 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-xxxs);

    .left-area,
    .right-area {
      width: 49%;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xxxs);
    }
  }
`

export const SearchButton = styled.input`
  margin-left: auto;
  border: none;
  background: white;
  border-radius: 30px;
  width: 350px;
  height: 42px;
  padding: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const OrderBody = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--gray-150);
  align-items: center;

  section {
    flex: 1;
    display: flex;
  }

  section.center {
    justify-content: center;
  }

  svg {
    color: var(--color-secondary);
    transition: color 0.2s;
  }

  svg:hover {
    color: var(--color-secondary-darker);
    cursor: pointer;
  }

  span {
    color: var(--gray-700);
    font-weight: 400;
    font-size: 1rem;
    align-items: center;
    display: flex;
  }

  .statusButton {
    width: 100%;
    flex: 1;
    border-radius: 8px;
    background: var(--yellow);
    color: var(--gray-700);
    font-weight: bold;
    border: none;
    height: 38px;
  }

  .confirm {
    background: var(--confirmation) !important;
    color: white !important;
  }

  .processing {
    background: var(--yellow) !important;
    color: white !important;
  }

  .refused {
    background: var(--red) !important;
    color: white !important;
  }

  .received {
    background: var(--gray-700) !important;
    color: white !important;
  }
`

export const OrderHead = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--gray-150);

  section {
    flex: 1;
    display: flex;
  }

  section.center {
    justify-content: center;
  }

  span {
    color: var(--gray-700);
    font-weight: 700;
    font-size: 1.25rem;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  padding: var(--font-size-sm);
  padding-left: var(--spacing-xxxs);
`

export const MainArea = styled.main`
  background: #fff;
  flex: 1;
  height: 100%;

  border-radius: var(--border-radius-gg);
  padding: 3rem 3rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  header {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;

    svg {
      position: absolute;
      right: 16px;
      cursor: pointer;
    }
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`

export const EmptyContainer = styled.div`
  width: 100%;
  padding: 2rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-content: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    img {
      width: 60%;
      height: 60%;
    }
    p {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);
  width: 400px;

  .productInformation {
    display: flex;
    gap: 20px;

    .imageArea {
      width: 125px;
      height: 142px;

      margin: var(--spacing-quarck);

      img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .description {
      display: flex;
      flex-direction: column;

      .price {
        display: flex;
        gap: var(--spacing-md);
        font-weight: 600;
      }
    }
  }

  .totalPrice {
    font-weight: 600;
  }
`

export const ModalContainer = styled.div`
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xxxs);
    .information {
      display: flex;
      gap: var(--spacing-lg);
      align-items: center;

      span {
        color: var(--gray-300);
      }
    }

    .close {
      cursor: pointer;
    }
  }

  .content {
    display: flex;
    gap: var(--spacing-xxs);

    .leftContainer {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      padding-right: 10px;
      height: 320px;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 7px;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--gray-300);
        height: 50px;
        border-radius: 5px;
      }
    }
    .rightContainer {
      margin: 0 1rem 0 1rem;
      width: 310px;
      .gradient {
        background: rgb(255, 255, 255);
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0) 8%,
          rgba(255, 255, 255, 0.22202384371717432) 24%,
          rgba(255, 255, 255, 0.5329482134650736) 41%,
          rgba(255, 255, 255, 0.7486344879748774) 60%,
          rgba(255, 255, 255, 1) 100%
        );
        height: 30px;
        transform: translateY(25px);
      }
      .status {
        display: flex;
        flex-direction: column;
        width: 50%;
        .statusButton {
          width: 100%;
          flex: 1;
          border-radius: 8px;
          background: var(--yellow);
          color: var(--gray-700);
          font-weight: bold;
          border: none;
          height: 38px;
          padding: 0.25rem 0 0.25rem 0;
          &.confirm {
            background: var(--confirmation);
            color: white;
          }

          &.refused {
            background: var(--red);
            color: white;
          }

          &.recived {
            background: var(--gray-700);
            color: white;
          }
        }
      }

      .informationOrder {
        height: 300px;
        overflow-y: scroll;
        padding-right: 10px;
        ::-webkit-scrollbar {
          width: 7px;
        }

        ::-webkit-scrollbar-thumb {
          background: var(--gray-300);
          height: 50px;
          border-radius: 5px;
        }
        .resume,
        .payment,
        .localization {
          margin: 1rem 0 1rem 0;

          .title {
            margin-bottom: 1rem;
          }
          div {
            display: flex;
            justify-content: space-between;
          }
        }

        .localization {
          display: flex;
          flex-direction: column;

          .phone {
            margin-top: var(--spacing-xxxs);
          }
        }
      }
    }
  }

  .content.column {
    flex-direction: column;
    gap: var(--spacing-xxxs);
    margin-top: var(--spacing-xxs);
  }

  .buttonsContainer {
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--spacing-xxxs);
    margin: 2rem auto auto auto;
  }
`
