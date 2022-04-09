import dynamic from 'next/dynamic'

import StorePage from '@/components/templates/Store'
import LandingPage from '@/components/templates/Landing'

const Home = () => {
  const name = window.location.host?.split('.')[0]

  if (name) return <StorePage name={name} />

  return <LandingPage />
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
})
