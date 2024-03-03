import styled from 'styled-components'

interface ContainerProps {
  confirm: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: var(--color-primary);
    display: inline;
  }

  .btn {
    width: 20px;
    height: 18px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 4px;
    border: 1px solid var(--black-800);
    background: var(--white);
    ${(props) => props.confirm && 'border: none;'}
    margin-right: 10px;
    /* padding: 4px; */
  }

  .check {
    display: flex;
    align-items: center;

    label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gray-600);
      margin-left: 0.2rem;
    }
  }
`
