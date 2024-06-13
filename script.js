document.querySelector('.header-logo-adaptiv-open img').addEventListener('click', function() {
    document.querySelector('.navigation-adaptiv').classList.toggle('active');
    document.querySelector('.header-logo-adaptiv-close img').classList.toggle('active');
});

document.querySelector('.header-logo-adaptiv-close img').addEventListener('click', function() {
    document.querySelector('.navigation-adaptiv').classList.toggle('active');
    document.querySelector('.header-logo-adaptiv-close img').classList.toggle('close');
});



document.addEventListener("DOMContentLoaded", function() {
    const propertySlider = document.querySelector(".property-slider");
    const propertiesInfo = document.querySelector(".properties-info");
    const propertiesImg = document.querySelector(".properties-img");
    const propertySliderNumberDetail = document.querySelector(".property-slider-number-detail");
    const propertySliderNumberSum = document.querySelector(".property-slider-number-sum");

    let properties = []; // массив для хранения данных о недвижимости
    let currentIndex = 0; // текущий индекс отображаемой недвижимости

    // Функция для загрузки данных из файла data.json
    function loadData() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                properties = data.properties;
                propertySliderNumberSum.textContent = properties.length; // Установить общее количество объектов
                updateProperty(0); // отображаем первый элемент при загрузке
            });
    }

    // Функция для обновления информации о недвижимости
    function updateProperty(index) {
        currentIndex = index;
        const property = properties[index];
        propertiesInfo.innerHTML = `
            <h2>${property.title}</h2>
            <p>${property.description}</p>
            <img class="properties-img" src="${property.image}" alt="">
            <img class="properties-img" src="${property.image1}" alt="">
            <img class="properties-img" src="${property.image2}" alt="">
        `;
        propertySliderNumberDetail.textContent = currentIndex + 1; // Обновить номер текущего объекта
    }

    // Функция для перехода к следующему объекту
    function nextProperty() {
        const newIndex = (currentIndex + 1) % properties.length;
        updateProperty(newIndex);
    }

    // Функция для перехода к предыдущему объекту
    function prevProperty() {
        const newIndex = (currentIndex - 1 + properties.length) % properties.length;
        updateProperty(newIndex);
    }

    // Загружаем данные из файла data.json
    loadData();

    // Добавляем обработчики событий на логотипы
    document.querySelector(".property-slider-logo-left").addEventListener("click", prevProperty);
    document.querySelector(".property-slider-logo-right").addEventListener("click", nextProperty);
});



