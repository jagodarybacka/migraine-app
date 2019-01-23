import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {languageText} from '../languages/MultiLanguage.js';
import moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePdf(data) {
    const docDefinition = createDocDefinition(data);
    pdfMake.createPdf(docDefinition).download();
}


function createDocDefinition(data) {
    let definition = {};
    definition.content = [];
    const textTitle = languageText.pdfGeneration.title + "\n";
    const mainTitle = {text: textTitle, style: "title", alignment: 'center'};
    definition.content.push(mainTitle);
    const textSubTitle = languageText.pdfGeneration.subtitle + "\n";
    const subTitle = {text: textSubTitle, style: "subtitle", alignment: 'center'};
    definition.content.push(subTitle);
    if(data.together){
        definition = togetherContent(definition, data.together);
    }
    if(data.stats) {
        if(data.reports.length > 0){
            definition = statsContent(definition, data.stats, data.user, data.reports[data.reports.length-1]);
        } else {
            definition = statsContent(definition, data.stats, data.user, undefined);
        } 
    }
    if(data.reports.length > 0) {
        if(data.together || data.stats) {
            definition.content.push({text: "", pageBreak: 'after'});
        }
        definition = reportsContent(definition, data.reports);
    }
    definition = setStyles(definition);
    return definition;

}

function reportsContent(object, reports) {
    const reportsTitle = "\n" + languageText.pdfGeneration.reportsTitle + "\n";
    object.content.push({text: reportsTitle, style: 'header'})
    reports.forEach((report) => {
        const title = "\n" + languageText.pdfGeneration.migraineHeader;
        object.content.push({text: title, style: 'subheader'});
        if(report.start_date){
            const text = [languageText.pdfGeneration.startDate,{text: formatDate(report.start_date), bold: true}];
            object.content.push({text: text});
        }
        if(report.end_date){
            const text = [languageText.pdfGeneration.endDate,{text: formatDate(report.end_date), bold: true}];
            object.content.push({text: text});
        }
        if(report.start_date && report.end_date) {
            const startDate = moment(report.start_date,'YYYY-MM-DDTHH:mm:ss');
            const endDate = moment(report.end_date,'YYYY-MM-DDTHH:mm:ss');
            const duration = moment.duration(endDate.diff(startDate));
            const formattedDuration = formatDuration(duration);
            const text = [languageText.pdfGeneration.durationTime,{text: formattedDuration, bold: true}];
            object.content.push({text: text});
        }
        if(report.pain){
            const text = [languageText.pdfGeneration.pain,{text: getTranslatedValueForm(report.pain,"pain"), bold: true}];
            object.content.push({text: text});
        }
        if(report.medicines && report.medicines.length > 0){
            let values = "";
            report.medicines.forEach((answer) => {
                values += getTranslatedValueForm(answer,"medicines") + "\t"
            })
            const text = [languageText.pdfGeneration.medicines,{text: values, bold: true}];
            object.content.push({text: text});
        }
        if(report.triggers && report.triggers.length > 0){
            let values = "";
            report.triggers.forEach((answer) => {
                values += getTranslatedValueForm(answer,"triggers") + "\t"
            })
            const text = [languageText.pdfGeneration.triggers,{text: values, bold: true}];
            object.content.push({text: text});
        }
        if(report.reliefs && report.reliefs.length > 0){
            let values = "";
            report.reliefs.forEach((answer) => {
                values += getTranslatedValueForm(answer,"reliefs") + "\t"
            })
            const text = [languageText.pdfGeneration.reliefs,{text: values, bold: true}];
            object.content.push({text: text});
        }
        if(report.localization){
            const text = [languageText.pdfGeneration.localization,{text: getTranslatedValueForm(report.localization,"localization"), bold: true}];
            object.content.push({text: text});
        }
        if(report.aura && report.aura.length > 0){
            let values = "";
            report.aura.forEach((answer) => {
                values += getTranslatedValueForm(answer,"aura") + "\t"
            })
            const text = [languageText.pdfGeneration.aura,{text: values, bold: true}];
            object.content.push({text: text});
        }
        if(report.mood){
            const text = [languageText.pdfGeneration.mood,{text: getTranslatedValueForm(report.mood,"mood"), bold: true}];
            object.content.push({text: text});
        }
        if(report.menstruation){
            const text = [languageText.pdfGeneration.menstruation,{text: getTranslatedValueForm(report.menstruation,"menstruation"), bold: true}];
            object.content.push({text: text});
        }
        if(report.pressure){
            const pressure = report.pressure + 'mmHG';
            const text = [languageText.pdfGeneration.bloodPressure,{text: pressure, bold: true}];
            object.content.push({text: text});
        }
        if(report.sleep_duration){
            const sleep_duration = report.sleep_duration + 'h';
            const text = [languageText.pdfGeneration.sleepDuration,{text: sleep_duration, bold: true}];
            object.content.push({text: text});
        }
        if(report.notes){
            const text = [languageText.pdfGeneration.notes,{text: report.notes, bold: true}];
            object.content.push({text: text});
        }

    })
    return object;
}

