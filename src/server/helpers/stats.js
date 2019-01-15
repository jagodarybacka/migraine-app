const moment = require('moment');

module.exports = {
    computeStats: function(reports, days, now) {  
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
        const period = days != "all" ? days : Math.ceil((now.getTime() - firstAttack.getTime())/ (1000*60*60*24))
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
            console.log(latest);
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
    }
}