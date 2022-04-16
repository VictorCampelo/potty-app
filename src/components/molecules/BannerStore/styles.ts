import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Image = styled.img`
  width: 100vw;
  height: 90%;
  margin: auto;

  ${sizes.down('md')} {
    margin-bottom: var(--spacing-xs);
  }
`

interface IsOpenProps {
  isOpen: boolean
}

export const IsOpen = styled.div<IsOpenProps>`
  position: absolute;
  right: 10px;
  top: 20px;

  background: #ffffff;
  border-radius: 10px 0 0 10px;

  z-index: 1;

  padding: var(--spacing-xxxs) var(--spacing-nano) var(--spacing-nano)
    var(--spacing-nano);

  span:before {
    position: absolute;
    inset: 0;
    top: 6px;
    margin-left: auto;
    margin-right: auto;

    border-radius: 100%;

    content: '';
    width: 10px;
    height: 10px;
    ${(props) =>
      props.isOpen
        ? 'background: var(--color-secondary-darker)'
        : 'background: var(--red)'};
  }

  span {
    font-size: var(--font-size-xxxxs);
    ${(props) =>
      props.isOpen
        ? 'color: var(--color-secondary-darker)'
        : 'color: var(--red)'};
  }
`
