import React from 'react'

import Navbar from '@/components/organisms/Navbar'

import { IoHomeOutline, IoExitOutline } from 'react-icons/io5'
import { BiStore, BiClipboard } from 'react-icons/bi'
import { FiBox } from 'react-icons/fi'

import { Container } from './styles'

interface Props {
  children: React.ReactNode
}

const Dashboard = ({ children }: Props) => {
  const links = [
    {
      name: 'Início',
      icon: IoHomeOutline,
      href: '/dashboard'
    },
    {
      name: 'Loja',
      icon: BiStore,
      href: '/dashboard/loja'
    },
    {
      name: 'Pedidos',
      icon: BiClipboard,
      href: '/dashboard/pedidos'
    },
    {
      name: 'Catálogo',
      icon: FiBox,
      href: '/dashboard/catalogo'
    },
    {
      name: 'Sair',
      icon: IoExitOutline,
      color: 'var(--red)'
    }
  ]

  return (
    <Container>
      <Navbar links={links} />
      <div>{children}</div>
    </Container>
  )
}

export default Dashboard
