import React, { useState } from 'react';
import MapComponent from './Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function App() {
  const [weather, setWeather] = useState(null);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);
    const data = await response.json();
    setWeather(data.current);
  };

  return (
    <div className="App">
      <MapComponent onClick={handleMapClick} />
      {weather && (
        <Card style={{ width: '20vw', marginTop: '10vh', marginLeft: '40vw' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '2em'}}>Current Weather</Card.Title>
            <Card.Text style={{ fontSize: '1.5em'}}>
              Temperature: {weather.temperature_2m} °C <br />
              Wind Speed: {weather.wind_speed_10m} km/h <br />
              Humidity: {weather.relative_humidity_2m}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default App;
