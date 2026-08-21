/**
 * ========================================================
 * MAIN.JS - Karina Paula Psicopedagogia
 * Inicialização de todos os módulos
 * ========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
    }

    // Inicializar todos os módulos
    initNavbar();
    initScrollReveal();
    initFaq();
    initSlider();
    initBackToTop();
    initDarkMode();
    initForm();
    initWhatsApp();

    // Atualizar ano no footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
    }
});

/**
 * ========================================================
 * NAVBAR - Menu de navegação
 * ========================================================
 */
function initNavbar() {
    const header = document.getElementById('header');
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');
    const links = document.querySelectorAll('.navbar-menu a');

    // Mobile menu toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Scroll effect
    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                updateActiveLink();
            });
            ticking = true;
        }
    }, { passive: true });

    // Active link based on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initial update
    setTimeout(updateActiveLink, 100);
}

/**
 * ========================================================
 * SCROLL REVEAL - Animações ao rolar (CORRIGIDO)
 * ========================================================
 */
function initScrollReveal() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    if (elements.length === 0) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback para navegadores antigos
        elements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

/**
 * ========================================================
 * FAQ ACCORDION
 * ========================================================
 */
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
            });
        }
    });

    // Open first FAQ by default
    const firstFaq = document.querySelector('.faq-item');
    if (firstFaq && !document.querySelector('.faq-item.active')) {
        firstFaq.classList.add('active');
        const firstQuestion = firstFaq.querySelector('.faq-question');
        if (firstQuestion) {
            firstQuestion.setAttribute('aria-expanded', 'true');
        }
    }
}

/**
 * ========================================================
 * TESTIMONIALS SLIDER
 * ========================================================
 */
function initSlider() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;

    const track = slider.querySelector('.slider-track');
    const items = slider.querySelectorAll('.testimonial-item');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let intervalId = null;
    const totalItems = items.length;

    function goTo(index) {
        if (index < 0) index = totalItems - 1;
        if (index >= totalItems) index = 0;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
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

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goTo(index);
            resetAutoPlay();
        });
    });

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

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoPlay();
        }
    }, { passive: true });

    function startAutoPlay() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        startAutoPlay();
    }

    slider.addEventListener('mouseenter', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    });

    slider.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    startAutoPlay();
    goTo(0);
}

/**
 * ========================================================
 * BACK TO TOP BUTTON
 * ========================================================
 */
function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    let isVisible = false;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollY > 400 && !isVisible) {
            button.classList.add('visible');
            isVisible = true;
        } else if (scrollY <= 400 && isVisible) {
            button.classList.remove('visible');
            isVisible = false;
        }
    }, { passive: true });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ========================================================
 * DARK MODE
 * ========================================================
 */
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.setAttribute('aria-pressed', 'true');
        updateToggleIcon(true);
    }

    function updateToggleIcon(isDark) {
        const sunIcon = toggle.querySelector('.icon-sun');
        const moonIcon = toggle.querySelector('.icon-moon');
        
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDark ? 'none' : 'inline';
            moonIcon.style.display = isDark ? 'inline' : 'none';
        }
    }

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        toggle.setAttribute('aria-pressed', !isDark);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(!isDark);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const isDark = e.matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            toggle.setAttribute('aria-pressed', isDark);
            updateToggleIcon(isDark);
        }
    });

    updateToggleIcon(document.documentElement.getAttribute('data-theme') === 'dark');
}

/**
 * ========================================================
 * FORM VALIDATION
 * ========================================================
 */
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 0) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                if (value.length > 10) {
                    value = value.replace(/(\d{5})(\d{4})/, '$1-$2');
                } else if (value.length > 6) {
                    value = value.replace(/(\d{4})(\d{4})/, '$1-$2');
                }
            }
            e.target.value = value;
        });
    }

    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });

        field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group && field.value.trim()) {
                group.classList.remove('error');
                const errorMessage = group.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            }
        });
    });

    function validateField(field) {
        const group = field.closest('.form-group');
        if (!group) return;

        let isValid = true;
        let errorText = '';

        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorText = 'Este campo é obrigatório';
        }

        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                isValid = false;
                errorText = 'Por favor, insira um e-mail válido';
            }
        }

        if (field.id === 'telefone' && field.value.trim()) {
            const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
            if (!phoneRegex.test(field.value.trim())) {
                isValid = false;
                errorText = 'Formato: (99) 99999-9999';
            }
        }

        if (!isValid) {
            group.classList.add('error');
            if (errorMessage) {
                errorMessage.textContent = errorText;
                errorMessage.style.display = 'block';
            }
        }

        return isValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                form.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">✓</div>
                        <h3>Mensagem enviada!</h3>
                        <p>Obrigado pelo contato. Responderei em breve.</p>
                        <button type="button" class="btn btn-primary btn-form" onclick="location.reload()">
                            Enviar nova mensagem
                        </button>
                    </div>
                `;

                const formData = new FormData(form);
                console.log('Form data submitted:', Object.fromEntries(formData));
            }, 2000);
        } else {
            const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
            if (firstError) {
                firstError.focus();
            }
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        .form-success {
            text-align: center;
            padding: var(--spacing-xl) var(--spacing-lg);
        }
        .success-icon {
            width: 64px;
            height: 64px;
            background: var(--color-success);
            color: var(--color-white);
            border-radius: var(--radius-full);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: var(--spacing-md);
        }
        .form-success h3 {
            font-family: var(--font-primary);
            font-size: var(--font-size-2xl);
            margin-bottom: var(--spacing-sm);
        }
        .form-success p {
            opacity: 0.8;
            margin-bottom: var(--spacing-lg);
        }
    `;
    document.head.appendChild(style);
}

/**
 * ========================================================
 * WHATSAPP FLOATING BUTTON
 * ========================================================
 */
function initWhatsApp() {
    const whatsappBtn = document.querySelector('.floating-whatsapp');
    if (!whatsappBtn) return;

    whatsappBtn.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
    });
}