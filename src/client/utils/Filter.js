export function filter(reports, timePeriod, query) {
    if(timePeriod) {
        let results = timeFilter(reports,timePeriod);
        return query ? results.filter(search, query) : results;
    } else {
        return query ? reports.filter(search, query) : [];
    }
}

function search(report){
    return Object.keys(this).every((key) => {
        if(typeof this[key] !== 'string'){
            let contains = false;
            this[key].forEach((el) => {
                if(report[key].includes(el) || report[key] === el)
                    contains = true;
            })
            return contains;
        } 
        else
            return report[key] === this[key] || report[key].includes(this[key]);
    });
}

function timeFilter(reports, timePeriod) {
    return reports.filter((r) => {
        return ((new Date(r.start_date).getTime() >= new Date(timePeriod.start).getTime())
        && (r.end_date 
            ? new Date(r.end_date).getTime() <= new Date(timePeriod.end).getTime()
            : new Date(r.start_date).getTime() <= new Date(timePeriod.end).getTime()
            ))
        }
    )
}