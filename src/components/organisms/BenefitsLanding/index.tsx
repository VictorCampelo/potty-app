import { Container } from './styles'

import CardCheck from '@/components/atoms/CardCheck'

interface Props {
  color?: string
}

const BenefitsLanding = ({ color }: Props) => {
  return (
    <Container color={color}>
      <h1>Principais vantagens de vender na Boa de Venda</h1>

      <div className='cards'>
        <CardCheck
          color={color}
          title='Controle suas vendas'
          description='Tenha uma melhor gestão e controle da suas vendas.'
        />

        <CardCheck
          color={color}
          title='Maior visibilidade'
          description='Exiba sua loja e produtos para mais consumidores.'
        />

        <CardCheck
          color={color}
          title='Otimize seus custos'
          description='Reduza seus custos com atendimento, vendas e marketing'
        />
      </div>
    </Container>
  )
}

export default BenefitsLanding
