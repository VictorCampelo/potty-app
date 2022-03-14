import Image from 'next/image'

import PlanRepository from '@/repositories/PlanRepository'

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

const planRepository = new PlanRepository()

const CardPlan = ({
  crown,
  colors,
  title,
  benefits,
  quotaPrice,
  quota
}: Props) => {
  const selectPlan = async () => {
    try {
      const { url } = await planRepository.findPlan(title)

      window.open(url, '_blank')
    } catch {
      alert('Algo deu errado!')
    }
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
