import React, { useEffect } from 'react'
import L from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const { MapContainer, MapConsumer } = ReactLeaflet

interface Props extends ReactLeaflet.MapContainerProps {
  children: any
}

const Map = ({ children, ...rest }: Props) => {
  const init = async () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl.src,
      iconUrl: iconUrl.src,
      shadowUrl: shadowUrl.src
    })
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <MapContainer {...rest}>
      <MapConsumer>{(map) => children(ReactLeaflet, map)}</MapConsumer>
    </MapContainer>
  )
}

export default Map
