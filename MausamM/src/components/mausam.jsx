import React, { useState } from "react";
import { getWeather } from "../services/mausamService";

const Mausam = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await getWeather(city);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Get Weather</button>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default Mausam;
