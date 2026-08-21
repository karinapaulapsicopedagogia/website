// ========================================
// ANIMAÇÕES AO SCROLL - Intersection Observer
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ELEMENTOS QUE RECEBERÃO ANIMAÇÃO =====
    const elementos = document.querySelectorAll(
        '.diferencial-card, .servico-card, .depoimento-card, ' +
        '.servico-card-destaque, .depoimento-card-destaque, ' +
        '.abordagem-card, .publico-item, .resultado-item, ' +
        '.localizacao-item, .passo-card, .timeline-item, ' +
        '.sobre-content, .sobre-image, .hero-content, ' +
        '.contato-info, .contato-formulario, .hero-info-grid'
    );

    // ===== ADICIONAR CLASSE PARA ANIMAÇÃO =====
    elementos.forEach((el, index) => {
        el.classList.add('scroll-animate');
        
        // Adiciona delay escalonado para criar efeito cascata
        if (index % 3 === 0) el.classList.add('delay-1');
        if (index % 3 === 1) el.classList.add('delay-2');
        if (index % 3 === 2) el.classList.add('delay-3');
    });

    // ===== INTERSECTION OBSERVER =====
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Opcional: para animar apenas uma vez
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            // CONFIGURAÇÕES
            threshold: 0.15,              // 15% do elemento visível para ativar
            rootMargin: '0px 0px -50px 0px'  // Ativa um pouco antes do elemento aparecer
        });

        // OBSERVAR CADA ELEMENTO
        elementos.forEach(el => observer.observe(el));

        console.log('✅ Scroll Animations ativada com sucesso!');
        console.log(`📦 ${elementos.length} elementos com animação`);

    } else {
        // ===== FALLBACK PARA NAVEGADORES ANTIGOS =====
        console.warn('⚠️ Intersection Observer não suportado. Exibindo todos os elementos.');
        elementos.forEach(el => el.classList.add('visible'));
    }

    // ===== ANIMAÇÃO ESPECIAL PARA O HERO (ENTRADA) =====
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBadge = document.querySelector('.hero-badge');
    const heroButtons = document.querySelector('.hero-buttons');
    const floatingCards = document.querySelectorAll('.floating-card');

    // Adiciona animação de entrada com delay escalonado
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroBadge.style.transition = 'all 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 200);
    }

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 400);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 0.6s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
    }

    if (heroButtons) {
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroButtons.style.transition = 'all 0.6s ease';
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 800);
    }

    // Animação dos cards flutuantes
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 1000 + (index * 300));
    });

    // ===== REINICIAR ANIMAÇÃO AO REDIMENSIONAR (OPCIONAL) =====
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalcular elementos visíveis se necessário
        }, 250);
    });

    // ===== FUNÇÃO PARA ADICIONAR ANIMAÇÃO MANUALMENTE =====
    // Útil para elementos adicionados dinamicamente
    window.adicionarAnimacao = function(elemento) {
        if (elemento) {
            elemento.classList.add('scroll-animate');
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.15,
                    rootMargin: '0px 0px -50px 0px'
                });
                observer.observe(elemento);
            } else {
                elemento.classList.add('visible');
            }
        }
    };

    console.log('🚀 Site Karina Paula - Animação scroll finalizada!');
});