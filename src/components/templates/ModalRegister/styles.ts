import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.div`
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${sizes.down('md')} {
    width: 100%;
  }
`

export const ContainerButtons = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    margin: 0;
  }
`

export const Title = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  color: var(--color-secondary-darker);
`

interface DescriptionProps {
  bold?: boolean
}

export const Description = styled.p<DescriptionProps>`
  max-width: 550px;
  font-family: 'Poppins', 'sans-serif';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  ${(props) => (props.bold ? 'font-weight: bold;' : '')}
`

export const Image = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;

  ${sizes.down('md')} {
    display: none;
  }
`
