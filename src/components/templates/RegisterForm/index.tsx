import React, { useEffect } from 'react'

import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

import toast from '@/utils/toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { FiLock } from 'react-icons/fi'

import { Container } from './styles'
import { useAuth } from '@/contexts/AuthContext'

const RegisterForm = () => {
  const { signUpMeta, setSignUpMeta } = useAuth()

  const signUpFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup
      .string()
      .transform((x) => (x === '' ? undefined : x))
      .min(8, 'A senha deve ter pelo menos 8 caracteres.')
      .required('A senha é obrigatória.'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const handleSignUp = async (dto: any) => {
    try {
      setSignUpMeta(dto)

      await Router.push('/cadastro/continuar')
    } catch {
      toast({
        message: 'Algo deu errado!',
        type: 'error'
      })
    }
  }

  const loadDataFromContext = () => {
    if (signUpMeta) {
      Object.entries(signUpMeta).forEach(([key, value]) => {
        setValue(key, value)
      })
    }
  }

  useEffect(() => {
    loadDataFromContext()
  }, [])

  return (
    <Container onSubmit={handleSubmit(handleSignUp)}>
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

      <Input
        label='Confirmar Senha'
        type='password'
        name='passwordConfirmation'
        placeholder='********'
        icon={<FiLock size={20} color='var(--black-800)' />}
        register={register}
        errors={errors}
      />

      <Button isLoading={isSubmitting} type='submit'>
        Continuar
      </Button>
    </Container>
  )
}

export default RegisterForm
