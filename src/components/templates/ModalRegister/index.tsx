import React from 'react'

import Router from 'next/router'

import Modal from '@/components/molecules/Modal'
import Button from '@/components/atoms/Button'

import {
  Container,
  ContainerButtons,
  Title,
  Description,
  Image
} from './styles'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ModalRegister = ({ isOpen, onClose }: Props) => {
  return (
    <Modal showCloseButton={true} setModalOpen={onClose} modalVisible={isOpen}>
      <Container>
        <Title>Realize seu cadastro!</Title>

        <Description>
          Para finalizar, você pode entrar em sua conta, caso já tenha uma, ou
          criar uma.
        </Description>

        <Description bold={true}>
          Lembrando que você terá acesso a promoções exclusivas, além de ter
          acesso à experiência completa na nossa plataforma.
        </Description>

        <ContainerButtons>
          <Button onClick={() => Router.push('/entrar')}>ENTRAR</Button>

          <Button onClick={onClose} skin='secondary'>
            Continuar sem entrar
          </Button>
        </ContainerButtons>

        <Image
          width={300}
          height={350}
          src='/images/homem-no-celular.png'
          alt='Homem vendo o celular'
        />
      </Container>
    </Modal>
  )
}

export default ModalRegister
