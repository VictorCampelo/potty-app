import React from 'react'

import Head from 'next/head'
import Image from 'next/image'

import WavesBg from '@/components/molecules/WavesBg'

import { FaFacebook } from 'react-icons/fa'
import { AiFillGoogleCircle } from 'react-icons/ai'

import { Wrapper } from '@/styles/GlobalStyle'
import { Container } from './styles'

import IconButton from '@/components/atoms/IconButton'

interface Props {
  size?: 'md' | 'lg' | 'xl'
  title: string
  socialAuth?: boolean
  children: React.ReactNode
  footer: React.ReactNode
}

const AuthPage = ({
  size = 'md',
  title,
  socialAuth,
  children,
  footer
}: Props) => {
  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
      </Head>

      <Container size={size}>
        <div className='logo'>
          <Image src='/images/logo.svg' alt='logo' width={156} height={96} />
        </div>

        <div className='card'>
          <div className='title'>
            <h1>{title}</h1>
            <div className='logo'>
              <Image
                src='/images/logo.svg'
                alt='logo'
                width={150}
                height={80}
              />
            </div>
          </div>

          {children}

          {socialAuth && (
            <>
              <div className='container-divisor'>
                <div className='divisor' />
                ou
                <div className='divisor' />
              </div>

              <div className='social'>
                <IconButton>
                  <AiFillGoogleCircle size={56} color='var(--gray-700)' />
                </IconButton>
                <IconButton>
                  <FaFacebook size={51} color='var(--gray-700)' />
                </IconButton>
              </div>
            </>
          )}

          <div className='footer'>{footer}</div>
        </div>
      </Container>

      <WavesBg />
    </Wrapper>
  )
}

export default AuthPage
