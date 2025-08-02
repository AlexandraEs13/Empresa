export default async function handler(req, res) {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Método no permitido' });
    }

    try {
        const { cart, timestamp } = req.body;
        
        if (!cart || cart.length === 0) {
            return res.status(400).json({ success: false, error: 'Carrito vacío' });
        }

        // Crear mensaje de WhatsApp
        let message = "🛍️ *NUEVO PEDIDO - StyleHub*\n\n";
        message += `📅 Fecha: ${new Date().toLocaleDateString('es-CO')} ${new Date().toLocaleTimeString('es-CO')}\n\n`;
        message += "📋 *Productos:*\n";
        
        let total = 0;
        for (const item of cart) {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            message += `• ${item.name}\n`;
            message += `  Cantidad: ${item.quantity}\n`;
            message += `  Precio: $${item.price.toLocaleString('es-CO')} c/u\n`;
            message += `  Subtotal: $${subtotal.toLocaleString('es-CO')}\n\n`;
        }
        
        message += `💰 *Total: $${total.toLocaleString('es-CO')}*\n\n`;
        message += "📞 Por favor confirmar disponibilidad y forma de pago.\n";
        message += "¡Gracias por tu pedido! 🙏";
        
        // URL de WhatsApp
        const phoneNumber = '573213765854';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        return res.status(200).json({
            success: true,
            whatsapp_url: whatsappUrl,
            message: 'Pedido procesado correctamente'
        });
        
    } catch (error) {
        console.error('Error procesando pedido:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Error interno del servidor' 
        });
    }
}
