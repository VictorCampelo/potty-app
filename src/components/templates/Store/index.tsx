import Head from 'next/head'

import Header from '@/components/molecules/Header'
import FooterContact from '@/components/organisms/FooterContact'

import { Wrapper, Container } from '@/styles/GlobalStyle'

import type { NextPage } from 'next'
import type { Store } from '@/@types/entities'

interface Props {
  store: Store
}

const StorePage: NextPage<Props> = ({ store }) => {
  const formattedAddress = `${store.neighborhood}, ${store.addressNumber}, ${store.city} - ${store.state}`

  return (
    <Wrapper>
      <Head>
        <title>Loja {store.name}</title>
      </Head>

      <Container>
        <Header />

        <FooterContact
          title={store.name}
          cnpj={store.CNPJ}
          address={formattedAddress}
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
