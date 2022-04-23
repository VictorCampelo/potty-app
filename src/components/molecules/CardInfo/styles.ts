import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;

  background: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;

  padding: var(--spacing-nano);

  div#Contact,
  div#timetable,
  div#category,
  div#local {
    .voidText {
      display: flex;
      width: 100%;

      p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;

        color: #363f4e;
      }
    }
  }

  div#categories {
    display: flex;
    flex-direction: column;
  }

  .categories-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 0;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 20px;

    h1 {
      font-style: normal;
      font-weight: 600;
      font-size: 1.2rem;

      text-align: center;

      color: var(--color-secondary-darker);
    }

    button {
      width: 100px;
      height: 35px;
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

      .icon {
        margin-left: 4px;
      }
    }
  }

  .bottom {
    margin: 20px 25px;

    div#Contact {
      display: flex;
      flex-direction: column;

      .contact-info {
        display: flex;
        margin-bottom: 5px;

        h2 {
          margin-left: 10px;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 18px;

          color: #363f4e;
        }
      }
    }

    div#timetable {
      display: flex;
      flex-direction: column;

      .horario {
        display: flex;
        width: auto;
        max-width: 40%;
        gap: var(--spacing-xxs);
        div {
          h2,
          p {
            font-size: var(--font-size-xxs);
            color: var(--black-800);
            margin-bottom: var(--spacing-xxxs);
          }
        }

        .hours {
          .hour {
            display: flex;
            gap: var(--spacing-xxs);
          }
        }
      }
    }

    div#category {
      display: flex;
      align-items: center;
      h2 {
        margin-left: 10px;
        font-style: normal;
        font-weight: 600;
        font-size: 1rem;
        line-height: 28px;

        color: #363f4e;
      }
    }

    div#local {
      display: flex;
      align-items: center;

      h2 {
        margin-left: 10px;
        font-style: normal;
        font-weight: normal;
        font-size: 0.8rem;

        color: #363f4e;
      }
    }
  }
`