function statsContent(object, stats, user, firstAttack) {
    const statsTitle = "\n" + languageText.reports.summary + "\n\n";
    object.content.push({text: statsTitle, style: 'header'})
    let table = {
        table: {}
    };
    table.table.widths = ['*', 60, 60, 60, 60, 60];
    let headers = [languageText.pdfGeneration.timeSpan];
    for(let value in stats["stats30"]){
        headers.push(languageText.pdfGeneration[value]);
    }
    table.table.body = [];
    table.table.body.push(headers);
    for(let value in stats) {
        let row = [];
        if(value === "statsAll"){
            if(user.registration_date) {
                if(firstAttack && firstAttack.start_date){
                    const attackDate = new Date(firstAttack.start_date);
                    const registrationDate = new Date(user.registration_date);
                    const header = attackDate.getTime() > registrationDate.getTime() 
                        ? languageText.pdfGeneration[value + 'HeaderRegister'] + "\n(" + formatDate(registrationDate) + ")" 
                        : languageText.pdfGeneration[value + 'HeaderAttack'] + "\n(" + formatDate(attackDate) + ")" ;
                    row.push(header);
                } else {
                    const date = user.registration_date ? "(" + formatDate(user.registration_date) + ")" : "";
                    const header = languageText.pdfGeneration[value + 'HeaderRegister'] + "\n" + date;
                    row.push(header);
                }
            } else {
                if(firstAttack && firstAttack.start_date){
                    const date = "(" + formatDate(firstAttack.start_date) + ")";
                    const header = languageText.pdfGeneration[value + 'HeaderAttack'] + "\n" + date;
                    row.push(header);
                } else {
                    const header = languageText.pdfGeneration[value + 'HeaderNone'];
                    row.push(header);
                }
            }  
        }
        else {
            const header = languageText.pdfGeneration[value + 'Header'];
            row.push(header);
        }
        for(let sub in stats[value]){
            row.push(stats[value][sub])
        }
        table.table.body.push(row);
    }
    object.content.push(table);
    return object;
}

