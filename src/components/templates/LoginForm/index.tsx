import React, { useState } from 'react'

import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'

import AuthRepository from '@/repositories/AuthRepository'

import { setCookie } from 'nookies'

import toast from '@/utils/toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FiLock } from 'react-icons/fi'

import { Container } from './styles'

import type { SignInDTO } from '@/@types/requests'

const authRepository = new AuthRepository()

const LoginForm = () => {
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
      const { user, jwtToken } = await authRepository.singIn(dto as SignInDTO)

      if (rememberUser) {
        setCookie(null, 'bdv.auth.token', jwtToken, {
          maxAge: 60 * 60 * 24 * 30, // 1 month
          path: '/'
        })
      } else {
        sessionStorage.setItem('bdv.auth.token', jwtToken)
      }

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
    <Container onSubmit={handleSubmit(handleSignIn)}>
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

      <Checkbox
        label='Lembrar usuário'
        confirm={rememberUser}
        toggleConfirm={() => setRememberUser(!rememberUser)}
        recovery
      />

      <Button isLoading={isSubmitting} type='submit'>
        Entrar
      </Button>
    </Container>
  )
}

export default LoginForm
