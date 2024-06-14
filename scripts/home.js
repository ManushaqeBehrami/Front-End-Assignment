class Product {
    constructor(id, name, description, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    render() {
        return `
    <div class="product">
      <img src="${this.image}" alt="${this.name}" />
      <h3>${this.name}</h3>
      <p>${this.description}</p>
    </div>
      `;
    }
}

async function fetchProducts(startId, count) {
    try {
        const productsContainer = document.getElementById('products-container');
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
fetchProducts(0, 4);

document.addEventListener('DOMContentLoaded', fetchProducts);

// Image Slideshow/Carousel
let slideIndex = 0;
let slideInterval = setInterval(showSlides, 2000); // Set interval for automatic slideshow

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function plusSlides(n) {
    clearInterval(slideInterval); // Clear the interval
    slideIndex += n;
    if (slideIndex > document.getElementsByClassName("mySlides").length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = document.getElementsByClassName("mySlides").length }
    showSlides();
    slideInterval = setInterval(showSlides, 2000); // Restart the interval
}

function currentSlide(n) {
    clearInterval(slideInterval); // Clear the interval
    slideIndex = n;
    showSlides();
    slideInterval = setInterval(showSlides, 2000); // Restart the interval
}

// Back to Top Button
let backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Prompt for Name and Save to Local Storage
window.onload = function () {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        userName = prompt("Please enter your name:");
        if (userName) {
            localStorage.setItem('userName', userName);
        }
    }

    if (userName) {
        const welcomePopup = document.getElementById('welcomePopup');
        welcomePopup.textContent = `Welcome, ${userName}`;
        welcomePopup.style.display = 'block';

        setTimeout(() => {
            welcomePopup.style.display = 'none';
        }, 5000);
    }
};

// Save user preferences in localStorage
function saveUserPreferences() {
    const preferences = {
        theme: 'light', // or 'dark'
        layout: 'grid', // or 'list'
        // add more preferences as needed
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// Function to get user preferences from localStorage
function getUserPreferences() {
    const preferences = localStorage.getItem('userPreferences');
    return preferences ? JSON.parse(preferences) : {};
}

// Newsletter Subscription with Cookie Consent
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    document.cookie = `newsletterEmail=${email}; max-age=${60 * 60 * 24 * 365}; path=/`;
    alert('Thank you for subscribing to our newsletter!');
});

// Example of setting a cookie for privacy policy consent
function setPrivacyConsent() {
    document.cookie = `privacyConsent=true; max-age=${60 * 60 * 24 * 365}; path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

if (!getCookie('privacyConsent')) {
    // Display a privacy consent message or modal
    setPrivacyConsent(); // Call this when the user agrees
}