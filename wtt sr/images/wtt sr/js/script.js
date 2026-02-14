// ===================================
// STYLEHUB E-COMMERCE WEBSITE
// ===================================

// -- STATE MANAGEMENT --
const state = {
    products: [
        {
            id: 1,
            name: 'Classic White T-Shirt',
            category: 'men',
            price: 4050,
            oldPrice: 6750,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
            description: 'Premium quality white t-shirt perfect for everyday wear. Made with 100% organic cotton.',
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 2,
            name: 'Women\'s Denim Jacket',
            category: 'women',
            price: 12150,
            oldPrice: 17550,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1525457136159-8878648a7ad0?w=600',
            description: 'Stylish denim jacket with classic design. Perfect for layering and creating timeless looks.',
            sizes: ['XS', 'S', 'M', 'L', 'XL']
        },
        {
            id: 3,
            name: 'Kids Summer Dress',
            category: 'kids',
            price: 4725,
            oldPrice: 6750,
            rating: 4.3,
            image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600',
            description: 'Adorable summer dress for kids. Comfortable and perfect for warm weather.',
            sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y']
        },
        {
            id: 4,
            name: 'Leather Belt',
            category: 'accessories',
            price: 6075,
            oldPrice: 10800,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600',
            description: 'Premium genuine leather belt with metal buckle. A timeless accessory.',
            sizes: ['One Size']
        },
        {
            id: 5,
            name: 'Men\'s Formal Blazer',
            category: 'men',
            price: 20250,
            oldPrice: 27000,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600',
            description: 'Professional formal blazer for office and special occasions.',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 6,
            name: 'Women\'s Summer Sandals',
            category: 'women',
            price: 7425,
            oldPrice: 10800,
            rating: 4.4,
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
            description: 'Comfortable and stylish summer sandals. Perfect for casual outings.',
            sizes: ['5', '6', '7', '8', '9', '10']
        },
        {
            id: 7,
            name: 'Kids Sport Shoes',
            category: 'kids',
            price: 8100,
            oldPrice: 12150,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600',
            description: 'Durable sports shoes designed for active kids. Comfortable and colorful.',
            sizes: ['1', '2', '3', '4', '5']
        },
        {
            id: 8,
            name: 'Designer Handbag',
            category: 'accessories',
            price: 25650,
            oldPrice: 40500,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
            description: 'Elegant designer handbag. Perfect for professional and casual settings.',
            sizes: ['One Size']
        },
        {
            id: 9,
            name: 'Men\'s Cargo Shorts',
            category: 'men',
            price: 6750,
            oldPrice: 10800,
            rating: 4.2,
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600',
            description: 'Versatile cargo shorts perfect for outdoor activities and casual wear.',
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 10,
            name: 'Women\'s Yoga Pants',
            category: 'women',
            price: 9450,
            oldPrice: 16200,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=600',
            description: 'High-waisted yoga pants with excellent stretch and comfort.',
            sizes: ['XS', 'S', 'M', 'L', 'XL']
        },
        {
            id: 11,
            name: 'Winter Beanie',
            category: 'accessories',
            price: 3375,
            oldPrice: 5400,
            rating: 4.3,
            image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600',
            description: 'Warm and cozy winter beanie in various colors.',
            sizes: ['One Size']
        },
        {
            id: 12,
            name: 'Kids Hoodie',
            category: 'kids',
            price: 6075,
            oldPrice: 9450,
            rating: 4.4,
            image: 'https://images.unsplash.com/photo-1519238809107-16053305c488?w=600',
            description: 'Soft and warm hoodie perfect for kids. Ideal for layering.',
            sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y']
        }
    ],
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null
};

// -- UTILITY FUNCTIONS --

const formatPrice = (price) => `Rs. ${price.toFixed(2)}`;

const getStarRating = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i < rating) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-muted"></i>';
        }
    }
    return stars + ` <small class="text-muted">(${rating})</small>`;
};

const showToast = (message, type = 'success') => {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '1100';
        document.body.appendChild(toastContainer);
    }

    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    const toastElement = document.createElement('div');
    toastElement.innerHTML = toastHTML;
    toastContainer.appendChild(toastElement.firstElementChild);

    const toast = new bootstrap.Toast(toastContainer.lastElementChild);
    toast.show();
};

// -- CART MANAGEMENT --

