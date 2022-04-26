import React from 'react'
import Select from 'react-select'

import { Container, SelectStylesMulti } from './styles'

export interface Option {
  value: string
  label: string
}

interface Props {
  placeholder: string
  label?: string
  selectedValue?: Option | Option[] | null
  setSelectedValue: (option: any) => void
  isDisabled?: boolean
  options?: Option[]
  isMulti?: boolean
}

const MultiSelect = ({
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  isDisabled = false,
  label,
  isMulti = true
}: Props) => {
  const props: any = {
    placeholderButtonLabel: placeholder,
    value: selectedValue,
    onChange: (values: any) => setSelectedValue(values),
    isDisabled,
    options,
    placeholder,
    noOptionsMessage: () => 'Nenhum resultado encontrado',
    styles: SelectStylesMulti,
    isMulti
  }

  return (
    <Container>
      {label && <label>{label}</label>}

      <Select {...props} />
    </Container>
  )
}

export default MultiSelect
