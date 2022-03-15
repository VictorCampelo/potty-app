import React, { useEffect } from 'react'

import Router from 'next/router'

import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

import toast from '@/utils/toast'

import AuthRepository from '@/repositories/AuthRepository'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Container } from './styles'
import { useAuth } from '@/contexts/AuthContext'

import type { SignUpDTO } from '@/@types/requests'

const authRepository = new AuthRepository()

const RegisterForm = () => {
  const { signUpMeta, clearSignUpMeta } = useAuth()

  const signUpFormSchema = yup.object().shape({
    firstName: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    clientState: yup.string().required('Estado é obrigatório'),
    clientCity: yup.string().required('Cidade obrigatória'),
    publicPlace: yup.string().required('Logradouro é obrigatório'),
    number: yup.string().required('Numero é obrigatório'),
    district: yup.string().required('Bairro é obrigatório'),
    cep: yup
      .string()
      .required('CEP é obrigatório')
      .min(9, 'Mínimo 8 caracteres'),
    complement: yup.string().required('Complemento é obrigatório')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const handleSignUp = async (dto: any) => {
    try {
      if (!signUpMeta) return await Router.push('/cadastro')

      const data: SignUpDTO = {
        firstName: dto.firstName,
        lastName: dto.lastName,
        city: dto.clientCity,
        uf: dto.clientState,
        street: dto.publicPlace,
        logradouro: dto.publicPlace,
        adressNumber: Number(dto.number),
        neighborhood: dto.district,
        zipcode: dto.cep,
        complement: dto.complement,
        email: signUpMeta?.email,
        password: signUpMeta?.password,
        passwordConfirmation: signUpMeta?.password
      }

      await authRepository.singUp(data)

      clearSignUpMeta()

      await Router.push('/confirmacao-cadastro')
    } catch {
      toast({
        message: 'Algo deu errado!',
        type: 'error'
      })
    }
  }

  useEffect(() => {
    if (!signUpMeta) Router.push('/cadastro')
  }, [])

  // TODO: add missing inputs
  // TODO: inputs and buttons positions
  // TODO: test

  return (
    <Container onSubmit={handleSubmit(handleSignUp)}>
      <Input
        label='Nome'
        name='firstName'
        placeholder='Seu nome'
        register={register}
        errors={errors}
      />

      <Input
        label='Sobrenome'
        name='lastName'
        placeholder='Seu sobrenome'
        register={register}
        errors={errors}
      />

      <div>
        <Button skin='secondary' isLoading={isSubmitting} type='submit'>
          Voltar
        </Button>

        <Button isLoading={isSubmitting} type='submit'>
          Finalizar
        </Button>
      </div>
    </Container>
  )
}

export default RegisterForm
