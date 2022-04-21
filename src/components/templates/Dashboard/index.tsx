import React from 'react'

import Navbar from '@/components/organisms/Navbar'

import { IoHomeOutline, IoExitOutline } from 'react-icons/io5'
import { BiStore, BiClipboard } from 'react-icons/bi'
import { FiBox } from 'react-icons/fi'

import { Wrapper, Container } from './styles'
import { useAuth } from '@/contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

const Dashboard = ({ children }: Props) => {
  const { signOut } = useAuth()

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
      color: 'var(--red)',
      onClick: signOut
    }
  ]

  return (
    <Wrapper>
      <Navbar links={links} />
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default Dashboard
