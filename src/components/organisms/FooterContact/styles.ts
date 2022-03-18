import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  background: var(--white);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: var(--spacing-xs) var(--spacing-md);

  h1 {
    margin-bottom: var(--spacing-xxxs);
  }

  span {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-nano);

    svg {
      margin-right: var(--spacing-nano);
    }
  }

  .map-container {
    width: 500px;
    height: 250px;
    border-radius: 36px;
    margin: auto 0;
  }

  ${[sizes.down('md')]} {
    width: 100%;
    margin-bottom: 0;
    border-radius: var(--border-radius-gg) var(--border-radius-gg) 0 0;
    flex-direction: column;

    .map-container {
      width: 100%;
      height: 250px;
      margin-top: var(--spacing-xxs);
    }
  }
`

export const ContainerTerms = styled.div`
  padding-top: var(--spacing-xs);
`
