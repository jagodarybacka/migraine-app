module.exports = {
    computeStats: function(reports, days) {   
        const attacks = reports.length;
        let pain = 0;
        let daysWithPain = 0;
        reports.forEach((report) => {
            let timeDiff = (report.end_date.getTime() - report.start_date.getTime()) / (1000 * 60);
            let daysDiff = Math.ceil(timeDiff / (60 * 24));
            pain+=timeDiff;
            daysWithPain+=daysDiff;
        })
        const total = Math.round(pain / (60));
        const painDays = daysWithPain;
        const noPainDays = days - painDays;
        const average = Math.round((pain / 60)/attacks);
        return {attacks: attacks, painDays: painDays, noPainDays: noPainDays, average: average, total: total}
    }
}