import styled from 'styled-components'

interface ContainerProps {
  error: boolean
  flex: number
}

export const Container = styled.div<ContainerProps>`
  width: auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  ${(props) => 'flex: ' + props.flex + ';'}

  .labelContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 6px;
    margin-bottom: 0.5rem;

    label {
      font-size: 1rem;
      color: var(--black-800);
      ${(props) => props.error && 'color: var(--red);'}
    }

    span {
      color: var(--red);
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  .inputContainter {
    width: 100%;
    height: 10rem;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    border-radius: 8px;

    padding-left: 12px;
    padding-right: 12px;
    padding-top: 7px;

    background: white;
    overflow: hidden;
    border: 1px solid var(--black-800);

    cursor: text;

    .textArea {
      width: 100%;
      height: 98%;

      font-size: 0.875rem;
      border: none;
      resize: none;
      border: var(--black-800);

      ${(props) => props.error && 'color: var(--red);'}
    }

    .textArea:focus {
      outline: none;
    }

    ${(props) => props.error && 'border: 1px solid var(--red);'}
  }
`
