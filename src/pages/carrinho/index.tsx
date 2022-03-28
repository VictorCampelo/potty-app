import React from 'react'

import Head from 'next/head'
import Router from 'next/router'

import Header from '@/components/molecules/Header'
import Counter from '@/components/atoms/Counter'

import { useCart } from '@/contexts/CartContext'

import formatToBrl from '@/utils/formatToBrl'
import { useMedia } from 'use-media'

import { Player } from '@lottiefiles/react-lottie-player'

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaCheck } from 'react-icons/fa'
import { IoTrashOutline } from 'react-icons/io5'
import { AiFillCamera } from 'react-icons/ai'

import {
  EmptyCartContainer,
  Container,
  Content,
  CartContainer,
  CartContainerFooter,
  CartHead,
  CartProduct,
  SeeProductsButton
} from '@/styles/pages/cart'

const CartPage = () => {
  const {
    products,
    selectAllProducts,
    removeProduct,
    toggleSelectProduct,
    clearCart,
    totalPrice,
    totalItems
  } = useCart()

  const widthScreen = useMedia({ minWidth: '640px' })

  const handleMakeCheckout = () => {
    Router.push('carrinho/continuar')
  }

  return (
    <>
      <Head>
        <title>Carrinho | Boa de Venda</title>
      </Head>

      <Header />

      <Container>
        <Content>
          <div className='header' onClick={() => Router.push('/')}>
            {!widthScreen && <FiArrowLeft size={28} color='var(--black-800)' />}

            <h1>Meu carrinho</h1>
          </div>

          {products.length ? (
            <>
              <div className='checkbox'>
                <div className='check'>
                  <button
                    type='button'
                    id='btn'
                    className='btn'
                    onClick={selectAllProducts}
                  >
                    {products.findIndex(({ selected }) => selected) === -1 && (
                      <FaCheck color='var(--gray-800)' />
                    )}
                  </button>
                  <label htmlFor='btn'>Selecionar Todos</label>
                </div>
                <div className='cupomContainer'>
                  <img src='/images/ticket.svg' alt='Foto de um ticket' />
                  <p
                    style={{
                      color: 'var(--color-secondary)',
                      marginRight: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Adicionar cupom
                  </p>
                </div>
              </div>

              <CartContainer>
                <CartHead>
                  <section style={{ flex: 5, justifyContent: 'flex-start' }}>
                    <span>Produto</span>
                  </section>

                  <section>
                    <span>Quantidade</span>
                  </section>

                  <section>
                    <span>Preço</span>
                  </section>

                  <section style={{ flex: 1 }} />
                </CartHead>

                {products.map((it) => (
                  <>
                    <CartProduct key={it.id}>
                      {widthScreen ? (
                        <>
                          <section
                            style={{ flex: 5, justifyContent: 'flex-start' }}
                          >
                            <div className='imgContainer'>
                              <img
                                src={it?.files[0]?.url}
                                alt='Imagem do produto'
                              />
                            </div>

                            <span>{it.title}</span>
                          </section>

                          <Counter product={it} />

                          <section>
                            <strong>
                              {formatToBrl(it.priceWithDiscount || it.price)}
                            </strong>
                          </section>

                          <section style={{ flex: 1 }}>
                            <button
                              className='exclude'
                              onClick={() => {
                                removeProduct(it.id)
                              }}
                            >
                              <IoTrashOutline size={24} color='var(--red)' />

                              <strong>Excluir</strong>
                            </button>
                          </section>
                        </>
                      ) : (
                        <>
                          <div className='checkbox'>
                            <div className='check'>
                              <button
                                type='button'
                                id='btn'
                                className='btn'
                                onClick={() => toggleSelectProduct(it.id)}
                              >
                                {it.selected && (
                                  <FaCheck color='var(--gray-800)' />
                                )}
                              </button>
                            </div>
                          </div>

                          <section
                            className='sectionImg'
                            style={{ flexGrow: 1, height: '100%' }}
                          >
                            <div className='imgContainer'>
                              <AiFillCamera size={28} color='white' />
                            </div>
                          </section>
                          <section
                            className='spanProductInformation'
                            style={{ flexGrow: 2 }}
                          >
                            <span>{it.title}</span>
                            <strong>
                              {formatToBrl(it.priceWithDiscount || it.price)}
                            </strong>
                            <Counter product={it} />
                          </section>
                        </>
                      )}
                    </CartProduct>

                    {!widthScreen && (
                      <p className='subTotal'>
                        Subtotal:{' '}
                        <strong style={{ color: 'var(--color-primary)' }}>
                          {formatToBrl(
                            (it.priceWithDiscount || it.price) * it.amount
                          )}
                        </strong>
                      </p>
                    )}
                  </>
                ))}
              </CartContainer>

              <CartContainerFooter
                disabled={products.findIndex(({ selected }) => selected) !== -1}
              >
                <div className='info'>
                  <div>
                    <span>Total: </span>
                    <strong>{formatToBrl(totalPrice)}</strong>
                  </div>
                  <span className='spanBottom'>
                    {totalItems} {totalItems > 1 ? 'Itens' : 'Item'}
                    {!widthScreen && (
                      <a onClick={() => clearCart()}>Esvaziar Carrinho</a>
                    )}
                  </span>
                </div>

                <div
                  className='buttonContainer'
                  style={widthScreen ? undefined : { display: 'none' }}
                >
                  <button
                    className='empty'
                    onClick={() => {
                      clearCart()
                    }}
                  >
                    <IoTrashOutline size={24} color='var(--red)' />
                    ESVAZIAR CARRINHO
                  </button>

                  <button className='finish' onClick={handleMakeCheckout}>
                    CONTINUAR
                  </button>
                </div>
                <div
                  className='buttonContainerMob'
                  style={widthScreen ? { display: 'none' } : undefined}
                >
                  <button className='finish' onClick={handleMakeCheckout}>
                    <FiArrowRight size={24} color='white' />
                    <p>CONTINUAR</p>
                  </button>
                </div>
              </CartContainerFooter>
            </>
          ) : (
            <EmptyCartContainer>
              <Player
                autoplay
                loop
                src='/animations/cart-animation.json'
                style={{ width: '250px', marginBottom: '40px' }}
              />
              <h1>Carrinho vazio!</h1>

              <p>
                Você ainda não possui itens no seu <br /> carrinho
              </p>

              <SeeProductsButton onClick={() => Router.push('/')}>
                Ver produtos
              </SeeProductsButton>
            </EmptyCartContainer>
          )}
        </Content>
      </Container>
    </>
  )
}

export default CartPage