const updateCartCount = () => {
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
    localStorage.setItem('cart', JSON.stringify(state.cart));
};

const addToCart = (productId, quantity = 1, size = null) => {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    if (product.sizes.length > 1 && !size && size !== 'One Size') {
        showToast('Please select a size!', 'warning');
        return;
    }

    // Default size if only one option and not provided
    if (!size && product.sizes.length === 1) size = product.sizes[0];

    const existingItem = state.cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({ ...product, quantity, size });
    }

    updateCartCount();
    showToast(`${product.name} added to cart!`);
};

// -- DOM RENDERING --

// -- DOM RENDERING --

const createProductCard = (product) => `
    <div class="col-md-6 col-lg-4 mb-4 product-item" data-category="${product.category}" data-price="${product.price}">
        <div class="card product-card h-100 shadow-sm border-0">
            ${product.oldPrice > product.price ? '<span class="product-badge bg-danger text-white">-40%</span>' : ''}
            <div class="position-relative overflow-hidden">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
                <div class="product-overlay d-flex align-items-center justify-content-center gap-2">
                    <button class="btn btn-light rounded-circle" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></button>
                    <a href="product-details.html?id=${product.id}" class="btn btn-light rounded-circle"><i class="fas fa-eye"></i></a>
                    <button class="btn btn-light rounded-circle"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-light text-dark border">${product.category.toUpperCase()}</span>
                    <div class="product-rating small">${getStarRating(product.rating)}</div>
                </div>
                <h5 class="product-title fw-bold mb-1"><a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a></h5>
                <div class="mt-auto">
                    <div class="d-flex align-items-center gap-2 mb-3">
                        <span class="product-price fw-bold text-primary h5 mb-0">${formatPrice(product.price)}</span>
                        ${product.oldPrice ? `<span class="product-old-price text-muted text-decoration-line-through small">${formatPrice(product.oldPrice)}</span>` : ''}
                    </div>
                    <button class="btn btn-outline-primary w-100" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
`;

const renderFeaturedProducts = () => {
    const container = document.getElementById('featured-products');
    if (!container) return;
    container.innerHTML = state.products.slice(0, 4).map(createProductCard).join('');
};

const renderProducts = (productsToRender = state.products) => {
    const container = document.getElementById('products-grid');
    if (!container) return;

    if (productsToRender.length === 0) {
        container.innerHTML = '<div class="col-12 text-center py-5"><h3>No products found</h3><p class="text-muted">Try adjusting your filters.</p></div>';
        return;
    }

    container.innerHTML = productsToRender.map(createProductCard).join('');
};

// -- FILTER & SORT LOGIC --

const handleFilters = () => {
    const categoryCheckboxes = document.querySelectorAll('.category-filter:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);

    const priceRange = document.getElementById('price-range');
    const maxPrice = priceRange ? parseInt(priceRange.value) : 50000;

    if (document.getElementById('price-value')) {
        document.getElementById('price-value').textContent = `Rs. ${maxPrice.toLocaleString()}`;
    }

    let filtered = state.products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price <= maxPrice;
        return matchesCategory && matchesPrice;
    });

    // Sort
    const sortValue = document.getElementById('sort-select') ? document.getElementById('sort-select').value : 'default';
    if (sortValue === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(filtered);
};

// -- INITIALIZATION --

document.addEventListener('DOMContentLoaded', () => {
    // Check if Bootstrap 5 is loaded
    if (typeof bootstrap !== 'undefined') {
        // console.log('Bootstrap 5 loaded');
    }

    // Initialize Global Components
    updateCartCount();

    // Page Specific Initializations
    if (document.getElementById('featured-products')) {
        renderFeaturedProducts();
    }

    if (document.getElementById('products-grid')) {
        renderProducts();

        // Event Listeners for Filters
        document.querySelectorAll('.category-filter').forEach(cb => {
            cb.addEventListener('change', handleFilters);
        });

        const priceRange = document.getElementById('price-range');
        if (priceRange) {
            priceRange.addEventListener('input', handleFilters);
        }

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', handleFilters);
        }

        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
                if (priceRange) {
                    priceRange.value = 50000;
                    document.getElementById('price-value').textContent = 'Rs. 50,000';
                }
                if (sortSelect) sortSelect.value = 'default';
                renderProducts();
            });
        }
    }

    // New validation for all forms
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});
