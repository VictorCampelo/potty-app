import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 76px;
  padding: 10px 20px 10px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #f4f4f6;

  border-radius: var(--border-radius-sm);

  .left-area {
    display: flex;
    align-items: center;

    img {
      width: 45px;
      height: 45px;
    }

    .titles {
      margin-left: 20px;

      display: flex;
      flex-direction: column;

      h2 {
        font-weight: var(--font-weight-medium);
        font-size: var(--font-size-xxxs);

        color: var(--black-800);
      }
      h3 {
        font-family: Poppins;
        font-style: normal;
        font-weight: normal;
        font-size: var(--font-size-xxxxs);

        color: var(--black-800);
      }
    }
  }

  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xxxs);

    text-align: right;

    color: #6598d9;
  }

  span {
    font-family: Poppins;
    font-style: normal;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xxxxs);

    text-align: right;
  }
`
