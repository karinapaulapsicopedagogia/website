// ========================================
// SCRIPT PRINCIPAL - KARINA PAULA
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENSAGEM DE BOAS-VINDAS NO CONSOLE =====
    console.log('🚀 Site Karina Paula - Psicopedagoga Clínica');
    console.log('💚 Cuidar da aprendizagem é acreditar no potencial de cada pessoa!');
    console.log('📱 WhatsApp: (11) 96131-6640');
    console.log('📧 E-mail: karinapaula.psicopedagogo@gmail.com');
    
    // ===== ADICIONAR ANIMAÇÃO AOS ELEMENTOS =====
    const cards = document.querySelectorAll(
        '.diferencial-card, .servico-card, .depoimento-card, ' +
        '.servico-card-destaque, .depoimento-card-destaque, ' +
        '.abordagem-card, .publico-item, .resultado-item, ' +
        '.localizacao-item, .passo-card, .timeline-item'
    );
    
    cards.forEach((card, index) => {
        card.classList.add('scroll-animate');
        // Adiciona delay escalonado
        if (index % 3 === 0) card.classList.add('delay-1');
        if (index % 3 === 1) card.classList.add('delay-2');
        if (index % 3 === 2) card.classList.add('delay-3');
    });
    
    // ===== HEADER SCROLL EFEITO =====
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 4px 30px rgba(27, 42, 74, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(27, 42, 74, 0.06)';
        }
        
        // Esconder/mostrar header ao scroll (opcional)
        // Útil para dispositivos móveis
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scroll para baixo - esconde
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll para cima - mostra
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ===== LINK ATIVO NO MENU =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // ===== ANO NO RODAPÉ =====
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        const currentYear = new Date().getFullYear();
        footerBottom.innerHTML = footerBottom.innerHTML.replace('2026', currentYear);
    }
    
    // ===== SMOOTH SCROLL PARA LINKS ÂNCORA =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== PREVENÇÃO DE CLIQUE EM LINKS VAZIOS =====
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});