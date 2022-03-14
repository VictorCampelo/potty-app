import styled from 'styled-components'

interface PropsContainer {
  color?: string
}

export const Container = styled.div<PropsContainer>`
  width: 100%;

  margin: var(--spacing-lg) 0;

  h1 {
    text-align: center;
    color: ${(props) => props.color || 'var(--color-secondary-darker)'};
    margin-bottom: var(--spacing-xxxl);
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-xxl);
    padding: 0 var(--spacing-sm);
  }
`
