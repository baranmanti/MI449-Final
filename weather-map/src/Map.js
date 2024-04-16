import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '95vw',
  height: '50vh',
  margin: '5vh',
};

const center = {
  lat: 45.397,
  lng: -84.644
};

function MapComponent({ onClick }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyALRqtjtdfAe51hrcAJi93VbPxIcA5ETe8">
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
