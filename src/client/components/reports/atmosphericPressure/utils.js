const mock = require('./mock/mock.json')
const _ = require('lodash')

/**
 * parsing 5 days forecast to array of pressure and dates
 * @param  {array} forecast json forecast data
 * @return {array}
 */
const parseForecast = (forecast) => {
  return forecast.map((el) => {
    return {
      pressure: el.main.pressure,
      date: el.dt_txt
    }
  })
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

const getNiceDateFormat = (dates) => dates.map((d) => `${d.getDate()}/${d.getMonth()}`)


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


module.exports = {
  get: {
    range: getRange,
    daysBetween: getDaysBetween,
    niceDateFormat: getNiceDateFormat
  },
  parse: {
    forecast: parseForecast,
    pressure: parsePressure,
    date: parseDate
  }
}
