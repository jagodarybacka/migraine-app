const _ = require('lodash')

/**
 * parsing 5 days forecast to array of pressure and dates
 * @param  {array} forecast json forecast data
 * @return {array}
 */
const parseForecast = (forecast, from, to) => {
  const firstExisting = new Date(forecast[0].dt_txt)
  const mockedPressure = forecast[0].main.pressure
  let curr = typeof from === "string" ? new Date(from) : from;
  let missingDates = []

  while (curr.toString() !== firstExisting.toString()) {
    missingDates.push(curr)
    curr = new Date(curr.setHours(curr.getHours()+3))
  }

  missingDates = missingDates.map((date) => ({
    pressure: mockedPressure, date: date.toString(), omit: true
  }))

  const existingDates = forecast.map((el) => {
    return {
      pressure: el.main.pressure,
      date: el.dt_txt,
      omit: false
    }
  })

  return missingDates.concat(existingDates)
}

/**
 * Get array of data and returns it max and min elements
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
const getRange = (data) => ({
  max: _.max(data),
  min: _.min(data)
})

const getDaysBetween = (a, b) => Math.ceil(Math.abs(a.getTime() - b.getTime()) / (1000 * 3600 * 24))

const getNiceDateFormat = (dates) => dates.map((d) => `${d.getDate()}/${d.getMonth()+1}`)

/**
 * Get parsed forecast and creates array of pressures
 * @type {Array.<Object>} forecast - parsed forecast
 */
const parsePressure = (forecast) => forecast.map(el => parseInt(el.pressure))
/**
 * Get parsed forecast and creates array of dates
 * @type {Array.<Object>} forecast - parsed forecast
 */
const parseDate = (forecast) => forecast.map(el => new Date(el.date))

const parseFixHour = (dateString) => {
  const base = dateString.slice(0, -2);
  const hour = parseInt(dateString.slice(-2))

  if (hour > 0 && hour < 3) return `${base}00:00`;
  if (hour > 3 && hour < 6) return `${base}03:00`;
  if (hour > 6 && hour < 9) return `${base}06:00`;
  if (hour > 9 && hour < 12) return `${base}09:00`;
  if (hour > 12 && hour < 15) return `${base}12:00`;
  if (hour > 15 && hour < 18) return `${base}15:00`;
  if (hour > 18 && hour < 21) return `${base}18:00`;
  if (hour > 21) return `${base}21:00`;
  return `${base}${hour}:00`
}

module.exports = {
  get: {
    range: getRange,
    daysBetween: getDaysBetween,
    niceDateFormat: getNiceDateFormat
  },
  parse: {
    forecast: parseForecast,
    pressure: parsePressure,
    date: parseDate,
    fixHour: parseFixHour

  }
}
