import React, { useRef } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import useMedia from 'use-media'

import { Button, Container, Item, Wrapper } from './styles'
import formatToBrl from '@/utils/formatToBrl'

interface Props {
  data: any[]
  isProduct?: boolean
  promo?: boolean
  buttons?: boolean
}

const Carousel = ({
  data = [],
  isProduct = false,
  promo,
  buttons = true
}: Props) => {
  const carousel = useRef<any>(null)

  function handleScrollLeft(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    carousel.current.scrollLeft -= 276
  }

  function handleScrollRight(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    carousel.current.scrollLeft += 276
  }

  const widthScreen = useMedia({ minWidth: '426px' })

  return (
    <Wrapper>
      {widthScreen && (
        <Button onClick={handleScrollLeft} position='left'>
          <BiChevronLeft size={26} color='black' />
        </Button>
      )}

      <Container ref={carousel}>
        {data.map((store) => (
          <a
            href={`https://${store.formatedName}.${process.env.HOST_NAME}/`}
            key={store.id}
          >
            <Item isProduct={isProduct}>
              <div
                className='head'
                style={
                  widthScreen
                    ? undefined
                    : isProduct
                    ? undefined
                    : { display: 'none' }
                }
              >
                <img
                  src={store.background?.url || '/images/capa-small.png'}
                  className='store-banner'
                  alt='banner'
                />
              </div>

              {!isProduct && (
                <div className='logo'>
                  <img
                    src={store.avatar?.url || '/images/icon.png'}
                    alt='logo'
                  />
                </div>
              )}

              {!isProduct && (
                <>
                  <div className='info'>
                    <h3>{store.name}</h3>

                    <div className='stars'>
                      {[...new Array(store.avgStars)].map((e) => {
                        return (
                          <AiFillStar
                            key={e + 'fill'}
                            size={24}
                            color='var(--gold)'
                          />
                        )
                      })}
                      {[...new Array(5 - store.avgStars)].map((e) => {
                        return (
                          <AiOutlineStar
                            key={e + 'outline'}
                            size={24}
                            color='var(--gold)'
                          />
                        )
                      })}
                      <small>({store.sumStars})</small>
                    </div>
                    {!widthScreen && (
                      <span className='city'>
                        <GoLocation size={15} color='var(--gray-600)' />
                        {store.city}
                      </span>
                    )}
                  </div>
                  {widthScreen && <span className='city'>{store.city}</span>}
                </>
              )}
              {isProduct && (
                <div className='infoProduct'>
                  <p>{store.name}</p>
                  <div className='stars'>
                    <AiFillStar size={20} color='var(--gold)' />
                    <small>{store.sumStars} (110 pedidos)</small>
                  </div>
                  <span>
                    De:{' '}
                    <span style={{ textDecoration: 'line-through' }}>
                      {formatToBrl(3099.99)}
                    </span>
                  </span>
                  <h3>{formatToBrl(2899.99)}</h3>
                  <span>
                    Em até 12x sem juros ou{' '}
                    <strong>{formatToBrl(2899.99)}</strong> à vista
                  </span>
                </div>
              )}
              {isProduct && widthScreen && (
                <>
                  <Button className='btnProductLeft'>
                    <BiChevronLeft size={15} color='black' />
                  </Button>
                  <Button className='btnProductRight'>
                    <BiChevronRight size={15} color='black' />
                  </Button>
                </>
              )}
              {promo && widthScreen && (
                <img src='/images/promo.svg' alt='promo' className='promo' />
              )}
            </Item>
          </a>
        ))}
      </Container>

      {widthScreen && (
        <Button onClick={handleScrollRight} position='right'>
          <BiChevronRight size={26} color='black' />
        </Button>
      )}
      {!widthScreen && buttons && (
        <div className='buttonsContainer'>
          <Button onClick={handleScrollLeft}>
            <BiChevronLeft size={26} color='black' />
          </Button>
          <Button onClick={handleScrollRight}>
            <BiChevronRight size={26} color='black' />
          </Button>
        </div>
      )}
    </Wrapper>
  )
}

export default Carousel
