import { useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
// import WavesBg from '@/components/atoms/WavesBg'

import { useAuth } from '@/contexts/AuthContext'

import toast from '@/utils/toast'

import { FiLock } from 'react-icons/fi'
import { FaFacebook } from 'react-icons/fa'
import { AiFillGoogleCircle } from 'react-icons/ai'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Wrapper } from '@/styles/GlobalStyle'
import { Container } from './styles'

import type { SignInDTO } from '@/@types/requests'

// TODOS: fix page styles

const Login = () => {
  const { signIn } = useAuth()

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(8, 'Mínimo 8 caracteres')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const [rememberUser, setRememberUser] = useState(false)

  const handleSignIn = async (dto: any) => {
    try {
      const user = await signIn(dto as SignInDTO)

      if (user?.role === 'USER') {
        await Router.push('/')
      } else if (user?.role === 'OWNER') {
        await Router.push('/dashboard')
      }
    } catch ({ response }) {
      const { status }: any = response

      if ([401, 404, 403].includes(status)) {
        toast({ message: 'Email ou senha incorretos', type: 'error' })
      } else {
        if (status === 412) {
          await Router.push('/auth/register/confirmation-token')
        } else {
          toast({
            message: 'Erro interno, tente novamente mais tarde',
            type: 'error'
          })
        }
      }
    }
  }

  return (
    <Wrapper>
      <Head>
        <title>Login</title>
      </Head>

      <Container>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className='title'>
            <h1>Login</h1>
            <Image src='/images/logo.svg' alt='logo' width={150} height={80} />
          </div>

          <div className='inputContainerLogin'>
            <Input
              label='Email'
              type='email'
              name='email'
              placeholder='exemplo@gmail.com'
              register={register}
              errors={errors}
            />

            <Input
              label='Senha'
              type='password'
              name='password'
              placeholder='********'
              icon={<FiLock size={20} color='var(--black-800)' />}
              register={register}
              errors={errors}
            />
          </div>

          <Checkbox
            label='Lembrar usuário'
            confirm={rememberUser}
            toggleConfirm={() => setRememberUser(!rememberUser)}
            recovery
          />

          <div className='buttonContainer'>
            <Button isLoading={isSubmitting} type='submit'>
              Entrar
            </Button>
          </div>

          <div className='divisorContainer'>
            <div className='divisor' />
            ou
            <div className='divisor' />
          </div>

          <div className='social'>
            <AiFillGoogleCircle size={50} color='var(--gray-700)' />
            <FaFacebook size={50} color='var(--gray-700)' />
          </div>

          <div className='register'>
            Não possui conta? <Link href='register'>Cadastre-se!</Link>
          </div>
        </form>
      </Container>

      {/* <WavesBg /> */}
    </Wrapper>
  )
}

export default Login
