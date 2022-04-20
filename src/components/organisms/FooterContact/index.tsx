import { useState, useEffect } from 'react'

import PuffLoader from 'react-spinners/PuffLoader'
import MapStore from '@/components/organisms/MapStore'

import BrasilApiRepository from '@/repositories/BrasilApiRepository'

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
  cep?: string
  fetchCoordsFromCEP?: boolean
}

const brasilApiRepository = new BrasilApiRepository()

const FooterContact = ({
  title,
  cnpj,
  address,
  phone,
  whatsappLink,
  instagramLink,
  facebookLink,
  lat,
  lng,
  cep = '',
  fetchCoordsFromCEP = true
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [coords, setCoords] = useState({
    lng,
    lat
  })

  const updateCoordsByCep = async () => {
    try {
      setLoading(true)
      const { location } = await brasilApiRepository.searchCep(
        cep.replace(/\D/g, '')
      )
      if (location.coordinates.longitude && location.coordinates.latitude) {
        setCoords({
          lng: Number(location.coordinates.longitude),
          lat: Number(location.coordinates.latitude)
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if ((!lat || !lng) && cep && fetchCoordsFromCEP) {
      updateCoordsByCep()
    }
  }, [])

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
            <a href={instagramLink}>Instagram</a>
          </span>
        )}

        {facebookLink && (
          <span>
            <AiOutlineFacebook size={24} color='var(--gray-700)' />
            <a href={facebookLink}>Facebook</a>
          </span>
        )}

        <ContainerTerms>
          <span>Termos de Uso e Políticas de Privacidade</span>
          <span>
            Copyright &#169; {new Date().getFullYear()} | Sino – Marketing &#38;
            Tecnologia
          </span>
        </ContainerTerms>
      </div>

      {loading ? (
        <PuffLoader size={28} color='#fff' />
      ) : (
        coords.lat &&
        coords.lng && (
          <MapStore lat={Number(coords.lat)} lng={Number(coords.lng)} />
        )
      )}
    </Footer>
  )
}

export default FooterContact
