import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  padding: var(--spacing-md) var(--spacing-xs);
  gap: var(--spacing-xs);
  margin: auto;

  ${[sizes.down('lg')]} {
    flex-direction: column-reverse;
    padding: 0;
    gap: 0;

    > div {
      margin: 0 auto;
    }
  }
`

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  overflow: auto;

  ${[sizes.down('lg')]} {
    flex-direction: column;
    align-items: center;
    justify-items: center;
    flex-wrap: nowrap;
    padding-top: var(--spacing-xs);
    padding-bottom: var(--spacing-huge);
  }
`
