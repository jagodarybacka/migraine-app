export function setLanguage(lang){
    localStorage.setItem('lang', lang);
}

export function getLanguage(lang){
    let language = localStorage.getItem('lang');
        if(language == null){
            localStorage.setItem('lang', 'eng');
            return "eng"
        }else{
            return language;
        }

}

export let languageText =(()=>{
    if(window.langFile == undefined){
        let language = localStorage.getItem('lang');
        if(language == null){
            localStorage.setItem('lang', 'eng');
            language = 'eng';
        }
        let json = require('../languages/'+language+'.json');
        window.langFile = json;
        return json;
    }else{
        return window.langFile;
    }
})();

export default languageText;