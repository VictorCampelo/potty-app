import MapStore from '@/components/organisms/MapStore'

import {
  AiFillPhone,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineWhatsApp
} from 'react-icons/ai'

import { Footer, ContainerTerms } from './styles'

interface Props {
  title: string
  cnpj?: string
  address?: string
  phone?: string
  whatsappLink?: string
  instagramLink?: string
  facebookLink?: string
  lat?: number
  lng?: number
}

const FooterContact = ({
  title,
  cnpj,
  address,
  phone,
  whatsappLink,
  instagramLink,
  facebookLink,
  lat,
  lng
}: Props) => {
  return (
    <Footer>
      <div>
        <h1>{title}</h1>

        {cnpj && <span>CNPJ: {cnpj}</span>}
        <span>{address}</span>

        <h1>Contato</h1>

        {phone && (
          <span>
            <AiFillPhone size={24} color='var(--gray-700)' />
            {phone}
          </span>
        )}

        {whatsappLink && (
          <span>
            <AiOutlineWhatsApp size={24} color='var(--gray-700)' />
            <a href={whatsappLink}>Whatsapp</a>
          </span>
        )}

        {instagramLink && (
          <span>
            <AiOutlineInstagram size={24} color='var(--gray-700)' />
            <a href={instagramLink}>Whatsapp</a>
          </span>
        )}

        {facebookLink && (
          <span>
            <AiOutlineFacebook size={24} color='var(--gray-700)' />
            <a href={facebookLink}>Whatsapp</a>
          </span>
        )}

        <ContainerTerms>
          <span>Termos de Uso e Políticas de Privacidade</span>
          <span>Copyright &#169; 2021 | Sino – Marketing &#38; Tecnologia</span>
        </ContainerTerms>
      </div>

      {lat && lng && <MapStore lat={lat} lng={lng} />}
    </Footer>
  )
}

export default FooterContact
