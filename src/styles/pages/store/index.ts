import styled from 'styled-components'

interface CardProps {
  noPadding?: boolean
}

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: max-content;
  height: 100%;
  background-color: #fff;
  border-radius: 32px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  ${(props) => !props.noPadding && 'padding: 20px;'}

  h2 {
    color: white;
    font-size: 20px;
    padding: 1rem 1.5rem;
    background-color: var(--color-primary);
    border-radius: 32px 32px 0 0;
  }
`

export const StoreAvatar = styled.img`
  width: 138px;
  height: 138px;
  border-radius: 50%;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const Description = styled.p`
  font-weight: 500;
  font-size: 20px;
  color: var(--black-800);
`

export const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span:nth-child(3) {
    padding: 0 2px;
    color: white;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 600;
    background: var(--color-secondary);
    margin-left: auto;
  }
`

interface TextProps {
  active?: boolean
  pointer?: boolean
}

export const Text = styled.p<TextProps>`
  font-size: 16px;
  font-weight: bold;

  ${(props) => props.active && 'color: var(--color-secondary);'}

  ${(props) =>
    props.pointer &&
    `cursor: pointer; 
    &:hover { opacity: 0.7 }
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
   `}
`
