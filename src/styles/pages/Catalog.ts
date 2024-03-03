import styled from 'styled-components'
import sizes from 'utils/sizes'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fffdf9;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${[sizes.down('sm')]} {
    display: flex;
    flex-direction: column;
  }

  div.area {
    max-width: 100%;
    width: 100%;

    padding: 20px 20px;

    ${[sizes.down('sm')]} {
      height: 100%;
      padding: 0;
      margin-bottom: -50px;
    }

    display: flex;

    .list-container {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;

      background: #ffffff;

      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 30px;
      overflow-y: hidden;

      ${[sizes.down('sm')]} {
        border-radius: 0;
      }

      .header {
        width: 100%;
        height: 110px;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        border-radius: 30px 30px 0 0;
        padding: 20px;

        h1 {
          display: none;
        }

        ${[sizes.down('sm')]} {
          flex-direction: row-reverse;
          padding-top: 120px;

          h1 {
            position: absolute;
            left: 20px;
            top: 30px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            font-size: var(--font-size-xlg);
          }
        }

        .addBtn {
          width: 123px;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;

          /* margin-top: 0.5rem; */
          margin-right: 40px;

          background: var(--color-secondary);
          border-radius: 50px;
          border: none;

          padding: 0 11px 0 11px;

          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 22px;
          color: var(--white);
        }

        .addBtn:hover {
          background: var(--color-secondary-darker);
        }

        .input-container {
          width: 313px;

          margin-right: 28px;
        }
      }
    }

    main {
      height: 100%;
      overflow-y: auto;
    }

    .products-container {
      padding: var(--spacing-xxs) var(--spacing-md);

      ${[sizes.down('sm')]} {
        padding: var(--spacing-xxs);
        padding-top: var(--spacing-md);
        gap: 32px;
      }

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      overflow-y: auto;

      background-color: var(--white);

      height: 100%;
    }

    .categories-container {
      padding: var(--spacing-xxs) var(--spacing-md);

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      height: 100%;
    }

    .cupons-container {
      padding: 20px 85px;

      display: flex;
      flex-direction: row;
      gap: 2rem;
      flex-wrap: wrap;
      align-items: flex-start;

      height: 100%;
    }
  }
