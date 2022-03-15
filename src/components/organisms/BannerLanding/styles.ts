import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  background-color: white;

  img {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border-radius: 0px 0px 57px 0px;
    background-color: white;
  }

  ${[sizes.down('md')]} {
    img {
      display: none;
    }
  }

  .texts {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);

    padding: var(--spacing-xs);

    button {
      width: 65%;
      height: 50px;
      font-size: var(--font-size-xs);
    }
  }
`
