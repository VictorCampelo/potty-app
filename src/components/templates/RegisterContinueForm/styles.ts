import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Wrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);

  .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--spacing-xxs);

    ${[sizes.down('sm')]} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xxxs);
  }

  .row {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--spacing-xxxs);
  }

  .buttonsContainer {
    width: max-content;
    margin: 0 auto;
  }
`
