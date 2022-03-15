import styled from 'styled-components'

interface ContainerProps {
  error?: boolean
  disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  width: auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;

  .bar {
    width: 2px;
    height: 100%;
    background: var(--gray-200);
  }

  .labelContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding-right: 6px;
    margin-bottom: 0.5rem;

    label {
      font-size: 1rem;
      color: var(--black-800);

      .text-error {
        ${(props) => props.error && 'color: var(--red);'}
      }
    }

    span {
      color: var(--red);
      font-size: 0.875rem;
      font-weight: 500;
      padding-left: 3px;
      padding-top: 5px;
    }
  }

  .inputContainer {
    height: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    padding-left: 1rem;
    background: white;
    overflow: hidden;
    border: 1px solid var(--black-800);

    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 11px;
      font-size: 0.875rem;
      background: inherit;
      padding-right: 10px;
      ${(props) => props.error && 'color: var(--red);'}
      cursor: text;
    }

    input:focus {
      outline: none;
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

  .inputContainer,
  .inputContainer input {
    ${(props) => props.disabled && 'background: #d8d9dd;'}
  }
`
