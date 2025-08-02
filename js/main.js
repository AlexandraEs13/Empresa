let cart = [];
let currentSection = 'inicio';
let selectedSize = '';
let selectedColor = '';

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('España Moda cargando...');
    initializeApp();
});

function initializeApp() {
    showSection('inicio');
    setupEventListeners();
}

function setupEventListeners() {
    // Cerrar modales al hacer clic fuera
    document.getElementById('cart-modal').addEventListener('click', function(e) {
        if (e.target === this) closeCart();
    });
    
    document.getElementById('product-modal').addEventListener('click', function(e) {
        if (e.target === this) closeProductModal();
    });
}

function showSection(section) {
    // Ocultar todas las secciones
    document.getElementById('inicio').classList.add('hidden');
    document.getElementById('productos').classList.add('hidden');
    
    // Mostrar la sección seleccionada
    document.getElementById(section).classList.remove('hidden');
    currentSection = section;
    
    if (section === 'productos') {
        loadProducts();
    }
}

function loadProducts(categoria = 'todos') {
    const grid = document.getElementById('productos-grid');
    if (!grid) {
        console.error('No se encuentra el grid de productos');
        return;
    }
    
    let productsToShow = [];
    
    if (categoria === 'todos') {
        productsToShow = getAllProducts();
    } else {
        productsToShow = getProductsByCategory(categoria);
    }
    
    console.log('Cargando productos:', productsToShow.length);
    
    grid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const placeholderSVG = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23f9a8d4'/><text x='50%25' y='40%25' font-size='16' text-anchor='middle' fill='%23be185d' font-family='Arial'>${product.nombre}</text><text x='50%25' y='60%25' font-size='20' text-anchor='middle' fill='%23be185d' font-family='Arial'>$${product.precio.toLocaleString()}</text></svg>`;
    
    return `
        <div class="product-card bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer" 
             onclick="showProductModal(${product.id})" data-category="${product.categoria}">
            <div class="h-64 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
                <img src="${product.imagen}" alt="${product.nombre}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                     onerror="this.src='${placeholderSVG}'">
            </div>
            <div class="p-6">
                <h3 class="font-bold text-lg mb-2 text-gray-900">${product.nombre}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.descripcion.substring(0, 80)}...</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-pink-600">$${product.precio.toLocaleString()}</span>
                    <button onclick="event.stopPropagation(); showProductModal(${product.id})" 
                            class="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all">
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    `;
}

function filterCategory(categoria) {
    // Actualizar botones activos
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Cargar productos de la categoría
    loadProducts(categoria);
}

function showProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const placeholderSVG = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%23f9a8d4'/><text x='50%25' y='30%25' font-size='20' text-anchor='middle' fill='%23be185d' font-family='Arial'>${product.nombre}</text><text x='50%25' y='50%25' font-size='24' text-anchor='middle' fill='%23be185d' font-family='Arial'>$${product.precio.toLocaleString()}</text><text x='50%25' y='70%25' font-size='14' text-anchor='middle' fill='%23831843' font-family='Arial'>España Moda</text></svg>`;
    
    // Llenar información del modal
    document.getElementById('modal-title').textContent = product.nombre;
    document.getElementById('modal-price').textContent = `$${product.precio.toLocaleString()}`;
    document.getElementById('modal-description').textContent = product.descripcion;
    
    const modalImage = document.getElementById('modal-image');
    modalImage.src = product.imagen;
    modalImage.alt = product.nombre;
    modalImage.onerror = function() {
        this.src = placeholderSVG;
    };
    
    // Cargar selector de tallas
    const sizeSelector = document.getElementById('size-selector');
    sizeSelector.innerHTML = product.tallas.map(talla => 
        `<button onclick="selectSize('${talla}')" class="size-btn px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-pink-500 transition-colors">
            ${talla}
        </button>`
    ).join('');
    
    // Cargar selector de colores
    const colorSelector = document.getElementById('color-selector');
    colorSelector.innerHTML = product.colores.map(color => 
        `<button onclick="selectColor('${color}')" class="color-btn px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-pink-500 transition-colors text-sm">
            ${color}
        </button>`
    ).join('');
    
    // Configurar botón de agregar al carrito
    document.getElementById('add-to-cart-modal').onclick = () => addToCartFromModal(product);
    
    // Mostrar modal
    document.getElementById('product-modal').classList.remove('hidden');
    
    // Reset selections
    selectedSize = '';
    selectedColor = '';
}

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('bg-pink-500', 'text-white');
        btn.classList.add('border-gray-300');
    });
    event.target.classList.add('bg-pink-500', 'text-white');
    event.target.classList.remove('border-gray-300');
}

