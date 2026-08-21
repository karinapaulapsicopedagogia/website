// ========================================================
// ANIMATION.JS - Animações ao Scroll (Scroll Reveal)
// ========================================================

(function() {
    'use strict';

    // Seleciona todos os elementos que terão animação
    const elements = document.querySelectorAll('.animate-on-scroll, .reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

    // Verifica se o navegador suporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        // Cria um observador que monitora quando os elementos entram na tela
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Quando o elemento fica visível
                if (entry.isIntersecting) {
                    // Adiciona a classe 'visible' que ativa a animação CSS
                    entry.target.classList.add('visible');
                    // Para de observar este elemento (anima apenas uma vez)
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,           // Dispara quando 10% do elemento está visível
            rootMargin: '0px 0px -50px 0px' // Ativa um pouco antes do elemento aparecer
        });

        // Observa cada elemento encontrado
        elements.forEach(element => {
            observer.observe(element);
        });

    } else {
        // Fallback para navegadores antigos: mostra tudo sem animação
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }
})();