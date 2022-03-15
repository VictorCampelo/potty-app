import Button from '@/components/atoms/Button'

import { Banner } from './styles'

const BannerLanding = () => {
  const goToPlans = () => {
    window.location.hash = '#planos'
  }

  return (
    <Banner>
      <img
        src='/images/landing_girl.jpg'
        alt='Foto de garota'
        width={546}
        height={500}
      />

      <div className='texts'>
        <h1>Divulgue facilmente seus produtos e serviços</h1>

        <p>
          A <strong>Boa de venda</strong> é a forma mais rápida do seu negócio
          ser visto no mundo digital. A plataforma funciona como um catálogo
          online de todos os estabelecimentos no Piauí que trabalham com
          entregas.
        </p>

        <Button onClick={goToPlans}>Ver planos</Button>
      </div>
    </Banner>
  )
}

export default BannerLanding
