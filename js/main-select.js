
addEventListener("DOMContentLoaded", (event) => {
    document.querySelectorAll('.main-select').forEach(function (select, index) {
        var options = select.querySelectorAll('option');
        if(options.length === 0) return;
        var selectID = select.getAttribute('id');
        var ID = 'main-select-' + index;
        var optionsID = 'main-select-options-' + index;
        var optionsData = [];
        var html = '';
        if (selectID === null) {
            selectID = 'select_' + index;
            select.setAttribute('id', selectID);
        }
        options.forEach(function (option, index) {
            var text = option.innerText || option.textContent;
            var val = option.getAttribute('value') || text;
            var src = option.getAttribute('data-src') || '';
            var selected = option.getAttribute('selected');
            optionsData.push([
                index, text, val, src,selected
            ]);
        });
        html += '<div class="main-select-wrapper">';
        html += '<div class="main-select-wrapper__value" data-selector="#' + optionsID + '">';
        html += getCustomFirstOptionHTML(optionsData);
        html += '</div>';
        html += '</div>';
        var optionsHTML = '<div class="main-select-options" style="" id="' + optionsID + '">';
        optionsHTML += getCustomOptionsHTML(optionsData, {selectID: selectID});
        optionsHTML += '</div>';
        select.style.display = 'none';
        wrapSelect(select, ID);
        document.getElementById(ID).insertAdjacentHTML('beforeend', html);
        document.querySelector('body').insertAdjacentHTML('beforeend', optionsHTML);
    });
    document.body.addEventListener('click', function (event) {
        if (event.target) {
            if (event.target.classList.contains('main-select-option')) {
                event.preventDefault();
                setSelectOption(event.target);
                return;
            }
            if (event.target.classList.contains('main-select-wrapper__value')) {
                event.preventDefault();
                toggleOptionsVisibility(event.target);
                event.target.closest('.main-select-box').classList.add('main-select-box--active');
            } else if (!event.target.classList.contains('main-select-wrapper__value') || !event.target.classList.contains('main-select-option')) {
                removeActiveClass();
            }
        }
    });
});

window.addEventListener('resize', removeActiveClass);
window.addEventListener('scroll', removeActiveClass);



function setSelectOption(option) {
    var selectID = option.getAttribute('data-select');
    var index = option.getAttribute('data-index');
    if (selectID === null) return;
    if (index === null) return;
    var selectElement = document.getElementById(selectID);
    if (selectElement === null) return;
    index = Number(index);
    if (isNaN(index)) return;
    if (selectElement && selectElement.options.length > index) {
        var box = selectElement.closest('.main-select-box');
        var oldValue = selectElement.value;
        selectElement.selectedIndex = index;
        selectElement.dispatchEvent(new Event('change'));
        var newValue = selectElement.value;
        removeActiveClass();
        if (box) {
            var valSelector = box.querySelector('.main-select-wrapper__value .main-select-option');
            if (valSelector) valSelector.innerHTML = option.innerHTML;
        }
    } else {
        console.log("Селект не знайдено або індекс виходить за межі допустимих значень.");
    }
}

function toggleOptionsVisibility(target) {
    var element = target;
    var selector = element.getAttribute('data-selector');
    var el = document.querySelector(selector);
    if (el) {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            el.classList.remove('active-top');
            el.style.left = '';
            el.style.top = '';
            el.style.width = '';
            return;
        }
        removeActiveClass();
        var windowHeight = window.outerHeight;
        var rect = element.getBoundingClientRect();
        var top = rect.top;
        var left = rect.left;
        var width = rect.width;
        var height = rect.height;
        el.classList.add('active');
        el.style.left = left + 'px';
        el.style.top = (top + height) + 'px';
        el.style.width = (width) + 'px';
        var rectOptions = el.getBoundingClientRect();
        var rectOptionsHeight = rectOptions.height;
        var lastPixel = height + top + rectOptionsHeight;
        lastPixel = lastPixel + 50;
        if (lastPixel > windowHeight) {
            el.style.top = (top - rectOptionsHeight) + 'px';
            el.classList.add('active-top');
        }
    }
}

function getElementPositionRelativeToDocument(element) {
    const rect = element.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    return {
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        right: rect.right + scrollX,
        bottom: rect.bottom + scrollY,
        width: rect.width,
        height: rect.height
    };
}


function getBodyHeight(){
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );

    return height;
}

function removeActiveClass() {
    document.querySelectorAll('.main-select-box').forEach((el) => {
        el.classList.remove('main-select-box--active');
    });
    document.querySelectorAll('.main-select-options').forEach((el) => {
        el.classList.remove('active');
    });

}

function wrapSelect(element, ID) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('main-select-box');
    wrapper.setAttribute('id', ID);
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    wrapCustomSelectAndAddIcon(wrapper);
}
function wrapCustomSelectAndAddIcon(element) {
    if(element.closest('.custom-select') !== null) return;
    var wrapper = document.createElement('div');
    wrapper.classList.add('custom-select');
    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
    var iconWrap = document.createElement('span');
    iconWrap.classList.add('icon');
    iconWrap.classList.add('custom-select__icon');
    iconWrap.innerHTML = customSelectIconSvg;
    wrapper.appendChild(iconWrap);
}

function getCustomOptionsHTML(optionsData, args = {}) {
    var html = "";
    var selectID = args.selectID || '';
    optionsData.forEach(function (el) {
        var src = el[3];
        var img = '';
        if (src && src !== '') {
            img = '<div class="main-select-option__image"><img alt="" src="' + src + '"></div>';
        }
        html += '<div class="main-select-option" data-select="' + selectID + '" data-index="' + el[0] + '">';
        html += img;
        html += '<div class="main-select-option__text">' + el[1] + '</div>';
        html += '</div>';
    });
    return html;
}

function getCustomFirstOptionHTML(optionsData) {
    var html = "";
    var currentIndex = 0;
    optionsData.forEach(function (el, index) {
        if(el[4] !== null) currentIndex = index;
    });
    optionsData.forEach(function (el, index) {
        if (index === currentIndex) {
            var src = el[3];
            var img = '';
            if (src && src !== '') {
                img = '<div class="main-select-option__image"><img alt="" src="' + src + '"></div>';
            }
            html += '<div class="main-select-option" data-index="' + el[0] + '">';
            html += img;
            html += '<div class="main-select-option__text">' + el[1] + '</div>';
            html += '</div>';
        }
    });
    return html;
}