import React from 'react'

import { FaCheck } from 'react-icons/fa'

import { Container } from './styles'

interface Props {
  confirm: boolean
  toggleConfirm: () => void
  label?: string
  termsUse?: boolean
  recovery?: boolean
  size?: 'small' | 'medium'
  disabled?: boolean
  children?: React.ReactNode
}

const Checkbox = ({
  confirm,
  toggleConfirm,
  label,
  size = 'medium',
  disabled,
  children
}: Props) => {
  const id = label

  return (
    <Container size={size} disabled={disabled}>
      <div className='check'>
        <button
          type='button'
          id={id}
          className='btn'
          onClick={toggleConfirm}
          disabled={disabled}
        >
          {confirm && <FaCheck color='var(--gray-800)' />}
        </button>
        {label && <label htmlFor={id}>{label}</label>}
        {children && <span>{children}</span>}
      </div>
    </Container>
  )
}

export default Checkbox
