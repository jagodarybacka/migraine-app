const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?";
const API_FORECAST = "https://api.openweathermap.org/data/2.5/forecast?";
const KEY = "a94a958fb4c3a38d8ea578a6eedca801";

export const getWeather = ({ lat, lon }) =>
  fetch(`${API_WEATHER}lat=${lat}&lon=${lon}&units=metric&APPID=${KEY}`)
    .then(data =>
      data.json()
    );

export const getForecast = ({ lat, lon }) =>
  fetch(`${API_FORECAST}lat=${lat}&lon=${lon}&APPID=${KEY}`)
    .then(data =>
      data.json()
    );