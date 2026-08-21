// ========================================
// WHATSAPP - CONFIGURAÇÃO
// ========================================

// Número da Karina Paula: (11) 96131-6640
// Formato internacional: 5511961316640

const WHATSAPP_NUMBER = '5511961316640';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

document.addEventListener('DOMContentLoaded', function() {
    console.log('💚 WhatsApp configurado: (11) 96131-6640');
    console.log('📱 Clique no ícone flutuante ou nos botões para conversar');

    // ===== ATUALIZAR TODOS OS LINKS DO WHATSAPP =====
    // Links com href="https://wa.me/5511961316640" já estão corretos
    // Esta função garante que todos os links estejam com o número correto

    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    if (whatsappLinks.length > 0) {
        whatsappLinks.forEach(link => {
            // Verifica se o link já tem o número correto
            if (!link.href.includes(WHATSAPP_NUMBER)) {
                // Se não tiver, substitui pelo número correto
                link.href = WHATSAPP_URL;
            }
            
            // Adiciona evento de clique para rastreamento (opcional)
            link.addEventListener('click', function(e) {
                // Permite o clique normal
                // Mas registra no console para analytics
                console.log('📱 Clique no WhatsApp - Número: (11) 96131-6640');
                
                // Se quiser abrir em nova aba (já está configurado com target="_blank")
                // Não precisa fazer nada, o target="_blank" já está nos HTMLs
            });
        });
    } else {
        // Se não houver links de WhatsApp, exibe uma mensagem
        console.log('ℹ️ Nenhum link do WhatsApp encontrado nesta página.');
    }

    // ===== FUNÇÃO PARA ABRIR WHATSAPP COM MENSAGEM PERSONALIZADA =====
    // Use esta função se quiser enviar mensagens com texto pré-definido
    // Exemplo: abrirWhatsApp('Olá Karina, gostaria de agendar uma avaliação!');
    window.abrirWhatsApp = function(mensagem) {
        let url = WHATSAPP_URL;
        if (mensagem) {
            const texto = encodeURIComponent(mensagem);
            url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
        }
        window.open(url, '_blank');
    };

    // ===== FUNÇÃO PARA ABRIR WHATSAPP COM ASSUNTO PRÉ-DEFINIDO =====
    // Exemplo: agendarWhatsApp();
    window.agendarWhatsApp = function() {
        const mensagem = 'Olá Karina! Gostaria de agendar uma avaliação psicopedagógica.';
        window.abrirWhatsApp(mensagem);
    };

    // ===== FUNÇÃO PARA ABRIR WHATSAPP COM DÚVIDA =====
    // Exemplo: duvidaWhatsApp();
    window.duvidaWhatsApp = function() {
        const mensagem = 'Olá Karina! Gostaria de tirar algumas dúvidas sobre os serviços de psicopedagogia.';
        window.abrirWhatsApp(mensagem);
    };

    // ===== EXPOR CONSTANTES PARA USO GLOBAL =====
    window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
    window.WHATSAPP_URL = WHATSAPP_URL;

    console.log('✅ WhatsApp configurado com sucesso!');
    console.log(`📞 Número: (11) 96131-6640`);
});