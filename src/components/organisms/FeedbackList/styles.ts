import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 315px;
  margin-bottom: 10px;

  border: 1px solid #d8d9dd;
  box-sizing: border-box;
  border-radius: 25px;

  padding: var(--spacing-xxxs);

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xxxs);
    .left {
      display: flex;
      align-items: center;
      gap: var(--spacing-xxxs);
      h1 {
        font-style: normal;
        font-weight: 500;
        font-size: 1rem;

        color: #363f4e;
      }
      .stars {
        display: flex;
      }
    }
  }
`

export const Text = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 18px;

  color: #6c7079;
`

export const Time = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 0.65rem;

  text-align: right;
  color: #b2b5ba;

  margin: 5px 5px 0px 0px;
`
