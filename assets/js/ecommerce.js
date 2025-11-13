/*
==================================================
|   E-COMMERCE & EMAILJS FUNCTIONALITY           |
|   Add your products and EmailJS keys here.     |
==================================================
*/

// 👉 Add or edit product details here
// This object acts as your product database.
// The 'key' (e.g., 'h1', 'f1') must match the 'data-id' in your index.html
const products = {
    // Home Product
    'h1': {
        name: 'New Burqa Collections 2026',
        price: '৳1500',
        img: 'assets/img/home.png',
        desc: 'Latest arrival of the new imported burqas of the 2026 series, with a modern and unique design.'
    },
    // Featured Products
    'f1': {
        name: 'Dubai Nida Burqa',
        price: '৳2000',
        img: 'assets/img/featured1.png',
        desc: 'A beautiful Dubai Nida Burqa, perfect for any special occasion. Made from high-quality, breathable fabric.'
    },
    'f2': {
        name: 'Closed Front Burq',
        price: '৳3500',
        img: 'assets/img/featured2.png',
        desc: 'Elegant closed-front burqa with intricate embroidery. Offers full coverage while maintaining a stylish look.'
    },
    'f3': {
        name: 'Layered Burqa',
        price: '৳4000',
        img: 'assets/img/featured3.png',
        desc: 'A stunning layered burqa in a deep navy and pink. The flowing layers provide a graceful silhouette.'
    },
    // Products Section
    'p1': {
        name: 'Abaya Style Burqa',
        price: '৳3000',
        img: 'assets/img/product1.png',
        desc: 'Classic Abaya style burqa in a lovely pink and brown. Comfortable and stylish for daily wear.'
    },
    'p2': {
        name: 'Closed Front Burqa (Navy)',
        price: '৳2000',
        img: 'assets/img/product2.png',
        desc: 'A beautiful closed-front burqa in navy blue, accented with pink and floral embroidery on the sleeves.'
    },
    'p3': {
        name: 'Kaftan Style Burqa',
        price: '৳1500',
        img: 'assets/img/product3.png',
        desc: 'A loose-fitting Kaftan style burqa with delicate gold embroidery. Provides comfort and elegance.'
    },
    'p4': {
        name: 'Maternity Burqa',
        price: '৳3000',
        img: 'assets/img/product4.png',
        desc: 'A stylish and comfortable maternity burqa in maroon, designed to provide ample space and a flattering drape.'
    },
    'p5': {
        name: 'Butterfly Cut Burqa',
        price: '৳2000',
        img: 'assets/img/product5.png',
        desc: 'Modern butterfly-cut burqa in black with grey accents. Features beautiful floral embroidery on the cuffs.'
    },
    // New Arrivals
    'n1': {
        name: 'Festive Burqa',
        price: '৳2500',
        img: 'assets/img/new1.png',
        desc: 'A gorgeous festive burqa in maroon, perfect for parties and events. Features detailed silver embroidery.'
    },
    'n2': {
        name: 'Dubai Nida Burqa (Black)',
        price: '৳2500',
        img: 'assets/img/new2.png',
        desc: 'High-quality Dubai Nida burqa in classic black. Features subtle floral patterns on the sleeves.'
    },
    'n3': {
        name: 'Closed Front Burqa (Blue Ombre)',
        price: '৳3000',
        img: 'assets/img/new3.png',
        desc: 'A unique closed-front burqa with a stunning blue-to-white ombre effect. Lightweight and eye-catching.'
    },
    'n4': {
        name: 'Butterfly Cut Burqa (Maroon)',
        price: '৳2000',
        img: 'assets/img/new4.png',
        desc: 'Elegant butterfly-cut burqa in a rich maroon color. Features a comfortable fit and beautiful gold chest embroidery.'
    }
    // 👉 Add more products here by copying the format
};

/*
==================================================
|   EMAILJS CONFIGURATION                        |
==================================================
*/

// 👉 Add your EmailJS service ID here
const EMAILJS_SERVICE_ID = 'service_nwijlo4';

// 👉 Add your EmailJS template ID here
//    (In EmailJS, create a template with variables like {{action}}, {{product_name}}, {{product_price}}, {{product_image_link}}, {{buyer_mobile}}, {{buyer_location}})
const EMAILJS_TEMPLATE_ID = 'template_kc6ipeq';

// 👉 Add your EmailJS public key here
const EMAILJS_PUBLIC_KEY = 'f6UtKJBgEuWhs1rnK';

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error('EmailJS script not loaded');
    }
})();

/*
==================================================
|   MODAL & ECOMMERCE FUNCTIONS                  |
==================================================
*/

