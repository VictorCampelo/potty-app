import React, { useEffect, useState } from 'react'

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
import Checkbox from '@/components/atoms/Checkbox'

const authRepository = new AuthRepository()

const RegisterForm = () => {
  const { signUpMeta, clearSignUpMeta } = useAuth()

  const signUpFormSchema = yup.object().shape({
    firstName: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    uf: yup.string().required('Estado é obrigatório'),
    city: yup.string().required('Cidade obrigatória'),
    street: yup.string().required('Logradouro é obrigatório'),
    adressNumber: yup.string().required('Numero é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
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

  const [acceptPrivacy, setAcceptPrivacy] = useState(false)

  const handleSignUp = async (dto: any) => {
    try {
      if (!signUpMeta) return await Router.push('/cadastro')

      const data: SignUpDTO = {
        firstName: dto.firstName,
        lastName: dto.lastName,
        city: dto.city,
        uf: dto.uf,
        street: dto.street,
        adressNumber: Number(dto.adressNumber),
        neighborhood: dto.neighborhood,
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
      <div>
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
          <Input
            label='CEP'
            name='cep'
            placeholder='0000-000'
            register={register}
            errors={errors}
          />

          <Input
            label='Bairro'
            name='neighborhood'
            placeholder='Bairro'
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <div>
          <Input
            label='Estado'
            name='uf'
            placeholder='Estado'
            register={register}
            errors={errors}
          />

          <Input
            label='Cidade'
            name='city'
            placeholder='Cidade'
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <Input
            label='Logradouro'
            name='street'
            placeholder='Logradouro'
            register={register}
            errors={errors}
          />

          <Input
            label='Número'
            type='number'
            name='adressNumber'
            placeholder='Logradouro'
            register={register}
            errors={errors}
          />
        </div>

        <Input
          label='Complemento'
          name='complement'
          placeholder='Complemento'
          register={register}
          errors={errors}
        />
      </div>

      <Checkbox
        confirm={acceptPrivacy}
        toggleConfirm={() => setAcceptPrivacy(!acceptPrivacy)}
      >
        Li e concordo com os termos de uso e política de privacidade
      </Checkbox>

      <div>
        <Button
          skin='secondary'
          isLoading={isSubmitting}
          type='button'
          onClick={() => Router.push('/cadastro')}
        >
          Voltar
        </Button>

        <Button
          disabled={!acceptPrivacy}
          isLoading={isSubmitting}
          type='submit'
        >
          Finalizar
        </Button>
      </div>
    </Container>
  )
}

export default RegisterForm
