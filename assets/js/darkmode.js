// ========================================================
// DARKMODE.JS - Alternância de Tema Escuro/Claro
// ========================================================

(function() {
    'use strict';

    // Pega o botão de alternância
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    // Verifica se o usuário já salvou uma preferência
    const savedTheme = localStorage.getItem('theme');
    // Verifica se o sistema está em modo escuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Aplica o tema salvo ou a preferência do sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.setAttribute('aria-pressed', 'true');
        updateToggleIcon(true);
    }

    // Função para atualizar os ícones (sol/lua)
    function updateToggleIcon(isDark) {
        const sunIcon = toggle.querySelector('.icon-sun');
        const moonIcon = toggle.querySelector('.icon-moon');
        
        if (sunIcon && moonIcon) {
            sunIcon.style.display = isDark ? 'none' : 'inline';
            moonIcon.style.display = isDark ? 'inline' : 'none';
        }
    }

    // Quando clicar no botão, alterna o tema
    toggle.addEventListener('click', () => {
        // Verifica se está escuro agora
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        // Define o novo tema (inverte)
        const newTheme = isDark ? 'light' : 'dark';
        
        // Aplica o tema no HTML
        document.documentElement.setAttribute('data-theme', newTheme);
        toggle.setAttribute('aria-pressed', !isDark);
        // Salva a preferência
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(!isDark);
    });

    // Observa mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Só muda se o usuário não tiver uma preferência salva
        if (!localStorage.getItem('theme')) {
            const isDark = e.matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            toggle.setAttribute('aria-pressed', isDark);
            updateToggleIcon(isDark);
        }
    });

    // Inicializa os ícones
    updateToggleIcon(document.documentElement.getAttribute('data-theme') === 'dark');
})();