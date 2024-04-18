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
    
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
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
