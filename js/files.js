document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-js');
    const fileListContainer = document.getElementById('form-file-list');
    const emptyContainer = document.querySelector('.form-file-wrapper--empty');
    const uploadedContainer = document.querySelector('.form-file-wrapper--uploaded');


    // Ми більше не будемо покладатися на одну глобальну змінну dataTransfer для видалення.
    // Вона потрібна лише для початкового додавання.
    let globalDataTransfer = new DataTransfer();

    fileInput.addEventListener('change', function(event) {
        // Додаємо нові файли
        for (const file of event.target.files) {
            globalDataTransfer.items.add(file);
        }

        fileInput.files = globalDataTransfer.files;
        renderFileList();
    });

    /**
     * Функція для відображення списку вибраних файлів на сторінці.
     */
    function renderFileList() {
        fileListContainer.innerHTML = '';

        const files = Array.from(fileInput.files);

        if (files.length === 0) {
            emptyContainer.classList.remove('hidden');
            uploadedContainer.classList.add('hidden');
            return;
        }

        emptyContainer.classList.add('hidden');
        uploadedContainer.classList.remove('hidden');

        files.forEach((file, index) => {
            const fileItemElement = document.createElement('div');
            fileItemElement.className = 'file-item';

            const fileNameElement = document.createElement('span');
            fileNameElement.textContent = file.name;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = '×';
            deleteButton.dataset.index = index;

            deleteButton.addEventListener('click', removeFile);

            const iconElement = document.createElement('span');
            iconElement.className = 'icon';
            iconElement.innerHTML = documentIconSvg;

            fileItemElement.appendChild(iconElement);
            fileItemElement.appendChild(fileNameElement);
            fileItemElement.appendChild(deleteButton);
            fileListContainer.appendChild(fileItemElement);
        });
    }

    /**
     * ОНОВЛЕНА І НАДІЙНА ФУНКЦІЯ ВИДАЛЕННЯ
     * @param {MouseEvent} event - Подія кліку на кнопку видалення.
     */
    function removeFile(event) {
        const indexToRemove = parseInt(event.target.dataset.index, 10);

        // Створюємо НОВИЙ об'єкт DataTransfer
        const newTransfer = new DataTransfer();
        const currentFiles = Array.from(fileInput.files);

        // Копіюємо всі файли, крім того, що видаляється, у новий об'єкт
        currentFiles.forEach((file, index) => {
            if (index !== indexToRemove) {
                newTransfer.items.add(file);
            }
        });

        // Оновлюємо файли в input'і та в нашому глобальному сховищі
        fileInput.files = newTransfer.files;
        globalDataTransfer = newTransfer; // Оновлюємо глобальний стан

        // Перерендеримо список
        renderFileList();
    }
});