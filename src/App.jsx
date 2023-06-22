import React, { useState } from "react";
import Search from "./assets/Search";
import CurrentWeather from "./assets/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./assets/Api";
import Forecast from "./assets/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => console.log(error));
  };

  let weatherBackgroundImage = "";
  let currentWeatherDescription = currentWeather?.weather[0]?.description;

  if (currentWeatherDescription == "clear sky") 
  {
    weatherBackgroundImage = "container clearsky"
  } 
  else if (currentWeatherDescription == "scattered clouds") 
  {
    weatherBackgroundImage = "container scatteredclouds"
  } 
  else if (currentWeatherDescription == "few clouds" || currentWeatherDescription == "broken clouds" ) 
  {
    weatherBackgroundImage = "container fewclouds"
  } 
  else if (currentWeatherDescription == "light rain") 
  {
    weatherBackgroundImage = "container lightrain"
  } 
  else if (currentWeatherDescription == "moderate rain") 
  {
    weatherBackgroundImage = "container moderaterain"
  } 
  else if (currentWeatherDescription == "overcast clouds") 
  {
    weatherBackgroundImage = "container overcastclouds"
  } 
  else if (currentWeatherDescription == "light snow" || currentWeatherDescription == "snow") 
  {
    weatherBackgroundImage = "container snow"
  } 
  else {
    weatherBackgroundImage = "container"
  }

  return (
    <div className={weatherBackgroundImage}>
      <main>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </main>
    </div>
  );
}

export default App;