// NEW: Get Modal Elements
const orderModal = document.getElementById('order-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalForm = document.getElementById('order-form');
const modalProductName = document.getElementById('modal-product-name');
const modalProductIdField = document.getElementById('modal-product-id');
const modalActionField = document.getElementById('modal-action');
const modalMobileField = document.getElementById('form-mobile');
const modalLocationField = document.getElementById('form-location');

/**
 * NEW: Opens the order modal with product info
 * @param {string} productId - The ID from the 'data-id' attribute
 * @param {string} action - The type of action (e.g., "Add to Cart")
 */
function openOrderModal(productId, action) {
    const product = products[productId];
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // 1. Populate the modal
    modalProductName.innerText = `Product: ${product.name}`;
    modalProductIdField.value = productId;
    modalActionField.value = action;

    // 2. Show the modal
    if (orderModal) {
        orderModal.classList.add('show-modal');
    }
}

/**
 * NEW: Closes the order modal
 */
function closeOrderModal() {
    if (orderModal) {
        orderModal.classList.remove('show-modal');
        // Clear form fields
        modalMobileField.value = '';
        modalLocationField.value = '';
    }
}

/**
 * Navigates to the product details page
 * @param {string} productId - The ID from the 'data-id' attribute
 */
function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

/**
 * Loads product details on product.html from URL parameter
 */
function loadProductDetails() {
    // This function only runs on product.html
    if (document.body.contains(document.getElementById('product-title'))) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products[productId];

        if (product) {
            document.getElementById('product-img').src = product.img;
            document.getElementById('product-img').alt = product.name;
            document.getElementById('product-title').innerText = product.name;
            document.getElementById('product-price').innerText = product.price;
            document.getElementById('product-description').innerText = product.desc;

            // Store the product ID on the page for the buyNow function
            document.body.setAttribute('data-current-product-id', productId);
        } else {
            // Handle case where product is not found
            document.getElementById('product-title').innerText = 'Product Not Found';
            document.getElementById('product-description').innerText = 'This product does not exist. Please go back to the home page.';
            document.getElementById('product-price').innerText = '';
        }
    }
}

/**
 * UPDATED: "Add to Cart" button now opens the modal
 * @param {string} productId - The ID from the 'data-id' attribute
 */
function addToCart(productId) {
    openOrderModal(productId, 'Item Added to Cart');
}

/**
 * UPDATED: "Buy Now" button now opens the modal
 * This function reads the ID stored on the product.html page
 */
function buyNow() {
    const productId = document.body.getAttribute('data-current-product-id');
    if (!productId) {
        console.error('No product ID found on the page.');
        alert('Error: Could not find product. Please try again.');
        return;
    }
    openOrderModal(productId, 'NEW ORDER (Buy Now)');
}

/**
 * UPDATED: Helper function to send the email with new fields
 * @param {object} product - The product object from the database
 * @param {string} action - The subject line for the email (e.g., "Added to Cart")
 * @param {string} mobile - The buyer's mobile number
 * @param {string} location - The buyer's location
 */
function sendEmail(product, action, mobile, location) {
    console.log(`Sending email for ${action}: ${product.name}`);

    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded.');
        alert('Email service is not available. Please try again later.');
        return;
    }

    // Check if credentials are placeholders
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
        alert('EmailJS is not configured. Please add your credentials to assets/js/ecommerce.js');
        return;
    }

    // UPDATED: These parameters must match the variables in your EmailJS template
    const templateParams = {
        action: action,
        product_name: product.name,
        product_price: product.price,
        product_image_link: window.location.origin + '/' + product.img, // Creates a full URL
        buyer_mobile: mobile, // NEW FIELD
        buyer_location: location // NEW FIELD
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('EmailJS SUCCESS!', response.status, response.text);
            if (action.includes('NEW ORDER')) {
                alert(`Order for ${product.name} placed successfully! We will contact you shortly.`);
            } else {
                alert(`${product.name} added to cart! We have your details.`);
            }
        }, function(error) {
            console.log('EmailJS FAILED...', error);
            alert('There was an error sending your request. Please try again.');
        });
}


// NEW: Event Listeners for Modal
// Run this code only if the modal exists on the page
if (orderModal) {
    // 1. Close button
    modalCloseBtn.addEventListener('click', closeOrderModal);

    // 2. Submit form
    modalForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop form from reloading page

        // Get all the data
        const mobile = modalMobileField.value;
        const location = modalLocationField.value;
        const productId = modalProductIdField.value;
        const action = modalActionField.value;
        const product = products[productId];

        // Send the email with all the data
        sendEmail(product, action, mobile, location);

        // Close the modal
        closeOrderModal();
    });
}

// Run this on page load to set up product.html if we are on it
loadProductDetails();