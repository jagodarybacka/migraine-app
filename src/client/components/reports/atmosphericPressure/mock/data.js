const axios = require('axios')
const fs = require('fs')
const API_CURRENT = "http://api.openweathermap.org/data/2.5/weather?";
const API_FORCAST = "http://api.openweathermap.org/data/2.5/forecast?";
const KEY = "a94a958fb4c3a38d8ea578a6eedca801";
const MOCK_FILE = 'mock.json'

const getPoznanForecast = () =>
  axios.get(`${API_FORCAST}q=Poznan&APPID=${KEY}`)
  .then(res => appendToFile(res.data))
  .catch(err => console.log(err))

const getCurrentWeather = ({
    lat,
    lon
  }) =>
  axios.post(`${API_CURRENT}lat=${lat}&lon=${lon}&units=metric&APPID=${KEY}`)
  .then(data => console.log(data))

const getCurrentPoznanWeather = () =>
  axios.get(`${API_CURRENT}q=Poznan&APPID=${KEY}`)
  .then(res => appendToFile(res.data, true))
  .catch(err => console.log(err))

const addDateToData = (data) => {
  data.date = Date.now();
  return data;
}

const appendToFile = (newData, addDate = false) => {
  if (addDate) {
    newData = addDateToData(newData)
  }
  fs.readFile(MOCK_FILE, 'utf8', (err, oldData) => {
    // Write first data
    if (err || !oldData) {
      fs.writeFile(MOCK_FILE, JSON.stringify([newData]))
    } else {
      // Read data and append new data
      const parsedData = JSON.parse(oldData)
      parsedData.push(newData)
      fs.writeFile(MOCK_FILE, JSON.stringify(parsedData))
    }

    console.log('Done!')
  })
}

getPoznanForecast()

// (() => {
//   getCurrentPoznanWeather();
//   setInterval(
//     getCurrentPoznanWeather,
//     1000*60*30
//   )
// })()
