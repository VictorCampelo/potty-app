import React, { useState } from 'react'

import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'

import { useAuth } from '@/contexts/AuthContext'

import toast from '@/utils/toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FiLock } from 'react-icons/fi'

import { Container } from './styles'

import type { SignInDTO } from '@/@types/requests'

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'Mínimo 8 caracteres')
})

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { signIn } = useAuth()

  const [remember, setRemember] = useState(false)

  const handleSignIn = async (dto: any) => {
    try {
      const user = await signIn(dto as SignInDTO, { remember })

      if (user?.role === 'USER') {
        Router.push('/')
      } else if (user?.role === 'OWNER') {
        Router.push('/dashboard')
      }
    } catch (error: any) {
      if ([401, 404, 403].includes(error.response?.status)) {
        if (error.response.data?.error === 'Need e-mail activation') {
          toast({
            message: 'Verifique sua conta para fazer login',
            type: 'error'
          })
          await Router.push('/verificar-conta')
        } else {
          toast({ message: 'Email ou senha incorretos', type: 'error' })
        }
      } else {
        if (error.response?.status === 412) {
          Router.push('/auth/register/confirmation-token')
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
        confirm={remember}
        toggleConfirm={() => setRemember(!remember)}
        recovery
      />

      <Button isLoading={isSubmitting} type='submit'>
        Entrar
      </Button>
    </Container>
  )
}

export default LoginForm
