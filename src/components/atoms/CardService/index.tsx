import { ReactElement } from 'react'
import useMedia from 'use-media'
import { Container } from './styles'

type CardServiceProps = {
  background: string
  title: string
  icon: ReactElement
}

export const CardService = ({ background, title, icon }: CardServiceProps) => {
  const widthScreen = useMedia({ minWidth: '426px' })
  return (
    <Container background={background}>
      <div className="imgContainer">
        {!!icon && icon} {!widthScreen && <p>{title}</p>}
      </div>
      {widthScreen && <p>{title}</p>}
    </Container>
  )
}
