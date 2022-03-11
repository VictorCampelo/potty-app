import Image from 'next/image'

import Http from '@/services/Http'

import Button from '@/components/atoms/Button'

import formatToBrl from '@/utils/formatToBrl'

import { Container } from './styles'

interface Props {
  crown?: boolean
  colors: {
    primary: string
    secondary: string
  }
  title: string
  benefits: {
    text: string
    bold?: boolean
  }[]
  quotaPrice: number
  quota: number
}

const CardPlan = ({
  crown,
  colors,
  title,
  benefits,
  quotaPrice,
  quota
}: Props) => {
  const selectPlan = async () => {
    const { url } = await Http.get<{ url: string }>(
      `/plans/find/${title.toLowerCase()}`
    )
    window.open(url, '_blank')
  }

  return (
    <Container crown={crown} colors={colors}>
      {crown && (
        <Image
          className='crown'
          width={70}
          height={65}
          src='/images/crown.svg'
          alt='Coroa'
        />
      )}

      <h2>{title}</h2>

      <div className='benefits'>
        {benefits.map((benefit, index) => (
          <p className='benefit' key={index}>
            {benefit.bold ? <strong>{benefit.text}</strong> : benefit.text}
          </p>
        ))}
      </div>

      <p className='quota'>
        Em até <strong>${quota}x de</strong>
      </p>
      <p className='price'>
        <strong>{formatToBrl(quotaPrice)}</strong>
      </p>

      <Button onClick={selectPlan}>Selecionar</Button>
    </Container>
  )
}

export default CardPlan
