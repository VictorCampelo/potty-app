import Map from '@/components/molecules/Map'

import * as ReactLeaflet from 'react-leaflet'

const MapBdv = () => {
  const DEFAULT_CENTER: [number, number] = [
    -23.565985644182255, -46.65077920923577
  ]

  return (
    <Map
      className='map-bdv'
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

export default MapBdv
