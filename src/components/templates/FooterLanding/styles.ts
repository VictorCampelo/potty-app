import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Register = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 11rem;

  ${[sizes.down('md')]} {
    gap: 3rem;
  }

  padding: var(--spacing-lg);

  background-color: var(--color-secondary-darker);

  h1 {
    font-size: var(--font-size-lg);
    color: var(--white);
  }

  p {
    color: var(--white);
  }

  button {
    width: 245px;
    height: 45px;

    padding: 0;
    margin: 0;

    text-transform: uppercase;

    font-weight: normal;
    font-size: var(--font-size-xxxs);
  }
`
