import Head from 'next/head'

import Header from '@/components/molecules/Header'
import BannerLanding from '@/components/organisms/BannerLanding'
import BenefitsLanding from '@/components/organisms/BenefitsLanding'
import PlansLanding from '@/components/organisms/PlansLanding'
import FooterLanding from '@/components/organisms/FooterLanding'
import CartButton from '@/components/molecules/CartButton'

import { Wrapper, Container } from '@/styles/GlobalStyle'

import type { NextPage } from 'next'

const Landing: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>Boa de Venda</title>
      </Head>

      <Container>
        <Header />

        <BannerLanding />

        <BenefitsLanding />

        <PlansLanding />

        <FooterLanding />
      </Container>

      <CartButton />
    </Wrapper>
  )
}

export default Landing
