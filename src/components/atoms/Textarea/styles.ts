import styled from 'styled-components'

interface ContainerProps {
  error: boolean
}

export const Container = styled.div<ContainerProps>`
  width: auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;

  .labelContent {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 6px;
    margin-bottom: 0.5rem;

    label {
      font-size: 1rem;
      ${(props) => props.error && 'color: var(--red);'}
    }

    span {
      color: var(--red);
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  .inputContainter {
    height: 8rem;

    display: flex;
    justify-content: center;

    border-radius: 8px;
    padding-left: 1rem;
    padding-top: 0.5rem;
    background: white;
    overflow: hidden;
    border: 1px solid var(--black-800);

    cursor: text;

    textarea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 0.875rem;
      background: inherit;
    }

    svg {
      margin-right: 1rem;
      ${(props) => props.error && 'color: var(--red) !important;'}

      &:last-child:hover {
        cursor: pointer;
      }
    }

    ${(props) => props.error && 'border: 1px solid var(--red);'}
  }
`
