class Product {
    constructor(id, name, description, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    render() {
        return `
        <a href="product.html?id=${this.id}" class="product" data-name="${this.name.toLowerCase().replace(/\s+/g, '-')}">
          <img src="${this.image}" alt="${this.name}" />
          <h3>${this.name}</h3>
          <p>${this.description}</p>
        </a>
      `;
    }
}

async function fetchProducts(startId, count) {
    try {
        const productsContainer = document.getElementById('productsListing');
        productsContainer.innerHTML = ''; // Clear previous content

        for (let id = startId; id < startId + count; id++) {
            const url = `http://localhost:3000/${id}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const productData = await response.json(); // Parse JSON response

            // Create a Product instance and render it
            const product = new Product(productData.id, productData.name, productData.description, productData.image);
            productsContainer.innerHTML += product.render();
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    const currentHour = new Date().getHours();
    let message;

    if (currentHour < 12) {
        message = 'Good Morning! Check out our latest products.';
    } else if (currentHour < 18) {
        message = 'Good Afternoon! Have a look at our new arrivals.';
    } else {
        message = 'Good Evening! Discover our exclusive night deals.';
    }

    welcomeMessageElement.innerHTML = `<h2>${message}</h2>`;

    // Initial fetch and display of products
    fetchProducts(1, 6); // Adjust startId and count as needed
});

function createProductCard(product) {
    const productCard = document.createElement('a');
    productCard.href = `product.html?id=${product.id}`;
    productCard.className = 'product';
    productCard.dataset.name = product.name.toLowerCase().replace(/\s+/g, '-');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    `;
    return productCard;
}

document.getElementById('loadMoreBtn').addEventListener('click', function () {
    fetchProducts(6, 18); // Adjust startId and count for loading more products
});

function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.dataset.name.toLowerCase();
        if (productName.includes(input)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
