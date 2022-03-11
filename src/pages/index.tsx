import type { NextPage } from 'next'

import { Wrapper, Container } from '@/styles/GlobalStyle'

import Head from 'next/head'

import Header from '@/components/molecules/Header'
import BannerLanding from '@/components/organisms/BannerLanding'
import BenefitsLanding from '@/components/organisms/BenefitsLanding'
// import PlansLanding from '@/components/organisms/PlansLanding';
// import FooterLanding from '@/components/organisms/FooterLanding';

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

        {/* <PlansLanding />

        <FooterLanding /> */}
      </Container>
    </Wrapper>
  )
}

export default Landing
