import axios from 'axios';

export function setTheme(theme, force = false) {

    if (force)
        localStorage.setItem('automaticTheme', false);

    let currentTheme = localStorage.getItem('theme');
    if (currentTheme !== theme || force) {
        localStorage.setItem('theme', theme);
        window.location.reload();
    }
}
export function checkIfCurrentMigraine(data) {
    if (data && (data['end_date'] == undefined || data['end_time'] == undefined)) {
        return true;
    } else {
        return false
    }
}

export function toggleAutomaticThemeStatus() {
    let newAutomaticStatus =  !getAutomaticThemeStatus();
    localStorage.setItem('automaticTheme', newAutomaticStatus);

    if (newAutomaticStatus) {
        axios.get('/api/recent').then(({ data }) => {
            if (checkIfCurrentMigraine(data))
                setTheme("DarkTheme");
            else
                setTheme("LightTheme");
        })
            .catch((err) => {
                console.log(err)
            });
    } else {
        window.location.reload();
    }

}

export function getUserTheme() {
    let theme = localStorage.getItem('userTheme');
    if (theme == null) {
        return "LightTheme"
    } else {
        return theme;
    }
}

export function getAutomaticThemeStatus() {
    let isAutomatic = localStorage.getItem('automaticTheme');
    if (isAutomatic == 'false') {
        return false
    } else {
        return true;
    }
}

export function getTheme() {
    let theme = localStorage.getItem('theme');
    if (theme == null) {
        localStorage.setItem('theme', 'LightTheme');
        return "LightTheme"
    } else {
        return theme;
    }
}

export let currentTheme = (() => {

    if (localStorage.getItem('automaticTheme') == null)
        localStorage.setItem('automaticTheme', false);

    if (window.themeFile == undefined) {
        let theme = localStorage.getItem('theme');
        if (theme == null) {
            localStorage.setItem('theme', 'LightTheme');
            theme = 'LightTheme';
        }
        let themeJSFile = require('../themes/' + theme + '.js');
        window.themeFile = themeJSFile;
        return themeJSFile;
    } else {
        return window.themeFile;
    }
})();

export default currentTheme;