`

export const AddProductModalContainer = styled.form`
  width: auto;
  max-width: 850px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .row {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
  }

  .buttonContainer {
    display: flex;
    margin-top: 24px;
    gap: 0.8rem;
    ${[sizes.down('sm')]} {
      flex-direction: column-reverse;
    }
  }

  .exit-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    h1 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;

      color: #01ac8a;
    }

    svg {
      cursor: pointer;
    }
  }

  .radio-area {
    color: var(--gray-700);
    margin-bottom: 0.5rem;

    label {
      font-size: 0.865rem;
      margin-left: 0.5rem;
    }
  }

  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 45px;
    text-align: center;

    color: #363f4e;

    margin-bottom: 70px;
  }

  h1.titulo-cadastro {
    width: 100%;
    text-align: left;
    font-weight: 600;
  }

  .input-infos {
    display: flex;

    ${[sizes.down('md')]} {
      flex-direction: column;
      gap: var(--spacing-xs);
    }

    .left-area {
      margin-top: -30px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      textarea {
        resize: none;
      }

      .row-edit {
        display: grid;
        grid-template-columns: 1fr 1fr;

        div:first-child {
          width: 90%;
        }
      }

      .desconto {
        display: flex;
        align-items: flex-end;

        .arrows {
          display: flex;
          flex-direction: column;

          cursor: pointer;

          margin: 0 10px;

          .left-arrow {
            margin-top: -5px;
          }

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    .right-area {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-left: 30px;
      margin-top: -30px;

      ${[sizes.down('md')]} {
        margin-left: 0;
        margin-top: -22px;
      }

      .text-categories-added {
        font-size: 12px;
        color: #363f4e;
        margin: -0.8rem 0 var(--spacing-xxxs) 0;
      }
    }

    h3 {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;

      color: #363f4e;
    }

    h2 {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;

      color: #363f4e;
    }

    .foto {
      display: flex;

      .title-foto {
        z-index: 3;
        background: #ffffff;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 6px 30px;

        border: 1px solid #363f4e;
        box-sizing: border-box;
        border-radius: 8px;

        font-family: Poppins;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 18px;

        color: #363f4e;
      }

      label {
        cursor: pointer;
        margin-left: -10px;
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0px 10px 0px 15px;

        background: #2dd1ac;
        border: 1px solid #2dd1ac;

        box-shadow: inset 0px 0px 4px rgba(54, 63, 78, 0.2);
        border-radius: 0px 8px 8px 0px;

        font-family: Poppins;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;

        color: #ffffff;
      }
    }

    .array-fotos {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem;

      overflow: auto;

      .card-image {
        width: 100px;
        height: 100px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        background: #fefdf9;
        box-shadow: -2px 4px 5px rgba(0, 0, 0, 0.15);
        border-radius: 4px;

        margin-left: 8px;
        margin-right: 8px;

        img {
          object-fit: cover;
        }
      }
    }
  }

  small {
    color: var(--gray-600);
    margin-top: 0.2rem;
  }
`

export const ExcludeModalContainer = styled.div`
  width: auto;
  max-width: 650px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .exit-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    h1 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;

      color: #01ac8a;
    }

    svg {
      cursor: pointer;
    }
  }

  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 45px;
    text-align: center;

    color: #363f4e;

    margin-bottom: 70px;
  }

  .btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 410px;
    height: 55px;

    button {
      width: 196px;
      height: 54px;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      text-align: center;

      color: #ffffff;

      border-radius: 30px;
      border: none;
      outline: none;
    }

    .exclude-btn {
      background: #ff4d4b;
    }

    .cancel-btn {
      background: #2dd1ac;
    }
  }

  .icon {
    width: 198px;
    height: 198px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 100%;

    border: 10px solid #ff4d4b;
  }

  .desc {
    margin-top: 105px;

    width: auto;
    max-width: 317px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 45px;
    text-align: center;

    color: #363f4e;
  }

  .btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    height: 55px;

    button {
      width: 196px;
      height: 54px;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      text-align: center;

      color: #ffffff;

      border-radius: 30px;
      border: none;
      outline: none;
    }

    .continue-btn {
      background: #2dd1ac;
    }
  }
`

export const AddCategoryModalContainer = styled.div`
  width: auto;
  max-width: 450px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .exit-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
    }

    svg {
      cursor: pointer;
    }
  }

  .inputContainer {
    width: 450px;
    margin-bottom: 30px;
  }

  .buttonContainer {
    display: flex;
    margin-top: 24px;
    gap: 1rem;
    ${[sizes.down('sm')]} {
      flex-direction: column-reverse;
    }
  }
`

export const EditCategoryModalContainer = styled.div`
  width: auto;
  max-width: 650px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .exit-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    h1 {
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;

      color: var(--color-secondary-darker);
    }

    svg {
      cursor: pointer;
    }
  }

  h1 {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 45px;
    text-align: center;

    color: #363f4e;

    margin-bottom: 70px;
  }

  .category-container {
    width: 500px;
    height: 130px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .category-btn-container {
    button {
      margin-top: 20px;
      width: 132px;
      height: 54px;
      background: transparent;

      border: 2px solid var(--color-primary);
      box-sizing: border-box;
      border-radius: 30px;

      font-style: normal;
      font-weight: normal;
      font-size: 1rem;

      color: var(--color-primary);

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`

export const CropModalContainer = styled.div`
  max-width: 600px;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .crops {
    .cropper-container {
      height: 500px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .crop {
        width: 400px;
        height: 400px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .controls-container {
        width: 100%;
        height: 40px;

        margin-top: 30px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-radius: 5px;

        input[type='range'] {
          -webkit-appearance: none;
          width: 80%;
          height: 30px;
          background: linear-gradient(
            to right,
            var(--gray-300) 1%,
            var(--gray-300) 1%
          );
          background-size: 100% 10px;
          border-radius: 15px;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          outline: none;

          margin-bottom: 1rem;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 25px;
          height: 25px;
          border-radius: 25%;
          background: var(--color-primary);
          color: var(--color-primary);
          position: relative;
          box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
        }
      }
    }
  }

  .btns {
    width: 100%;
    height: 80px;

    gap: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
      width: 70%;
      height: 70%;
    }
    p {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`
