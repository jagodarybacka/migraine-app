const mock = require('./mock/mock.json')
const _ = require('lodash')

/**
 * parsing 5 days forecast to array of pressure and dates
 * @param  {array} forecast json forecast data
 * @return {array}          
 */
const parseForcast = (forecast) => {
  return forecast[0].list.map((el) => {
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
  parseForcast
}
