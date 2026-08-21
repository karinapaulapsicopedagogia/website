// ========================================================
// BACKTOTOP.JS - Botão Voltar ao Topo
// ========================================================

(function() {
    'use strict';

    // Pega o botão pelo ID
    const button = document.getElementById('backToTop');
    if (!button) return;

    let isVisible = false;
    let timeoutId = null;

    // Função que decide se mostra ou esconde o botão
    function toggleButton() {
        // Pega quantos pixels o usuário rolou
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mostra o botão se rolou mais de 400px
        if (scrollY > 400 && !isVisible) {
            button.classList.add('visible');
            isVisible = true;
        } 
        // Esconde se rolou menos de 400px
        else if (scrollY <= 400 && isVisible) {
            button.classList.remove('visible');
            isVisible = false;
        }
    }

    // Função que otimiza o scroll para melhor performance
    function handleScroll() {
        if (timeoutId) {
            window.cancelAnimationFrame(timeoutId);
        }
        timeoutId = window.requestAnimationFrame(toggleButton);
    }

    // Escuta o evento de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Quando clicar no botão, volta para o topo com animação suave
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Verifica a posição inicial ao carregar a página
    setTimeout(toggleButton, 100);
})();