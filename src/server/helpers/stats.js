const moment = require('moment');

module.exports = {
    computeStats: function(reports, days, now, user) {  
        const attacks = reports.length;
        let pain = 0;
        let daysWithPain = 0;
        let firstAttack = reports[0].start_date;
        reports.forEach((report) => {
            if(report.end_date) {
                if(report.start_date.getTime() < firstAttack.getTime()){
                    firstAttack = report.start_date;
                }
                let timeDiff = (report.end_date.getTime() - report.start_date.getTime()) / (1000 * 60);
                let daysDiff = Math.ceil(timeDiff / (60 * 24));
                pain+=timeDiff;
                daysWithPain+=daysDiff;
            }
        })
        const period = days !== "all" 
            ? days 
            : user && user.registration_date && new Date(user.registration_date).getTime() < firstAttack.getTime() 
                ? Math.ceil((now.getTime() - new Date(user.registration_date).getTime())/(1000*60*60*24))
                : Math.ceil((now.getTime() - firstAttack.getTime())/ (1000*60*60*24))
        const total = Math.round(pain / (60));
        const painDays = daysWithPain;
        const noPainDays = period - painDays;
        const average = Math.round((pain / 60)/attacks);
        return {attacks: attacks, painDays: painDays, noPainDays: noPainDays, average: average, total: total}
    },

    computeCustomStats(reports, start, end) {
        const attacks = reports.length;
        let pain = 0;
        let daysWithPain = 0;
        let firstAttack = reports[0].start_date;

        reports.forEach((report) => {
            if(report.end_date) {
                if(report.start_date.getTime() < firstAttack.getTime()){
                    firstAttack = report.start_date;
                }
                let timeDiff = (report.end_date.getTime() - report.start_date.getTime()) / (1000 * 60);
                let daysDiff = Math.ceil(timeDiff / (60 * 24));
                pain+=timeDiff;
                daysWithPain+=daysDiff;
            }
        })
        const period = Math.ceil((end.getTime() - start.getTime())/ (1000*60*60*24))
        const total = Math.round(pain / (60));
        const painDays = daysWithPain;
        const noPainDays = period - painDays;
        const average = Math.round((pain / 60)/attacks);
        return {attacks: attacks, painDays: painDays, noPainDays: noPainDays, average: average, total: total}
    },

    modifyForecasts(oldForecasts, forecast){
        let latest;
        if(oldForecasts && oldForecasts.length > 0){
            latest = moment(oldForecasts[oldForecasts.length-1].dt_txt,'YYYY-MM-DD HH:mm:ss');
        }
        const city = forecast.city;
        const forecasts = forecast.list.map((forecast) => ({
                ...forecast,
                city: city
        }))
        let newForecasts;
        if(oldForecasts && oldForecasts.length > 0) {
            newForecasts = forecasts.filter(f => moment(f.dt_txt,'YYYY-MM-DD HH:mm:ss') > latest )
        }    
        return oldForecasts && oldForecasts.length > 0 ? oldForecasts.concat(newForecasts) : forecasts;
    },

    getForecasts(forecasts, start, end) {
        return forecasts.filter((f) => {
            const fDate = moment(f.dt_txt, 'YYYY-MM-DD HH:mm:ss');
            return fDate.isAfter(start) && fDate.isBefore(end);
        })
    },

    getInformations(reports) {
        const significanceLevel = 0.7;
        let weather = {};
        let triggers = {};
        let localization = {};
        let reliefs = {};
        let medicines = {};
        reports.forEach((report) => {
            if(report.triggers)
                triggers = this.modifyObject(triggers,report.triggers);
            if(report.localization)
                localization = this.modifyObject(localization,report.localization);
            if(report.reliefs)
                reliefs = this.modifyObject(reliefs,report.reliefs);
            if(report.medicines)
                medicines = this.modifyObject(medicines,report.medicines);
            if(report.weather)
                weather = this.modifyWeather(weather,report.weather);
        })
        // console.log(triggers,localization,reliefs,medicines,weather);
        const { triggersCount, localizationCount, reliefsCount, medicinesCount } = this.countSum(triggers,localization,reliefs, medicines);
        const weatherCount = this.countWeatherSum(weather);
        const triggersSignificance = this.countSignificance(triggers,triggersCount, significanceLevel);
        const localizationSignificance = this.countSignificance(localization,localizationCount, significanceLevel);
        const reliefsSignificance = this.countSignificance(reliefs,reliefsCount, significanceLevel);
        const medicinesSignificance = this.countSignificance(medicines,medicinesCount,significanceLevel);
        const weatherSignificance = this.countWeatherSignificance(weather,weatherCount, significanceLevel);
        // console.log(triggersSignificance, localizationSignificance, reliefsSignificance, weatherSignificance);
        return {
            triggers: this.getSignificant(triggersSignificance),
            localization: this.getSignificant(localizationSignificance),
            reliefs: this.getSignificant(reliefsSignificance),
            medicines: this.getSignificant(medicinesSignificance),
            weather: this.getSignificantWeather(weatherSignificance)
        }
    },

    getSignificantWeather(weather) {
        return {
            pressure: this.getSignificant(weather.pressure),
            temperature: this.getSignificant(weather.temperature),
            description: this.getSignificant(weather.description),
            humidity: this.getSignificant(weather.humidity)
        };
    },

    getSignificant(object){
        let values = [];
        for(let answer in object){
            if(object[answer]){
                values.push(answer);
            }
        }
        return values;
    },

    countWeatherSignificance(weather,count,significanceLevel) {
        for(let option in weather) {
            weather[option] = this.countSignificance(weather[option],count[option],significanceLevel)
        }
        return weather;
    },

    countSignificance(object,count,significanceLevel) {
        for(let answer in object){
            object[answer] = (object[answer] / count) >= significanceLevel ? true : false ;
        }
        return object;
    },

    countWeatherSum(weather){
        let pressureCount = 0;
        let temperatureCount = 0;
        let descriptionCount = 0;
        let humidityCount = 0;
        for(let option in weather.pressure){
            pressureCount += weather.pressure[option]
        }
        for(let option in weather.temperature){
            temperatureCount += weather.temperature[option]
        }
        for(let option in weather.description){
            descriptionCount += weather.description[option]
        }
        for(let option in weather.humidity){
            humidityCount += weather.humidity[option]
        }
        return {
            pressure: pressureCount,
            temperature: temperatureCount,
            description: descriptionCount,
            humidity: humidityCount
        }
    },

    countSum(triggers,localization,reliefs, medicines){
        let triggersCount = 0; 
        let localizationCount = 0; 
        let reliefsCount = 0;
        let medicinesCount = 0;
        for(let answer in triggers){
            triggersCount += triggers[answer]
        }
        for(let answer in localization){
            localizationCount += localization[answer]
        }
        for(let answer in reliefs){
            reliefsCount += reliefs[answer]
        }
        for(let answer in medicines){
            medicinesCount += medicines[answer]
        }
        return { triggersCount, localizationCount, reliefsCount, medicinesCount };
    },

    sort(object) {
        var sortable = [];
        for (var answer in object) {
            sortable.push([answer, object[answer]]);
        }

        return sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
    },

    modifyWeather(object, weather) {
        if(weather){
            if(weather.pressure){
                object = this.parseProp(object,'pressure',weather.pressure)
            }
            if(weather.temperature){
                object = this.parseProp(object,'temperature',weather.temperature)
            }
            if(weather.humidity){
                object = this.parseProp(object,'humidity',weather.humidity)
            }
            if(weather.weather){
                if(weather.weather.weather[0].main){
                object = this.parseProp(object,'description',weather.weather.weather[0].main)
                }
            }
        }
        return object;
    },

    parseProp(object,name,value){
        if(object.hasOwnProperty(name)){
            if(object[name][value]){
                object[name][value] += 1;
            }
            else {
                object[name][value] = 1;
            }
        } else {
            object[name] = {};
            object[name][value] = 1;
        }
        return object;
    },

    modifyObject(object, values) {
        if(typeof values !== 'string'){
            values.forEach((value) => {
                if(object.hasOwnProperty(value)){
                    object[value] += 1;
                } else {
                    object[value] = 1;
                }
            })
        } else {
            if(object.hasOwnProperty(values)){
                object[values] += 1;
            } else {
                object[values] = 1;
            }
        }
        return object;
    }
}