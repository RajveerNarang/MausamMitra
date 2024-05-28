import React, { useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../services/mausamService";

const Mausam = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const data = await getWeatherByCoordinates(latitude, longitude);
            console.log("Weather Data:", data);
            setWeatherData(data);
          });
        } else {
          setError("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, []);

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div className="weather-container">
      {weatherData ? (
        <div className="weather-info">
          <h2>Weather in {weatherData.name}</h2>
          <p>
            Temperature:{" "}
            {weatherData.main && kelvinToCelsius(weatherData.main.temp)}°C
          </p>
          <p>
            Feels Like:{" "}
            {weatherData.main && kelvinToCelsius(weatherData.main.feels_like)}°C
          </p>
          {/* Add similar conditional checks for other properties */}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Mausam;
