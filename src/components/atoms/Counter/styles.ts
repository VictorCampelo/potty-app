import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.section`
  width: 80px;
  height: 64px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  padding: 1rem;

  ${[sizes.down('sm')]} {
    padding: 0;
    border-radius: 4px;
    p {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0 1rem 0 1rem;
    }
  }
`

export const Button = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  color: var(--color-primary);
  font-weight: 600;
  background: white;
  font-size: 1.5rem;

  ${[sizes.down('sm')]} {
    display: flex;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
  }

  &.inactive {
    color: var(--black-500);
  }
`
