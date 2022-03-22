import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const List = styled.div`
  height: 100%;
  max-height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-nano);
  padding: var(--spacing-nano);
  overflow: auto;

  ${sizes.up('2xl')} {
    max-height: 240px;
  }
`
