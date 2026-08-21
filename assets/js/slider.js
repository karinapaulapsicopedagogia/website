// ========================================================
// SLIDER.JS - Carrossel de Depoimentos
// ========================================================

(function() {
    'use strict';

    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;

    // Seleciona os elementos do slider
    const track = slider.querySelector('.slider-track');
    const items = slider.querySelectorAll('.testimonial-item');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let intervalId = null;
    const totalItems = items.length;

    // --- FUNÇÃO PARA NAVEGAR PARA UM SLIDE ESPECÍFICO ---
    function goTo(index) {
        // Lógica de loop infinito
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;
        
        currentIndex = index;
        // Move o track para mostrar o slide correto
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualiza os dots (indicadores)
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goTo(currentIndex + 1);
    }

    function prevSlide() {
        goTo(currentIndex - 1);
    }

    // --- EVENTOS DOS BOTÕES ---
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay(); // Reinicia o timer
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    // --- EVENTOS DOS DOTS ---
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goTo(index);
            resetAutoPlay();
        });
    });

    // --- NAVEGAÇÃO POR TECLADO ---
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            resetAutoPlay();
        }
    });

    // --- SUPORTE A TOUCH (mobile) ---
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) { // Deslize mínimo de 50px
            if (diff > 0) {
                nextSlide(); // Deslizou para esquerda
            } else {
                prevSlide(); // Deslizou para direita
            }
            resetAutoPlay();
        }
    }, { passive: true });

    // --- AUTO-PLAY ---
    function startAutoPlay() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }

    function resetAutoPlay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        startAutoPlay();
    }

    // --- PAUSAR AO PASSAR O MOUSE ---
    slider.addEventListener('mouseenter', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });

    slider.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // --- INICIALIZA ---
    startAutoPlay();
    goTo(0);
})();