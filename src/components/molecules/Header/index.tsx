import Link from 'next/link'

import { useAuth } from '@/contexts/AuthContext'

import IconButton from '@/components/atoms/IconButton'

import { BiUserCircle, BiHome, BiLogOut } from 'react-icons/bi'

import { Container } from './styles'

const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <Container>
      <Link passHref href='/'>
        <img
          src='/images/logo.svg'
          alt='Logo'
          className='logo'
          width={128}
          height={64}
        />
      </Link>
      <nav>
        {user ? (
          <div className='userContainer'>
            <IconButton>
              <BiHome size={32} color='var(--color-primary)' />
            </IconButton>

            <div>
              <BiUserCircle size={36} color='var(--color-secondary-darker)' />
              <span>
                {user.firstName} {user?.lastName}
              </span>
            </div>

            <IconButton onClick={signOut}>
              <BiLogOut size={28} color='var(--color-primary)' />
            </IconButton>
          </div>
        ) : (
          <>
            <div className='links'>
              <Link passHref href='/categorias'>
                <a>Categorias</a>
              </Link>

              <Link passHref href='/produtos'>
                <a>Produtos</a>
              </Link>

              <Link passHref href='/contatos'>
                <a>Contatos</a>
              </Link>

              <Link passHref href='/quem-somos'>
                <a>Quem somos</a>
              </Link>
            </div>
            <div className='authContainer'>
              <Link passHref href='/cadastro'>
                <a className='register'>Criar conta</a>
              </Link>
              <Link passHref href='/entrar'>
                <button>Entrar</button>
              </Link>
            </div>
          </>
        )}
      </nav>
    </Container>
  )
}

export default Header
