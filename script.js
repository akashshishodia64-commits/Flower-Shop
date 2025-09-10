// Flower products data - Updated for Indian market
const products = [
    {
        id: 1,
        name: "Beautiful Mixed Bouquet",
        description: "A stunning arrangement of fresh seasonal flowers perfect for festivals",
        price: 1899,
        image: "./images/Beautiful Mixed Bouquet.jpg",
        category: "mixed"
    },
    {
        id: 2,
        name: "Classic Red Roses",
        description: "Elegant red roses perfect for Valentine's Day and anniversaries",
        price: 2499,
        image: "./images/Classic Red Roses.jpg",
        category: "roses"
    },
    {
        id: 3,
        name: "Madagascar Periwinkle",
        description: "Exotic and vibrant flowers ideal for home decoration",
        price: 1299,
        image: "./images/Madagascar Periwinkle.jpg",
        category: "exotic"
    },
    {
        id: 4,
        name: "Golden Calendula (Genda)",
        description: "Bright marigold flowers perfect for Diwali and puja ceremonies",
        price: 899,
        image: "./images/Golden Calendula (Genda).jpg",
        category: "mixed"
    },
    {
        id: 5,
        name: "Premium Flower Collection",
        description: "Luxurious collection of premium flowers for special occasions",
        price: 3499,
        image: "/images/Premium Flower Collection.jpg",
        category: "mixed"
    },
    {
        id: 6,
        name: "Spring Garden Mix",
        description: "Fresh spring flowers perfect for Holi celebrations",
        price: 1699,
        image: "./images/Spring Garden Mix.jpg",
        category: "mixed"
    },
    {
        id: 7,
        name: "Elegant White Bouquet",
        description: "Pure white flowers for weddings and religious ceremonies",
        price: 2199,
        image: "./images/Elegant White Bouquet.jpg",
        category: "mixed"
    },
    {
        id: 8,
        name: "Colorful Garden Blend",
        description: "Vibrant mix of colorful flowers for Navratri and festivals",
        price: 1499,
        image: "./images/Colorful Garden Blend.jpg",
        category: "mixed"
    },
    {
        id: 9,
        name: "Tropical Paradise",
        description: "Exotic tropical flowers arrangement for home and office",
        price: 2899,
        image: "./images/Tropical Paradise.jpg",
        category: "exotic"
    },
    {
        id: 10,
        name: "Sunset Bouquet",
        description: "Warm-toned flowers perfect for evening celebrations",
        price: 1899,
        image: "./images/Sunset Bouquet.jpg",
        category: "mixed"
    },
    {
        id: 11,
        name: "Royal Purple Collection",
        description: "Majestic purple flowers for elegant Indian weddings",
        price: 2299,
        image: "./images/Royal Purple Collection.jpg",
        category: "exotic"
    },
    {
        id: 12,
        name: "Garden Fresh Roses",
        description: "Fresh garden roses perfect for gifting and decoration",
        price: 2099,
        image: "./images/Garden Fresh Roses.jpg",
        category: "roses"
    },
    {
        id: 13,
        name: "Celebrity Favorites",
        description: "Premium flower arrangement inspired by Bollywood style",
        price: 3799,
        image: "./images/Celebrity Favorites.jpg",
        category: "mixed"
    }
];

// Shopping cart
let cart = [];
let currentFilter = 'all';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutForm = document.getElementById('checkoutForm');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCartUI();
    setupEventListeners();
    
    // Set minimum date for delivery to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('deliveryDate').min = tomorrow.toISOString().split('T')[0];
});

// Setup event listeners
function setupEventListeners() {
    // Checkout form submission
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Close modals when clicking outside
    checkoutOverlay.addEventListener('click', function(e) {
        if (e.target === checkoutOverlay) {
            hideCheckout();
        }
    });
}

// Display products
function displayProducts(productsToShow = products) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgNzVMMTUwIDEwMEgxMzVWMTI1SDExNVYxMDBIMTAwTDEyNSA3NVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K'">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">₹${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and display products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartAnimation();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAyMEwzNiAyNkgzMlYzMkgyOFYyNkgyNEwzMCAyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(0);
    orderTotal.textContent = total.toFixed(0);
}

// Toggle cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Show checkout
function showCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Update order summary
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toFixed(0)}</span>
        </div>
    `).join('');
    
    checkoutOverlay.classList.add('active');
    toggleCart(); // Close cart
}

// Hide checkout
function hideCheckout() {
    checkoutOverlay.classList.remove('active');
}

// Handle checkout
function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(checkoutForm);
    const orderData = {
        customer: {
            name: document.getElementById('customerName').value,
            email: document.getElementById('customerEmail').value,
            phone: document.getElementById('customerPhone').value,
            address: document.getElementById('deliveryAddress').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            message: document.getElementById('specialMessage').value
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Simulate order processing
    const submitBtn = document.querySelector('.place-order-btn');
    submitBtn.textContent = 'Processing Order...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Show success message in Hindi and English
        alert(`धन्यवाद ${orderData.customer.name}! आपका ऑर्डर सफलतापूर्वक प्लेस हो गया है। कुल राशि: ₹${orderData.total.toFixed(0)}। आपको जल्द ही confirmation email मिलेगी।`);
        
        // Reset form and cart
        checkoutForm.reset();
        cart = [];
        updateCartUI();
        hideCheckout();
        
        // Reset button
        submitBtn.textContent = 'Place Order';
        submitBtn.disabled = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// Show cart animation
function showCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
function addImageLoadingEffect() {
    const images = document.querySelectorAll('.product-image, .cart-item-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
}

// Call image loading effect after products are displayed
setTimeout(addImageLoadingEffect, 100);