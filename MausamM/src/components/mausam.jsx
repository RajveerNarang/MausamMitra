import React, { useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../services/mausamService";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch weather data by coordinates
    const fetchWeatherData = async () => {
      try {
        // Get user's coordinates (example: using browser's geolocation API)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // Fetch weather data using coordinates
            const data = await getWeatherByCoordinates(latitude, longitude);
            setWeatherData(data);
          });
        }
      } catch (error) {
        setError("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className="weather-container">
      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Weather;
