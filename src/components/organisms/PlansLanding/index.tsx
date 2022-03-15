import { Container } from './styles'

import CardPlan from '@/components/molecules/CardPlan'

interface Props {
  colors?: {
    primary: string
    secondary: string
  }
}

const PlansLanding = ({
  colors = {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary-darker)'
  }
}: Props) => {
  return (
    <Container color={colors.secondary} id='planos'>
      <h1>Planos da Boa de Venda</h1>

      <div className='cards'>
        <CardPlan
          colors={colors}
          title='Trimestral'
          benefits={[
            { text: 'Catálogo Online' },
            { text: 'Integrações com Whatsapp' },
            { text: 'Visitantes Ilimitados' },
            { text: 'Pedidos Ilimitados', bold: true },
            { text: 'Opções de Pagamento' },
            { text: '3 fotos por produto' },
            { text: 'Histórico de Pedidos' },
            { text: '50 Produtos', bold: true }
          ]}
          quota={3}
          quotaPrice={45}
        />

        <CardPlan
          crown={true}
          colors={colors}
          title='Anual'
          benefits={[
            { text: 'Catálogo Online' },
            { text: 'Integrações com Whatsapp' },
            { text: 'Visitantes Ilimitados' },
            { text: 'Pedidos Ilimitados', bold: true },
            { text: 'Opções de Pagamento' },
            { text: '3 fotos por produto' },
            { text: 'Histórico de Pedidos' },
            { text: '50 Produtos', bold: true },
            { text: 'Controle de Estoque', bold: true },
            { text: 'Produtos Ilimitados', bold: true }
          ]}
          quota={12}
          quotaPrice={30}
        />

        <CardPlan
          colors={colors}
          title='Semestral'
          benefits={[
            { text: 'Catálogo Online' },
            { text: 'Integrações com Whatsapp' },
            { text: 'Visitantes Ilimitados' },
            { text: 'Pedidos Ilimitados', bold: true },
            { text: 'Opções de Pagamento' },
            { text: '3 fotos por produto' },
            { text: 'Histórico de Pedidos' },
            { text: '100 Produtos', bold: true }
          ]}
          quota={6}
          quotaPrice={40}
        />
      </div>
    </Container>
  )
}

export default PlansLanding
