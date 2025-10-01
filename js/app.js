const doc = document;
let duration = 400;
let windowWidthReconfiguration = 1400;
doc.addEventListener('DOMContentLoaded', function () {
    doc.querySelectorAll('.theme-switcher').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let themeToApply = getThemeFromHtml();
            setThemeForHtml(themeToApply);
            saveThemeInLocalStorage(themeToApply);
        });
    });
    doc.querySelectorAll('.toggle-input-password').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let label = element.closest('label');
            let input = label.querySelector('input');
            let icon = label.querySelector('img');
            if (input.getAttribute('type') === 'password') {
                input.setAttribute('type', 'text');
                icon.setAttribute('src', hidePasswordImage);
            } else {
                input.setAttribute('type', 'password');
                icon.setAttribute('src', showPasswordImage);
            }
        });
    });
    doc.querySelectorAll('.custom-modal-open').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const href = element.getAttribute('href');
            if (href === '#') return;
            if (href === '') return;
            if (href === undefined) return;
            const queriedElement = _$(href);
            if (queriedElement === null) return;
            queriedElement.classList.add('custom-modal-active');
            _$('body').classList.add('open-custom-modal');
        });
    });
    doc.querySelectorAll('.custom-modal-close').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const href = element.getAttribute('href') || '';
            const test = ['', '#', undefined, null].includes(href);
            if (test) {
                removeClassFromElements('.custom-modal-active', 'custom-modal-active');
                _$('body').classList.remove('open-custom-modal');
            } else {
                const queriedElement = _$(href);
                if (queriedElement === null) return;
                queriedElement.classList.remove('custom-modal-active');
                _$('body').classList.remove('open-custom-modal');
            }

        });
    });
    doc.querySelectorAll('.custom-modals').forEach(function (element) {
        element.addEventListener('click', function (e) {
            if (!e.target.classList.contains('custom-modals')) return;
            removeClassFromElements('.custom-modal-active', 'custom-modal-active');
            _$('body').classList.remove('open-custom-modal');
        });
    });
    doc.querySelectorAll('.sidebar__slide-hide').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const sidebar = _$('.sidebar');
            const windowOuterWidth = window.outerWidth;
            if(windowOuterWidth <= windowWidthReconfiguration){
                sidebar.classList.remove('sidebar--showed-mobile');
                return;
            }
            if (sidebar.classList.contains('sidebar--hidden')) return;
            sidebar.classList.add('sidebar--hidden');
            const section = sidebar.closest('.dashboard-section');
            slideLeft(sidebar, duration);
            section.classList.add('dashboard-section--full');
        });
    });
    doc.querySelectorAll('.sidebar__slide-show').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const sidebar = _$('.sidebar');
            const windowOuterWidth = window.outerWidth;
            if(windowOuterWidth <= windowWidthReconfiguration){
                sidebar.classList.add('sidebar--showed-mobile');
                return;
            }
            if (!sidebar.classList.contains('sidebar--hidden')) return;
            sidebar.classList.remove('sidebar--hidden');
            const section = sidebar.closest('.dashboard-section');
            slideRight(sidebar, duration);
            section.classList.remove('dashboard-section--full');
        });
    });
    doc.querySelectorAll('.accordion__head').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            const wrapper = element.closest('.accordion');
            const content = wrapper.querySelector('.accordion__content');
            if(wrapper.classList.contains('active')){
                wrapper.classList.remove('active');
                slideUp(content, duration)
            }else {
                wrapper.classList.add('active');
                slideDown(content, duration)
            }
        });
    });
});


function slideDown(element, duration = 400) {
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') {
        element.style.display = 'block';
    }

    let height = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = 0;
    console.log(height)
    setTimeout(() => {
        element.style.transition = `${duration}ms ease`;
        element.style.height = height + 'px';
    }, 10);

    setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
    }, duration);
}

function slideUp(element, duration = 400) {
    element.style.height = element.offsetHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `${duration}ms ease`;

    setTimeout(() => {
        element.style.height = 0;
    }, 10);

    setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
    }, duration);
}

function slideRight(element, duration = 400) {
    element.classList.add('animation-execution');
    element.style.removeProperty('display');
    let display = window.getComputedStyle(element).display;

    if (display === 'none') {
        element.style.display = 'block';
    }

    let w = element.offsetWidth;
    element.style.overflow = 'hidden';
    element.style.width = 0;

    console.log(w)
    setTimeout(() => {
        element.style.transition = `width ${duration}ms ease`;
        element.style.width = w + 'px';
    }, 10);

    setTimeout(() => {
        element.style.removeProperty('width');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
        element.classList.remove('animation-execution');
    }, duration);
}

function slideLeft(element, duration = 400) {
    element.classList.add('animation-execution');
    element.style.width = element.offsetWidth + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `width ${duration}ms ease`;

    setTimeout(() => {
        element.style.width = 0;
    }, 10);

    setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('width');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition');
        element.classList.remove('animation-execution');
    }, duration);
}

function removeClassFromElements(selector, cssClass) {
    doc.querySelectorAll(selector).forEach(function (element) {
        element.classList.remove(cssClass);
    });
}

function addClassToElements(selector, cssClass) {
    doc.querySelectorAll(selector).forEach(function (element) {
        element.classList.add(cssClass);
    });
}

function _$(selector) {
    return doc.querySelector(selector);
}

function setThemeForHtml(theme) {
    doc.documentElement.setAttribute('data-theme', theme);
}

function getThemeFromHtml() {
    let themeSelected = _$('html').getAttribute('data-theme');
    return themeSelected === 'dark' ? 'light' : 'dark';
}

function saveThemeInLocalStorage(theme) {
    localStorage.setItem('selectedTheme', theme);
}