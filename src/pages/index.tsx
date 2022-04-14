import dynamic from 'next/dynamic'

import StorePage from '@/components/templates/Store'
import LandingPage from '@/components/templates/Landing'

const Home = () => {
  const splinted = window.location.host?.split('.')

  if (splinted.length > 1) {
    return <StorePage name={splinted[0]} />
  }

  return <LandingPage />
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
