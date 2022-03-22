import React from 'react'

import { Container } from './styles'

interface TextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  textError?: string
  icon?: React.ReactElement
}

const Textarea = ({ label, icon, textError = '', ...rest }: TextArea) => {
  return (
    <Container error={!!textError.length}>
      <section className='labelContent'>
        <label>{label}</label>

        {textError && <span>{textError}</span>}
      </section>

      <label className='inputContainter'>
        {!!icon && icon}

        <textarea placeholder={rest.placeholder} {...rest} />
      </label>
    </Container>
  )
}

export default Textarea
