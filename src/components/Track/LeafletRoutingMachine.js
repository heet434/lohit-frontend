import React, { useEffect } from 'react'
import L from 'leaflet'
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import {useMap} from 'react-leaflet'


// we'll use react-routing-machine to handle routing

function LeafletRoutingMachine(props) {
  const map = useMap()
  useEffect(() => {
    if (props.route) {
      L.Routing.control({
        waypoints: [
          L.latLng(props.route[0][0], props.route[0][1]),
          L.latLng(props.route[1][0], props.route[1][1])
        ],
        lineOptions: {
          styles: [{color: '#242424', opacity: 1, weight: 5}]
        },
        routeWhileDragging: true
      }).addTo(map);
    }
  }
  )
  return null;
}

export default LeafletRoutingMachine
