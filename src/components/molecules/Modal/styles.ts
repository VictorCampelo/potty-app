import styled from 'styled-components'

interface ContainerProps {
  under?: boolean
}

export const Container = styled.header<ContainerProps>`
  overflow: hidden;
  position: relative;

  .close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;

    border-radius: 100%;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
      transition: ease all 0.2s;
    }
  }

  .modal {
    max-height: 85vh;

    padding: 30px 40px;

    overflow: auto;

    ${(props) =>
      props.under && 'padding: var(--spacing-nano) var(--spacing-xxxs);'}
    .modalDescription, .modalAvaliations {
      width: 100%;
      .title {
        display: flex;
        justify-content: space-between;
        padding: var(--spacing-xxxs);
        h2 {
          margin: auto;
        }
      }

      h2 {
        margin: var(--spacing-xxxs) 0 var(--spacing-xxxs) 0;
      }
    }

    .modalAvaliations {
      .star-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xxxs);
        .top-container {
          display: flex;
          justify-content: center;
          gap: var(--spacing-xxxs);
          h1 {
            font-size: var(--font-size-display);
            font-weight: var(--font-weight-medium);
          }
          .star {
            display: flex;
            flex-direction: column;
            align-items: center;

            p {
              font-size: var(--font-size-sm);
            }
          }
        }
        .bot-container {
          .stars-container {
            display: flex;
            flex-wrap: wrap;
            padding: 0 var(--spacing-nano);
            div {
              width: 100%;
              display: flex;
              align-items: center;

              p {
                font-size: var(--font-size-md);
              }
            }
          }
        }
      }
    }
  }
`
