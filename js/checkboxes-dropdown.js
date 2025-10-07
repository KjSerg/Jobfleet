document.addEventListener('DOMContentLoaded', function () {
    checkingSelectedCheckboxes();
    eventListener();
});

function checkingSelectedCheckboxes() {
    document.querySelectorAll('.form-dropdown-wrapper').forEach(function (wrapper) {
        renderSelectedValues(wrapper);
    });
}

function eventListener() {
    document.querySelectorAll('.form-dropdown-wrapper').forEach(function (wrapper) {
        wrapper.querySelectorAll('input[type="checkbox"]').forEach(function (input) {
            input.addEventListener('change', function () {
                renderSelectedValues(wrapper);
            });
        });
        wrapper.querySelectorAll('.form-dropdown-search__input').forEach(function (input) {
            input.addEventListener('input', function () {
                const value = input.value.trim().toUpperCase();
                wrapper.querySelectorAll('input[type="checkbox"]').forEach(function (checkboxInput) {
                    const checkboxInputValue = checkboxInput.value.trim().toUpperCase();
                    checkboxInput.closest('li').classList.remove('hidden');
                    if (value.length > 0) {
                        if (!checkboxInputValue.includes(value)) {
                            checkboxInput.closest('li').classList.add('hidden');
                        }
                    }
                });
            });
        });
        wrapper.querySelectorAll('.form-dropdown-selected').forEach(function (element) {
            element.addEventListener('click', function (event) {
                const test = event.target.classList.contains('delete-form-dropdown-selected') ||
                    event.target.classList.contains('form-dropdown-selected__val');
                if(!test){
                    if (wrapper.classList.contains('active')) {
                        wrapper.classList.remove('active');
                    } else {
                        wrapper.classList.add('active');
                    }
                }

            });
        });
    });
}

function getSelectedValues(wrapper) {
    const values = [];
    const inputs = wrapper.querySelectorAll('input[type="checkbox"]:checked');
    inputs.forEach(function (input) {
        const val = input.getAttribute('value');
        if (val) {
            values.push(val);
        }
    });
    return values;
}

function renderSelectedValues(wrapper) {
    const maxNumberRender = 2;
    let counter = 0;
    const elementForRenderValues = wrapper.querySelector('.form-dropdown-selected__text');
    if (!elementForRenderValues) return;
    const values = getSelectedValues(wrapper);
    let html = '';
    if (values.length === 0) {
        elementForRenderValues.innerHTML = elementForRenderValues.getAttribute('data-placeholder');
        return;
    }
    elementForRenderValues.innerHTML = '';
    values.forEach(function (value) {
        if (counter < maxNumberRender) {
            const selectedElement = document.createElement('span');
            selectedElement.className = 'form-dropdown-selected__val';
            selectedElement.innerHTML = value;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-form-dropdown-selected dark-color';
            deleteButton.textContent = '×';

            deleteButton.addEventListener('click', function (e) {
                e.preventDefault();
                wrapper.querySelector('input[value="' + value + '"]').checked = false;
                renderSelectedValues(wrapper);
            });

            selectedElement.appendChild(deleteButton);
            elementForRenderValues.appendChild(selectedElement);
            counter++;
        }
    });
    if (values.length > maxNumberRender) {
        const diffElement = document.createElement('span');
        diffElement.className = 'form-dropdown-selected__val';
        diffElement.innerHTML = '+' + (values.length - maxNumberRender);
        elementForRenderValues.appendChild(diffElement);
    }
}

