import styled from 'styled-components'
import sizes from '../../../utils/sizes'

interface ContainerProps {
  error: boolean
  flex: number
  search: boolean
  inverse: boolean
}

export const Container = styled.div<ContainerProps>`
  width: auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  ${(props) => 'flex: ' + props.flex + ';'}
  ${(props) => props.search && 'max-width: 90%;'}
  ${(props) => props.inverse && 'max-width: 30%;'}
  ${[sizes.down('lgMob')]} {
    ${(props) => props.inverse && 'max-width: 100%;'}
  }

  .bar {
    width: 2px;
    height: 100%;
    background: var(--gray-200);
  }

  .labelContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 6px;
    margin-bottom: 0.5rem;

    label {
      font-size: 1rem;
      color: var(--black-800);
      ${(props) => props.error && 'color: var(--red);'}
    }

    span {
      color: var(--red);
      font-size: 0.875rem;
      font-weight: 500;
      padding-left: 3px;
    }
  }

  .inputContainter {
    height: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    padding-left: 1rem;
    background: white;
    overflow: hidden;
    border: 1px solid var(--black-800);

    ${(props) => props.search && 'border: 1px solid white;'}
    ${(props) => props.search && 'border-radius: 50px;'}
    ${(props) => props.inverse && 'box-shadow: 0 0 1rem rgba(0,0,0,0.1);'}
    ${(props) => props.inverse && 'border-radius: 15px;'}

    input {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 11px;
      font-size: 0.875rem;
      background: inherit;
      padding-left: 5px;
      ${(props) => props.error && 'color: var(--red);'}
      cursor: text;
    }

    input:focus {
      outline: none;
    }

    svg {
      margin-right: 1rem;
      ${(props) => props.error && 'color: var(--red) !important;'}

      &:last-child:hover {
        cursor: pointer;
      }
    }

    ${(props) => props.error && 'border: 1px solid var(--red);'}
  }
`
