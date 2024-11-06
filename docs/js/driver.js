const driver = window.driver.js.driver;
const nav = document.querySelector("body > header > nav.md-tabs > div > ul");
const orgGithubLink = document.querySelector("body > header > nav.md-header__inner.md-grid > div.md-header__source > a");

if (getCookie("driver") !== "true") {
    const driverObj = driver({
        showProgress: true,
        allowKeyboardControl: true,
        steps: [
            {
                element: nav,
                popover: {
                    title: 'Navigation',
                    description: 'Here u can find all package of Basalt.',
                    side: 'bottom'
                },
            },
            {
                element: orgGithubLink,
                popover: {
                    title: 'Github',
                    description: 'Here u can find the Organization of Basalt.',
                    side: 'bottom'
                },
            },
            {
                element: searchInput,
                popover: {
                    title: 'Search',
                    description: 'Search for anything in the documentation.',
                    side: 'bottom'
                },
            }
        ]
    });
    driverObj.drive();
    setCookie("driver", true);
}

function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name === cookiePair[0].trim())
            return decodeURIComponent(cookiePair[1]);
    }
    return null;
}
