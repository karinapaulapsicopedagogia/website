// ========================================================
// FAQ.JS - Accordion de Perguntas Frequentes
// ========================================================

(function() {
    'use strict';

    // Pega todos os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    // Para cada item do FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            // Quando clicar na pergunta
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fecha todos os outros itens (accordion: só um aberto por vez)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Alterna o item atual (abre/fecha)
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
            });
        }
    });

    // Abre o primeiro FAQ por padrão para melhor experiência
    const firstFaq = document.querySelector('.faq-item');
    if (firstFaq && !document.querySelector('.faq-item.active')) {
        firstFaq.classList.add('active');
        const firstQuestion = firstFaq.querySelector('.faq-question');
        if (firstQuestion) {
            firstQuestion.setAttribute('aria-expanded', 'true');
        }
    }
})();