import React from 'react'

import PaginationItem from '@/components/atoms/PaginationItem'

import { Container, Content } from './styles'

interface Props {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 4

const generatePagesArray = (from: number, to: number) => {
  return [...new Array(to - from)]
    .map((_, idx) => {
      return from + idx + 1
    })
    .filter((page) => page > 0)
}

const Pagination = ({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 1
}: Props) => {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const to = Math.min(currentPage + siblingsCount, lastPage)
  const nextPages =
    currentPage < lastPage ? generatePagesArray(currentPage, to) : []

  return (
    <Container>
      <Content>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem page={1} onPageChange={onPageChange} />
            {currentPage > 2 + siblingsCount && <span>...</span>}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => {
            return (
              <PaginationItem
                page={page}
                key={page}
                onPageChange={onPageChange}
              />
            )
          })}

        <PaginationItem
          page={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem
                page={page}
                key={page}
                onPageChange={onPageChange}
              />
            )
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + siblingsCount + 1 < lastPage && <span>...</span>}
            <PaginationItem page={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Content>
    </Container>
  )
}

export default Pagination
