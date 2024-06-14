class Product {
    constructor(id, name, description, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    render() {
        return `
    <a href="product.html?id=${this.id}" class="product">
        <img src="${this.image}" alt="${this.name}">
        <h3>${this.name}</h3>
        <p>${this.description}</p>
      </a>
      `;
    }
}

async function fetchSimilarProducts(startId, count) {
    try {
        const productsContainer = document.getElementById('similarProducts');
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

// Usage example:
// Fetch and display 10 products starting from ID 00
fetchSimilarProducts(0, 5);

document.addEventListener('DOMContentLoaded', fetchSimilarProducts);
