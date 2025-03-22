import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import axios from 'axios'

import './Track.css'
// import LeafletRoutingMachine from './LeafletRoutingMachine'


function Track(props) {

    const orderId = props.orderId

    const token = useSelector(state => state.auth.token)
    const [route, setRoute] = useState(null)

    useEffect(() => {
        axios.get(`/api/track/order/${orderId}/`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(response => {
            setRoute([response.data.user_coordinates,response.data.lohit_coordinates])
        })
        .catch(error => {
            console.log(error)
        })
    }
    ,[])

    const position = [51.505, -0.09]
  return (
    <div className='track' id='track'>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '100%', width: '100%'}}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[51.505, -0.09]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker> */}
            {/* <LeafletRoutingMachine route={props.route}/> */}
        </MapContainer>
    </div>
  )
}

let defaultIcon = L.icon({
    iconUrl: require('./marker.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

export default Track
