import React, { useState } from 'react'
import masks from '@/utils/masks'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { Container } from './styles'

import type { UseFormRegisterReturn, FieldErrors } from 'react-hook-form'
import type { MasksTypes } from '@/utils/masks'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  register?: (name: string) => UseFormRegisterReturn
  errors?: FieldErrors
  label?: string
  password?: boolean
  forgetPassword?: boolean
  icon?: React.ReactElement
  mask?: MasksTypes
}

const Input = ({
  fullWidth,
  register,
  errors,
  name,
  label,
  type,
  password,
  onChange,
  icon,
  mask,
  disabled,
  ...props
}: Props) => {
  const [isInputVisible, setIsInputVisible] = useState(true)

  const maskFunction = mask ? masks[mask] : null

  const handleOnChange = (event: any) => {
    if (maskFunction) {
      const newValue = maskFunction(event.target.value)
      event.target.value = newValue
    }
    if (registerProps?.onChange) registerProps.onChange(event)
    if (onChange) onChange(event)
  }

  if (maskFunction && props.defaultValue) {
    props.defaultValue = maskFunction(props.defaultValue)
  }

  const errorMessage = errors && name ? errors[name]?.message : ''

  const registerProps = register && name ? register(name) : null

  return (
    <Container fullWidth={fullWidth} error={!!errorMessage} disabled={disabled}>
      {label && (
        <section className='labelContent'>
          <label>{label}</label>
        </section>
      )}

      <div className='inputContainer'>
        {!!icon && icon}

        <input
          name={name}
          disabled={disabled}
          type={password && isInputVisible ? 'password' : type}
          {...registerProps}
          {...props}
          onChange={handleOnChange}
        />

        {password &&
          (isInputVisible ? (
            <AiOutlineEye
              onClick={() => setIsInputVisible(false)}
              size={24}
              style={{ marginRight: '10px' }}
              color='var(--black-800)'
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setIsInputVisible(true)}
              size={24}
              style={{ marginRight: '10px' }}
              color='var(--black-800)'
            />
          ))}
      </div>

      {label && errorMessage ? (
        <section className='labelContent'>
          <span className='text-error'>{errorMessage}</span>
        </section>
      ) : null}
    </Container>
  )
}

export default Input
