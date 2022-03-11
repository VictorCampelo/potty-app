import { Container } from './styles'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@images/logo.svg'
import { BiUserCircle, BiHome } from 'react-icons/bi'
import { MdKeyboardArrowDown } from 'react-icons/md'

const Header = () => {
  const user: any = null
  const firstName = user?.firstName?.split(' ')[0]

  return (
    <Container>
      <Link passHref href='/'>
        <Image src={Logo} alt='Logo' className='logo' width={128} height={64} />
      </Link>
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
              <Link passHref href='/cadastro/lojista'>
                <a className='register'>Criar conta</a>
              </Link>
              <Link passHref href='/login'>
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
