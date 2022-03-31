import React from 'react'

import { Button } from './styles'

interface Props {
  page: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

const PaginationItem = ({ page, isCurrent = false, onPageChange }: Props) => {
  return (
    <Button onClick={() => onPageChange(page)} isCurrent={isCurrent}>
      {page}
    </Button>
  )
}

export default PaginationItem