function selectColor(color) {
    selectedColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('bg-pink-500', 'text-white');
        btn.classList.add('border-gray-300');
    });
    event.target.classList.add('bg-pink-500', 'text-white');
    event.target.classList.remove('border-gray-300');
}

function addToCartFromModal(product) {
    if (!selectedSize || !selectedColor) {
        showNotification('Por favor selecciona talla y color', 'error');
        return;
    }
    
    const cartItem = {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        talla: selectedSize,
        color: selectedColor,
        imagen: product.imagen,
        quantity: 1
    };
    
    const existingItem = cart.find(item => 
        item.id === product.id && item.talla === selectedSize && item.color === selectedColor
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }
    
    updateCartCount();
    showNotification(`${product.nombre} agregado al carrito`, 'success');
    closeProductModal();
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.remove('translate-x-full'), 10);
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function showCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Tu carrito está vacío</p>';
        cartTotal.textContent = '0';
    } else {
        let total = 0;
        cartItems.innerHTML = cart.map(item => {
            total += item.precio * item.quantity;
            return `
                <div class="flex items-center space-x-4 bg-pink-50 p-4 rounded-2xl">
                    <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded-xl">
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">${item.nombre}</h4>
                        <p class="text-sm text-gray-600">Talla: ${item.talla} | Color: ${item.color}</p>
                        <p class="text-sm text-gray-600">$${item.precio.toLocaleString()} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="changeQuantity(${item.id}, '${item.talla}', '${item.color}', -1)" 
                                class="bg-pink-200 hover:bg-pink-300 px-2 py-1 rounded-full">-</button>
                        <span class="w-8 text-center">${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, '${item.talla}', '${item.color}', 1)" 
                                class="bg-pink-200 hover:bg-pink-300 px-2 py-1 rounded-full">+</button>
                        <button onclick="removeFromCart(${item.id}, '${item.talla}', '${item.color}')" 
                                class="text-red-500 hover:text-red-700 ml-2">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
        cartTotal.textContent = total.toLocaleString();
    }
    
    document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
    document.getElementById('cart-modal').classList.add('hidden');
}

function changeQuantity(id, talla, color, change) {
    const item = cart.find(item => item.id === id && item.talla === talla && item.color === color);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id, talla, color);
        } else {
            updateCartCount();
            showCart();
        }
    }
}

function removeFromCart(id, talla, color) {
    cart = cart.filter(item => !(item.id === id && item.talla === talla && item.color === color));
    updateCartCount();
    showCart();
}

function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }

    let message = '🛍️ *NUEVO PEDIDO - España Moda*\n\n';
    message += `📅 Fecha: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}\n\n`;
    message += '📋 *Productos:*\n';
    
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.precio * item.quantity;
        total += subtotal;
        message += `• ${item.nombre}\n`;
        message += `  Talla: ${item.talla} | Color: ${item.color}\n`;
        message += `  Cantidad: ${item.quantity}\n`;
        message += `  Precio: $${item.precio.toLocaleString()} c/u\n`;
        message += `  Subtotal: $${subtotal.toLocaleString()}\n\n`;
    });
    
    message += `💰 *Total: $${total.toLocaleString()}*\n\n`;
    message += '📞 Por favor confirmar disponibilidad y forma de pago.\n';
    message += '¡Gracias por elegir España Moda! 🌹';
    
    const phoneNumber = '573213765854';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito después del pedido
    cart = [];
    updateCartCount();
    closeCart();
    showNotification('¡Pedido enviado! Revisa WhatsApp', 'success');
}
