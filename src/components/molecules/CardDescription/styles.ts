import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  margin-bottom: var(--spacing-xxs);

  background: var(--white);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: var(--border-radius-lg);

  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    section {
      width: 100%;
      height: 100%;
      position: relative;

      #banner {
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
      }

      #icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: -100px;

        .stars {
          display: flex;
          align-content: center;
          gap: var(--spacing-xxxs);
        }

        img {
          width: 150px;
          height: 150px;
          border: var(--border-width-thick) solid var(--white);
          border-radius: var(--border-radius-circular);
        }

        h1 {
          font-family: var(--font-family-primary);
          font-style: var(--font-style-normal);
          font-weight: var(--font-weight-regular);
          font-size: var(--font-size-md);

          color: var(--black-1000);
        }
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100px;
        height: 35px;
        background: transparent;
        position: absolute;
        top: var(--spacing-xxxs);
        right: var(--spacing-xxxs);

        border: var(--border-width-thin) solid var(--color-primary);
        background: var(--white);
        box-sizing: border-box;
        border-radius: var(--border-radius-gg);

        font-style: var(--font-style-normal);
        font-weight: var(--font-weight-regular);
        font-size: var(--font-size-xxs);

        color: var(--color-primary);

        .icon {
          margin-left: var(--spacing-quarck);
        }
      }
    }
  }

  .bottom {
    padding: var(--spacing-xxs) var(--spacing-xxs);

    .voidText {
      display: flex;
      width: 100%;

      margin-top: var(--spacing-quarck);

      p {
        font-style: var(--font-style-normal);
        font-weight: var(--font-weight-light);
        font-size: var(--font-size-xxs);

        color: var(--black-800);
      }
    }

    h1 {
      font-style: var(--font-style-normal);
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-sm);

      color: var(--color-secondary-darker);
    }

    p {
      font-style: var(--font-style-normal);
      font-weight: var(--font-weight-regular);
      font-size: var(--font-size-xxxxs);
      line-height: 18px;
    }
  }
`
