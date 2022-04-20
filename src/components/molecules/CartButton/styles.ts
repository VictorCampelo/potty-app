import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  border: none;
  right: var(--spacing-lg);
  bottom: var(--spacing-lg);
  background: var(--color-primary);
  height: 62px;
  color: var(--white);
  border-radius: var(--border-radius-gg);
  padding: 0 var(--spacing-xxs);
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  z-index: 9999;

  ${[sizes.down('sm')]} {
    right: var(--spacing-xxs);
    bottom: var(--spacing-xs);
    padding: 0 var(--spacing-xxs);
  }
`

export const Price = styled.p`
  margin-left: var(--spacing-xxxs);
  color: var(--white);
  font-size: var(--font-size-xxs);
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;

  img {
    width: 28px;
    height: 28px;

    ${sizes.down('sm')} {
      width: 24px;
      height: 24px;
    }
  }
`

export const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--color-secondary);
  position: absolute;
  padding: 0 var(--spacing-nano);
  top: var(--spacing-nano);
  right: -10px;
  color: var(--white);

  font-size: var(--font-size-xxxxs);
  border-radius: var(--border-radius-sm);
`
