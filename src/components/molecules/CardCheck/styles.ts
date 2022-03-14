import styled from 'styled-components'

export const Container = styled.div`
  width: 300px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-nano);

  background-color: white;

  border-radius: 20px;

  padding: var(--spacing-xxs);
  padding-top: var(--spacing-sm);

  svg {
    margin-top: -100px;
  }

  p,
  span {
    text-align: center;
  }

  p {
    font-weight: bold;
    font-size: var(--font-size-xxs);

    color: var(--black-800);
  }

  span {
    font-size: var(--font-size-xxxs);

    color: var(--gray-600);
  }
`
