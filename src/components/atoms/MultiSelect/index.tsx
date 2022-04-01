import React from 'react'
import Select from 'react-select'
import Creatable from 'react-select/creatable'

import { Container, SelectStylesMulti } from './styles'

export interface Option {
  value: string
  label: string
}

interface SelectInterface {
  placeholder: string
  label: string
  selectedValue?: Option | null
  setSelectedValue: (option: any) => void
  disabled?: boolean
  options?: Option[]
  creatable?: boolean
  isMulti?: boolean
  formatCreateLabel?: (inputValue: string) => string
  onCreateOption?: (inputValue: string) => void
}

const MultiSelect = ({
  placeholder,
  options,
  selectedValue,
  setSelectedValue,
  disabled = false,
  label,
  creatable = false,
  isMulti = true,
  formatCreateLabel,
  onCreateOption
}: SelectInterface) => {
  const props = {
    placeholderButtonLabel: placeholder,
    value: selectedValue,
    onChange: (values: any) => setSelectedValue(values),
    disabled,
    options,
    placeholder,
    noOptionsMessage: () => 'Nenhum resultado encontrado',
    styles: SelectStylesMulti,
    isMulti
  } as any

  return (
    <Container>
      <label> {label} </label>
      {creatable ? (
        <Creatable
          {...props}
          formatCreateLabel={formatCreateLabel}
          onCreateOption={onCreateOption}
        />
      ) : (
        <Select {...props} />
      )}
    </Container>
  )
}

export default MultiSelect
