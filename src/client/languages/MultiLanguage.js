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
    if(window.langFile === undefined){
        let language = localStorage.getItem('lang');
        if(language == null){
            var userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage; 
            console.log(userLang);
            try {
                userLang = userLang.split('-');
                if(userLang[0] === 'pl' || userLang[0] === 'eng')
                    setLanguage(userLang[0])
                else 
                    setLanguage('eng');
            } catch {
                if(userLang === 'pl' || userLang === 'eng')
                    setLanguage(userLang);
                else 
                    setLanguage('eng');
            }
            language = localStorage.getItem('lang');
        }
        let json = require('../languages/'+language+'.json');
        window.langFile = json;
        return json;
    }else{
        return window.langFile;
    }
})();

export default languageText;
