import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = `"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}"`;
// console.log(BASE_URL);

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    // console.log("Weather API response:", response.data); // Log the API response data
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error); // Log the error if any
    throw error;
  }
};
