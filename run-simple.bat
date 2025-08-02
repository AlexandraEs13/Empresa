@echo off
echo ========================================
echo    STYLEHUB - SERVIDOR DE DESARROLLO
echo ========================================
echo.

echo Verificando archivos...
if not exist "index.html" (
    echo ERROR: No se encuentra index.html
    pause
    exit /b 1
)

if not exist "js" mkdir js

if not exist "js\main.js" (
    echo Creando archivo JavaScript...
    call :create_main_js
)

echo.
echo ✅ Archivos verificados correctamente
echo.
echo 🚀 Iniciando servidor local...
echo 📱 WhatsApp: 573213765854
echo 🌐 URL: http://localhost:8000
echo 📁 Carpeta: %CD%
echo.
echo 💡 Para subir a GitHub y Vercel:
echo    1. git add .
echo    2. git commit -m "Update StyleHub"
echo    3. git push origin main
echo    4. Despliega en vercel.com
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

python -m http.server 8000
pause
exit /b 0

:create_main_js
echo // StyleHub - Tienda de Ropa> js\main.js
echo let cart = [];>> js\main.js
echo.>> js\main.js
echo function showSection(section) {>> js\main.js
echo     document.getElementById('hero').classList.add('hidden');>> js\main.js
echo     document.getElementById('hombre-section').classList.add('hidden');>> js\main.js
echo     document.getElementById('mujer-section').classList.add('hidden');>> js\main.js
echo     document.getElementById(section + '-section').classList.remove('hidden');>> js\main.js
echo }>> js\main.js
echo.>> js\main.js
echo function addToCart(name, price, section) {>> js\main.js
echo     const existing = cart.find(item =^> item.name === name);>> js\main.js
echo     if (existing) existing.quantity++;>> js\main.js
echo     else cart.push({name, price, section, quantity: 1});>> js\main.js
echo     updateCartCount();>> js\main.js
echo     alert(name + ' agregado al carrito!');>> js\main.js
echo }>> js\main.js
echo.>> js\main.js
echo function updateCartCount() {>> js\main.js
echo     const total = cart.reduce((sum, item) =^> sum + item.quantity, 0);>> js\main.js
echo     document.getElementById('cart-count').textContent = total;>> js\main.js
echo }>> js\main.js
echo.>> js\main.js
echo function showCart() {>> js\main.js
echo     const modal = document.getElementById('cart-modal');>> js\main.js
echo     const items = document.getElementById('cart-items');>> js\main.js
echo     const total = document.getElementById('cart-total');>> js\main.js
echo     if (cart.length === 0) {>> js\main.js
echo         items.innerHTML = '^<p class="text-center py-4"^>Carrito vacio^</p^>';>> js\main.js
echo         total.textContent = '0';>> js\main.js
echo     } else {>> js\main.js
echo         let totalPrice = 0;>> js\main.js
echo         items.innerHTML = cart.map(item =^> {>> js\main.js
echo             totalPrice += item.price * item.quantity;>> js\main.js
echo             return `^<div class="flex justify-between p-2 border-b"^>^<span^>${item.name}^</span^>^<span^>${item.quantity} x $${item.price.toLocaleString()}^</span^>^</div^>`;>> js\main.js
echo         }).join('');>> js\main.js
echo         total.textContent = totalPrice.toLocaleString();>> js\main.js
echo     }>> js\main.js
echo     modal.classList.remove('hidden');>> js\main.js
echo }>> js\main.js
echo.>> js\main.js
echo function closeCart() {>> js\main.js
echo     document.getElementById('cart-modal').classList.add('hidden');>> js\main.js
echo }>> js\main.js
echo.>> js\main.js
echo function sendToWhatsApp() {>> js\main.js
echo     if (cart.length === 0) return alert('Carrito vacio');>> js\main.js
echo     let message = 'Hola! Mi pedido StyleHub:\n\n';>> js\main.js
echo     let total = 0;>> js\main.js
echo     cart.forEach(item =^> {>> js\main.js
echo         const subtotal = item.price * item.quantity;>> js\main.js
echo         total += subtotal;>> js\main.js
echo         message += `• ${item.name}\n  Cantidad: ${item.quantity}\n  Subtotal: $${subtotal.toLocaleString()}\n\n`;>> js\main.js
echo     });>> js\main.js
echo     message += `💰 Total: $${total.toLocaleString()}\n\n¿Confirman disponibilidad?`;>> js\main.js
echo     window.open(`https://wa.me/573213765854?text=${encodeURIComponent(message)}`, '_blank');>> js\main.js
echo     cart = []; updateCartCount(); closeCart();>> js\main.js
echo }>> js\main.js
echo.>> js\main.js
echo function filterCategory(section, category) {>> js\main.js
echo     const products = document.querySelectorAll(`#${section}-products .product-card`);>> js\main.js
echo     const buttons = document.querySelectorAll(`#${section}-section .category-btn`);>> js\main.js
echo     buttons.forEach(btn =^> btn.classList.remove('active'));>> js\main.js
echo     event.target.classList.add('active');>> js\main.js
echo     products.forEach(product =^> {>> js\main.js
echo         if (category === 'todos' ^|^| product.dataset.category === category) {>> js\main.js
echo             product.style.display = 'block';>> js\main.js
echo         } else product.style.display = 'none';>> js\main.js
echo     });>> js\main.js
echo }>> js\main.js
return
