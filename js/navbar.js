// ========================================
// ANIMAÇÕES AO SCROLL - Intersection Observer
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const elementos = document.querySelectorAll('.scroll-animate');
    
    // Verifica se o navegador suporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Opcional: remover a classe após a animação para não repetir
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,         // 15% visível para ativar
            rootMargin: '0px 0px -50px 0px'  // Ativa um pouco antes do elemento aparecer
        });
        
        elementos.forEach(el => observer.observe(el));
    } else {
        // Fallback para navegadores antigos
        elementos.forEach(el => el.classList.add('visible'));
    }
});