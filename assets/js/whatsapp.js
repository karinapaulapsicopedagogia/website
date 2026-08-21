// ========================================================
// WHATSAPP.JS - Botão Flutuante do WhatsApp
// ========================================================

(function() {
    'use strict';

    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (!whatsappBtn) return;

    // --- CONFIGURAÇÕES ---
    // Número de telefone (substitua pelo número real)
    const phoneNumber = '5511999999999';
    const message = 'Olá! Gostaria de agendar uma avaliação.';
    
    // Atualiza o link do WhatsApp com a mensagem codificada
    whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // --- RASTREAMENTO DE CLIQUE ---
    // Exemplo: enviar evento para Google Analytics
    whatsappBtn.addEventListener('click', function(e) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-XXXXX/XXXXX',
                'value': 1.0,
                'currency': 'BRL'
            });
        }

        // Exemplo: enviar evento para Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
        }

        console.log('WhatsApp button clicked - Iniciando conversa');
    });

    // --- ANIMAÇÃO DE ENTRADA ---
    // Delay para aparecer após a página carregar
    setTimeout(() => {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.transform = 'scale(1)';
    }, 1000);

    // Estilos iniciais para a animação (entrada suave)
    whatsappBtn.style.opacity = '0';
    whatsappBtn.style.transform = 'scale(0.8)';
    whatsappBtn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    // --- TOOLTIP ---
    // Esconde o tooltip após 5 segundos
    const tooltip = whatsappBtn.querySelector('.tooltip');
    if (tooltip) {
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.style.display = 'none';
            }, 500);
        }, 5000);
    }
})();