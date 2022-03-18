import Map from '@/components/molecules/Map'

import * as ReactLeaflet from 'react-leaflet'

interface Props {
  lat: number
  lng: number
}

const MapStore = ({ lat, lng }: Props) => {
  const DEFAULT_CENTER: [number, number] = [lat, lng]

  return (
    <Map
      className='map-container'
      center={DEFAULT_CENTER}
      minZoom={8}
      zoom={22}
      zoomControl={false}
      attributionControl={false}
    >
      {({ TileLayer, Marker }: typeof ReactLeaflet) => (
        <>
          <TileLayer
            id='mapbox/streets-v11'
            url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
          />
          <Marker position={DEFAULT_CENTER} />
        </>
      )}
    </Map>
  )
}

export default MapStore