function togetherContent(object, together) {
    const togetherTitle = "\n" + languageText.reports.oftenTogether + "\n";
    object.content.push({text: togetherTitle, style: 'header'});
    if(together.noPain.triggers){
        let table = {
            table: {}
        };
        table.table.body = [];
        table.table.widths = ['*'];
        const subheader = "\n" + languageText.pdfGeneration.painStrength + getTranslatedValue("No Pain","pain");
        object.content.push({text: subheader, style: 'subheader'});
        for(let option in together["noPain"]){
            if(together["noPain"][option].length > 0 && option !== 'weather'){
                const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                table.table.body.push(name);
                let values = "";
                together["noPain"][option].forEach((value) => {
                    values += getTranslatedValue(value,option) + "\t"
                })
                let helpTable = [];
                helpTable.push({text:values,  alignment: 'center', style: 'tableContent'});
                table.table.body.push(helpTable);
            }
            if(option === 'weather'){
                const weather = getWeather(together["noPain"]['weather']);
                if(weather.length > 0){
                    const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                    table.table.body.push(name);
                    let values = "";
                    weather.forEach((value) => {
                        values += getTranslatedValue(value,option) + "\t"
                    });
                    let helpTable = [];
                    helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                    table.table.body.push(helpTable);
                }
            }
        }
        if(table.table.body.length > 0)
            object.content.push(table);
    }
    if(together.mild.triggers){
        let table = {
            table: {}
        };
        table.table.body = [];
        table.table.widths = ['*'];
        const subheader = "\n" + languageText.pdfGeneration.painStrength + getTranslatedValue("Mild","pain");
        object.content.push({text: subheader, style: 'subheader'});
        for(let option in together["mild"]){
            if(together["mild"][option].length > 0 && option !== 'weather'){
                const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                table.table.body.push(name);
                let values = "";
                together["mild"][option].forEach((value) => {
                    values += getTranslatedValue(value,option) + "\t"
                })
                let helpTable = [];
                helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                table.table.body.push(helpTable);
            } 
            if(option === 'weather'){
                const weather = getWeather(together["mild"]['weather']);
                if(weather.length > 0){
                    const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                    table.table.body.push(name);
                    let values = "";
                    weather.forEach((value) => {
                        values += getTranslatedValue(value,option) + "\t"
                    });
                    let helpTable = [];
                    helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                    table.table.body.push(helpTable);
                }
            }  
        }
        if(table.table.body.length > 0)
            object.content.push(table);
    }
    if(together.moderate.triggers){
        let table = {
            table: {}
        };
        table.table.body = [];
        table.table.widths = ['*'];
        const subheader = "\n" + languageText.pdfGeneration.painStrength + getTranslatedValue("Moderate","pain");
        object.content.push({text: subheader, style: 'subheader'});
        for(let option in together["moderate"]){
            if(together["moderate"][option].length > 0 && option !== 'weather'){
                const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                table.table.body.push(name);
                let values = "";
                together["moderate"][option].forEach((value) => {
                    values += getTranslatedValue(value,option) + "\t"
                })
                let helpTable = [];
                helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                table.table.body.push(helpTable);
            }
            if(option === 'weather'){
                const weather = getWeather(together["moderate"]['weather']);
                if(weather.length > 0){
                    const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                    table.table.body.push(name);
                    let values = "";
                    weather.forEach((value) => {
                        values += getTranslatedValue(value,option) + "\t"
                    });
                    let helpTable = [];
                    helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                    table.table.body.push(helpTable);
                }
            }
        }
        if(table.table.body.length > 0)
            object.content.push(table);
    }
    if(together.intense.triggers){
        let table = {
            table: {}
        };
        table.table.body = [];
        table.table.widths = ['*'];
        const subheader = "\n" + languageText.pdfGeneration.painStrength + getTranslatedValue("Intense","pain");
        object.content.push({text: subheader, style: 'subheader'});
        for(let option in together["intense"]){
            if(together["intense"][option].length > 0 && option !== 'weather'){
                const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                table.table.body.push(name);
                let values = "";
                together["intense"][option].forEach((value) => {
                    values += getTranslatedValue(value,option) + "\t"
                })
                let helpTable = [];
                helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                table.table.body.push(helpTable);
            }
            if(option === 'weather'){
                const weather = getWeather(together["intense"]['weather']);
                if(weather.length > 0){
                    const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                    table.table.body.push(name);
                    let values = "";
                    weather.forEach((value) => {
                        values += getTranslatedValue(value,option) + "\t"
                    });
                    let helpTable = [];
                    helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                    table.table.body.push(helpTable);
                }
            }
        }
        if(table.table.body.length > 0)
            object.content.push(table);
    }
    if(together.maximum.triggers){
        let table = {
            table: {}
        };
        table.table.body = [];
        table.table.widths = ['*'];
        const subheader = "\n" + languageText.pdfGeneration.painStrength + getTranslatedValue("Maximum","pain");
        object.content.push({text: subheader, style: 'subheader'});
        for(let option in together["maximum"]){
            if(together["maximum"][option].length > 0 && option === 'weather'){
                const name = [{text: languageText.oftenTogether[option],style: 'tableHeader'}];
                table.table.body.push(name);
                let values = "";
                together["maximum"][option].forEach((value) => {
                    values += getTranslatedValue(value,option) + "\t"
                })
                let helpTable = [];
                helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                table.table.body.push(helpTable);
            }
            if(option === 'weather'){
                const weather = getWeather(together["maximum"]['weather']);
                if(weather.length > 0){
                    const name = [{text: languageText.oftenTogether[option],style: 'tableHeader', alignment: 'center'}];
                    table.table.body.push(name);
                    let values = "";
                    weather.forEach((value) => {
                        values += getTranslatedValue(value,option) + "\t"
                    });
                    let helpTable = [];
                    helpTable.push({text:values,  alignment: 'center',style: 'tableContent'});
                    table.table.body.push(helpTable);
                }
            } 
        }
        if(table.table.body.length > 0)
            object.content.push(table);
    }
    return object;
}

