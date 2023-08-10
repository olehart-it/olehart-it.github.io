const categoriesDiv = document.getElementById('categories');
const productsDiv = document.getElementById('products');
const productDetailsDiv = document.getElementById('product-details-content');
const orderForm = document.getElementById('order-form');
const orderFormContent = document.getElementById('order-form-content');
const orderDetails = document.getElementById('order-details');
const orderSummary = document.getElementById('order-summary');
const submitOrderButton = document.getElementById('submit-order');

const categories = ['Электроника', 'Игры', 'Программы'];

const productsData = {
  'Электроника': ['Смартфон', 'Ноутбук'],
  'Игры': ['Metro 2033', 'TheLegendOfZelda'],
  'Программы': ['VsCode', 'Figma']
};

function createElement(tag, attributes = {}, events = {}) {
    const element = document.createElement(tag);
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    for (const event in events) {
        element.addEventListener(event, events[event]);
    }
    return element;
}

function showCategories() {
    categoriesDiv.innerHTML = '';
    const categoriesList = createElement('ul', { class: 'category-list' });
    categories.forEach(category => {
        const categoryItem = createElement('li');
        const categoryLink = createElement('a', { href: '#' }, { click: () => showProducts(category) });
        categoryLink.textContent = category;
        categoryItem.appendChild(categoryLink);
        categoriesList.appendChild(categoryItem);
    });
    categoriesDiv.appendChild(categoriesList);

    productsDiv.innerHTML = '';
    productDetailsDiv.innerHTML = '';
}

function showProducts(category) {
    productsDiv.innerHTML = '';
    const productsList = createElement('ul', { class: 'product-list' });
    productsData[category].forEach(product => {
        const productItem = createElement('li');
        const productLink = createElement('a', { href: '#' }, { click: () => showProductDetails(product) });
        productLink.textContent = product;
        productItem.appendChild(productLink);
        productsList.appendChild(productItem);
    });
    productsDiv.appendChild(productsList);

    productDetailsDiv.innerHTML = '';
}

function showProductDetails(product) {
    const productDetails = `
        <h2>${product}</h2>
        <p>Описание</p>
        <button class="buy-button" data-product="${product}">Купить</button>
    `;
    productDetailsDiv.innerHTML = productDetails;
}

submitOrderButton.addEventListener('click', () => {
    if (validateOrderForm()) {
        displayOrderSummary();
    } else {
        alert('Пожалуйста, заполните все обязательные поля.');
    }
});

function validateOrderForm() {
    const requiredFields = orderFormContent.querySelectorAll('[required]');
    return [...requiredFields].every(field => field.value.trim());
}

function displayOrderSummary() {
    const orderInfo = `
        <p><strong>ПИБ:</strong> ${getValue('customer-name')}</p>
        <p><strong>Город:</strong> ${getValue('city')}</p>
        <p><strong>Склад Новой почты:</strong> ${getValue('shipping-method')}</p>
        <p><strong>Наложеный или оплата банковской картой:</strong> ${getValue('payment-method')}</p>
        <p><strong>Количество продукции:</strong> ${getValue('quantity')}</p>
        <p><strong>Комментарий к заказу:</strong> ${getValue('comment')}</p>
    `;

    orderSummary.innerHTML = orderInfo;
    orderForm.style.display = 'none';
    orderDetails.style.display = 'flex';
}

function getValue(id) {
    return document.getElementById(id).value;
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'BUTTON' && target.classList.contains('buy-button')) {
        buyProduct(target.getAttribute('data-product'));
    }
});

let isBuying = false;

function buyProduct(product) {
    if (!isBuying) {
        isBuying = true;
        orderForm.style.display = 'block';
        orderDetails.style.display = 'none';
    } 
}

showCategories();
