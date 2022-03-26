import Head from 'next/head'

import Header from '@/components/molecules/Header'
import BannerStore from '@/components/molecules/BannerStore'
import FooterContact from '@/components/organisms/FooterContact'

import { Wrapper, Container } from '@/styles/GlobalStyle'

import type { NextPage } from 'next'
import type { Store } from '@/@types/entities'

interface Props {
  store: Store
}

const StorePage: NextPage<Props> = ({ store }) => {
  return (
    <Wrapper>
      <Head>
        <title>Loja {store.name}</title>
      </Head>

      <Container>
        <Header />

        <BannerStore images={[store.background.url]} />

        <FooterContact
          title={store.name}
          cnpj={store.CNPJ}
          address={store.formattedAddress}
          phone={store.phone}
          whatsappLink={store.whatsappLink}
          instagramLink={store.instagramLink}
          facebookLink={store.facebookLink}
          lat={-23.565985644182255}
          lng={-46.65077920923577}
        />
      </Container>
    </Wrapper>
  )
}

export default StorePage
