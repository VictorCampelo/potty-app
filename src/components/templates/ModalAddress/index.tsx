import Modal from '@/components/molecules/Modal'
import { ModalContainer } from '@/styles/pages/cart/continue'
import { FiArrowLeft } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import Input from '@/components/atoms/Input'
import { BiBuildings, BiMapAlt } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Button from '@/components/atoms/Button'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { User } from '@/@types/entities'
import useMedia from 'use-media'
import UserRepository from '@/repositories/UserRepository'

interface Props {
  user?: Partial<User> | null
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const userRepository = new UserRepository()

const schema = Yup.object().shape({
  uf: Yup.string().required('Estado obrigatório'),
  city: Yup.string().required('Cidade obrigatória'),
  street: Yup.string().required('Logradouro obrigatório'),
  addressNumber: Yup.string().required('Número obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  zipcode: Yup.string()
    .required('CEP obrigatório')
    .min(9, 'Mínimo 8 caracteres'),
  complement: Yup.string()
})

const ModalAddress = ({ user, isOpen, onClose, onSubmit }: Props) => {
  const { formState, register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const widthScreen = useMedia({ minWidth: '640px' })

  const handleUpdateAddress = async (values: any) => {
    try {
      const address = {
        uf: values.uf,
        city: values.city,
        zipcode: values.zipcode,
        addressNumber: values.addressNumber,
        complement: values.complement,
        neighborhood: values.neighborhood,
        street: values.street
      }

      await userRepository.update(address)

      toast.success('Endereço atualizado com sucesso!')

      onSubmit()
      onClose()
    } catch (e) {
      console.error(e)
      toast.error('Erro ao atualizar endereço, tente novamente mais tarde!')
    }
  }

  useEffect(() => {
    if (user) {
      const address = {
        uf: user.uf,
        city: user.city,
        zipcode: user.zipcode,
        addressNumber: user.addressNumber,
        complement: user.complement,
        neighborhood: user.neighborhood,
        street: user.street
      }

      Object.entries(address).forEach(([key, value]) => {
        setValue(key, value)
      })
    }
  }, [user])

  return (
    <Modal
      showCloseButton={false}
      setModalOpen={onClose}
      modalVisible={isOpen}
      under={!widthScreen}
    >
      <ModalContainer>
        <div className='exit-container'>
          <FiArrowLeft
            size={25}
            color='black'
            onClick={onClose}
            style={widthScreen ? { display: 'none' } : undefined}
          />
          <h1>Adicionar novo endereço</h1>

          <IoIosClose
            onClick={onClose}
            size={36}
            color='black'
            style={widthScreen ? undefined : { display: 'none' }}
          />
        </div>

        <form
          className='input-container'
          onSubmit={handleSubmit(handleUpdateAddress)}
        >
          <div className='row'>
            <Input
              label='CEP'
              placeholder='00000-000'
              mask='cep'
              icon={<BiMapAlt size={20} color='var(--black-800)' />}
              name='zipcode'
              register={register}
              errors={formState.errors}
              maxLength={9}
            />

            <Input
              label='Bairro'
              placeholder='Bairro'
              icon={<BiMapAlt size={20} color='var(--black-800)' />}
              name='neighborhood'
              register={register}
              errors={formState.errors}
            />
          </div>

          <div className='row mid'>
            <Input
              label='Logradouro'
              placeholder='Logradouro'
              icon={<FaHome size={20} color='var(--black-800)' />}
              name='street'
              register={register}
              errors={formState.errors}
            />

            <Input
              label='Número'
              placeholder='0000'
              mask='number'
              type='numeric'
              maxLength={6}
              icon={<BiBuildings size={20} color='var(--black-800)' />}
              name='addressNumber'
              register={register}
              errors={formState.errors}
            />
          </div>

          <div className='row'>
            <Input
              label='Cidade'
              placeholder='Cidade'
              icon={
                <HiOutlineLocationMarker size={20} color='var(--black-800)' />
              }
              name='city'
              register={register}
              errors={formState.errors}
              maxLength={45}
            />

            <Input
              label='Estado'
              placeholder='Estado'
              icon={
                <HiOutlineLocationMarker size={20} color='var(--black-800)' />
              }
              name='uf'
              register={register}
              errors={formState.errors}
              maxLength={45}
            />
          </div>

          <div className='row'>
            <Input
              label='Complemento'
              placeholder='Complemento'
              name='complement'
              register={register}
              errors={formState.errors}
              maxLength={30}
            />
          </div>

          <div className='buttons-container'>
            <Button
              type='button'
              style={widthScreen ? undefined : { display: 'none' }}
              onClick={onClose}
            >
              Voltar
            </Button>
            <Button type='submit'>Atualizar</Button>
          </div>
        </form>
      </ModalContainer>
    </Modal>
  )
}

export default ModalAddress
