export function setTheme(theme, automatic=false){

    if(!automatic)
        localStorage.setItem('userTheme', theme);

    let currentTheme = localStorage.getItem('theme');
    if(currentTheme !== theme){
        localStorage.setItem('theme', theme);
        window.location.reload();
    }
}

export function getUserTheme(){
    let theme = localStorage.getItem('userTheme');
        if(theme == null){
            return "LightTheme"
        }else{
            return theme;
        }
}

export function getTheme(){
    let theme = localStorage.getItem('theme');
        if(theme == null){
            localStorage.setItem('theme', 'LightTheme');
            return "LightTheme"
        }else{
            return theme;
        }
}

export let currentTheme =(()=>{
    if(window.themeFile == undefined){
        let theme = localStorage.getItem('theme');
        if(theme == null){
            localStorage.setItem('theme', 'LightTheme');
            theme = 'LightTheme';
        }
        let themeJSFile = require('../themes/'+theme+'.js');
        window.themeFile = themeJSFile;
        return themeJSFile;
    }else{
        return window.themeFile;
    }
})();

export default currentTheme;