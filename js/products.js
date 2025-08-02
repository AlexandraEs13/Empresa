const productos = {
    blusas: [
        {
            id: 1,
            nombre: "Blusa Elegante Rosa",
            precio: 79900,
            imagen: "Imagenes/Mujer/Blusas/1.png",
            descripcion: "Blusa elegante con detalles únicos. Perfecta para ocasiones especiales y looks sofisticados. Confeccionada en tela de alta calidad.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Rosa", "Blanco", "Azul Cielo", "Beige"],
            categoria: "blusas"
        },
        {
            id: 2,
            nombre: "Blusa Casual",
            precio: 65900,
            imagen: "Imagenes/Mujer/Blusas/2.png",
            descripcion: "Blusa casual perfecta para el día a día. Diseño versátil que combina con cualquier outfit. Tela suave y cómoda.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Blanco", "Rosa Palo", "Azul", "Negro"],
            categoria: "blusas"
        }
    ],
    
    faldas: [
        {
            id: 3,
            nombre: "Falda Midi Elegante",
            precio: 89900,
            imagen: "Imagenes/Mujer/Falda/1.png",
            descripcion: "Falda midi con diseño elegante que realza tu silueta. Perfecta para ocasiones formales y semi-formales. Cintura alta favorecedora.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Negro", "Azul Marino", "Beige", "Rosa"],
            categoria: "faldas"
        },
        {
            id: 4,
            nombre: "Falda Moderna",
            precio: 79900,
            imagen: "Imagenes/Mujer/Falda/2.png",
            descripcion: "Falda de diseño moderno y versátil. Ideal para crear looks únicos y estilosos. Tela de calidad premium.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Negro", "Gris", "Azul Marino", "Vino"],
            categoria: "faldas"
        }
    ],
    
    pantalones: [
        {
            id: 5,
            nombre: "Pantalón Premium",
            precio: 129900,
            imagen: "Imagenes/Mujer/Pantalon/2.png",
            descripcion: "Pantalón de corte moderno confeccionado en tela premium. Perfecto para looks elegantes y profesionales. Diseño que estiliza la figura.",
            tallas: ["24", "26", "28", "30", "32", "34"],
            colores: ["Negro", "Azul Oscuro", "Gris", "Beige"],
            categoria: "pantalones"
        },
        {
            id: 6,
            nombre: "Pantalón Casual",
            precio: 99900,
            imagen: "Imagenes/Mujer/Pantalon/3.png",
            descripcion: "Pantalón casual cómodo y versátil. Perfecto para el día a día con un toque de elegancia. Tela suave y flexible.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Negro", "Azul", "Gris", "Beige"],
            categoria: "pantalones"
        }
    ],
    
    sacos: [
        {
            id: 7,
            nombre: "Saco Ejecutivo",
            precio: 189900,
            imagen: "Imagenes/Mujer/saco/1.png",
            descripcion: "Saco ejecutivo elegante perfecto para reuniones importantes. Confeccionado en tela de alta calidad con forro interior suave. Ideal para looks profesionales.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Negro", "Azul Marino", "Gris", "Beige"],
            categoria: "sacos"
        },
        {
            id: 8,
            nombre: "Blazer Moderno",
            precio: 159900,
            imagen: "Imagenes/Mujer/saco/2.png",
            descripcion: "Blazer de diseño moderno que combina elegancia y comodidad. Perfecto para ocasiones formales y casuales elegantes.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Negro", "Gris", "Azul Marino", "Rosa Palo"],
            categoria: "sacos"
        }
    ],
    
    sudaderas: [
        {
            id: 9,
            nombre: "Sudadera con Flores",
            precio: 95900,
            imagen: "Imagenes/Mujer/Pantalon/sudadera_flores.png",
            descripcion: "Sudadera cómoda con diseño floral único. Perfecta para looks casuales y relajados. Tela suave de algodón premium con estampado exclusivo.",
            tallas: ["XS", "S", "M", "L", "XL"],
            colores: ["Rosa", "Blanco", "Gris Claro"],
            categoria: "sudaderas"
        },
        {
            id: 10,
            nombre: "Hoodie Oversized",
            precio: 109900,
            imagen: "Imagenes/Mujer/Pantalon/sudadera_flores.png",
            descripcion: "Hoodie de corte oversized muy tendencia. Con capucha y bolsillo frontal. Ideal para looks urbanos y cómodos.",
            tallas: ["S", "M", "L", "XL"],
            colores: ["Negro", "Gris", "Beige", "Rosa Palo"],
            categoria: "sudaderas"
        }
    ]
};

// Función para obtener todos los productos
function getAllProducts() {
    let allProducts = [];
    Object.values(productos).forEach(categoria => {
        allProducts = allProducts.concat(categoria);
    });
    return allProducts;
}

// Función para obtener productos por categoría
function getProductsByCategory(categoria) {
    return productos[categoria] || [];
}

// Función para obtener un producto por ID
function getProductById(id) {
    const allProducts = getAllProducts();
    return allProducts.find(producto => producto.id === id);
}
