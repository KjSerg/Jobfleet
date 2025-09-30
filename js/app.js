document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.theme-switcher').addEventListener('click', function (e) {
        e.preventDefault();
        var themeToApply = getThemeFromHtml();
        setThemeForHtml(themeToApply);
        saveThemeInLocalStorage(themeToApply);
    });
    document.querySelectorAll('.toggle-input-password').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            var label = element.closest('label');
            var input = label.querySelector('input');
            var icon = label.querySelector('img');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
                icon.setAttribute('src', hidePasswordImage);
            } else {
                input.setAttribute('type', 'password');
                icon.setAttribute('src', showPasswordImage);
            }
        });
    })
});


function setThemeForHtml(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function getThemeFromHtml() {
    var themeSelected = document.querySelector('html').getAttribute('data-theme');
    return themeSelected === 'dark' ? 'light' : 'dark';
}

function saveThemeInLocalStorage(theme) {
    localStorage.setItem('selectedTheme', theme);
}