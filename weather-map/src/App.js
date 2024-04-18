import React, { useState } from 'react';
import MapComponent from './Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function App() {
  const [weather, setWeather] = useState(null);

  const getWeatherDescription = (code) => {
    const weatherCodeMap = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog and depositing rime fog',
      48: 'Fog and depositing rime fog',
      51: 'Drizzle, Light',
      53: 'Drizzle, Moderate',
      55: 'Drizzle, Dense',
      56: 'Freezing Drizzle, Light',
      57: 'Freezing Drizzle, Dense',
      61: 'Rain, Slight',
      63: 'Rain, Moderate',
      65: 'Rain, Heavy',
      66: 'Freezing Rain, Light',
      67: 'Freezing Rain, Heavy',
      71: 'Snow fall, Slight',
      73: 'Snow fall, Moderate',
      75: 'Snow fall, Heavy',
      77: 'Snow grains',
      80: 'Rain showers, Slight',
      81: 'Rain showers, Moderate',
      82: 'Rain showers, Violent',
      85: 'Snow showers, Slight',
      86: 'Snow showers, Heavy',
      95: 'Thunderstorm, Slight or moderate',
      96: 'Thunderstorm with slight and heavy hail',
      99: 'Thunderstorm with slight and heavy hail',
    };

    return weatherCodeMap[code];
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,precipitation&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
    
    if (response.ok) {
      const data = await response.json();
      const weatherDescription = getWeatherDescription(data.current.weather_code);
      setWeather({ ...data.current, weatherDescription });
    } else {
      console.error('Failed to fetch weather data');
    }
  };

  return (
    <div className="App">
      <h1 className="text-danger" style={{ textAlign: 'center', marginTop: '5vh' }}>Weather Map</h1>
      <p style={{ textAlign: 'center', fontSize: '0.75em'}}>Click anywhere on the map to see the live weather data.</p>
      <div className='mapHolder' style={{ display: 'flex', flexDirection: 'row', perspective: '100vw' }}>
        <MapComponent onClick={handleMapClick} />
        {weather && (
          <Card 
            style={{ 
              width: '40vw', 
              backgroundColor: 'aliceblue',
              marginTop: '3vh', 
              marginLeft: '2vw', 
              marginRight: '5vw', 
              maxHeight: '75vh', 
              paddingTop: '25vh', 
              textAlign: 'center',
              transform: 'rotateY(-20deg)',
              boxShadow: '10px 10px 30px rgba(0,0,0,0.5)', 
              transition: 'transform 0.5s, box-shadow 0.5s'
            }}
            // 3D visual effect including the shadows
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateY(0deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateY(-20deg)'}
          >
            <Card.Body>
              <Card.Title className="text-dark" style={{ fontSize: '2em' }}>Current Weather</Card.Title>
              <Card.Text style={{ fontSize: '1.25em' }}>
                <span className="text-primary">Weather:</span> {weather.weatherDescription}<br />
                <span className="text-primary">Temperature:</span> {weather.temperature_2m} °F<br />
                <span className="text-primary">Feels like:</span> {weather.apparent_temperature} °F<br />
                <span className="text-primary">Wind Speed:</span> {weather.wind_speed_10m} mph<br />
                <span className="text-primary">Humidity:</span> {weather.relative_humidity_2m}%<br />
                <span className="text-primary">Precipation:</span> {weather.precipitation} inch
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
