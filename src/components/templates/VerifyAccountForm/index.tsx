import React from 'react'

import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

import AuthRepository from '@/repositories/AuthRepository'

import toast from '@/utils/toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Container } from './styles'

const authRepository = new AuthRepository()

const VerifyAccountForm = () => {
  const signInFormSchema = yup.object().shape({
    token: yup.string().required('Token é obrigatório')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleVerifyAccount = async (dto: any) => {
    try {
      await authRepository.verifyAccount(dto.token)
      await Router.push('/entrar')
    } catch (error) {
      console.error(error)
      const message = 'Algo deu errado!'
      toast({ message, type: 'error' })
    }
  }

  return (
    <Container onSubmit={handleSubmit(handleVerifyAccount)}>
      <p>
        Insira o token de segurança que foi enviado para o <br />
        seu email e verifique sua conta!
      </p>

      <Input
        label='Token'
        name='token'
        placeholder='_ _ _ _ _ _'
        register={register}
        errors={errors}
      />

      <Button isLoading={isSubmitting} type='submit'>
        Enviar
      </Button>
    </Container>
  )
}

export default VerifyAccountForm
