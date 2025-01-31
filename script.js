// НАВИГАТОР
document.querySelector('.header-logo-adaptiv-open img').addEventListener('click', function() {
    document.querySelector('.navigation-adaptiv').classList.toggle('active');
    document.querySelector('.header-logo-adaptiv-close img').classList.toggle('active');
});

document.querySelector('.header-logo-adaptiv-close img').addEventListener('click', function() {
    document.querySelector('.navigation-adaptiv').classList.toggle('active');
    document.querySelector('.header-logo-adaptiv-close img').classList.toggle('close');
});

// ЗАГРУЗКА ДАННЫХ ОБЬЕКТОВ НЕДВИЖИМОСТИ ИЗ ФАЙЛА data-properties.csv

document.addEventListener("DOMContentLoaded", function() {
    const propertySlider = document.querySelector(".property-slider");
    const propertiesInfo = document.querySelector(".properties-info");
    const propertySliderNumberDetail = document.querySelector(".property-slider-number-detail");
    const propertySliderNumberSum = document.querySelector(".property-slider-number-sum");

    let properties = []; // Массив для хранения данных о недвижимости
    let currentIndex = 0; // Текущий индекс отображаемой недвижимости

    // Функция загрузки данных из CSV-файла
    function loadData() {
        fetch('data-properties.csv')
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
                const headers = rows[0].split(";");

                properties = rows.slice(1).map(row => {
                    const values = row.split(";");
                    let obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index] || "";
                    });
                    return obj;
                });

                propertySliderNumberSum.textContent = properties.length; // Установить общее количество объектов
                updateProperty(0); // Отображаем первый объект
            })
            .catch(error => console.error("Ошибка загрузки CSV:", error));
    }

    // Функция обновления информации о недвижимости
    function updateProperty(index) {
        currentIndex = index;
        const property = properties[index];

        propertiesInfo.innerHTML = `
            <h2>${property["Название"]}</h2>
            <p>${property["Описание"]}</p>
            <img class="properties-img" src="${property["Изображение 1"]}" alt="">
            <img class="properties-img" src="${property["Изображение 2"]}" alt="">
            <img class="properties-img" src="${property["Изображение 3"]}" alt="">
        `;

        propertySliderNumberDetail.textContent = currentIndex + 1; // Обновить номер текущего объекта
    }

    // Функция перехода к следующему объекту
    function nextProperty() {
        const newIndex = (currentIndex + 1) % properties.length;
        updateProperty(newIndex);
    }

    // Функция перехода к предыдущему объекту
    function prevProperty() {
        const newIndex = (currentIndex - 1 + properties.length) % properties.length;
        updateProperty(newIndex);
    }

    // Загружаем данные из CSV
    loadData();

    // Добавляем обработчики событий
    document.querySelector(".property-slider-logo-left").addEventListener("click", prevProperty);
    document.querySelector(".property-slider-logo-right").addEventListener("click", nextProperty);
});

// ЗАГРУЗКА ДАННЫХ УСЛУГ ИЗ ФАЙЛА data-services.csv

