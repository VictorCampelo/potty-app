import styled from 'styled-components'

interface ContainerProps {
  size: 'small' | 'medium'
  disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;

  .rules {
    span {
      text-decoration: underline;
      color: var(--color-secondary);
    }
  }

  .btn {
    ${(props) =>
      props.size === 'small' &&
      'min-width: 16px;width: 16px;height: 16px;height: 16px;'}
    ${(props) =>
      props.size === 'medium' &&
      'min-width: 20px;width: 20px;min-height: 20px;height: 20px;'}

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 5px;
    border: 1px solid black;
    background: transparent;

    margin-right: 10px;
    padding: 4px;
  }

  .check .btn {
    ${(props) => props.disabled && 'border: 1px solid var(--gray-200);'}
  }
  .check label {
    ${(props) => props.disabled && 'opacity: 0.5;'}
  }

  .check {
    display: flex;
    align-items: center;

    label {
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  a {
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: underline;
  }
`
