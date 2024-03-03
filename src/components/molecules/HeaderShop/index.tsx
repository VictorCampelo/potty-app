import { Container } from './styles'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { BiUserCircle, BiHome } from 'react-icons/bi'
import { MdKeyboardArrowDown } from 'react-icons/md'
interface HeaderProps {
  isMain: boolean
}
const Header = ({ isMain }: HeaderProps) => {
  const { user } = useAuth()
  const firstName = user?.firstName?.split(' ')[0]

  return (
    <Container isMain={isMain || false}>
      <div className='logo'>
        <a href='/'>
          <img src='/images/logo.svg' alt='logo' />
        </a>
      </div>
      <nav>
        {user ? (
          <div className='userContainer'>
            <BiHome size={40} color='var(--color-primary)' />
            <div>
              <BiUserCircle size={40} color='var(--color-secondary-darker)' />
              <span>
                {firstName} {user?.lastName}
              </span>
              <MdKeyboardArrowDown
                size={30}
                color='var(--color-secondary-darker)'
              />
            </div>
          </div>
        ) : (
          <>
            <Link href='/categorias'>
              <a>Categorias</a>
            </Link>

            <Link href='/produtos'>
              <a>Produtos</a>
            </Link>

            <Link href='/contatos'>
              <a>Contatos</a>
            </Link>

            <Link href='/quem-somos'>
              <a>Quem somos</a>
            </Link>
            <div className='authContainer'>
              <Link href='/cadastro/lojista'>
                <a className='register'>Criar conta</a>
              </Link>
              <Link href='/login'>
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
