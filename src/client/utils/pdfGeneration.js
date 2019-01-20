import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {languageText} from '../languages/MultiLanguage.js';
import moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePdf(data) {
    // console.log(data);
    const docDefinition = createDocDefinition(data);
    // console.log(docDefinition);
    pdfMake.createPdf(docDefinition).download();
}


function createDocDefinition(data) {
    let definition = {};
    definition.content = [];
    const textTitle = languageText.pdfGeneration.title + "\n";
    console.log(textTitle);
    const mainTitle = {text: textTitle, style: "title", alignment: 'center'};
    definition.content.push(mainTitle);
    const textSubTitle = languageText.pdfGeneration.subtitle + "\n";
    const subTitle = {text: textSubTitle, style: "subtitle", alignment: 'center'};
    definition.content.push(subTitle);
    if(data.together){
        definition = togetherContent(definition, data.together);
    }
    if(data.stats) {
        definition = statsContent(definition, data.stats, data.user);
    }
    definition = setStyles(definition);
    return definition;

}

function statsContent(object, stats, user) {
    const statsTitle = "\n" + languageText.reports.summary + "\n";
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
            const date = user.registration_date ? "(" + formatDate(user.registration_date) + ")" : "";
            const header = languageText.pdfGeneration[value + 'Header'] + "\n" + date;
            row.push(header);
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
        const subheader = "\n" + languageText.pdfGeneration.pain + getTranslatedValue("No Pain","pain");
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
        const subheader = "\n" + languageText.pdfGeneration.pain + getTranslatedValue("Mild","pain");
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
        const subheader = "\n" + languageText.pdfGeneration.pain + getTranslatedValue("Moderate","pain");
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
        const subheader = "\n" + languageText.pdfGeneration.pain + getTranslatedValue("Intense","pain");
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
        const subheader = "\n" + languageText.pdfGeneration.pain + getTranslatedValue("Maximum","pain");
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