document.addEventListener("DOMContentLoaded", function() {
    fetch('data-services.csv')
        .then(response => response.text())
        .then(csvText => {
            const servicesContainer = document.querySelector(".services-container");
            servicesContainer.innerHTML = '';

            const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
            const headers = rows[0].split(";"); // Используем ";" как разделитель

            const data = rows.slice(1).map(row => {
                const values = row.split(";"); // Разбиваем строки по ;
                let obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index] || "";
                });
                return obj;
            });

            data.forEach(service => {
                const serviceItem = document.createElement("div");
                serviceItem.classList.add("service-item");

                const serviceImg = document.createElement("img");
                serviceImg.src = service["Путь к иконке"];
                serviceImg.alt = service["Название"];

                const serviceTitle = document.createElement("h2");
                serviceTitle.classList.add("service-item-title");
                serviceTitle.textContent = service["Название"];

                const serviceInfo = document.createElement("div");
                serviceInfo.classList.add("service-info");

                for (let i = 1; i <= 3; i++) { // Поддержка 3 блоков описания
                    if (service[`Заголовок ${i}`]) {
                        const serviceInfoTitle = document.createElement("h2");
                        serviceInfoTitle.classList.add("service-info-title");
                        serviceInfoTitle.textContent = service[`Заголовок ${i}`];

                        const serviceInfoText = document.createElement("ul");
                        serviceInfoText.classList.add("service-info-text");

                        for (let j = 1; j <= 3; j++) { // Обрабатываем 3 пункта в каждом блоке
                            if (service[`Текст ${i}.${j}`]) {
                                const listItem = document.createElement("li");
                                listItem.textContent = service[`Текст ${i}.${j}`];
                                serviceInfoText.appendChild(listItem);
                            }
                        }

                        serviceInfo.appendChild(serviceInfoTitle);
                        serviceInfo.appendChild(serviceInfoText);
                    }
                }

                serviceItem.appendChild(serviceImg);
                serviceItem.appendChild(serviceTitle);
                serviceItem.appendChild(serviceInfo);
                servicesContainer.appendChild(serviceItem);
            });

            // Обработчик клика для раскрытия блоков
            const serviceItems = document.querySelectorAll(".service-item");
            let activeItem = null;

            serviceItems.forEach(item => {
                item.addEventListener("click", function() {
                    if (activeItem && activeItem !== this) {
                        activeItem.classList.remove("active");
                    }
                    this.classList.toggle("active");
                    activeItem = this.classList.contains("active") ? this : null;
                });
            });
        })
        .catch(error => {
            console.error("Ошибка загрузки CSV:", error);
        });
});

// ЗАГРУЗКА ДАННЫХ КОНТАКТОВ ИЗ ФАЙЛА data-contacts.csv

document.addEventListener("DOMContentLoaded", function () {
    const contactsList = document.querySelector(".contacts-link");

    fetch('data-contacts.csv')
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
            const headers = rows[0].split(";"); // Заголовки (Ссылка, Иконка)

            const contacts = rows.slice(1).map(row => {
                const values = row.split(";");
                let obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index] || "";
                });
                return obj;
            });

            contactsList.innerHTML = ""; // Очищаем список перед загрузкой данных

            contacts.forEach(contact => {
                const listItem = document.createElement("li");
                const link = document.createElement("a");
                const img = document.createElement("img");

                link.href = contact["Ссылка"];
                link.classList.add("social-link");
                img.src = contact["Иконка"];
                img.alt = "Social Icon";

                link.appendChild(img);
                listItem.appendChild(link);
                contactsList.appendChild(listItem);
            });
        })
        .catch(error => console.error("Ошибка загрузки CSV:", error));
});

// ЗАГРУЗКА ДАННЫХ КОНТЕНТ ИЗ ФАЙЛА data-content.csv

document.addEventListener("DOMContentLoaded", function () {
    const agentTitle = document.querySelector(".agent-info-title");
    const agentSubtitle = document.querySelector(".agent-info-subtitle");
    const agentButton = document.querySelector(".button");
    const agentText = document.querySelector(".agent-info-text");
    const agentImage = document.querySelector(".agent-img");

    fetch('data-content.csv')
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.split("\n").map(row => row.trim()).filter(row => row);
            const headers = rows[0].split(";");

            const data = rows.slice(1).map(row => {
                const values = row.split(";");
                let obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index] || "";
                });
                return obj;
            });

            if (data.length > 0) {
                const agent = data[0]; // Берём первую запись

                agentTitle.textContent = agent["Имя"];
                agentSubtitle.textContent = agent["Должность"];
                agentButton.setAttribute("onclick", `window.location.href='${agent["Ссылка"]}'`);
                agentText.textContent = agent["Описание"];
                agentImage.src = agent["Фото"];
            }
        })
        .catch(error => console.error("Ошибка загрузки CSV:", error));
});
