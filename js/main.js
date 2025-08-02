let cart = [];
let currentSection = 'hero';

function showSection(section) {
    // Ocultar todas las secciones
    document.getElementById('hero').classList.add('hidden');
    document.getElementById('hombre-section').classList.add('hidden');
    document.getElementById('mujer-section').classList.add('hidden');
    
    // Mostrar la sección seleccionada
    document.getElementById(section + '-section').classList.remove('hidden');
    currentSection = section;
    
    // Resetear filtros
    filterCategory(section, 'todos');
}

function filterCategory(section, category) {
    const products = document.querySelectorAll(`#${section}-products .product-card`);
    const buttons = document.querySelectorAll(`#${section}-section .category-btn`);
    
    // Actualizar botones activos
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Mostrar/ocultar productos
    products.forEach(product => {
        if (category === 'todos' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function addToCart(name, price, section) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            section: section,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${name} agregado al carrito!`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Animar salida y remover
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
            total += item.price * item.quantity;
            return `
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div>
                        <h4 class="font-medium">${item.name}</h4>
                        <p class="text-sm text-gray-600">$${item.price.toLocaleString()} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="changeQuantity('${item.name}', -1)" class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors">-</button>
                        <span class="w-8 text-center">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.name}', 1)" class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors">+</button>
                        <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:text-red-700 ml-2 transition-colors">🗑️</button>
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

function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCartCount();
            showCart();
        }
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCount();
    showCart();
}

async function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }

    try {
        // Mostrar loader
        const button = document.querySelector('#cart-modal button[onclick="sendToWhatsApp()"]');
        const originalText = button.textContent;
        button.textContent = 'Procesando...';
        button.disabled = true;

        const response = await fetch('/api/send-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart: cart,
                timestamp: new Date().toISOString()
            })
        });

        const result = await response.json();

        if (result.success) {
            // Abrir WhatsApp
            window.open(result.whatsapp_url, '_blank');
            
            // Limpiar carrito
            cart = [];
            updateCartCount();
            closeCart();
            
            showNotification('¡Pedido enviado! Revisa WhatsApp');
        } else {
            throw new Error(result.error);
        }

    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al procesar pedido. Intenta nuevamente.');
    } finally {
        // Restaurar botón
        const button = document.querySelector('#cart-modal button[onclick="sendToWhatsApp()"]');
        if (button) {
            button.textContent = 'Enviar Pedido por WhatsApp';
            button.disabled = false;
        }
    }
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cart-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCart();
        }
    });
});