function formatDate(d) {
    const date = new Date(d);
    return date.toLocaleDateString();
}

function formatDuration(duration) {
    let text = "";
    if(duration.days() > 0){
      text+=duration.days() + "d ";
    }
    if(duration.hours() > 0){
      text+=duration.hours() + "h ";
    }
    if(duration.minutes() > 0){
      if(duration.days() === 0){
        text+=duration.minutes() + "min";
      }
    }
    return text;
  }

function setStyles(object) {
    object.styles = {
		title: {
			fontSize: 18,
            bold: true,
        },
        subtitle: {
			fontSize: 14,
            italics: true,
            color: '#4d4d4d'
		},
        header: {
			fontSize: 16,
			bold: true
		},
        subheader: {
			fontSize: 14,
			bold: true
        },
        tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
        },
        tableContent: {
            italics: true,
            color: '#4d4d4d'
        }
    };
    return object;
}

function getTranslatedValueForm(toTranslate, type){
    if(toTranslate === '')
      return '';
    let translationDict = languageText.addForm[type+"Answers"];
    let foundPair = translationDict.find(f => f.value === toTranslate);
    if(foundPair !== undefined)
      return foundPair.text;
    else
      return toTranslate;
  }

function getTranslatedValue(toTranslate, type){
    if(toTranslate === '')
      return '';
    let translationDict = languageText.oftenTogether[type+"Options"];
    let foundPair = translationDict.find(f => f.value === toTranslate);
    if(foundPair !== undefined)
      return foundPair.text;
    else
      return toTranslate;
  }

function getWeather(weather){
    if(weather) {
      let answers = [];
      if(weather.pressure && weather.pressure.length !== 0){
        weather.pressure.forEach((value) => {
          answers.push(value + "hPa");
        })
      }
      if(weather.temperature && weather.temperature.length !== 0){
        weather.temperature.forEach((value) => {
          answers.push(value + String.fromCharCode(176) + "C")
        })
      }
      if(weather.humidity && weather.humidity.length !== 0){
        weather.humidity.forEach((value) => {
          answers.push(languageText.oftenTogether.humidity + value + '%')
        })
      }
      if(weather.description && weather.description.length !== 0){
        weather.description.forEach((value) => {
          answers.push(value)
        })
      }
    return answers;
    }
  }