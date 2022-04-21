import dynamic from 'next/dynamic'

import StorePage from '@/components/templates/Store'
import LandingPage from '@/components/templates/Landing'

const Home = () => {
  const splinted = window.location.host
    .replace('www.', '')
    .replace('.com.br', '') // start replacing from the longest domain to lowest
    .replace('.com', '')
    .split('.')

  if (splinted.length > 1) {
    return <StorePage name={splinted[0]} />
  }

  return <LandingPage />
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
