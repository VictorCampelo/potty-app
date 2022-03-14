import MapBdv from '@/components/organisms/MapBdv'

import { AiFillPhone, AiOutlineWhatsApp } from 'react-icons/ai'

import { Footer, ContainerTerms } from './styles'

const FooterContact = () => {
  return (
    <Footer>
      <div>
        <h1>Boa de Venda</h1>

        <span>CNPJ: 26.745.054/0001-70</span>
        <span>Avenida Paulista, 63892, São Paulo - SP</span>

        <h1>Contato</h1>

        <span>
          <AiFillPhone size={24} color='var(--gray-700)' />
          +55 (86) 9 8178-9622
        </span>

        <span>
          <AiOutlineWhatsApp size={24} color='var(--gray-700)' />
          Whatsapp
        </span>

        <ContainerTerms>
          <span>Termos de Uso e Políticas de Privacidade</span>
          <span>Copyright &#169; 2021 | Sino – Marketing &#38; Tecnologia</span>
        </ContainerTerms>
      </div>

      <MapBdv />
    </Footer>
  )
}

export default FooterContact
