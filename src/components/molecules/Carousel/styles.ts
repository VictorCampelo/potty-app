import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Wrapper = styled.div`
  width: 114%;
  display: flex;
  align-items: center;
  transform: translateX(-7%);
  padding: 1rem 2rem;

  ${[sizes.down('sm')]} {
    width: 114%;
    flex-direction: column;
    padding: 0 0 0 var(--spacing-xs);

    .buttonsContainer {
      display: flex;

      width: 100%;
      margin-top: var(--spacing-xxxs);

      gap: 1.5rem;
      justify-content: flex-end;
      margin-right: var(--spacing-xxxs);
    }
  }
`

type ButtonProp = {
  position?: string
}
export const Button = styled.button<ButtonProp>`
  width: 2rem;
  height: 2rem;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;

  width: 2rem;
  height: 2rem;

  border: none;
  border-radius: var(--border-radius-md);

  ${(props) => props.position === 'right' && 'border-radius: 0 50% 50% 0;'}
  ${(props) => props.position === 'left' && 'border-radius: 50% 0 0 50%;'}

  background: var(--white);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const Container = styled.div`
  display: flex;
  max-width: 100vw !important;
  /* padding: var(--spacing-nano) var(--spacing-quarck); */
  overflow-x: scroll;
  scroll-behavior: smooth;
  gap: 1rem;
  scrollbar-width: none;
  padding: var(--spacing-nano) 0;
  ${[sizes.down('sm')]} {
    padding: var(--spacing-nano);
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
type ItemProps = {
  isProduct: boolean
}

export const Item = styled.div<ItemProps>`
  display: flex;
  flex: none;
  align-items: center;
  flex-direction: column;

  width: 260px;
  height: 360px;
  background: var(--white);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: var(--border-radius-gg);

  overflow: hidden;
  cursor: pointer;
  position: relative;
  margin-top: var(--spacing-xxxs);

  ${[sizes.down('sm')]} {
    width: 175px;
    height: 300px;
    border-radius: var(--border-radius-md);

    ${(props) => props.isProduct === false && 'width: 329px;'}
    ${(props) => props.isProduct === false && 'height: 120px;'}
    ${(props) => props.isProduct === false && 'flex-direction: row;'}
  }

  .btnProductLeft {
    position: absolute;
    left: var(--spacing-quarck);
    top: 30%;
    z-index: 3;
  }

  .btnProductRight {
    position: absolute;
    right: var(--spacing-quarck);
    top: 30%;
    z-index: 3;
  }

  .promo {
    position: absolute;
    z-index: 3;
    right: 0;
    width: 75px;
  }

  .head {
    display: flex;
    align-items: center;

    width: 100%;
    height: 190px;
    overflow: hidden;

    ${(props) => props.isProduct && 'padding: 1.2rem 1.2rem 0 1.2rem;'}
    ${(props) => props.isProduct && 'height: 300px;'}

    img {
      ${(props) => props.isProduct && 'border-radius: 10px;'}
    }
  }

  .logo {
    display: flex;

    width: 4rem;
    height: 4rem;

    border-radius: 50%;

    text-align: left;
    border: 4px solid white;
    margin-top: calc(var(--spacing-sm) * -1);
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    ${[sizes.down('sm')]} {
      width: 120px;
      height: 90px;
      margin: auto;
      margin-left: var(--spacing-xxxs);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  img.store-banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .infoProduct {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;

    margin-top: var(--spacing-quarck);
    padding: 0 var(--spacing-xxxs) var(--spacing-xxxs) var(--spacing-xxxs);

    bottom: 0;
    span {
      font-size: 0.7rem;
    }
    h3 {
      content: '...';
      font-size: var(--font-size-md);
      color: var(--color-primary);
    }
  }

  .info,
  .infoProduct {
    .stars {
      display: flex;
      align-items: center;

      small {
        font-size: var(--font-size-xxxxs);
        margin-left: var(--spacing-quarck);
        color: var(--gray-600);
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    margin-top: var(--spacing-nano);
    padding-bottom: var(--spacing-xxxs);
    border-bottom: var(--border-width-hairline) solid var(--gray-100);

    ${[sizes.down('sm')]} {
      border-bottom: 0;
      align-items: flex-start;
      margin-left: var(--spacing-xxxs);

      h3 {
        font-size: var(--font-size-md);
      }
    }

    .stars {
      padding-left: 0.8rem;

      ${[sizes.down('sm')]} {
        padding: 0;
      }
    }
  }

  .city {
    display: flex;
    align-items: center;

    margin-top: var(--spacing-nano);
    color: var(--gray-600);
    gap: 10px;
  }
`
