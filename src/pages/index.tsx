import type { NextPage } from 'next'

import { Wrapper, Container } from '@/styles/GlobalStyle'

import Head from 'next/head'

import Header from '@/components/molecules/Header'
import BannerLanding from '@/components/templates/BannerLanding'
import BenefitsLanding from '@/components/templates/BenefitsLanding'
import PlansLanding from '@/components/templates/PlansLanding'
import FooterLanding from '@/components/templates/FooterLanding'

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
    </Wrapper>
  )
}

export default Landing
