import styled from 'styled-components'

interface ContainerProp {
  width?: number
}

export const Container = styled.div<ContainerProp>`
  min-width: 315px;
  ${(props) => props.width && `max-width: ${props.width}px;`}
  width: 100%;
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

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 18px;

    color: #6c7079;
  }

  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 0.85rem;

    text-align: right;
    color: #b2b5ba;

    margin: 5px 5px 0px 0px;
  }
`
