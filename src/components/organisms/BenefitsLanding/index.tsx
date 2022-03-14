import { Container } from './styles'

import CardCheck from '@/components/atoms/CardCheck'

interface Props {
  color?: string
}

const BenefitsLanding = ({ color = '' }: Props) => {
  const benefits = [
    {
      title: 'Controle suas vendas',
      description: 'Tenha uma melhor gestão e controle da suas vendas.'
    },
    {
      title: 'Maior visibilidade',
      description: 'Tenha uma melhor gestão e controle da suas vendas.'
    },
    {
      title: 'Otimize seus custos',
      description: 'Reduza seus custos com atendimento, vendas e marketing'
    }
  ]

  return (
    <Container color={color}>
      <h1>Principais vantagens de vender na Boa de Venda</h1>

      <div className='cards'>
        {benefits.map((benefit, index) => (
          <CardCheck
            key={index}
            iconColor={color}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </Container>
  )
}

export default BenefitsLanding
