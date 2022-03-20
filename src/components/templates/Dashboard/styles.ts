import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  min-height: 100vh;
  max-height: 1440px;
  display: flex;
  flex-direction: row;
  padding: 0 var(--spacing-xs);
  gap: var(--spacing-xs);
  margin: auto;

  ${[sizes.down('md')]} {
    flex-direction: column-reverse;
    padding: 0;
    gap: 0;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`
