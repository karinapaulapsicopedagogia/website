// ========================================================
// MENU.JS - Menu Mobile e Navegação
// ========================================================

(function() {
    'use strict';

    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    // Se não existir, sai da função
    if (!navbarToggle || !navbarMenu) return;

    // Função para alternar o menu
    function toggleMenu() {
        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        navbarToggle.setAttribute('aria-expanded', !isExpanded);
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        // Impede scroll da página
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Click no botão hambúrguer
    navbarToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target) && 
            !navbarToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Fecha o menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Previne scroll quando o menu está aberto (mobile)
    document.addEventListener('touchmove', (e) => {
        if (navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target)) {
            e.preventDefault();
        }
    }, { passive: false });
})();