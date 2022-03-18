import FooterContact from '@/components/organisms/FooterContact'

import { Register } from './styles'

const FooterLanding = () => {
  return (
    <>
      <Register />

      <FooterContact
        title='Boa de Venda'
        cnpj='26.745.054/0001-70'
        address='Avenida Paulista, 63892, São Paulo - SP'
        phone='+55 (86) 9 8178-9622'
        lat={-23.565985644182255}
        lng={-46.65077920923577}
      />
    </>
  )
}

export default FooterLanding
