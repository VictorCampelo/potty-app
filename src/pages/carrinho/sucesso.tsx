import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import Header from '@/components/molecules/Header'
import Button from '@/components/atoms/Button'

import { Container, Content, Finish } from '@/styles/pages/cart/success'

const CartSuccess = () => {
  return (
    <>
      <Head>
        <title>Carrinho | Boa de Venda</title>
      </Head>

      <Header />

      <Container>
        <Content>
          <Finish>
            <img src='/images/finishCart.png' alt='Compra finalizada' />

            <h1>Obrigado por visitar nossa loja!</h1>

            <p>Você foi encaminhado para o WhatsApp do vendedor.</p>

            <Button>
              <Link href='/carrinho'>Voltar para a loja</Link>
            </Button>

            <span>
              Erro ao redirecionar? <Link href='/carrinho'>Clique aqui</Link>
            </span>
          </Finish>
        </Content>
      </Container>
    </>
  )
}

export default CartSuccess
