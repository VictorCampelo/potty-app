import React from 'react'

import { RiPencilFill } from 'react-icons/ri'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { PulseLoader } from 'react-spinners'

import { Container } from './styles'

interface Props {
  title?: string
  quantStar?: number
  description?: string
  imgSrc?: any
  coverSrc?: any
  isLoading?: boolean
  button: any
  voidText?: string
}

const CardDescription = ({
  title,
  quantStar = 0,
  description,
  imgSrc,
  coverSrc,
  isLoading,
  button,
  voidText
}: Props) => {
  const stars = []

  if (quantStar > 5) quantStar = 5

  for (let i = 0; i < quantStar; i++) {
    stars.push(<AiFillStar key={i} size={20} color='var(--yellow)' />)
  }

  for (let i = quantStar; i < 5; i++) {
    stars.push(<AiOutlineStar key={i} size={20} color='var(--yellow)' />)
  }

  return (
    <Container>
      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <PulseLoader size={5} color='var(--color-primary)' />
        </div>
      ) : (
        <>
          <div className='top'>
            <section>
              <img
                id='banner'
                src={coverSrc || '/images/capa.png'}
                alt='Banner'
              />
              <button onClick={button}>
                Editar
                <RiPencilFill size={15} className='icon' />
              </button>
              <div id='icon'>
                <img src={imgSrc || '/images/icon.png'} alt='Avatar da loja' />
                <h1>{title}</h1>
                <div className='stars'>
                  <div>{stars}</div>
                  <p>({quantStar})</p>
                </div>
              </div>
            </section>
          </div>
          {voidText ? (
            <div className='bottom'>
              <h1>Descrição</h1>
              <div className='voidText'>
                <p>{voidText}</p>
              </div>
            </div>
          ) : (
            <div className='bottom'>
              <h1>Descrição</h1>

              {description ? (
                <p>{description}</p>
              ) : (
                <span>Nenhuma descrição cadastrada...</span>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default CardDescription
