import styled from 'styled-components'

interface PropsContainer {
  color: string
}

export const Container = styled.div<PropsContainer>`
  width: 100%;

  margin-top: var(--spacing-lg);
  padding: var(--spacing-md) 0;

  background: linear-gradient(
    100deg,
    rgba(172, 78, 223, 0.2) 0%,
    rgba(255, 122, 0, 0.2) 100%
  );

  h1 {
    text-align: center;
    color: ${(props) => props.color};
    margin-bottom: var(--spacing-xxl);
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    padding: 0 var(--spacing-quarck);
  }
`
