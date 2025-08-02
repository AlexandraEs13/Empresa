# StyleHub - Tienda de Ropa Online

Una elegante tienda de ropa minimalista con carrito de compras integrado con WhatsApp.

## 🌟 Características

- ✨ Diseño minimalista y responsivo
- 🛒 Carrito de compras funcional
- 📱 Integración directa con WhatsApp
- 👔 Secciones para hombre y mujer
- 🔍 Filtros por categoría
- 📸 Soporte para imágenes de productos

## 🚀 Demo en Vivo

Visita la tienda: [StyleHub en Vercel](https://tu-dominio.vercel.app)

## 💻 Desarrollo Local

### Requisitos
- Python 3.x (para servidor local)
- Navegador web moderno

### Instrucciones
1. Clona el repositorio:
```bash
git clone https://github.com/AlexandraEs13/Empresa.git
cd Empresa
```

2. Ejecuta el servidor local:
```bash
# Windows
run-simple.bat

# Linux/Mac
python3 -m http.server 8000
```

3. Abre tu navegador en `http://localhost:8000`

## 📦 Estructura del Proyecto

```
StyleHub/
├── index.html          # Página principal
├── js/
│   └── main.js        # Lógica del carrito y navegación
├── Imagenes/
│   └── Mujer/
│       └── Pantalon/
│           └── sudadera_flores.png
├── run-simple.bat     # Servidor de desarrollo (Windows)
└── README.md         # Documentación
```

## 🛒 Funcionalidades

### Carrito de Compras
- Agregar/quitar productos
- Cambiar cantidades
- Cálculo automático de totales
- Envío directo por WhatsApp

### Productos Disponibles

**Hombre:**
- Camisas (clásicas y casuales)
- Pantalones (jeans y chinos)
- Chaquetas (cuero y blazers)

**Mujer:**
- Blusas elegantes y básicas
- Pantalones (jeans y palazzo)
- Vestidos (casuales y de noche)
- Sudaderas con diseños únicos

## 📱 Integración WhatsApp

Los pedidos se envían automáticamente al WhatsApp: **+57 321 376 5854**

Formato del mensaje:
```
🛍️ NUEVO PEDIDO - StyleHub

📅 Fecha: [fecha/hora]

📋 Productos:
• [Producto]
  Cantidad: [cantidad]
  Subtotal: $[precio]

💰 Total: $[total]

¿Confirman disponibilidad?
```

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio en [vercel.com](https://vercel.com)
2. Selecciona el framework: **Other**
3. Configura:
   - Build Command: `echo "Static site"`
   - Output Directory: `./`
4. ¡Despliega!

## 🛠️ Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Estilos:** Tailwind CSS
- **Fuentes:** Google Fonts (Inter)
- **Hosting:** Vercel
- **Comunicación:** WhatsApp Web API

## 👥 Contacto

- **WhatsApp:** +57 321 376 5854
- **Email:** info@stylehub.com
- **Instagram:** @stylehub
- **GitHub:** [AlexandraEs13](https://github.com/AlexandraEs13)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

Hecho con ❤️ para StyleHub
