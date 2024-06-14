class Product {
    constructor(id, name, description, image, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    renderProductDetail() {
        return `
        <div class="product-image">
          <img src="${this.image}" alt="${this.name}" />
        </div>
        <div class="product-info">
          <h1>${this.name}</h1>
          <p>${this.description}</p>
          <p class="price">$${this.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        </div>
      `;
    }

    renderSimilarProduct() {
        return `
        <a href="product.html?id=${this.id}" class="product">
          <img src="${this.image}" alt="${this.name}" />
          <h3>${this.name}</h3>
          <p>${this.description}</p>
        </a>
      `;
    }
}

async function fetchProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/${productId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const productData = await response.json();
        return productData;
    } catch (error) {
        throw new Error('Error fetching product data:', error);
    }
}

async function fetchRandomSimilarProducts(count) {
    try {
        const productsContainer = document.getElementById('similarProducts');
        productsContainer.innerHTML = ''; // Clear previous content

        const randomIds = generateRandomIds(count);
        const promises = randomIds.map(async (id) => {
            const url = `http://localhost:3000/${id}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        });

        const productsData = await Promise.all(promises);

        productsData.forEach((productData) => {
            const product = new Product(productData.id, productData.name, productData.description, productData.image, productData.price);
            productsContainer.innerHTML += product.renderSimilarProduct();
        });

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function generateRandomIds(count) {
    const ids = [];
    for (let i = 0; i < count; i++) {
        const randomId = Math.floor(Math.random() * 10) + 1; // Generate random ID between 1 and 10
        ids.push(randomId);
    }
    return ids;
}

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    try {
        const productData = await fetchProduct(productId);
        const productDetailContainer = document.getElementById('productDetail');
        const product = new Product(productData.id, productData.name, productData.description, productData.image, productData.price);

        productDetailContainer.innerHTML = product.renderProductDetail();

        await fetchRandomSimilarProducts(4);

    } catch (error) {
        console.error('Error fetching product data:', error);
    }
});
