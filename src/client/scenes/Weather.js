const API = "https://api.openweathermap.org/data/2.5/weather?";
const KEY = "a94a958fb4c3a38d8ea578a6eedca801";

export const getWeather = ({ lat, lon }) =>
  fetch(`${API}lat=${lat}&lon=${lon}&units=metric&APPID=${KEY}`)
    .then(data =>
      data.json()
    );
