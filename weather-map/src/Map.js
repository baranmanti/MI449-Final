import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '95vw',
  height: '75vh',
  margin: '3vh',
};

const center = {
  lat: 45.397,
  lng: -84.644
};

function MapComponent({ onClick }) {
  return (
    // {process.env.GOOGLE_MAPS_API_KEY}
    <LoadScript googleMapsApiKey='AIzaSyALRqtjtdfAe51hrcAJi93VbPxIcA5ETe8'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onClick}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent);
